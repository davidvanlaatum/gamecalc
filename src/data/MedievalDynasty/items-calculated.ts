import { Item, itemProperties } from '@/data/MedievalDynasty/items.ts';
import { RecipeData, RecipeId, recipes } from '@/data/MedievalDynasty/recipes.ts';
import { BuildingType } from '@/data/MedievalDynasty/buildings.ts';

export interface ItemCalculatedProperties {
  producedInRecipes: Partial<Record<RecipeId, RecipeData>>;
  producedInBuildings: BuildingType[];
  usedInRecipes: Partial<Record<RecipeId, RecipeData>>;
  usedInBuildings: BuildingType[];
}

export const itemCalculatedProperties: Record<Item, ItemCalculatedProperties> = Object.fromEntries(
  Object.values(Item).map((item) => {
    const { provides } = itemProperties[item] ?? {};
    const producedInRecipes = Object.fromEntries(
      Object.entries(recipes).filter(([, recipe]) => recipe.production[item]),
    );
    const producedInBuildings = [...new Set(Object.values(producedInRecipes).map((v) => v.building))];
    const usedInRecipes = Object.fromEntries(
      Object.entries(recipes).filter(
        ([, recipe]) => recipe.ingredients[item] ?? provides?.some((p) => recipe.ingredients[p.item]),
      ),
    );
    const usedInBuildings = [...new Set(Object.values(usedInRecipes).map((v) => v.building))];
    return [item, { producedInRecipes, producedInBuildings, usedInRecipes, usedInBuildings }];
  }),
) as unknown as Record<Item, ItemCalculatedProperties>;
