import { Item } from '@/data/MedievalDynasty/items.ts';
import { icons, itemIcons } from '@/data/MedievalDynasty/icons.ts';
import { BuildingType, SkillType } from '@/data/MedievalDynasty/buildings.ts';

// const { itemIcons } = await import('./icons.ts');

export async function getItemIcon(item: Item) {
  const icon = itemIcons[item];
  if (typeof icon === 'string') {
    return icon;
  } else if (typeof icon === 'function') {
    console.log('loading', item);
    return icon().then((icon) => {
      itemIcons[item] = icon;
      return icon;
    });
  } else {
    console.log(item, icon);
  }
}

const skillIcons: Record<SkillType, (() => Promise<string>) | string> = {
  [SkillType.Extraction]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Extraction.png'],
  [SkillType.Hunting]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Hunting.png'],
  [SkillType.Farming]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Farming.png'],
  [SkillType.Diplomacy]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Diplomacy.png'],
  [SkillType.Survival]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Survival.png'],
  [SkillType.Production]: icons['../../assets/MedievalDynasty/Skills/Skills_Icon_Crafting.png'],
};

export async function getSkillIcon(skill: SkillType) {
  const icon = skillIcons[skill];
  if (typeof icon === 'string') {
    return icon;
  }
  return icon().then((icon) => {
    skillIcons[skill] = icon;
    return icon;
  });
}

const buildingIcons: Record<BuildingType, (() => Promise<string>) | string> = {
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
};

export async function getBuildingIcon(building: BuildingType) {
  const icon = buildingIcons[building];
  if (typeof icon === 'string') {
    return icon;
  }
  return icon().then((icon) => {
    buildingIcons[building] = icon;
    return icon;
  });
}
