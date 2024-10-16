import { BuildingType } from './buildings.ts';

export enum ItemCategory {
  Tool = 'Tool',
  Clothes = 'Clothes',
  Resource = 'Resource',
  Food = 'Food',
  Herb = 'Herb',
  Other = 'Other',
}

export enum Item {
  Coin = 'Coin',
  Log = 'Log',
  Firewood = 'Firewood',
  Plank = 'Plank',
  Stick = 'Stick',
  Stone = 'Stone',
  Clay = 'Clay',
  LimeStone = 'Limestone',
  StoneAxe = 'Stone Axe',
  BronzeAxe = 'Bronze Axe',
  CopperAxe = 'Copper Axe',
  IronAxe = 'Iron Axe',
  WoodenHammer = 'Wooden Hammer',
  CopperHammer = 'Copper Hammer',
  BronzeHammer = 'Bronze Hammer',
  IronHammer = 'Iron Hammer',
  Bucket = 'Bucket',
  BucketOfWater = 'Bucket of Water',
  CopperOre = 'Copper Ore',
  CopperBar = 'Copper Bar',
  TinOre = 'Tin Ore',
  TinBar = 'Tin Bar',
  BronzeBar = 'Bronze Bar',
  IronOre = 'Iron Ore',
  IronBar = 'Iron Bar',
  StonePickaxe = 'Stone Pickaxe',
  BronzePickaxe = 'Bronze Pickaxe',
  IronPickaxe = 'Iron Pickaxe',
  StoneSickle = 'Stone Sickle',
  CopperSickle = 'Copper Sickle',
  BronzeSickle = 'Bronze Sickle',
  IronSickle = 'Iron Sickle',
  WoodenHoe = 'Wooden Hoe',
  StoneHoe = 'Stone Hoe',
  CopperHoe = 'Copper Hoe',
  BronzeHoe = 'Bronze Hoe',
  IronHoe = 'Iron Hoe',
  WoodenShovel = 'Wooden Shovel',
  CopperShovel = 'Copper Shovel',
  BronzeShovel = 'Bronze Shovel',
  IronShovel = 'Iron Shovel',
  StoneKnife = 'Stone Knife',
  CopperKnife = 'Copper Knife',
  BronzeKnife = 'Bronze Knife',
  IronKnife = 'Iron Knife',
  SimpleBag = 'Simple Bag',
  Bag = 'Bag',

  Straw = 'Straw',
  Meat = 'Meat',
  RoastedMeat = 'Roasted Meat',
  DriedMeat = 'Dried Meat',
  SaltedMeat = 'Salted Meat',

  ToolAxe = 'Axe Durability',
  ToolPickaxe = 'Pickaxe Durability',
  ToolHammer = 'Hammer Durability',
  ToolSickleOrScythe = 'Sickle/Scythe Durability',
  ToolHoe = 'Hoe Durability',
  ToolBag = 'Bag Durability',
  ToolShovel = 'Shovel Durability',
  ToolKnife = 'Knife Durability',
  ToolShearingScissors = 'Shearing Scissors Durability',

  Wood = 'Wood',
  Food = 'Food',
  Water = 'Water',
  CarrotSeed = 'Carrot Seed',
  Carrot = 'Carrot',
  Onion = 'Onion',
  OnionSeed = 'Onion Seed',
  Beetroot = 'Beetroot',
  BeetrootSeed = 'Beetroot Seed',
  Cabbage = 'Cabbage',
  CabbageSeed = 'Cabbage Seed',
  Wheat = 'Wheat',
  WheatGrain = 'Wheat Grain',
  Oat = 'Oat',
  OatGrain = 'Oat Grain',
  Rye = 'Rye',
  RyeGrain = 'Rye Grain',
  UnripeBerry = 'Unripe Berry',
  Berry = 'Berry',
  Apple = 'Apple',
  AppleSeedling = 'Apple Seedling',
  Pear = 'Pear',
  PearSeedling = 'Pear Seedling',
  Plum = 'Plum',
  PlumSeedling = 'Plum Seedling',
  Cherry = 'Cherry',
  HoneyComb = 'Honey Comb',
  BitterBoleteMushroom = 'Bitter Bolete Mushroom',
  BoleteMushroom = 'Bolete Mushroom',
  FlyAgaricMushroom = 'Fly Agaric Mushroom',
  ParasolMushroom = 'Parasol Mushroom',
  RedPineMushroom = 'Red Pine Mushroom',
  WoolyMilkCapMushroom = 'Wooly Milk Cap Mushroom',
  MorelMushroom = 'Morel Mushroom',
  Pike = 'Pike',
  Roach = 'Roach',
  Perch = 'Perch',
  FishMeat = 'Fish Meat',
  RoastedFishMeat = 'Roasted Fish Meat',
  DriedFishMeat = 'Dried Fish Meat',
  SaltedFishMeat = 'Salted Fish Meat',

  Flax = 'Flax',
  FlaxSeed = 'Flax Seed',
  FlaxStalk = 'Flax Stalk',
  Poppy = 'Poppy',
  PoppySeed = 'Poppy Seed',
  Fertiliser = 'Fertiliser',
  AnimalFeed = 'Animal Feed',
  Rot = 'Rot',
  Manure = 'Manure',

  Potage = 'Potage',
  Stew = 'Stew',
  WoodenBowl = 'Wooden Bowl',
  Soup = 'Soup',
  MeatWithGravy = 'Meat With Gravy',
  FlatBread = 'Flat Bread',
  ScrambledEggs = 'Scrambled Eggs',
  Egg = 'Egg',
  WoodenPlate = 'Wooden Plate',
  Leather = 'Leather',
  LinenThread = 'Linen Thread',
  LinenFabric = 'Linen Fabric',
  BronzeScythe = 'Bronze Scythe',
  IronScythe = 'Iron Scythe',
  Fur = 'Fur',
  Feather = 'Feather',

  // auto
  AppleWine = 'Apple Wine',
  BerryWine = 'Berry Wine',
  Mead = 'Mead',
  OatAle = 'Oat Ale',
  OatBeer = 'Oat Beer',
  PearWine = 'Pear Wine',
  PlumWine = 'Plum Wine',
  RyeBeer = 'Rye Beer',
  WheatBeer = 'Wheat Beer',
  AppleJuice = 'Apple Juice',
  BerryJuice = 'Berry Juice',
  CherryJuice = 'Cherry Juice',
  CherryWine = 'Cherry Wine',
  PearJuice = 'Pear Juice',
  PlumJuice = 'Plum Juice',

  Cheese = 'Cheese',
  FishTart = 'Fish Tart',
  FlatbreadwithOnion = 'Flatbread with Onion',
  FruitPie = 'Fruit Pie',
  FruitTart = 'Fruit Tart',
  MeatPie = 'Meat Pie',
  MeatTart = 'Meat Tart',
  Milk = 'Milk',
  OatRoll = 'Oat Roll',
  Quark = 'Quark',
  SouredMilk = 'Soured Milk',
  WheatRoll = 'Wheat Roll',
  CherryPie = 'Cherry Pie',
  Flatbread = 'Flatbread',
  FurCapelet = 'Fur Capelet',
  Gruel = 'Gruel',
  MultigrainBread = 'Multigrain Bread',
  MushroomSoup = 'Mushroom Soup',
  PearTart = 'Pear Tart',
  PlumTart = 'Plum Tart',
  PoppySeedPie = 'Poppy Seed Pie',
  PorridgewithApple = 'Porridge with Apple',
  PorridgewithBerries = 'Porridge with Berries',
  Porridge = 'Porridge',
  RyeBread = 'Rye Bread',
  ScrambledEggsWithMushroom = 'Scrambled Eggs with Mushroom',
  VegetableSoup = 'Vegetable Soup',
  WheatBread = 'Wheat Bread',
  WhiteBread = 'White Bread',

  BagHat = 'Bag Hat',
  FancyShoes = 'Fancy Shoes',
  FeltHat = 'Felt Hat',
  FeltVest = 'Felt Vest',
  FlatStrawHat = 'Flat Straw Hat',
  FurBoots = 'Fur Boots',
  FurHood = 'Fur Hood',
  FurShoes = 'Fur Shoes',
  HatwithLapels = 'Hat with Lapels',
  Hood = 'Hood',
  Hose = 'Hose',
  JoinedHose = 'Joined Hose',
  LinenShirt = 'Linen Shirt',
  LongFurHood = 'Long Fur Hood',
  LongHood = 'Long Hood',
  NobleBoots = 'Noble Boots',
  NobleShoes = 'Noble Shoes',
  QuiltedVest = 'Quilted Vest',
  ShortSleeveTunic = 'Short Sleeve Tunic',
  SimpleLinenShirt = 'Simple Linen Shirt',
  SimpleShoes = 'Simple Shoes',
  SmallPouch = 'Small Pouch',
  Strawhat = 'Straw hat',
  ThickLeatherGloves = 'Thick Leather Gloves',
  Tunic = 'Tunic',
  Boots = 'Boots',
  CapwithCoif = 'Cap with Coif',
  Cap = 'Cap',
  Coif = 'Coif',
  Hat = 'Hat',
  Pouch = 'Pouch',
  Shoes = 'Shoes',
  TrousersWithCuffs = 'Trousers with Cuffs',
  Trousers = 'Trousers',
  SimpleTunic = 'Simple Tunic',

  Bow = 'Bow',
  CopperArrow = 'Copper Arrow',
  CopperBolt = 'Copper Bolt',
  CopperSpear = 'Copper Spear',
  Cudgel = 'Cudgel',
  FishingSpear = 'Fishing Spear',
  IronBolt = 'Iron Bolt',
  IronCrossbow = 'Iron Crossbow',
  IronSpear = 'Iron Spear',
  IronSpikedCudgel = 'Iron Spiked Cudgel',
  Longbow = 'Longbow',
  SimpleTorch = 'Simple Torch',
  StoneSpear = 'Stone Spear',
  ThrowingStone = 'Throwing Stone',
  Torch = 'Torch',
  WaterSkin = 'Water Skin',
  WoodenBolt = 'Wooden Bolt',
  WoodenCrossbow = 'Wooden Crossbow',
  WoodenSpear = 'Wooden Spear',
  BronzeShearingScissors = 'Bronze Shearing Scissors',
  IronShearingScissors = 'Iron Shearing Scissors',
  RecurveBow = 'Recurve Bow',

  CherrySeedling = 'Cherry Seedling',
  Chicory = 'Chicory',
  Daub = 'Daub',
  Flour = 'Flour',
  Hop = 'Hop',
  HopSeedling = 'Hop Seedling',
  Salt = 'Salt',
  WoodenVial = 'Wooden Vial',
  WoolFabric = 'Wool Fabric',
  Wool = 'Wool',
  WoolThread = 'Wool Thread',

  Poison = 'Poison',
  PotionofCamouflage = 'Potion of Camouflage',
  PotionofCure = 'Potion of Cure',
  PotionofHealingI = 'Potion of Healing I',
  PotionofHealingII = 'Potion of Healing II',
  PotionofHealth = 'Potion of Health',
  PotionofInstantCure = 'Potion of Instant Cure',
  PotionofInstantHealingI = 'Potion of Instant Healing I',
  PotionofInstantHealingII = 'Potion of Instant Healing II',
  PotionofNightVision = 'Potion of Night Vision',
  PotionofSatiety = 'Potion of Satiety',
  PotionofSaturation = 'Potion of Saturation',
  PotionofSobriety = 'Potion of Sobriety',
  PotionofStamina = 'Potion of Stamina',
  PotionOfStrength = 'Potion of Strength',
  PotionOfTemperature = 'Potion of Temperature',
  PotionOfWeight = 'Potion of Weight',
  PotionofPossibilities = 'Potion of Possibilities',
}

export interface ProvidesByProduct {
  item: Item;
  amount: number;
}

export interface ItemPropertiesProvides {
  item: Item;
  amount: number;
  priority: number;
}

export enum Season {
  Spring = 'Spring',
  Summer = 'Summer',
  Autumn = 'Autumn',
  Winter = 'Winter',
}

export enum RotRate { //inventory,non-food storage,food storage
  Low = 'Low', //25%,9%,6%
  Medium = 'Medium', //33%,17%,9%
  High = 'High', //50%,25%,12%
}

export const rotRates: Record<RotRate, [number, number, number]> = {
  [RotRate.Low]: [0.25, 0.09, 0.06],
  [RotRate.Medium]: [0.33, 0.17, 0.09],
  [RotRate.High]: [0.5, 0.25, 0.12],
};

export type Technology = 'Production' | 'Farming' | 'Survival' | 'Building';
export const TechnologyOptions: Technology[] = ['Production', 'Farming', 'Survival', 'Building'];

export interface ItemTechnologyLevel {
  type: Technology;
  level: number;
  purchasePrice?: number;
}

export const technologyLevels: Record<Technology, Record<number, [BuildingType, number | undefined]>> = {
  Production: {
    5: [BuildingType.Workshop, 1],
    25: [BuildingType.Kitchen, 1],
    50: [BuildingType.Smithy, 1],
    100: [BuildingType.SewingHut, 1],
    250: [BuildingType.Workshop, 2],
    500: [BuildingType.Smithy, 2],
    750: [BuildingType.SewingHut, 2],
    1500: [BuildingType.Kitchen, 2],
    2500: [BuildingType.MarketStall, undefined],
    3500: [BuildingType.Workshop, 3],
    5000: [BuildingType.Smithy, 3],
    7500: [BuildingType.SewingHut, 3],
    10000: [BuildingType.Tavern, undefined],
  },
  Farming: {
    5: [BuildingType.FoodStorage, 1],
    10: [BuildingType.Barn, 1],
    15: [BuildingType.FarmShed, undefined],
    50: [BuildingType.HenHouse, undefined],
    100: [BuildingType.Pigsty, undefined],
    250: [BuildingType.DonkeyShelter, undefined],
    500: [BuildingType.GooseHouse, undefined],
    1000: [BuildingType.FoodStorage, 2],
    1500: [BuildingType.Barn, 2],
    2000: [BuildingType.Stable, undefined],
    2500: [BuildingType.Fold, undefined],
    3500: [BuildingType.Cowshed, undefined],
    5000: [BuildingType.Apiary, undefined],
    6500: [BuildingType.FoodStorage, 3],
    8000: [BuildingType.Barn, 3],
    10000: [BuildingType.Windmill, undefined],
  },
  Survival: {
    50: [BuildingType.HuntingLodge, 1],
    100: [BuildingType.HerbalistsHut, 1],
    500: [BuildingType.FishingHut, 1],
    1000: [BuildingType.HuntingLodge, 2],
    2500: [BuildingType.HerbalistsHut, 2],
    5000: [BuildingType.FishingHut, 2],
  },
  Building: {
    20: [BuildingType.Well, 1],
    50: [BuildingType.ResourceStorage, 1],
    100: [BuildingType.Woodshed, 1],
    250: [BuildingType.SimpleHouse, undefined],
    500: [BuildingType.ExcavationShed, undefined],
    1000: [BuildingType.ResourceStorage, 2],
    1500: [BuildingType.House, undefined],
    2500: [BuildingType.Woodshed, 2],
    5000: [BuildingType.Mine, undefined],
    7500: [BuildingType.BuildersHut, undefined],
    10000: [BuildingType.ResourceStorage, 3],
  },
};

export enum ItemEffectType {
  Poisoning = 'Poisoning',
  HealthPerSecond = 'Health Per Second',
  TemperatureTolerance = 'Temperature Tolerance',
  MoreDamage = 'More Damage',
  LessStaminaConsumption = 'Less Stamina Consumption',
  LessFoodConsumption = 'Less Food Consumption',
  LessWaterConsumption = 'Less Water Consumption',
  WeightLimit = 'Weight Limit',
  Health = 'Health',
  Alcohol = 'Alcohol',
}

export interface ItemEffect {
  type: ItemEffectType;
  value?: number;
  duration?: number;
}

export interface ItemProperties {
  provides?: ItemPropertiesProvides[];
  byproduct?: ProvidesByProduct;
  synthetic?: true;
  plantingSeasons?: Season[];
  growthSeasons?: number;
  harvestSeasons?: Season[];
  weight?: number;
  basePrice?: number;
  type?: ItemCategory;
  rots?: RotRate;
  grows?: Item;
  technology?: ItemTechnologyLevel | { type: 'None' };
  effects?: ItemEffect[];
}

export const itemProperties: Partial<Record<Item, ItemProperties>> = {
  [Item.Firewood]: {
    provides: [{ item: Item.Wood, amount: 5, priority: 1 }],
    basePrice: 2,
    type: ItemCategory.Resource,
    weight: 0.6,
  },
  [Item.Stick]: {
    provides: [{ item: Item.Wood, amount: 1, priority: 2 }],
    weight: 0.1,
    type: ItemCategory.Resource,
    basePrice: 0.3,
  },
  [Item.Log]: {
    provides: [{ item: Item.Wood, amount: 10, priority: 3 }],
    basePrice: 2,
    type: ItemCategory.Resource,
    weight: 2.5,
  },
  [Item.Plank]: {
    provides: [{ item: Item.Wood, amount: 5, priority: 4 }],
    basePrice: 2,
    type: ItemCategory.Resource,
    weight: 1,
  },
  [Item.Stone]: { weight: 1, basePrice: 0.4, type: ItemCategory.Resource },
  [Item.Clay]: { weight: 0.5, basePrice: 0.2, type: ItemCategory.Resource },
  [Item.LimeStone]: { weight: 1, basePrice: 12, type: ItemCategory.Resource },
  [Item.CopperOre]: { weight: 1, basePrice: 12, type: ItemCategory.Resource },
  [Item.CopperBar]: { weight: 1, basePrice: 30, type: ItemCategory.Resource },
  [Item.TinOre]: { weight: 1, basePrice: 10, type: ItemCategory.Resource },
  [Item.TinBar]: { weight: 1, basePrice: 50, type: ItemCategory.Resource },
  [Item.BronzeBar]: { weight: 2, basePrice: 60, type: ItemCategory.Resource },
  [Item.IronOre]: { weight: 1, basePrice: 40, type: ItemCategory.Resource },
  [Item.IronBar]: { weight: 1, basePrice: 90, type: ItemCategory.Resource },
  [Item.Straw]: { weight: 0.04, basePrice: 0.1, type: ItemCategory.Resource },
  [Item.StoneAxe]: {
    provides: [{ item: Item.ToolAxe, amount: 50, priority: 1 }],
    weight: 2.5,
    basePrice: 7,
    type: ItemCategory.Tool,
  },
  [Item.CopperAxe]: {
    provides: [{ item: Item.ToolAxe, amount: 150, priority: 2 }],
    type: ItemCategory.Tool,
    basePrice: 190,
    weight: 3,
  },
  [Item.BronzeAxe]: {
    provides: [{ item: Item.ToolAxe, amount: 500, priority: 3 }],
    weight: 3.5,
    type: ItemCategory.Tool,
    basePrice: 630,
  },
  [Item.IronAxe]: {
    provides: [{ item: Item.ToolAxe, amount: 1000, priority: 4 }],
    type: ItemCategory.Tool,
    weight: 3.5,
    basePrice: 870,
  },
  [Item.BucketOfWater]: {
    provides: [{ item: Item.Water, amount: 200, priority: 1 }],
    byproduct: { item: Item.Bucket, amount: 0.9 },
    type: ItemCategory.Food,
    basePrice: 9,
    weight: 4,
  },
  [Item.WoodenHammer]: {
    provides: [{ item: Item.ToolHammer, amount: 120, priority: 1 }],
    weight: 1,
    basePrice: 9,
    type: ItemCategory.Tool,
  },
  [Item.CopperHammer]: {
    provides: [{ item: Item.ToolHammer, amount: 400, priority: 2 }],
    weight: 2,
    basePrice: 100,
    type: ItemCategory.Tool,
  },
  [Item.BronzeHammer]: {
    provides: [{ item: Item.ToolHammer, amount: 1600, priority: 3 }],
    weight: 2,
    basePrice: 310,
    type: ItemCategory.Tool,
  },
  [Item.IronHammer]: {
    provides: [{ item: Item.ToolHammer, amount: 3200, priority: 4 }],
    weight: 2,
    basePrice: 430,
    type: ItemCategory.Tool,
  },
  [Item.StonePickaxe]: {
    provides: [{ item: Item.ToolPickaxe, amount: 70, priority: 1 }],
    weight: 3,
    basePrice: 7,
    type: ItemCategory.Tool,
  },
  [Item.BronzePickaxe]: {
    provides: [{ item: Item.ToolPickaxe, amount: 200, priority: 2 }],
    weight: 5,
    basePrice: 630,
    type: ItemCategory.Tool,
  },
  [Item.IronPickaxe]: {
    provides: [{ item: Item.ToolPickaxe, amount: 800, priority: 3 }],
    weight: 5,
    basePrice: 870,
    type: ItemCategory.Tool,
  },
  [Item.WoodenHoe]: {
    provides: [{ item: Item.ToolHoe, amount: 32, priority: 1 }],
    weight: 2,
    basePrice: 7,
    type: ItemCategory.Tool,
  },
  [Item.StoneHoe]: {
    provides: [{ item: Item.ToolHoe, amount: 64, priority: 2 }],
    weight: 2.5,
    basePrice: 9,
    type: ItemCategory.Tool,
  },
  [Item.CopperHoe]: {
    provides: [{ item: Item.ToolHoe, amount: 128, priority: 3 }],
    weight: 2,
    basePrice: 100,
    type: ItemCategory.Tool,
  },
  [Item.BronzeHoe]: {
    provides: [{ item: Item.ToolHoe, amount: 256, priority: 4 }],
    weight: 2,
    basePrice: 310,
    type: ItemCategory.Tool,
  },
  [Item.IronHoe]: {
    provides: [{ item: Item.ToolHoe, amount: 512, priority: 5 }],
    weight: 2,
    basePrice: 430,
    type: ItemCategory.Tool,
  },
  [Item.StoneSickle]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 25, priority: 1 }],
    weight: 0.75,
    basePrice: 6,
    type: ItemCategory.Tool,
  },
  [Item.CopperSickle]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 100, priority: 2 }],
    weight: 1,
    basePrice: 100,
    type: ItemCategory.Tool,
  },
  [Item.BronzeSickle]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 350, priority: 3 }],
    weight: 1.5,
    basePrice: 320,
    type: ItemCategory.Tool,
  },
  [Item.IronSickle]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 650, priority: 4 }],
    weight: 1.5,
    basePrice: 430,
    type: ItemCategory.Tool,
  },
  [Item.BronzeScythe]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 620, priority: 5 }],
    weight: 4,
    basePrice: 630,
    type: ItemCategory.Tool,
  },
  [Item.IronScythe]: {
    provides: [{ item: Item.ToolSickleOrScythe, amount: 860, priority: 6 }],
    weight: 4,
    basePrice: 870,
    type: ItemCategory.Tool,
  },
  [Item.WoodenShovel]: {
    provides: [{ item: Item.ToolShovel, amount: 30, priority: 1 }],
    weight: 2,
    basePrice: 7,
    type: ItemCategory.Tool,
  },
  [Item.CopperShovel]: {
    provides: [{ item: Item.ToolShovel, amount: 120, priority: 2 }],
    weight: 3,
    basePrice: 190,
    type: ItemCategory.Tool,
  },
  [Item.BronzeShovel]: {
    provides: [{ item: Item.ToolShovel, amount: 480, priority: 3 }],
    weight: 3,
    basePrice: 630,
    type: ItemCategory.Tool,
  },
  [Item.IronShovel]: {
    provides: [{ item: Item.ToolShovel, amount: 960, priority: 4 }],
    weight: 3,
    basePrice: 860,
    type: ItemCategory.Tool,
  },
  [Item.SimpleBag]: {
    provides: [{ item: Item.ToolBag, amount: 30, priority: 1 }],
    type: ItemCategory.Tool,
    weight: 0.15,
    basePrice: 14,
    technology: { type: 'None' },
  },
  [Item.Bag]: {
    provides: [{ item: Item.ToolBag, amount: 120, priority: 2 }],
    basePrice: 180,
    technology: {
      level: 100,
      purchasePrice: 50,
      type: 'Production',
    },
    type: ItemCategory.Tool,
    weight: 0.5,
  },
  [Item.StoneKnife]: {
    provides: [{ item: Item.ToolKnife, amount: 40, priority: 1 }],
    weight: 0.5,
    basePrice: 5,
    type: ItemCategory.Tool,
  },
  [Item.CopperKnife]: {
    provides: [{ item: Item.ToolKnife, amount: 120, priority: 2 }],
    weight: 0.5,
    basePrice: 100,
    type: ItemCategory.Tool,
  },
  [Item.BronzeKnife]: {
    provides: [{ item: Item.ToolKnife, amount: 480, priority: 3 }],
    weight: 0.75,
    basePrice: 320,
    type: ItemCategory.Tool,
  },
  [Item.IronKnife]: {
    provides: [{ item: Item.ToolKnife, amount: 960, priority: 4 }],
    weight: 0.75,
    basePrice: 430,
    type: ItemCategory.Tool,
  },
  [Item.LinenThread]: {
    weight: 0.1,
    basePrice: 50,
    type: ItemCategory.Resource,
    technology: { level: 100, purchasePrice: 50, type: 'Production' },
  },
  [Item.LinenFabric]: {
    weight: 0.1,
    basePrice: 60,
    type: ItemCategory.Resource,
    technology: { level: 100, purchasePrice: 50, type: 'Production' },
  },
  [Item.Fertiliser]: { weight: 0.5, basePrice: 3, type: ItemCategory.Resource },
  [Item.Bucket]: { weight: 2, basePrice: 8, type: ItemCategory.Tool },

  [Item.Potage]: {
    provides: [
      { item: Item.Food, amount: 60, priority: 20 },
      { item: Item.Water, amount: 10, priority: 25 },
    ],
    byproduct: { item: Item.WoodenBowl, amount: 0.98 },
    rots: RotRate.High,
    weight: 0.7,
    basePrice: 32,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.TemperatureTolerance, value: 2, duration: 210 }],
  },
  [Item.Stew]: {
    provides: [{ item: Item.Food, amount: 40, priority: 26 }],
    byproduct: { item: Item.WoodenBowl, amount: 0.98 },
    rots: RotRate.High,
    weight: 0.75,
    basePrice: 23,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.LessStaminaConsumption, value: 30, duration: 70 }],
  },
  [Item.Soup]: {
    provides: [
      { item: Item.Food, amount: 60, priority: 21 },
      { item: Item.Water, amount: 20, priority: 0 },
    ],
    byproduct: { item: Item.WoodenBowl, amount: 0.98 },
    rots: RotRate.High,
    weight: 0.75,
    basePrice: 50,
    type: ItemCategory.Food,
    effects: [
      { type: ItemEffectType.TemperatureTolerance, value: 2, duration: 360 },
      { type: ItemEffectType.WeightLimit, value: 3, duration: 360 },
    ],
  },
  [Item.MeatWithGravy]: {
    provides: [
      { item: Item.Food, amount: 40, priority: 27 },
      { item: Item.Water, amount: 10, priority: 0 },
    ],
    byproduct: { item: Item.WoodenPlate, amount: 0.98 },
    rots: RotRate.High,
    basePrice: 40,
    type: ItemCategory.Food,
    weight: 0.55,
    technology: {
      level: 25,
      purchasePrice: 150,
      type: 'Production',
    },
  },
  [Item.FlatBread]: {
    provides: [{ item: Item.Food, amount: 22, priority: 33 }],
    rots: RotRate.Medium,
    weight: 0.2,
    basePrice: 9,
    type: ItemCategory.Food,
  },
  [Item.ScrambledEggs]: {
    provides: [{ item: Item.Food, amount: 12, priority: 39 }],
    byproduct: { item: Item.WoodenBowl, amount: 0.98 },
    rots: RotRate.High,
    weight: 0.2,
    basePrice: 7,
    type: ItemCategory.Food,
  },
  [Item.SaltedMeat]: {
    provides: [
      { item: Item.Food, amount: 15, priority: 35 },
      { item: Item.Water, amount: -5, priority: 0 },
    ],
    weight: 0.2,
    rots: RotRate.Medium,
    basePrice: 11,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.LessFoodConsumption, value: 15, duration: 650 }],
  },
  [Item.RoastedMeat]: {
    provides: [{ item: Item.Food, amount: 14, priority: 36 }],
    weight: 0.2,
    basePrice: 8,
    rots: RotRate.High,
    type: ItemCategory.Food,
  },
  [Item.DriedMeat]: {
    provides: [{ item: Item.Food, amount: 13, priority: 37 }],
    weight: 0.2,
    rots: RotRate.Medium,
    type: ItemCategory.Food,
    basePrice: 8,
    effects: [{ type: ItemEffectType.LessFoodConsumption, value: 10, duration: 650 }],
  },
  [Item.Meat]: {
    provides: [{ item: Item.Food, amount: 10, priority: 43 }],
    weight: 0.2,
    rots: RotRate.High,
    basePrice: 4,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 15 }],
  },
  [Item.Beetroot]: {
    provides: [{ item: Item.Food, amount: 5, priority: 49 }],
    weight: 0.15,
    rots: RotRate.High,
    basePrice: 3,
    type: ItemCategory.Food,
  },
  [Item.Onion]: {
    provides: [{ item: Item.Food, amount: 3, priority: 57 }],
    weight: 0.1,
    rots: RotRate.High,
    basePrice: 3,
    type: ItemCategory.Food,
  },
  [Item.Cabbage]: {
    provides: [{ item: Item.Food, amount: 3, priority: 58 }],
    weight: 0.2,
    rots: RotRate.High,
    basePrice: 3,
    type: ItemCategory.Food,
  },
  [Item.Carrot]: {
    provides: [{ item: Item.Food, amount: 3, priority: 59 }],
    weight: 0.1,
    rots: RotRate.High,
    basePrice: 2,
    type: ItemCategory.Food,
  },
  [Item.Egg]: {
    provides: [{ item: Item.Food, amount: 2.5, priority: 63 }],
    weight: 0.05,
    rots: RotRate.High,
    type: ItemCategory.Food,
    basePrice: 1,
  },
  [Item.UnripeBerry]: {
    provides: [{ item: Item.Food, amount: 0.2, priority: 77 }],
    weight: 0.05,
    rots: RotRate.High,
    harvestSeasons: [Season.Spring],
    effects: [{ type: ItemEffectType.Poisoning, value: 20 }],
    basePrice: 0.2,
    type: ItemCategory.Food,
  },
  [Item.Berry]: {
    provides: [
      { item: Item.Food, amount: 0.2, priority: 76 },
      { item: Item.Water, amount: 2, priority: 34 },
    ],
    weight: 0.05,
    rots: RotRate.High,
    type: ItemCategory.Food,
    basePrice: 0.2,
    harvestSeasons: [Season.Summer],
  },
  [Item.Apple]: {
    provides: [
      { item: Item.Food, amount: 3, priority: 55 },
      { item: Item.Water, amount: 2, priority: 0 },
    ],
    weight: 0.09,
    rots: RotRate.High,
    harvestSeasons: [Season.Summer],
    type: ItemCategory.Food,
    basePrice: 4,
    effects: [{ type: ItemEffectType.HealthPerSecond, value: 0.5, duration: 15 }],
  },
  [Item.Pear]: {
    provides: [
      { item: Item.Food, amount: 3, priority: 56 },
      { item: Item.Water, amount: 3, priority: 0 },
    ],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Summer],
    type: ItemCategory.Food,
    basePrice: 4,
    effects: [{ type: ItemEffectType.TemperatureTolerance, value: 1, duration: 120 }],
  },
  [Item.Plum]: {
    provides: [
      { item: Item.Food, amount: 2, priority: 64 },
      { item: Item.Water, amount: 2, priority: 0 },
    ],
    weight: 0.07,
    rots: RotRate.High,
    harvestSeasons: [Season.Summer],
    basePrice: 3,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.MoreDamage, value: 15, duration: 240 }],
  },
  [Item.Cherry]: {
    provides: [
      { item: Item.Food, amount: 2, priority: 65 },
      { item: Item.Water, amount: 1, priority: 0 },
    ],
    weight: 0.05,
    rots: RotRate.High,
    harvestSeasons: [Season.Summer],
    basePrice: 3,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.LessStaminaConsumption, value: 40, duration: 60 }],
  },
  [Item.HoneyComb]: {
    provides: [
      { item: Item.Food, amount: 6, priority: 48 },
      { item: Item.Water, amount: 2, priority: 0 },
    ],
    weight: 0.1,
    rots: RotRate.High,
    basePrice: 10,
    type: ItemCategory.Food,
    effects: [
      {
        type: ItemEffectType.LessStaminaConsumption,
        value: 50,
        duration: 210,
      },
    ],
  },
  [Item.BitterBoleteMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 74 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 50 }],
  },
  [Item.BoleteMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 68 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 2 }],
  },
  [Item.FlyAgaricMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 0 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 100 }],
  },
  [Item.ParasolMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 69 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 2 }],
  },
  [Item.RedPineMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 70 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 2 }],
  },
  [Item.WoolyMilkCapMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 75 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Autumn],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 50 }],
  },
  [Item.MorelMushroom]: {
    provides: [{ item: Item.Food, amount: 1.5, priority: 71 }],
    weight: 0.1,
    rots: RotRate.High,
    harvestSeasons: [Season.Spring],
    basePrice: 0.6,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 2 }],
  },
  [Item.Pike]: {
    provides: [
      { item: Item.Food, amount: 58, priority: 24 },
      { item: Item.Water, amount: 5, priority: 0 },
    ],
    weight: 1.4,
    rots: RotRate.High,
    basePrice: 36,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 20 }],
  },
  [Item.Roach]: {
    provides: [
      { item: Item.Food, amount: 10, priority: 44 },
      { item: Item.Water, amount: 5, priority: 0 },
    ],
    weight: 0.2,
    rots: RotRate.High,
    basePrice: 7,
    type: ItemCategory.Food,
    effects: [
      { type: ItemEffectType.Poisoning, value: 20 },
      { type: ItemEffectType.LessFoodConsumption, value: 50, duration: 120 },
      { type: ItemEffectType.LessWaterConsumption, value: 50, duration: 120 },
    ],
  },
  [Item.Perch]: {
    provides: [
      { item: Item.Food, amount: 36, priority: 30 },
      { item: Item.Water, amount: 5, priority: 0 },
    ],
    weight: 0.8,
    rots: RotRate.High,
    basePrice: 21,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.Poisoning, value: 20 }],
  },
  [Item.FishMeat]: {
    provides: [{ item: Item.Food, amount: 10, priority: 41 }],
    weight: 0.2,
    rots: RotRate.High,
    type: ItemCategory.Food,
    basePrice: 10,
    effects: [{ type: ItemEffectType.LessStaminaConsumption, value: 30, duration: 180 }],
  },
  [Item.RoastedFishMeat]: {
    provides: [{ item: Item.Food, amount: 13, priority: 38 }],
    weight: 0.2,
    rots: RotRate.High,
    basePrice: 19,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.LessFoodConsumption, value: 45, duration: 600 }],
  },
  [Item.DriedFishMeat]: {
    provides: [{ item: Item.Food, amount: 11, priority: 40 }],
    weight: 0.2,
    rots: RotRate.Low,
    type: ItemCategory.Food,
    basePrice: 20,
    effects: [{ type: ItemEffectType.LessFoodConsumption, value: 55, duration: 700 }],
  },
  [Item.SaltedFishMeat]: {
    provides: [
      { item: Item.Food, amount: 10, priority: 42 },
      { item: Item.Water, amount: -5, priority: 0 },
    ],
    weight: 0.2,
    rots: RotRate.High,
    basePrice: 23,
    type: ItemCategory.Food,
    effects: [{ type: ItemEffectType.LessFoodConsumption, value: 70, duration: 680 }],
  },

  [Item.ToolHammer]: { synthetic: true },
  [Item.ToolAxe]: { synthetic: true },
  [Item.ToolPickaxe]: { synthetic: true },
  [Item.ToolSickleOrScythe]: { synthetic: true },
  [Item.ToolHoe]: { synthetic: true },
  [Item.ToolBag]: { synthetic: true },
  [Item.ToolShovel]: { synthetic: true },
  [Item.ToolKnife]: { synthetic: true },
  [Item.ToolShearingScissors]: { synthetic: true },

  [Item.WoodenBowl]: {
    weight: 0.2,
    technology: { type: 'Production', level: 5, purchasePrice: 0 },
    basePrice: 0.8,
    type: ItemCategory.Resource,
  },
  [Item.Wood]: { synthetic: true },
  [Item.Food]: { synthetic: true },
  [Item.Water]: { synthetic: true },

  [Item.CarrotSeed]: {
    plantingSeasons: [Season.Spring, Season.Winter],
    growthSeasons: 1,
    grows: Item.Carrot,
    basePrice: 5,
    weight: 0.01,
    type: ItemCategory.Resource,
  },
  [Item.OnionSeed]: {
    plantingSeasons: [Season.Spring],
    growthSeasons: 0,
    grows: Item.Onion,
    basePrice: 5,
    weight: 0.01,
    type: ItemCategory.Resource,
  },
  [Item.BeetrootSeed]: {
    plantingSeasons: [Season.Spring],
    growthSeasons: 1,
    grows: Item.Beetroot,
    weight: 0.01,
    basePrice: 8,
    type: ItemCategory.Resource,
  },
  [Item.CabbageSeed]: {
    plantingSeasons: [Season.Spring, Season.Summer],
    growthSeasons: 0,
    grows: Item.Cabbage,
    basePrice: 8,
    weight: 0.01,
    type: ItemCategory.Resource,
  },
  [Item.WheatGrain]: {
    plantingSeasons: [Season.Spring, Season.Autumn],
    growthSeasons: 1,
    grows: Item.Wheat,
    type: ItemCategory.Resource,
    weight: 0.01,
    basePrice: 5,
  },
  [Item.OatGrain]: {
    plantingSeasons: [Season.Spring],
    growthSeasons: 1,
    grows: Item.Oat,
    type: ItemCategory.Resource,
    weight: 0.01,
    basePrice: 4,
  },
  [Item.RyeGrain]: {
    plantingSeasons: [Season.Autumn],
    growthSeasons: 1,
    grows: Item.Rye,
    type: ItemCategory.Resource,
    weight: 0.01,
    basePrice: 4,
  },
  [Item.FlaxSeed]: {
    plantingSeasons: [Season.Spring],
    growthSeasons: 0,
    grows: Item.Flax,
    type: ItemCategory.Resource,
    weight: 0.02,
    basePrice: 6,
  },
  [Item.PoppySeed]: {
    plantingSeasons: [Season.Spring],
    growthSeasons: 1,
    grows: Item.Poppy,
    type: ItemCategory.Resource,
    basePrice: 3,
    weight: 0.01,
  },
  [Item.Rot]: {
    provides: [{ item: Item.Food, amount: 0.3, priority: 78 }],
    weight: 0.05,
    type: ItemCategory.Food,
    basePrice: 0,
  },
  [Item.Coin]: { weight: 0, type: ItemCategory.Other },
  [Item.Wheat]: {
    weight: 0.06,
    basePrice: 6,
    type: ItemCategory.Resource,
  },
  [Item.Oat]: { weight: 0.06, basePrice: 6, type: ItemCategory.Resource },
  [Item.Rye]: { weight: 0.06, basePrice: 6, type: ItemCategory.Resource },
  [Item.AppleSeedling]: { weight: 1, basePrice: 13, type: ItemCategory.Resource },
  [Item.PearSeedling]: { weight: 1, basePrice: 17, type: ItemCategory.Resource },
  [Item.PlumSeedling]: { weight: 1, basePrice: 17, type: ItemCategory.Resource },
  [Item.CherrySeedling]: { weight: 1, basePrice: 17, type: ItemCategory.Resource },
  [Item.Flax]: { weight: 0.05, basePrice: 6, type: ItemCategory.Resource },
  [Item.FlaxStalk]: { weight: 0.04, basePrice: 4, type: ItemCategory.Resource },
  [Item.Poppy]: { weight: 0.05, basePrice: 6, type: ItemCategory.Resource },
  [Item.AnimalFeed]: { weight: 0.2, basePrice: 16, type: ItemCategory.Resource },
  [Item.Manure]: { weight: 0.25, basePrice: 0.9, type: ItemCategory.Resource },
  [Item.WoodenPlate]: { weight: 0.2, basePrice: 0.8, type: ItemCategory.Resource },
  [Item.Leather]: { weight: 0.25, basePrice: 8, type: ItemCategory.Resource },
  [Item.Fur]: { weight: 0.25, basePrice: 4, type: ItemCategory.Resource },
  [Item.Feather]: { weight: 0.01, basePrice: 0.3, type: ItemCategory.Resource },
  [Item.AppleWine]: {
    weight: 1,
    basePrice: 140,
    type: ItemCategory.Food,
    provides: [
      { item: Item.Food, amount: 4, priority: 0 },
      { item: Item.Water, amount: 50, priority: 0 },
    ],
    effects: [
      { type: ItemEffectType.Health, value: 3000 },
      { type: ItemEffectType.Poisoning, value: -20 },
      { type: ItemEffectType.Alcohol, value: 40 },
      { type: ItemEffectType.HealthPerSecond, value: 2, duration: 350 },
      { type: ItemEffectType.TemperatureTolerance, value: 3, duration: 350 },
    ],
  },
  [Item.BerryJuice]: {
    weight: 1,
    basePrice: 23,
    type: ItemCategory.Food,
    provides: [
      { item: Item.Food, amount: 1, priority: 0 },
      { item: Item.Water, amount: 50, priority: 0 },
    ],
    effects: [{ type: ItemEffectType.LessWaterConsumption, value: 85, duration: 700 }],
  },
  [Item.BerryWine]: {
    weight: 1,
    basePrice: 60,
    type: ItemCategory.Food,
    provides: [
      { item: Item.Food, amount: 3, priority: 0 },
      { item: Item.Water, amount: 50, priority: 0 },
    ],
    effects: [
      {
        type: ItemEffectType.Poisoning,
        value: -10,
      },
      { type: ItemEffectType.Alcohol, value: 15 },
      { type: ItemEffectType.LessWaterConsumption, value: 80, duration: 600 },
      { type: ItemEffectType.TemperatureTolerance, value: 4, duration: 600 },
    ],
  },
  [Item.Mead]: {
    weight: 1,
    basePrice: 210,
    type: ItemCategory.Food,
    provides: [
      { item: Item.Food, amount: 5, priority: 0 },
      { item: Item.Water, amount: 50, priority: 0 },
    ],
    effects: [
      { type: ItemEffectType.LessStaminaConsumption, value: 80, duration: 1200 },
      { type: ItemEffectType.TemperatureTolerance, value: 5, duration: 1200 },
    ],
  },
  [Item.OatAle]: {
    weight: 1,
    basePrice: 100,
    type: ItemCategory.Food,
    provides: [
      { item: Item.Food, amount: 2, priority: 0 },
      { item: Item.Water, amount: 50, priority: 0 },
    ],
    effects: [
      { type: ItemEffectType.Poisoning, value: -5 },
      { type: ItemEffectType.Alcohol, value: 30 },
      { type: ItemEffectType.LessWaterConsumption, value: 10, duration: 1100 },
      { type: ItemEffectType.TemperatureTolerance, value: 5, duration: 1100 },
    ],
  },
};

function calcProviders(): Record<Item, { item: Item; provides: ItemPropertiesProvides }[]> {
  const x = Object.values(Item).map((item) => [
    item,
    Object.entries(itemProperties)
      .filter(([, props]) => props.provides?.some((v) => v.item === item))
      .map(([i, props]) => ({
        item: i as Item,
        provides: props.provides!.find((v) => v.item === item)!,
      }))
      .sort((a, b) => a.provides.priority - b.provides.priority || a.provides.amount - b.provides.amount),
  ]) as [Item, { item: Item; provides: ItemPropertiesProvides }[]][];
  return Object.fromEntries(
    x
      .filter(([, provides]) => provides.length > 0)
      .filter(([item, provides]) => !(provides.length == 1 && provides[0].item === item)),
  ) as Record<Item, { item: Item; provides: ItemPropertiesProvides }[]>;
}

export const providers = calcProviders();

export const effectItems = Object.fromEntries(
  Object.entries(ItemEffectType)
    .map(
      ([effect, value]) =>
        [
          effect,
          Object.fromEntries(
            Object.entries(itemProperties)
              .map(
                ([item, props]) =>
                  [item, props.effects?.find((v) => v.type === value)] as [Item, ItemEffect | undefined],
              )
              .filter(([, v]) => v !== undefined)
              .sort(([a], [b]) => a.localeCompare(b)),
          ),
        ] as [ItemEffectType, Partial<Record<Item, ItemEffect>>],
    )
    .sort(([a], [b]) => a.localeCompare(b)),
) as Record<ItemEffectType, Partial<Record<Item, ItemEffect>>>;

const seasonEnumOptions = Object.values(Season);
for (const props of Object.values(itemProperties)) {
  if (props.plantingSeasons && !props.harvestSeasons) {
    props.harvestSeasons = props.plantingSeasons.map(
      (v) => seasonEnumOptions[(seasonEnumOptions.indexOf(v) + (props.growthSeasons ?? 1) + 1) % 4],
    );
  }
  if (props.grows !== undefined) {
    const grows = itemProperties[props.grows] ?? {};
    grows.plantingSeasons = props.plantingSeasons;
    grows.growthSeasons = props.growthSeasons;
    grows.harvestSeasons = props.harvestSeasons;
  }
}
