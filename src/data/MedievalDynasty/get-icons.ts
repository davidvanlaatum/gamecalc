import { Item } from '@/data/MedievalDynasty/items.ts';
import { icons, itemIcons } from '@/data/MedievalDynasty/icons.ts';
import { BuildingType, SkillType } from '@/data/MedievalDynasty/buildings.ts';

export function getItemIcon(item: Item) {
  return itemIcons[item];
}

const skillIcons: Record<SkillType, string> = {
  [SkillType.Extraction]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Extraction.png'],
  [SkillType.Hunting]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Hunting.png'],
  [SkillType.Farming]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Farming.png'],
  [SkillType.Diplomacy]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Diplomacy.png'],
  [SkillType.Survival]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Survival.png'],
  [SkillType.Production]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Crafting.png'],
};

export function getSkillIcon(skill: SkillType) {
  return skillIcons[skill];
}

const buildingIcons: Record<BuildingType, string> = {
  [BuildingType.SimpleSmallHouse]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_SimpleSmallHouse.png'],
  [BuildingType.SimpleHouse]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_SimpleHouse.png'],
  [BuildingType.House]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_House.png'],
  [BuildingType.Well]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Well.png'],
  [BuildingType.Woodshed]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Woodshed.png'],
  [BuildingType.ExcavationShed]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_ExcavationShed.png'],
  [BuildingType.Mine]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Mine.png'],
  [BuildingType.HuntingLodge]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_HuntingLodge.png'],
  [BuildingType.HerbalistsHut]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_HerbalistsHut.png'],
  [BuildingType.FishingHut]: icons['../../assets/MedievalDynasty/Buildings/T_Icons_FishingHut.png'],
  [BuildingType.Barn]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Barn.png'],
  [BuildingType.Workshop]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Workshop.png'],
  [BuildingType.Smithy]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Smithy.png'],
  [BuildingType.FarmShed]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_FarmShed.png'],
  [BuildingType.Kitchen]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Kitchen.png'],
  [BuildingType.SewingHut]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_SewingHut.png'],
  [BuildingType.HenHouse]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Henhouse.png'],
  [BuildingType.Pigsty]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Pigsty.png'],
  [BuildingType.MarketStall]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_MarketStall_Unassigned.png'],
  [BuildingType.Tavern]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Tavern.png'],
  [BuildingType.FoodStorage]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_FoodStorage.png'],
  [BuildingType.DonkeyShelter]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_DonkeyShelter.png'],
  [BuildingType.GooseHouse]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_GooseHouse.png'],
  [BuildingType.Stable]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Stable.png'],
  [BuildingType.Fold]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Fold.png'],
  [BuildingType.Cowshed]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Cowshed.png'],
  [BuildingType.Apiary]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Apiary.png'],
  [BuildingType.Windmill]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_Windmill.png'],
  [BuildingType.ResourceStorage]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_ResourceStorage.png'],
  [BuildingType.BuildersHut]: icons['../../assets/MedievalDynasty/Buildings/T_Icon_BuildersHut.png'],
  [BuildingType.Field]: icons['../../assets/MedievalDynasty/Buildings/Wheel_Icon_Field.png'],
  [BuildingType.Orchard]: icons['../../assets/MedievalDynasty/Buildings/Wheel_Icon_Orchard.png'],
};

export function getBuildingIcon(building: BuildingType) {
  return buildingIcons[building];
}

export function getRoman(roman: number) {
  return icons[`../../assets/MedievalDynasty/Roman_${roman}.png`];
}
