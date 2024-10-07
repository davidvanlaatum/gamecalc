import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as prettier from 'prettier';
import { Item } from '@/data/MedievalDynasty/items.ts';
import { recipes } from '@/data/MedievalDynasty/recipes.ts';

// Get the directory name in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.normalize(path.join(__dirname, '..', 'src'));

// Function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    const real = await fs.promises.realpath(filePath);
    if (real !== filePath) {
      console.warn('File path case mismatch:', filePath, '->', real);
    }
    return real == filePath;
  } catch {
    return false;
  }
}

async function writeSourceFile(filePath: string, content: string) {
  const prettierConfig = await prettier.resolveConfig(filePath, { editorconfig: true });

  // Format the content using Prettier
  const formattedContent = await prettier.format(content, {
    ...prettierConfig,
    parser: path.extname(filePath) == '.ts' ? 'typescript' : 'json',
  });

  // Read the existing file content
  const existingContent = (await fileExists(filePath)) ? await fs.promises.readFile(filePath, 'utf8') : '';

  // Write the formatted content back to the file only if it has changed
  if (existingContent !== formattedContent) {
    await fs.promises.writeFile(filePath, formattedContent, 'utf8');
    console.log('File written:', path.relative(path.dirname(__dirname), filePath));
  } else {
    console.log('No changes detected, file not written:', path.relative(path.dirname(__dirname), filePath));
  }
}

async function generateIcons() {
  const iconRemaps: Partial<Record<Item, string>> = {
    [Item.WoodenHammer]: 'BuildingHammer',
    [Item.CopperHammer]: 'CopperBuildingHammer',
    [Item.BronzeHammer]: 'BronzeBuildingHammer',
    [Item.IronHammer]: 'IronBuildingHammer',
    [Item.CopperOre]: 'Copper',
    [Item.TinOre]: 'Tin',
    [Item.IronOre]: 'Iron',
    [Item.StoneKnife]: 'StoneSkinningKnife',
    [Item.CopperKnife]: 'CopperSkinningKnive',
    [Item.BronzeKnife]: 'BronzeSkinningKnife',
    [Item.IronKnife]: 'IronSkinningKnife',
    [Item.IronPickaxe]: 'Pickaxe',
    [Item.SimpleBag]: 'SimpleSack',
    [Item.Bag]: 'FeedBag',
    [Item.BeetrootSeed]: 'BeetrootSeeds',
    [Item.CarrotSeed]: 'CarrotSeeds',
    [Item.CabbageSeed]: 'CabbageSeeds',
    [Item.Stone]: 'Rock',
    [Item.BucketOfWater]: 'Bucket',
    [Item.Fertiliser]: 'Fertilizer',
    [Item.FlatBread]: 'Flatbread',
    [Item.FlaxSeed]: 'FlaxGrain',
    [Item.FlaxStalk]: 'Flax',
    [Item.IronScythe]: 'Scythe',
    [Item.LimeStone]: 'Lime',
    [Item.OnionSeed]: 'OnionSeeds',
    [Item.PoppySeed]: 'PoppySeeds',
    [Item.ScrambledEggs]: 'ScrambledEgg',
    [Item.ToolAxe]: 'IronAxe',
    [Item.ToolKnife]: 'IronSkinningKnife',
    [Item.ToolPickaxe]: 'Pickaxe',
    [Item.ToolShovel]: 'IronShovel',
    [Item.ToolSickleOrScythe]: 'Scythe',
    [Item.ToolHoe]: 'IronHoe',
    [Item.ToolHammer]: 'BuildingHammer',
    [Item.ToolBag]: 'SimpleSack',
    [Item.UnripeBerry]: 'RawBerry',
    [Item.BoleteMushroom]: 'BoleteMushroom_v1',
    [Item.FlyAgaricMushroom]: 'FlyAgaricMushroom_v2',
    [Item.FishMeat]: 'Fish',
    [Item.RoastedFishMeat]: 'RoastedFish',
    [Item.DriedFishMeat]: 'DriedFish',
    [Item.SaltedFishMeat]: 'SaltedFish',
    [Item.CopperSpear]: 'CopperPike',
    [Item.FeltHat]: 'Hat_B',
    [Item.FeltVest]: 'TunicVest_A',
    [Item.FlatStrawHat]: 'StrawHatFlat',
    [Item.HatwithLapels]: 'Hat_A',
    [Item.Hop]: 'Hops',
    [Item.Hose]: 'Hose_A',
    [Item.IronCrossbow]: 'Crossbow',
    [Item.IronSpear]: 'IronPike',
    [Item.IronSpikedCudgel]: 'SpikedCudgel',
    [Item.JoinedHose]: 'HoseJoined',
    [Item.LinenShirt]: 'Shirt_B',
    [Item.Mead]: 'MeadBottle',
    [Item.Milk]: 'Bucket',
    [Item.OatRoll]: 'OatRolls',
    [Item.PotionofPossibilities]: 'ClayVial_Reset',
    [Item.Quark]: 'WhiteCheese',
    [Item.QuiltedVest]: 'TunicVest_B',
    [Item.ShortSleeveTunic]: 'TunicShort',
    [Item.SimpleLinenShirt]: 'Shirt_A',
    [Item.SouredMilk]: 'Bucket',
    [Item.StoneSpear]: 'StonePike',
    [Item.ThrowingStone]: 'Rock',
    [Item.Tunic]: 'Tunic_B',
    [Item.WheatRoll]: 'WheatRolls',
    [Item.WoodenSpear]: 'WoodenPike',
    [Item.WoodenVial]: 'WoodenVial_Empty',
    [Item.BronzeShearingScissors]: 'BronzeScissors',
    [Item.IronShearingScissors]: 'ShearingScissors',
    [Item.ToolShearingScissors]: 'ShearingScissors',
    [Item.Coif]: 'Coif_A',
    [Item.Poison]: 'WoodenVial_Poison',
    [Item.PotionofCamouflage]: 'ClayVial_Friendly',
    [Item.PotionofCure]: 'ClayVial_CureOverTime',
    [Item.PotionofHealingI]: 'WoodenVial_Heal1',
    [Item.PotionofHealingII]: 'ClayVial_Heal2',
    [Item.PotionofInstantCure]: 'WoodenVial_Cure',
    [Item.PotionofHealth]: 'ClayVial_HP',
    [Item.PotionofInstantHealingI]: 'WoodenVial_HoT1',
    [Item.PotionofInstantHealingII]: 'ClayVial_HoT2',
    [Item.PotionofNightVision]: 'ClayVial_NightVision',
    [Item.PotionofSatiety]: 'ClayVial_Food',
    [Item.PotionofSaturation]: 'WoodenVial_Water',
    [Item.PotionofSobriety]: 'ClayVial_Alko',
    [Item.PotionofStamina]: 'WoodenVial_Stamina',
    [Item.PotionOfStrength]: 'WoodenVial_Strength',
    [Item.PotionOfTemperature]: 'WoodenVial_Temp',
    [Item.PotionOfWeight]: 'WoodenVial_Weight',
    [Item.RecurveBow]: 'RecursiveBow',
    [Item.ScrambledEggsWithMushroom]: 'ScrambledEggWithMushrooms',
    [Item.SimpleTunic]: 'Tunic_A',
    [Item.CapwithCoif]: 'CapWithCoif',
    [Item.FlatbreadwithOnion]: 'FlatbreadWithOnion',
    [Item.HoneyComb]: 'Honeycomb',
    [Item.PorridgewithBerries]: 'PorridgeWithBerries',
    [Item.PorridgewithApple]: 'PorridgeWithApple',
    [Item.Strawhat]: 'StrawHat',
    [Item.TrousersWithCuffs]: 'TrousersWithCuffs',
    [Item.WaterSkin]: 'Waterskin',
    [Item.WoolyMilkCapMushroom]: 'WoolyMilkcapMushroom',
  };

  const findIconFunctions: ((item: Item, tried: string[]) => Promise<string | null> | string | null)[] = [
    async (item, tried) => {
      const iconName = iconRemaps[item] ?? item.replace(/ /g, '');
      const iconPath = path.join(srcDir, 'assets', 'MedievalDynasty', 'ItemsIcons', `T_Icon_${iconName}.png`);
      if (await fileExists(iconPath)) {
        return iconPath;
      }
      tried.push(iconPath);
      const withs = iconPath.replace('.png', 's.png');
      if (await fileExists(withs)) {
        return withs;
      }
      tried.push(withs);
      return null;
    },
    (item) => {
      if (item.includes('Durability')) {
        return path.join(srcDir, 'assets', 'MedievalDynasty', 'Icon_Durability_White.png');
      }
      return null;
    },
    (item) => {
      if (item.includes('Wine') || item.includes('Juice')) {
        return path.join(srcDir, 'assets', 'MedievalDynasty', 'ItemsIcons', 'T_Icon_WineBottle.png');
      }
      return null;
    },
    (item) => {
      if (item.includes('Beer') || item.includes('Ale')) {
        return path.join(srcDir, 'assets', 'MedievalDynasty', 'ItemsIcons', 'T_Icon_BeerBottle.png');
      }
      return null;
    },
    async (item, tried) => {
      const iconPath = path.join(srcDir, 'assets', 'MedievalDynasty', `T_Icon_${item}.png`);
      if (await fileExists(iconPath)) {
        return iconPath;
      }
      tried.push(iconPath);
      return null;
    },
  ];

  const itemIconMappings = (
    await Promise.all(
      Object.entries(Item)
        .sort(([, a], [, b]) => a.localeCompare(b))
        .map(async ([key, item]) => {
          const tried: string[] = [];
          let iconPath: string | null = null;
          for (const findIcon of findIconFunctions) {
            iconPath = await findIcon(item, tried);
            if (iconPath !== null) {
              break;
            }
          }
          if (!iconPath) {
            throw new Error(`Icon not found for item: ${item} tried:\n${tried.join('\n')}`);
          }
          iconPath = path.relative(path.join(srcDir, 'data', 'MedievalDynasty'), iconPath);
          return `[Item.${key}]: icons['${iconPath}'],`;
        }),
    )
  ).join('\n');
  await writeSourceFile(
    path.join(srcDir, 'data', 'MedievalDynasty', 'icons.ts'),
    `
import { Item } from './items';

export const icons: Record<string, string> = import.meta.glob('../../assets/MedievalDynasty/**/*.png', {
  import: 'default',
  eager: true,
});
export const itemIcons: Record<Item, string> = {
${itemIconMappings}
};
`,
  );
}

async function generateRecipes() {
  await writeSourceFile(
    path.join(srcDir, 'data', 'MedievalDynasty', 'recipes-generated.ts'),
    `export enum Recipe {
  ${Object.keys(recipes)
    .map((recipe) => `${recipe.charAt(0).toUpperCase() + recipe.slice(1)} = '${recipe}',`)
    .join('\n')}
    };`,
  );
}

async function setVersion() {
  const version = {
    commit: process.env.GITHUB_SHA ?? 'dev',
    version: process.env.npm_package_version ?? 'dev',
  };
  console.log(`version is ${version.version}-${version.commit}`);
  await writeSourceFile(
    path.join(srcDir, 'version.ts'),
    `
  export interface AppVersion {
    commit: string;
    version: string;
  }
  export const version: AppVersion = ${JSON.stringify(version)};`,
  );
  await writeSourceFile(path.join(__dirname, '..', 'public', 'version.json'), JSON.stringify(version));
}

await Promise.all([generateIcons(), generateRecipes(), setVersion()]);
