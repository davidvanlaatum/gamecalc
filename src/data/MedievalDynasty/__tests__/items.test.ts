import { describe, expect, test } from 'vitest';
import { getItemIcon, Item, ItemCategory, itemProperties } from '../index.ts';
import ts from 'typescript';
import { promises as fs } from 'fs';

async function getItemPropertiesLineNumbers(filePath: string) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const lineNumbers: Record<string, number> = {};
  let last = 0;

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach((declaration) => {
        if (ts.isVariableDeclaration(declaration) && declaration.name.getText() === 'itemProperties') {
          if (declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
            declaration.initializer.properties.forEach((property) => {
              if (ts.isPropertyAssignment(property) && ts.isComputedPropertyName(property.name)) {
                const itemName = property.name.expression.getText().slice(5);
                const { line } = sourceFile.getLineAndCharacterOfPosition(property.getStart());
                lineNumbers[itemName] = line + 1; // +1 to convert 0-based to 1-based line number
                last = line + 1;
              }
            });
          }
        }
      });
    }
  });
  lineNumbers['end'] = last;

  return lineNumbers;
}

describe('items', async () => {
  const lineNumbers = await getItemPropertiesLineNumbers('src/data/MedievalDynasty/items.ts');

  function getLineNumber(item: string) {
    const line = lineNumbers[item] ?? lineNumbers['end'];
    return line ? item + '\nsrc/data/MedievalDynasty/items.ts:' + line : undefined;
  }

  Object.entries(Item).forEach(([key, value]) => {
    if (itemProperties[value]?.synthetic !== true) {
      test(`Item ${key} has properties`, () => {
        expect(itemProperties[value], getLineNumber(key)).toBeDefined();
      });
      if (itemProperties[value] !== undefined) {
        test(`Item ${key} has weight`, () => {
          expect(itemProperties[value], getLineNumber(key)).toHaveProperty('weight', expect.any(Number));
        });
        if (value !== Item.Coin) {
          test(`Item ${key} has price`, () => {
            expect(itemProperties[value], getLineNumber(key)).toHaveProperty('basePrice', expect.any(Number));
          });
        }
        test(`Item ${key} has type`, () => {
          const expectedType = itemProperties[value]?.provides?.some((provides) => provides.item == Item.Food)
            ? ItemCategory.Food
            : (expect.any(String) as string);
          expect(itemProperties[value], getLineNumber(key)).toHaveProperty('type', expectedType);
        });
        if (itemProperties[value]?.type == ItemCategory.Food) {
          test(`Item ${key} should provide food or water`, () => {
            expect(
              itemProperties[value]?.provides?.find((provides) => [Item.Food, Item.Water].includes(provides.item)),
              getLineNumber(value),
            ).not.toBeFalsy();
          });
        }
        itemProperties[value]?.provides?.forEach((provides) => {
          test(`Item ${key} provides ${provides.item}`, () => {
            if (provides.amount > 0) {
              expect(provides.priority, 'priority' + getLineNumber(key)).toBeGreaterThan(0);
            }
            expect(provides.amount, 'amount' + getLineNumber(key)).not.toEqual(0);
          });
          if (provides.item == Item.Food && value !== Item.Rot) {
            test(`Item ${key} is food so should rot`, () => {
              expect(itemProperties[value]).toHaveProperty('rots');
            });
          }
        });
      }
    }
  });
});

describe('getItemIcon', () => {
  test('returns the correct icon for Log', () => {
    expect(getItemIcon(Item.Log)).toEqual('/src/assets/MedievalDynasty/ItemsIcons/T_Icon_Log.png');
  });
  Object.entries(Item).forEach(([key, value]) => {
    test(`returns the correct icon for ${key}`, () => {
      expect(getItemIcon(value)).toContain('/src/assets/MedievalDynasty');
    });
  });
});
