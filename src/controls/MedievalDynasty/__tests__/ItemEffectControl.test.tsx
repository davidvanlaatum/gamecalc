import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemEffectControl from '@/controls/MedievalDynasty/ItemEffectControl.tsx';
import { ItemEffect, ItemEffectType, itemProperties } from '@/data/MedievalDynasty';

describe('ItemEffectControl', () => {
  const data: [ItemEffect, string][] = [
    [{ type: ItemEffectType.HealthPerSecond, value: 10, duration: 5 }, '+10/s Health for 5s'],
    [{ type: ItemEffectType.LessStaminaConsumption, value: 10, duration: 5 }, '+10% Less Stamina Consumption for 5s'],
    [{ type: ItemEffectType.MoreDamage, value: 10, duration: 5 }, '+10% More Damage for 5s'],
    [{ type: ItemEffectType.Poisoning, value: 10, duration: 5 }, '+10% Poisoning for 5s'],
    [{ type: ItemEffectType.Health, value: 10, duration: 5 }, '+10 Health for 5s'],
    [{ type: ItemEffectType.TemperatureTolerance, value: 10, duration: 5 }, '+10 Temperature Tolerance for 5s'],
    [{ type: ItemEffectType.LessWaterConsumption, value: 10, duration: 5 }, '+10% Less Water Consumption for 5s'],
    [{ type: ItemEffectType.LessFoodConsumption, value: 10, duration: 5 }, '+10% Less Food Consumption for 5s'],
    [{ type: ItemEffectType.WeightLimit, value: 10, duration: 5 }, '+10Kg Weight Limit for 5s'],
    [{ type: ItemEffectType.Alcohol, value: 10, duration: 5 }, '+10% Alcohol for 5s'],
  ];

  data.forEach(([effect, expected]) => {
    describe(effect.type, () => {
      describe(expected, () => {
        it(`should render`, () => {
          const { baseElement } = render(<ItemEffectControl effect={effect} />);
          expect(baseElement).toHaveTextContent(expected);
        });
      });
    });
  });

  describe('Health', () => {
    it(`should render without duration`, () => {
      const { baseElement } = render(<ItemEffectControl effect={{ type: ItemEffectType.Health, value: 10 }} />);
      expect(baseElement).toHaveTextContent('+10 Health');
    });
  });

  Object.values(ItemEffectType).forEach((type) => {
    describe(type, () => {
      it(`should have a test`, () => {
        expect(data.filter(([effect]) => effect.type === type)).not.toHaveLength(0);
      });
      it('should have a least one item with the effect', () => {
        expect(
          Object.values(itemProperties).filter((v) => (v.effects?.filter((e) => e.type === type) ?? []).length > 0),
        ).not.toHaveLength(0);
      });
    });
  });
});
