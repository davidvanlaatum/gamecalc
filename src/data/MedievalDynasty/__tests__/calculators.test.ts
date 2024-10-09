import { describe, expect, it, test } from 'vitest';
import {
  BuildingType,
  DevelopmentStage,
  Item,
  itemProperties,
  ItemUsage,
  ItemUsageCalculator,
  MedievalDynastyCalculator,
} from '../index.ts';
import '../../../__tests__/matchers';
import '../../../__tests__/matchers.d';

describe('MedievalDynastyCalculator', () => {
  test('calculates', () => {
    const calc = new MedievalDynastyCalculator({
      requiredFood: 10,
      requiredWater: 10,
      requiredWood: 10,
      daysPerSeason: 3,
      inspiringSpeech: 0,
      developmentStage: DevelopmentStage.Hermitage,
      buildings: [
        {
          id: '1',
          type: BuildingType.Well,
          totalSkill: 1,
          production: {
            bucketOfWater: 10,
          },
        },
      ],
    });

    expect(calc).toHaveNoErrors();
    expect(calc.itemUsage().sort((a, b) => a.item.localeCompare(b.item))).toEqual(
      expect.arrayContaining(
        [
          {
            item: Item.Bucket,
            log: [
              { log: 'Bucket of Water (Well)', amount: -0.13475, count: 1 },
              { log: 'Byproduct of Bucket of Water -> Water', amount: expect.closeTo(0.045) as number, count: 1 },
            ],
            produced: expect.closeTo(0.045) as number,
            consumed: 0.13475,
            net: -0.08975,
          },
          {
            item: Item.BucketOfWater,
            log: [
              { log: 'Bucket of Water (Well)', amount: 0.13475, count: 1 },
              { log: 'Provided to Water', amount: -0.05, count: 1 },
            ],
            produced: 0.13475,
            consumed: 0.05,
            net: 0.08475,
          },
          {
            item: Item.Food,
            consumed: 10,
            produced: 0,
            net: -10,
            log: [{ log: 'Required Food', amount: -10, count: 1 }],
          },
          {
            item: Item.Water,
            consumed: 10,
            produced: 10,
            net: 0,
            log: [
              { log: 'Required Water', amount: -10, count: 1 },
              { log: 'Provided by Bucket of Water', amount: 10, count: 1 },
            ],
          },
          {
            item: Item.Wood,
            consumed: 11.25,
            produced: 0,
            net: -11.25,
            log: [{ log: 'Required Wood', amount: -11.25, count: 1 }],
          },
        ].sort((a, b) => a.item.localeCompare(b.item)) as ItemUsage[],
      ),
    );
  });
});

describe('ItemUsageCalculator', () => {
  it('calculates production and consumption', () => {
    const usage = new ItemUsageCalculator();
    expect(usage.toArray()).toEqual([]);
    usage.addProduction(Item.Water, 10, 'Well');
    expect(usage.toArray()).toEqual([
      {
        item: Item.Water,
        produced: 10,
        consumed: 0,
        net: 10,
        log: [{ log: 'Well', amount: 10, count: 1 }],
      },
    ]);
    usage.addConsumption(Item.Water, 5, 'Bucket');
    usage.addConsumption(Item.Water, 5, 'Bucket');
    expect(usage.toArray()).toEqual([
      {
        item: Item.Water,
        produced: 10,
        consumed: 10,
        net: 0,
        log: [
          { log: 'Well', amount: 10, count: 1 },
          { log: 'Bucket', amount: -10, count: 2 },
        ],
      },
    ]);
  });

  it('resolves provides', () => {
    const n = itemProperties[Item.BucketOfWater]!.provides!.find((x) => x.item === Item.Water)!.amount;
    const usage = new ItemUsageCalculator();
    usage.addConsumption(Item.Water, n, 'required');
    usage.addProduction(Item.BucketOfWater, 0.5, 'Well');
    usage.resolveProvides(() => true);
    expect(usage.toArray()).toEqual([
      {
        consumed: 0,
        item: 'Bucket',
        log: [{ log: 'Byproduct of Bucket of Water -> Water', amount: 0.45, count: 1 }],
        net: 0.45,
        produced: 0.45,
      },
      {
        consumed: 0.5,
        item: 'Bucket of Water',
        log: [
          { log: 'Well', amount: 0.5, count: 1 },
          { log: 'Provided to Water', amount: -0.5, count: 1 },
        ],
        net: 0,
        produced: 0.5,
      },
      {
        item: Item.Water,
        produced: n / 2,
        consumed: n,
        net: -n / 2,
        log: [
          { log: 'required', amount: -n, count: 1 },
          { log: 'Provided by Bucket of Water', amount: n / 2, count: 1 },
        ],
      },
    ]);
  });
});
