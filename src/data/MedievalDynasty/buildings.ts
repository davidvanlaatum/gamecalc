export enum BuildingType {
  SimpleSmallHouse = 'Simple Small House',
  SimpleHouse = 'Simple House',
  House = 'House',
  Well = 'Well',
  Woodshed = 'Woodshed',
  ExcavationShed = 'Excavation Shed',
  Mine = 'Mine',
  HuntingLodge = 'Hunting Lodge',
  HerbalistsHut = "Herbalist's Hut",
  FishingHut = 'Fishing Hut',
  Barn = 'Barn',
  Workshop = 'Workshop',
  Smithy = 'Smithy',
  FarmShed = 'Farm Shed',
  Kitchen = 'Kitchen',
  SewingHut = 'Sewing Hut',
  HenHouse = 'Hen House',
  Pigsty = 'Pigsty',
  MarketStall = 'Market Stall',
  Tavern = 'Tavern',
  FoodStorage = 'Food Storage',
  DonkeyShelter = 'Donkey Shelter',
  GooseHouse = 'Goose House',
  Stable = 'Stable',
  Fold = 'Fold',
  Cowshed = 'Cowshed',
  Apiary = 'Apiary',
  Windmill = 'Windmill',
  ResourceStorage = 'ResourceStorage',
  BuildersHut = 'BuildersHut',
  Field = 'Field',
  Orchard = 'Orchard',
}

export enum SkillType {
  Extraction = 'Extraction',
  Hunting = 'Hunting',
  Farming = 'Farming',
  Diplomacy = 'Diplomacy',
  Survival = 'Survival',
  Production = 'Production',
}

export enum DevelopmentStage {
  Traveler = 'Traveler',
  Hermitage = 'Hermitage',
  Camp = 'Camp',
  SmallFarm = 'Small Farm',
  Farm = 'Farm',
  Hamlet = 'Hamlet',
  Settlement = 'Settlement',
  Village = 'Village',
  Town = 'Town',
  City = 'City',
}

export interface DevelopmentStageProps {
  taxMultiplier: number;
  buildingLimit: number;
}

export const developmentStageProps: Record<DevelopmentStage, DevelopmentStageProps> = {
  [DevelopmentStage.Traveler]: { taxMultiplier: 0, buildingLimit: 0 },
  [DevelopmentStage.Hermitage]: { taxMultiplier: 0.1, buildingLimit: 1 },
  [DevelopmentStage.Camp]: { taxMultiplier: 0.25, buildingLimit: 5 },
  [DevelopmentStage.SmallFarm]: { taxMultiplier: 0.5, buildingLimit: 10 },
  [DevelopmentStage.Farm]: { taxMultiplier: 0.75, buildingLimit: 20 },
  [DevelopmentStage.Hamlet]: { taxMultiplier: 1, buildingLimit: 30 },
  [DevelopmentStage.Settlement]: { taxMultiplier: 1.25, buildingLimit: 40 },
  [DevelopmentStage.Village]: { taxMultiplier: 1.5, buildingLimit: 50 },
  [DevelopmentStage.Town]: { taxMultiplier: 1.75, buildingLimit: 60 },
  [DevelopmentStage.City]: { taxMultiplier: 2, buildingLimit: 70 },
};

export interface BuildingProps {
  skill?: SkillType;
  tax?: number[];
}

export const buildingProps: Record<BuildingType, BuildingProps> = {
  [BuildingType.SimpleSmallHouse]: { tax: [5] },
  [BuildingType.SimpleHouse]: { tax: [10] },
  [BuildingType.House]: {},
  [BuildingType.Well]: { skill: SkillType.Extraction, tax: [10] },
  [BuildingType.Woodshed]: { skill: SkillType.Extraction, tax: [10, 20] },
  [BuildingType.ExcavationShed]: { skill: SkillType.Extraction, tax: [30] },
  [BuildingType.Mine]: { skill: SkillType.Extraction, tax: [90] },
  [BuildingType.HuntingLodge]: { skill: SkillType.Hunting, tax: [15, 30] },
  [BuildingType.HerbalistsHut]: { skill: SkillType.Survival, tax: [10, 20] },
  [BuildingType.FishingHut]: { skill: SkillType.Survival, tax: [10, 20] },
  [BuildingType.Barn]: { skill: SkillType.Farming, tax: [30] },
  [BuildingType.Workshop]: { skill: SkillType.Production, tax: [20, 40, 60] },
  [BuildingType.Smithy]: { skill: SkillType.Production, tax: [30] },
  [BuildingType.FarmShed]: { skill: SkillType.Farming, tax: [30] },
  [BuildingType.Kitchen]: { skill: SkillType.Production, tax: [20] },
  [BuildingType.SewingHut]: { skill: SkillType.Production, tax: [30] },
  [BuildingType.HenHouse]: { skill: SkillType.Farming, tax: [10] },
  [BuildingType.Pigsty]: { skill: SkillType.Farming, tax: [20] },
  [BuildingType.MarketStall]: { skill: SkillType.Diplomacy },
  [BuildingType.Tavern]: {},
  [BuildingType.FoodStorage]: { tax: [1, 2, 3] },
  [BuildingType.DonkeyShelter]: { skill: SkillType.Farming },
  [BuildingType.GooseHouse]: { skill: SkillType.Farming },
  [BuildingType.Stable]: { skill: SkillType.Farming },
  [BuildingType.Fold]: { skill: SkillType.Farming },
  [BuildingType.Cowshed]: { skill: SkillType.Farming },
  [BuildingType.Apiary]: { skill: SkillType.Farming },
  [BuildingType.Windmill]: {},
  [BuildingType.ResourceStorage]: { tax: [1, 2, 3] },
  [BuildingType.BuildersHut]: {},
  [BuildingType.Field]: { skill: SkillType.Farming, tax: [0.2] },
  [BuildingType.Orchard]: { skill: SkillType.Farming, tax: [0.8] },
};
