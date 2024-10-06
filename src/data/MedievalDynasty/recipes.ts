import { BuildingType } from './buildings.ts';
import { Item } from './items.ts';
import { Recipe } from './recipes-generated.ts';

export interface RecipeData {
  name: string;
  building: BuildingType;
  ingredients: Partial<Record<Item, number>>;
  production: Partial<Record<Item, number>>;
  skillMultiplier: number | null;
  skillSamples: Record<number, number> | null;
}

function calcSkillMultiplier(values: Record<number, number>): {
  skillMultiplier: number;
  skillSamples: Record<number, number>;
} {
  return {
    skillMultiplier:
      Object.entries(values)
        .map(([key, value]) => value / parseInt(key) / 100)
        .reduce((acc, v) => (acc ?? 0) + v, 0) / Object.keys(values).length,
    skillSamples: values,
  };
}

export type RecipeId = keyof typeof recipes;

export const recipes: Record<Recipe, RecipeData> = {
  log: {
    name: 'Log',
    building: BuildingType.Woodshed,
    ...calcSkillMultiplier({
      1: 14.49,
      2: 29.2,
      3: 37.98,
      4: 58.62,
      5: 74.87,
      8: 115.64,
    }),
    ingredients: {
      [Item.ToolAxe]: 2,
    },
    production: {
      [Item.Log]: 1,
    },
  },
  plank: {
    name: 'Plank',
    building: BuildingType.Woodshed,
    ...calcSkillMultiplier({
      1: 12.955,
      2: 26.105,
      3: 39.585,
      4: 52.4,
      5: 66.92,
      8: 103.37,
    }),
    ingredients: {
      [Item.Log]: 1,
    },
    production: {
      [Item.Plank]: 2,
    },
  },
  firewood: {
    name: 'Firewood',
    building: BuildingType.Woodshed,
    ...calcSkillMultiplier({ 4: 32.99, 5: 42.14, 8: 65.09 }),
    ingredients: {
      [Item.Log]: 1,
    },
    production: {
      [Item.Firewood]: 4,
    },
  },
  stick: {
    name: 'Stick',
    building: BuildingType.Woodshed,
    ...calcSkillMultiplier({
      1: 39.55,
      2: 79.68,
      3: 103.61,
      4: 159.93,
      5: 204.26,
      8: 315.52,
    }),
    ingredients: {},
    production: {
      [Item.Stick]: 1,
    },
  },
  bucket: {
    name: 'Bucket',
    building: BuildingType.Workshop,
    ...calcSkillMultiplier({ 2: 1.16 }),
    ingredients: {
      [Item.Plank]: 1,
    },
    production: {
      [Item.Bucket]: 1,
    },
  },
  bucketOfWater: {
    name: 'Bucket of Water',
    building: BuildingType.Well,
    ...calcSkillMultiplier({ 3: 3.99, 6: 8.19 }),
    ingredients: {
      [Item.Bucket]: 1,
    },
    production: {
      [Item.BucketOfWater]: 1,
    },
  },
  copperAxe: {
    name: 'Copper Axe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 6: 6.4 }),
    ingredients: {
      [Item.Log]: 1,
      [Item.CopperBar]: 4,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperAxe]: 1,
    },
  },
  copperOreExcavation: {
    name: 'Copper Ore',
    building: BuildingType.ExcavationShed,
    ...calcSkillMultiplier({
      1: 6.77,
      2: 13.54,
      3: 20.38,
      4: 27.17,
      6: 41.05,
    }),
    ingredients: {},
    production: {
      [Item.CopperOre]: 1,
    },
  },
  copperOreMine: {
    name: 'Copper Ore',
    building: BuildingType.Mine,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.ToolPickaxe]: 2,
    },
    production: {
      [Item.CopperOre]: 1,
    },
  },
  tinOre: {
    name: 'Tin Ore',
    building: BuildingType.Mine,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.ToolPickaxe]: 2, // TODO?
    },
    production: {
      [Item.TinOre]: 1,
    },
  },
  ironOre: {
    name: 'Iron Ore',
    building: BuildingType.Mine,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.ToolPickaxe]: 2, // TODO?
    },
    production: {
      [Item.IronOre]: 1,
    },
  },
  strawExcavation: {
    name: 'Straw',
    building: BuildingType.ExcavationShed,
    ...calcSkillMultiplier({ 6: 337.19 }),
    ingredients: {},
    production: {
      [Item.Straw]: 1,
    },
  },
  stoneExcavation: {
    name: 'Stone',
    building: BuildingType.ExcavationShed,
    ...calcSkillMultiplier({ 6: 66.52 }),
    ingredients: {
      [Item.ToolPickaxe]: 2,
    },
    production: {
      [Item.Stone]: 1,
    },
  },
  limestoneExcavation: {
    name: 'Limestone',
    building: BuildingType.ExcavationShed,
    ...calcSkillMultiplier({ 6: 32.13 }),
    ingredients: {
      [Item.ToolPickaxe]: 2,
    },
    production: {
      [Item.LimeStone]: 1,
    },
  },
  clay: {
    name: 'Clay',
    building: BuildingType.ExcavationShed,
    ...calcSkillMultiplier({ 6: 133.04 }),
    ingredients: {
      [Item.ToolShovel]: 1,
    },
    production: {
      [Item.Clay]: 1,
    },
  },
  copperBar: {
    name: 'Copper Bar',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({
      6: 41.05,
    }),
    ingredients: {
      [Item.CopperOre]: 2,
      [Item.ToolHammer]: 1,
    },
    production: {
      [Item.CopperBar]: 1,
    },
  },
  tinBar: {
    name: 'Tin Bar',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.TinOre]: 2,
      [Item.ToolHammer]: 1,
    },
    production: {
      [Item.TinBar]: 1,
    },
  },
  bronzeBar: {
    name: 'Bronze Bar',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.CopperBar]: 1,
      [Item.TinBar]: 1,
      [Item.ToolHammer]: 2,
    },
    production: {
      [Item.BronzeBar]: 1,
    },
  },
  ironBar: {
    name: 'Iron Bar',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.IronOre]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.IronBar]: 1,
    },
  },
  copperHammer: {
    name: 'Copper Hammer',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 6: 8.53 }),
    ingredients: {
      [Item.Stick]: 1,
      [Item.CopperBar]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperHammer]: 1,
    },
  },
  stoneAxe: {
    name: 'Stone Axe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 10,
      [Item.Stone]: 2,
    },
    production: {
      [Item.StoneAxe]: 1,
    },
  },
  stonePickaxe: {
    name: 'Stone Pickaxe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 7: 31.21 }),
    ingredients: {
      [Item.Log]: 1,
      [Item.Stone]: 4,
    },
    production: {
      [Item.StonePickaxe]: 1,
    },
  },
  bronzePickaxe: {
    name: 'Bronze Pickaxe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.BronzeBar]: 2,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzePickaxe]: 1,
    },
  },
  ironPickaxe: {
    name: 'Iron Pickaxe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.IronBar]: 4,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronPickaxe]: 1,
    },
  },
  stoneSickle: {
    name: 'Stone Sickle',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 4,
      [Item.Stone]: 4,
      [Item.ToolHammer]: 2,
    },
    production: {
      [Item.StoneSickle]: 1,
    },
  },
  copperSickle: {
    name: 'Copper Sickle',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 7: 9.29 }),
    ingredients: {
      [Item.Log]: 1,
      [Item.CopperBar]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperSickle]: 1,
    },
  },
  bronzeSickle: {
    name: 'Bronze Sickle',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.BronzeBar]: 1,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeSickle]: 1,
    },
  },
  ironSickle: {
    name: 'Iron Sickle',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.IronBar]: 2,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronSickle]: 1,
    },
  },
  woodenHoe: {
    name: 'Wooden Hoe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.Stick]: 5,
    },
    production: {
      [Item.WoodenHoe]: 1,
    },
  },
  stoneHoe: {
    name: 'Stone Hoe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 7: 37.45 }),
    ingredients: {
      [Item.Log]: 1,
      [Item.Stone]: 5,
      [Item.ToolHammer]: 2,
    },
    production: {
      [Item.StoneHoe]: 1,
    },
  },
  copperHoe: {
    name: 'Copper Hoe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.CopperBar]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperHoe]: 1,
    },
  },
  bronzeHoe: {
    name: 'Bronze Hoe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.BronzeBar]: 1,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeHoe]: 1,
    },
  },
  ironHoe: {
    name: 'Iron Hoe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.IronBar]: 2,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronHoe]: 1,
    },
  },
  bronzeAxe: {
    name: 'Bronze Axe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.BronzeBar]: 2,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeAxe]: 1,
    },
  },
  bronzeHammer: {
    name: 'Bronze Hammer',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 1,
      [Item.BronzeBar]: 2,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeHammer]: 1,
    },
  },
  ironAxe: {
    name: 'Iron Axe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.IronBar]: 4,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronAxe]: 1,
    },
  },
  ironHammer: {
    name: 'Iron Hammer',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 1,
      [Item.IronBar]: 2,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronHammer]: 1,
    },
  },
  woodenHammer: {
    name: 'Wooden Hammer',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 10,
      [Item.Log]: 1,
    },
    production: {
      [Item.WoodenHammer]: 1,
    },
  },
  meat: {
    name: 'Meat',
    building: BuildingType.HuntingLodge,
    ...calcSkillMultiplier({ 3: 4.88 }),
    ingredients: {
      [Item.ToolKnife]: 2,
    },
    production: {
      [Item.Meat]: 1,
    },
  },
  carrot: {
    name: 'Carrot',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.CarrotSeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Carrot]: 7.5, // TODO ?
      [Item.CarrotSeed]: 1,
    },
  },
  onion: {
    name: 'Onion',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.OnionSeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Onion]: 0, // TODO ?
      [Item.OnionSeed]: 1,
    },
  },
  beetroot: {
    name: 'Beetroot',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.BeetrootSeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Beetroot]: 7.5, // TODO ?
      [Item.BeetrootSeed]: 1,
    },
  },
  cabbage: {
    name: 'Cabbage',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.CabbageSeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Cabbage]: 7.5, // TODO ?
      [Item.CabbageSeed]: 1.5,
    },
  },
  wheat: {
    name: 'Wheat',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.ToolSickleOrScythe]: 1,
      [Item.WheatGrain]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Wheat]: 0, // TODO ?
    },
  },
  wheatGrain: {
    name: 'Wheat Grain',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 16.9 }),
    ingredients: {
      [Item.Wheat]: 1,
    },
    production: {
      [Item.WheatGrain]: 10,
      [Item.Straw]: 7,
    },
  },
  oat: {
    name: 'Oat',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.ToolSickleOrScythe]: 1,
      [Item.OatGrain]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Oat]: 0, // TODO ?
    },
  },
  oatGrain: {
    name: 'Oat Grain',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 10.44 }),
    ingredients: {
      [Item.Oat]: 1,
    },
    production: {
      [Item.OatGrain]: 14,
      [Item.Straw]: 7,
    },
  },
  rye: {
    name: 'Rye',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.ToolSickleOrScythe]: 1,
      [Item.RyeGrain]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Rye]: 0, // TODO ?
    },
  },
  ryeGrain: {
    name: 'Rye Grain',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 10.44 }),
    ingredients: {
      [Item.Rye]: 1,
    },
    production: {
      [Item.RyeGrain]: 14,
      [Item.Straw]: 7,
    },
  },
  flax: {
    name: 'Flax',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.ToolSickleOrScythe]: 1,
      [Item.FlaxSeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Flax]: 6, // TODO ?
    },
  },
  flaxSeed: {
    name: 'Flax Seed',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 105.98 }),
    ingredients: {
      [Item.Flax]: 1,
    },
    production: {
      [Item.FlaxSeed]: 1,
      [Item.FlaxStalk]: 2,
    },
  },
  poppy: {
    name: 'Poppy',
    building: BuildingType.FarmShed,
    skillMultiplier: null,
    skillSamples: null,
    ingredients: {
      [Item.ToolHoe]: 1,
      [Item.ToolBag]: 1,
      [Item.ToolSickleOrScythe]: 1,
      [Item.PoppySeed]: 1,
      [Item.Fertiliser]: 1,
    },
    production: {
      [Item.Poppy]: 1, // TODO ?
      [Item.PoppySeed]: 1,
    },
  },
  poppySeed: {
    name: 'Poppy Seed',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Poppy]: 1,
    },
    production: {
      [Item.PoppySeed]: 2,
    },
  },
  fertiliserManure: {
    name: 'Fertiliser (Manure)',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 91.76 }),
    ingredients: {
      [Item.Manure]: 2,
    },
    production: {
      [Item.Fertiliser]: 1,
    },
  },
  fertiliserRot: {
    name: 'Fertiliser (Rot)',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 91.76 }),
    ingredients: {
      [Item.Rot]: 10,
    },
    production: {
      [Item.Fertiliser]: 1,
    },
  },
  animalFeed: {
    name: 'Animal Feed',
    building: BuildingType.Barn,
    ...calcSkillMultiplier({ 9: 33.31 }),
    ingredients: {
      [Item.OatGrain]: 1,
      [Item.RyeGrain]: 1,
      [Item.Straw]: 5,
    },
    production: {
      [Item.AnimalFeed]: 1,
    },
  },
  potage: {
    name: 'Potage (Meat)',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 5.91 }),
    ingredients: {
      [Item.Meat]: 3,
      [Item.Cabbage]: 2,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.Potage]: 1,
    },
  },
  stewMeat: {
    name: 'Stew (Meat)',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 12.66 }),
    ingredients: {
      [Item.Meat]: 2,
      [Item.Carrot]: 2,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.Stew]: 1,
    },
  },
  stewSaltedMeat: {
    name: 'Stew (Salted Meat)',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.SaltedMeat]: 2,
      [Item.Carrot]: 2,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.Stew]: 1,
    },
  },
  roastMeat: {
    name: 'Roasted (Meat)',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 31.49 }),
    ingredients: {
      [Item.Meat]: 1,
    },
    production: {
      [Item.RoastedMeat]: 1,
    },
  },
  meatWithGravy: {
    name: 'Meat with Gravy',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 12.04 }),
    ingredients: {
      [Item.Meat]: 1,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.MeatWithGravy]: 1,
    },
  },
  scrambledEggs: {
    name: 'Scrambled Eggs',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 42.34 }),
    ingredients: {
      [Item.Egg]: 3,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.ScrambledEggs]: 1,
    },
  },
  flatBread: {
    name: 'Flat Bread',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 31.27 }),
    ingredients: {
      [Item.WheatGrain]: 2,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.FlatBread]: 1,
    },
  },
  soup: {
    name: 'Soup',
    building: BuildingType.Kitchen,
    ...calcSkillMultiplier({ 4: 5.91 }),
    ingredients: {
      [Item.Cabbage]: 2,
      [Item.Carrot]: 2,
      [Item.WoodenBowl]: 1,
    },
    production: {
      [Item.Soup]: 1,
    },
  },
  simpleBag: {
    name: 'Simple Bag',
    building: BuildingType.SewingHut,
    ...calcSkillMultiplier({ 3: 30.26 }),
    ingredients: {
      [Item.Leather]: 1,
    },
    production: {
      [Item.SimpleBag]: 1,
    },
  },
  bag: {
    name: 'Bag',
    building: BuildingType.SewingHut,
    ...calcSkillMultiplier({ 3: 5.87 }),
    ingredients: {
      [Item.Leather]: 2,
      [Item.LinenFabric]: 1,
    },
    production: {
      [Item.Bag]: 1,
    },
  },
  stoneKnife: {
    name: 'Stone Knife',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 5,
      [Item.Stone]: 2,
    },
    production: {
      [Item.StoneKnife]: 1,
    },
  },
  copperKnife: {
    name: 'Copper Knife',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({ 7: 12.33 }),
    ingredients: {
      [Item.Stick]: 1,
      [Item.CopperBar]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperKnife]: 1,
    },
  },
  bronzeKnife: {
    name: 'Bronze Knife',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 1,
      [Item.BronzeBar]: 1,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeKnife]: 1,
    },
  },
  ironKnife: {
    name: 'Iron Knife',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Stick]: 1,
      [Item.IronBar]: 2,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronKnife]: 1,
    },
  },
  woodenShovel: {
    name: 'Wooden Shovel',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 2,
    },
    production: {
      [Item.WoodenShovel]: 1,
    },
  },
  copperShovel: {
    name: 'Copper Shovel',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.CopperBar]: 4,
      [Item.Log]: 2,
      [Item.ToolHammer]: 3,
    },
    production: {
      [Item.CopperShovel]: 1,
    },
  },
  bronzeShovel: {
    name: 'Bronze Shovel',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.BronzeBar]: 2,
      [Item.Log]: 2,
      [Item.ToolHammer]: 4,
    },
    production: {
      [Item.BronzeShovel]: 1,
    },
  },
  ironShovel: {
    name: 'Iron Shovel',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.IronBar]: 4,
      [Item.Log]: 2,
      [Item.ToolHammer]: 5,
    },
    production: {
      [Item.IronShovel]: 1,
    },
  },
  leather: {
    name: 'Leather',
    building: BuildingType.HuntingLodge,
    ...calcSkillMultiplier({ 3: 4.38 }),
    ingredients: {
      [Item.ToolKnife]: 1,
    },
    production: {
      [Item.Leather]: 1,
    },
  },
  fur: {
    name: 'Fur',
    building: BuildingType.HuntingLodge,
    ...calcSkillMultiplier({ 3: 9.86 }),
    ingredients: {
      [Item.ToolKnife]: 1,
    },
    production: {
      [Item.Fur]: 1,
    },
  },
  driedMeat: {
    name: 'Dried Meat',
    building: BuildingType.HuntingLodge,
    ...calcSkillMultiplier({ 3: 8.6 }),
    ingredients: {
      [Item.Meat]: 1,
    },
    production: {
      [Item.DriedMeat]: 1,
    },
  },
  featherHuntingLodge: {
    name: 'Feather',
    building: BuildingType.HuntingLodge,
    ...calcSkillMultiplier({ 3: 31.21 }),
    ingredients: {},
    production: {
      [Item.Feather]: 1,
    },
  },
  eggHenHouse: {
    name: 'Egg',
    building: BuildingType.HenHouse,
    ...calcSkillMultiplier({}),
    ingredients: {},
    production: {
      [Item.Egg]: 1,
    },
  },
  featherHenHouse: {
    name: 'Feather',
    building: BuildingType.HenHouse,
    ...calcSkillMultiplier({}),
    ingredients: {},
    production: {
      [Item.Feather]: 1,
    },
  },
  manurePigsty: {
    name: 'Manure',
    building: BuildingType.Pigsty,
    ...calcSkillMultiplier({
      1: 12.08, // 2 adults, 3 piglets
    }),
    ingredients: {},
    production: {
      [Item.Manure]: 1,
    },
  },
  woodenBowl: {
    name: 'Wooden Bowl',
    building: BuildingType.Workshop,
    ...calcSkillMultiplier({ 2: 2.36 }),
    ingredients: {
      [Item.Log]: 1,
    },
    production: {
      [Item.WoodenBowl]: 5,
    },
  },
  linenFabric: {
    name: 'Linen Fabric',
    building: BuildingType.SewingHut,
    ...calcSkillMultiplier({ 3: 13.22 }),
    ingredients: {
      [Item.LinenThread]: 1,
    },
    production: {
      [Item.LinenFabric]: 1,
    },
  },
  linenThread: {
    name: 'Linen Thread',
    building: BuildingType.SewingHut,
    ...calcSkillMultiplier({ 3: 20.5 }),
    ingredients: {
      [Item.FlaxStalk]: 5,
    },
    production: {
      [Item.LinenThread]: 1,
    },
  },
  bronzeScythe: {
    name: 'Bronze Scythe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.Stick]: 1,
      [Item.BronzeBar]: 2,
      [Item.ToolHammer]: 0,
    },
    production: {
      [Item.BronzeScythe]: 1,
    },
  },
  ironScythe: {
    name: 'Iron Scythe',
    building: BuildingType.Smithy,
    ...calcSkillMultiplier({}),
    ingredients: {
      [Item.Log]: 1,
      [Item.Stick]: 1,
      [Item.IronBar]: 4,
      [Item.ToolHammer]: 0,
    },
    production: {
      [Item.IronScythe]: 1,
    },
  },
};

// adult = 30 food/water?
