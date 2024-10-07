import { RecipeData, RecipeId, recipes } from './recipes.ts';
import { Item, ItemCategory, itemProperties, providers, rotRates } from './items.ts';
import { buildingProps, BuildingType, DevelopmentStage, developmentStageProps } from './buildings.ts';
import { findOrPush } from '@/findOrPush';

export interface MedievalDynastyData {
  requiredWood?: number;
  woodConsumeAllowList?: Partial<Record<Item, boolean>>;
  requiredWater?: number;
  waterConsumeAllowList?: Partial<Record<Item, boolean>>;
  requiredFood?: number;
  foodConsumeAllowList?: Partial<Record<Item, boolean>>;
  daysPerSeason?: number;
  inspiringSpeech?: number;
  taxPercent?: number;
  developmentStage?: DevelopmentStage;
  buildings?: BuildingSubTypes[];
}

export interface BuildingOrField {
  id: string;
  type: BuildingType;
}

const allowedStorageBuildingTypes: BuildingType[] = [
  BuildingType.FoodStorage,
  BuildingType.ResourceStorage,
  BuildingType.FarmShed,
];

export interface StorageBuildingData extends BuildingOrField {
  type: (typeof allowedStorageBuildingTypes)[number];
  level?: number;
}

export function isStorageBuildingData(data: BuildingOrField): data is StorageBuildingData {
  return allowedStorageBuildingTypes.includes(data.type);
}

export interface BuildingData extends BuildingOrField {
  type: Exclude<BuildingType, FieldData['type'] | HouseData['type'] | MarketStallData['type']>;
  level?: number;
  totalSkill?: number;
  production?: Partial<Record<RecipeId, number>>;
}

export function isBuildingData(data: BuildingOrField): data is BuildingData {
  return !isFieldData(data) && !isHouseData(data) && !isMarketStallData(data) && !isStorageBuildingData(data);
}

export interface FieldData extends BuildingOrField {
  type: BuildingType.Field | BuildingType.Orchard;
  size?: Partial<Record<RecipeId, number>>;
}

export function isFieldData(data: BuildingOrField): data is FieldData {
  return data.type === BuildingType.Field || data.type === BuildingType.Orchard;
}

export interface HouseData extends BuildingOrField {
  type: BuildingType.SimpleSmallHouse | BuildingType.SimpleHouse | BuildingType.House;
  count?: number;
}

export function isHouseData(data: BuildingOrField): data is HouseData {
  return (
    data.type === BuildingType.SimpleSmallHouse ||
    data.type === BuildingType.SimpleHouse ||
    data.type === BuildingType.House
  );
}

export interface MarketStallData extends BuildingOrField {
  type: BuildingType.MarketStall;
  itemType?: ItemCategory;
  items?: Partial<Record<Item, number>>;
  totalSkill?: number;
}

export function isMarketStallData(data: BuildingOrField): data is MarketStallData {
  return data.type === BuildingType.MarketStall;
}

export type BuildingSubTypes = BuildingData | FieldData | HouseData | MarketStallData | StorageBuildingData;

export interface ItemUsageLog {
  log: string;
  amount: number;
  count: number;
}

export interface ItemUsage {
  item: Item;
  produced: number;
  consumed: number;
  net: number;
  log: ItemUsageLog[];
}

export class ItemUsageCalculator {
  usage: Map<Item, ItemUsage> = new Map<Item, ItemUsage>();

  private getUsage(item: Item): ItemUsage {
    let usage = this.usage.get(item);
    if (!usage) {
      usage = { item, produced: 0, consumed: 0, net: 0, log: [] };
      this.usage.set(item, usage);
    }
    return usage;
  }

  private hasPositiveNet(item: Item): boolean {
    return (this.usage.get(item)?.net ?? 0) > 0;
  }

  private addUsageLog(usage: ItemUsage, log: string, amount: number, count: number = 1) {
    const item = findOrPush(
      usage.log,
      (l) => l.log === log && ((amount < 0 && l.amount < 0) || (amount > 0 && l.amount > 0)),
      () => ({ log, amount: 0, count: 0 }),
    );
    item.amount += amount;
    item.count += count;
  }

  addConsumption(item: Item, amount: number, log: string, count: number = 1) {
    if (amount > 0) {
      const usage = this.getUsage(item);
      usage.consumed += amount;
      usage.net -= amount;
      this.addUsageLog(usage, log, -amount, count);
    }
  }

  addProduction(item: Item, amount: number, log: string) {
    if (amount > 0) {
      const usage = this.getUsage(item);
      usage.produced += amount;
      usage.net += amount;
      this.addUsageLog(usage, log, amount);
    }
  }

  consume(item: Item, forItem: Item, count: number) {
    const properties = itemProperties[item] ?? {};
    properties.provides?.forEach((provided) => {
      this.addProduction(
        provided.item,
        count * provided.amount,
        `Provided by ${item}` + (provided.item != forItem ? ` for ${forItem}` : ''),
      );
    });
    if (properties.byproduct) {
      this.addProduction(
        properties.byproduct.item,
        properties.byproduct.amount * count,
        `Byproduct of ${item} -> ${forItem}`,
      );
    }
    this.addConsumption(item, count, `Provided to ${forItem}`);
  }

  resolveProvides(isUsageAllowed: (item: Item, forItem: Item) => boolean) {
    for (const itemUsage of [...this.usage.values()].sort((a, b) => a.item.localeCompare(b.item))) {
      if (itemUsage.net >= 0) {
        continue;
      }
      for (const { item, provides } of providers[itemUsage.item] ?? []) {
        if (itemUsage.net < 0 && this.hasPositiveNet(item) && isUsageAllowed(item, itemUsage.item)) {
          this.consume(
            item,
            itemUsage.item,
            Math.min(this.getUsage(item).net * provides.amount, -itemUsage.net) / provides.amount,
          );
        }
      }
    }

    Array.from(this.usage.values())
      .filter(
        (itemUsage) =>
          itemUsage.net > 0 && itemProperties[itemUsage.item]?.rots && itemProperties[itemUsage.item]?.weight,
      )
      .forEach((itemUsage) =>
        this.addProduction(
          Item.Rot,
          itemUsage.net * (itemProperties[itemUsage.item]!.weight! / itemProperties[Item.Rot]!.weight!),
          `Rot from ${itemUsage.item} after ${Math.ceil(1 / rotRates[itemProperties[itemUsage.item]!.rots!][2])} seasons`,
        ),
      );
    Array.from(this.usage.values()).forEach((itemUsage) => {
      if (itemUsage.net < 0.01 && itemUsage.net > -0.01) {
        itemUsage.net = 0;
      }
    });
  }

  toArray() {
    return [...this.usage.values()].sort((a, b) => a.item.localeCompare(b.item));
  }
}

export class MedievalDynastyCalculator {
  data: MedievalDynastyData;

  constructor(data: MedievalDynastyData) {
    this.data = data;
  }

  fixErrors(log: string[]): MedievalDynastyData {
    const newBuildings = this.buildings?.map((building) => building.fixErrors(log));
    const houses = newBuildings
      .filter((v) => isHouseData(v))
      .reduce<
        Partial<Record<BuildingType.SimpleSmallHouse | BuildingType.SimpleHouse | BuildingType.House, HouseData[]>>
      >((acc, v) => {
        acc[v.type] = [...(acc[v.type] ?? []), v];
        return acc;
      }, {});
    Object.values(houses)
      .filter((v) => v.length > 1)
      .forEach((v) => {
        const first = v.shift()!;
        first.count = v.reduce((acc, v) => acc + (v.count ?? 1), first.count ?? 1);
        v.forEach((x) =>
          newBuildings.splice(
            newBuildings.findIndex((y) => y.id == x.id),
            1,
          ),
        );
      });

    let developmentStage = this.developmentStage;
    const availableDevelopmentStages = this.availableDevelopmentStages;
    if (!availableDevelopmentStages.includes(developmentStage)) {
      developmentStage = availableDevelopmentStages[0];
      log.push(`development stage updated to ${developmentStage}`);
    }

    return {
      ...this.data,
      developmentStage: developmentStage,
      buildings: newBuildings,
    };
  }

  get availableDevelopmentStages(): DevelopmentStage[] {
    const buildingCount = this.buildingCount;
    return Object.values(DevelopmentStage).filter((v) => developmentStageProps[v].buildingLimit >= buildingCount);
  }

  get developmentStage(): DevelopmentStage {
    return this.data.developmentStage ?? DevelopmentStage.Traveler;
  }

  get taxPercent(): number {
    return ((this.data.taxPercent ?? 100) / 100) * developmentStageProps[this.developmentStage].taxMultiplier;
  }

  get daysPerSeason(): number {
    return this.data.daysPerSeason ?? 3;
  }

  get inspiringSpeech(): number {
    return this.data.inspiringSpeech ?? 0;
  }

  get buildingCount(): number {
    return this.buildings
      .filter((v) => v.type != BuildingType.Field && v.type != BuildingType.Orchard)
      .reduce((acc, v) => acc + v.count, 0);
  }

  get fieldCount(): number {
    return this.buildings.filter((v) => v.type == BuildingType.Field).reduce((acc, v) => acc + v.count, 0);
  }

  get orchardCount(): number {
    return this.buildings.filter((v) => v.type == BuildingType.Orchard).reduce((acc, v) => acc + v.count, 0);
  }

  get buildings(): (
    | BuildingCalculator
    | FieldCalculator
    | HouseCalculator
    | MarketStallCalculator
    | StorageBuildingCalculator
  )[] {
    const taxPercent = this.taxPercent;
    return (
      this.data.buildings?.map((building) => {
        switch (true) {
          case isFieldData(building):
            return new FieldCalculator(building, this.daysPerSeason, this.inspiringSpeech, taxPercent);
          case isHouseData(building):
            return new HouseCalculator(building, taxPercent, this.daysPerSeason);
          case isMarketStallData(building):
            return new MarketStallCalculator(building, taxPercent, this.inspiringSpeech, this.daysPerSeason);
          case isStorageBuildingData(building):
            return new StorageBuildingCalculator(building, taxPercent, this.daysPerSeason);
          default:
            return new BuildingCalculator(building, this.inspiringSpeech, taxPercent, this.daysPerSeason);
        }
      }) ?? []
    );
  }

  itemUsage(): ItemUsage[] {
    const usage = new ItemUsageCalculator();
    const dailyWood = this.data.requiredWood ?? 0;
    const daysPerSeason = this.data.daysPerSeason ?? 1;
    const averageWood = (dailyWood * daysPerSeason * 3 + dailyWood * 1.5 * daysPerSeason) / 4 / daysPerSeason;
    usage.addConsumption(Item.Wood, averageWood, 'Required Wood');
    usage.addConsumption(Item.Water, this.data.requiredWater ?? 0, 'Required Water');
    usage.addConsumption(Item.Food, this.data.requiredFood ?? 0, 'Required Food');
    this.buildings.forEach((building) => building.calculateUsage(usage));
    usage.resolveProvides((item, forItem) => this.isUsageAllowed(item, forItem));
    return usage.toArray();
  }

  private isUsageAllowed(item: Item, forItem: Item): boolean {
    switch (forItem) {
      case Item.Wood:
        return this.data.woodConsumeAllowList?.[item] ?? true;
      case Item.Water:
        return this.data.waterConsumeAllowList?.[item] ?? true;
      case Item.Food:
        return this.data.foodConsumeAllowList?.[item] ?? true;
    }
    return true;
  }
}

export abstract class AbstractBuildingCalculator {
  readonly taxPercent: number;
  readonly daysPerSeason: number;

  protected constructor(taxPercent: number, daysPerSeason: number) {
    this.taxPercent = taxPercent;
    this.daysPerSeason = daysPerSeason;
  }

  abstract get type(): BuildingType;

  abstract get level(): number;

  abstract fixErrors(log: string[]): BuildingOrField;

  get tax(): number {
    return (buildingProps[this.type]?.tax?.[this.level ?? 0] ?? 0) * this.taxPercent;
  }

  get count(): number {
    return 1;
  }

  calculateUsage(usage: ItemUsageCalculator) {
    usage.addConsumption(Item.Coin, this.tax / this.daysPerSeason, `Tax from ${this.type}`, this.count);
  }
}

export interface RecipeCalculator {
  name: string;
  ingredients: [Item, number][];
  production: [Item, number][];
}

export abstract class AbstractProductionBuilding extends AbstractBuildingCalculator {
  abstract get production(): RecipeCalculator[];

  calculateUsage(usage: ItemUsageCalculator) {
    super.calculateUsage(usage);
    for (const production of this.production) {
      for (const [item, amount] of production.ingredients) {
        usage.addConsumption(item, amount, `${production.name} (${this.type})`);
      }
      for (const [item, amount] of production.production) {
        usage.addProduction(item, amount, `${production.name} (${this.type})`);
      }
    }
  }
}

export class BuildingCalculator extends AbstractProductionBuilding {
  readonly building: BuildingData;
  readonly inspiringSpeech: number;

  constructor(building: BuildingData, inspiringSpeech: number, taxPercent: number, daysPerSeason: number) {
    super(taxPercent, daysPerSeason);
    this.building = building;
    this.inspiringSpeech = inspiringSpeech;
  }

  get level(): number {
    return this.building.level ?? 0;
  }

  fixErrors(log: string[]): BuildingData {
    const possible = this.possibleRecipes;
    return {
      ...this.building,
      production: Object.fromEntries(
        (Object.entries(this.building.production ?? {}) as [RecipeId, number][]).filter(([recipe]) => {
          if (possible.some(([key]) => key === recipe)) {
            return true;
          } else {
            log.push(`Building: ${this.building.type} unknown recipe ${recipe} removed`);
            return false;
          }
        }),
      ),
    };
  }

  get type() {
    return this.building.type;
  }

  get totalProduction(): number {
    return Object.values(this.building.production ?? {}).reduce((acc, v) => (acc ?? 0) + (v ?? 0), 0) ?? 0;
  }

  get totalProductionValid(): boolean {
    return this.totalProduction <= 100;
  }

  get remainingProduction(): number {
    const total = this.totalProduction;
    return total > 100 ? 0 : 100 - total;
  }

  get possibleRecipes(): [RecipeId, RecipeData][] {
    return (Object.entries(recipes) as [RecipeId, RecipeData][]).filter(
      ([, recipe]) => recipe.building === this.building.type,
    );
  }

  get availableRecipes(): [RecipeId, RecipeData][] {
    return this.possibleRecipes.filter(([key]) => this.building.production?.[key] === undefined);
  }

  get production(): BuildingRecipeCalculator[] {
    const possible = this.possibleRecipes;
    return (Object.entries(this.building.production ?? {}) as [RecipeId, number][])
      .filter(([recipe]) => possible.some(([key]) => key === recipe))
      .map(
        ([recipe, percent]) =>
          new BuildingRecipeCalculator(recipe, percent, this.building.totalSkill ?? 1, this.inspiringSpeech),
      );
  }
}

export class HouseCalculator extends AbstractBuildingCalculator {
  readonly house: HouseData;

  constructor(house: HouseData, taxPercent: number, daysPerSeason: number) {
    super(taxPercent, daysPerSeason);
    this.house = house;
  }

  get level(): number {
    return 0;
  }

  fixErrors(): HouseData {
    return this.house;
  }

  get type() {
    return this.house.type;
  }

  get tax(): number {
    return super.tax * this.count;
  }

  get count(): number {
    return this.house.count ?? 1;
  }
}

export class FieldCalculator extends AbstractProductionBuilding {
  readonly data: FieldData;
  readonly inspiringSpeech: number;

  constructor(field: FieldData, daysPerSeason: number, inspiringSpeech: number, taxPercent: number) {
    super(taxPercent, daysPerSeason);
    this.data = field;
    this.inspiringSpeech = inspiringSpeech;
  }

  get level(): number {
    return 0;
  }

  get count(): number {
    return Object.values(this.data.size ?? {}).reduce((acc, v) => acc + (v ?? 0), 0) ?? 0;
  }

  get tax(): number {
    return super.tax * this.count;
  }

  fixErrors(log: string[]): FieldData {
    const possible = this.possibleRecipes;
    return {
      ...this.data,
      size: Object.fromEntries(
        (Object.entries(this.data.size ?? {}) as [RecipeId, number][]).filter(([recipe]) => {
          if (possible.some(([key]) => key === recipe)) {
            return true;
          } else {
            log.push(`Field unknown recipe ${recipe} removed`);
            return false;
          }
        }),
      ),
    };
  }

  get type() {
    return this.data.type;
  }

  get possibleRecipes(): [RecipeId, RecipeData][] {
    return (Object.entries(recipes) as [RecipeId, RecipeData][]).filter(
      ([, recipe]) => recipe.building === this.data.type,
    );
  }

  get availableRecipes(): [RecipeId, RecipeData][] {
    return this.possibleRecipes.filter(([key]) => this.data.size?.[key] === undefined);
  }

  get production(): FieldRecipeCalculator[] {
    return (Object.entries(this.data.size ?? {}) as [RecipeId, number][]).map(
      ([recipe, size]) => new FieldRecipeCalculator(recipe, size, this.daysPerSeason, this.inspiringSpeech),
    );
  }
}

export class MarketStallCalculator extends AbstractProductionBuilding {
  readonly data: MarketStallData;
  readonly inspiringSpeech: number;

  constructor(data: MarketStallData, taxPercent: number, inspiringSpeech: number, daysPerSeason: number) {
    super(taxPercent, daysPerSeason);
    this.data = data;
    this.inspiringSpeech = inspiringSpeech;
  }

  get level(): number {
    return 0;
  }

  fixErrors(log: string[]): MarketStallData {
    return {
      ...this.data,
      items: Object.fromEntries(
        Object.entries(this.data.items ?? {}).filter(([key]) => {
          if (itemProperties[key as Item]?.type === this.data.itemType) {
            return true;
          } else {
            log.push(`Market Stall unknown item ${key} removed`);
            return false;
          }
        }),
      ),
    };
  }

  get type() {
    return this.data.type;
  }

  get totalProduction(): number {
    return Object.values(this.data.items ?? {}).reduce((acc, v) => (acc ?? 0) + (v ?? 0), 0) ?? 0;
  }

  get remainingProduction(): number {
    const total = this.totalProduction;
    return total > 100 ? 0 : 100 - total;
  }

  get production(): MarketStallRecipeCalculator[] {
    return (Object.entries(this.data.items ?? {}) as [Item, number][]).map(
      ([item, percent]) =>
        new MarketStallRecipeCalculator(item, percent, this.inspiringSpeech, this.data.totalSkill ?? 1),
    );
  }

  get availableItems(): Item[] {
    return (Object.values(Item) as Item[])
      .filter((v) => itemProperties[v]?.type === this.data.itemType)
      .filter((v) => (itemProperties[v]?.basePrice ?? 0) > 0)
      .filter((v) => this.data?.items?.[v] === undefined);
  }
}

export class StorageBuildingCalculator extends AbstractBuildingCalculator {
  readonly data: StorageBuildingData;

  constructor(data: StorageBuildingData, taxPercent: number, daysPerSeason: number) {
    super(taxPercent, daysPerSeason);
    this.data = data;
  }

  get level(): number {
    return this.data.level ?? 0;
  }

  fixErrors(): StorageBuildingData {
    return this.data;
  }

  get type() {
    return this.data.type;
  }
}

export abstract class AbstractRecipeCalculator implements RecipeCalculator {
  readonly id: RecipeId;
  readonly recipe: RecipeData;
  readonly inspiringSpeech: number;

  protected constructor(recipe: RecipeId, inspiringSpeech: number) {
    this.id = recipe;
    this.recipe = recipes[recipe];
    this.inspiringSpeech = inspiringSpeech;
    if (!this.recipe) {
      throw new Error(`Unknown recipe: ${recipe}`);
    }
  }

  get name() {
    return this.recipe.name;
  }

  abstract get count(): number;

  get ingredients(): [Item, number][] {
    return Object.entries(this.recipe.ingredients).map(([item, amount]) => [
      item,
      amount * this.count * this.inspiringSpeechLoad,
    ]) as [Item, number][];
  }

  get inspiringSpeechLoad(): number {
    return 1 + this.inspiringSpeech * 0.05;
  }

  get production(): [Item, number][] {
    return Object.entries(this.recipe.production).map(([item, amount]) => [
      item,
      amount * this.count * this.inspiringSpeechLoad,
    ]) as [Item, number][];
  }
}

export class BuildingRecipeCalculator extends AbstractRecipeCalculator {
  readonly percent: number;
  readonly totalSkill: number;

  constructor(recipe: RecipeId, percent: number, totalSkill: number, inspiringSpeech: number) {
    super(recipe, inspiringSpeech);
    this.percent = percent;
    this.totalSkill = totalSkill;
  }

  get count(): number {
    return this.percent * this.totalSkill * (this.recipe.skillMultiplier ?? -1);
  }
}

export class FieldRecipeCalculator extends AbstractRecipeCalculator {
  readonly size: number;
  readonly daysPerSeason: number;

  constructor(recipe: RecipeId, size: number, daysPerSeason: number, inspiringSpeech: number) {
    super(recipe, inspiringSpeech);
    this.size = size;
    this.daysPerSeason = daysPerSeason;
  }

  get cropsPerYear(): number {
    const props = itemProperties[Object.keys(this.recipe.production)[0] as Item];
    return props?.growthSeasons == 0 && props.plantingSeasons?.length == 2 ? 2 : 1;
  }

  get count(): number {
    return this.size / (4 / this.cropsPerYear) / this.daysPerSeason;
  }
}

export class MarketStallRecipeCalculator implements RecipeCalculator {
  readonly item: Item;
  readonly percent: number;
  readonly inspiringSpeech: number;
  readonly totalSkill: number;

  constructor(item: Item, percent: number, inspiringSpeech: number, totalSkill: number) {
    this.item = item;
    this.percent = percent;
    this.inspiringSpeech = inspiringSpeech;
    this.totalSkill = totalSkill;
  }

  get name(): string {
    return `Selling ${this.item}`;
  }

  get ingredients(): [Item, number][] {
    return [[this.item, this.count]];
  }

  get production(): [Item, number][] {
    return [[Item.Coin, this.count * (itemProperties[this.item]?.basePrice ?? 0)]];
  }

  get inspiringSpeechLoad(): number {
    return 1 + this.inspiringSpeech * 0.05;
  }

  get count() {
    return (this.percent / (itemProperties[this.item]?.basePrice ?? 0)) * this.totalSkill * this.inspiringSpeechLoad;
  }
}
