import { FC } from 'react';
import { ItemEffect, ItemEffectType } from '@/data/MedievalDynasty';
import { formatDuration } from '@/utils.ts';

export interface ItemEffectProps {
  effect: ItemEffect;
}

const ItemEffectControl: FC<ItemEffectProps> = ({ effect }) => {
  function duration(value: number | undefined): string {
    return value === undefined ? '' : ' for ' + formatDuration(value);
  }
  function value(value: number | undefined, suffix?: string): string | undefined {
    if (value !== undefined) {
      return `${(value ?? 0) > 0 ? '+' : ''}${value}${suffix ?? ''}`;
    }
  }
  switch (effect.type) {
    case ItemEffectType.HealthPerSecond: // per second
      return (
        <>
          {value(effect.value, '/s')} {effect.type.replace(' Per Second', '')} {duration(effect.duration)}
        </>
      );
    case ItemEffectType.LessStaminaConsumption:
    case ItemEffectType.LessWaterConsumption:
    case ItemEffectType.LessFoodConsumption:
    case ItemEffectType.MoreDamage:
    case ItemEffectType.Poisoning:
    case ItemEffectType.Alcohol:
      return (
        <>
          {value(effect.value, '%')} {effect.type} {duration(effect.duration)}
        </>
      );
    case ItemEffectType.Health:
    case ItemEffectType.TemperatureTolerance:
      return (
        <>
          {value(effect.value)} {effect.type} {duration(effect.duration)}
        </>
      );
    case ItemEffectType.WeightLimit:
      return (
        <>
          {value(effect.value, 'Kg')} {effect.type} {duration(effect.duration)}
        </>
      );
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unknown effect type: ${effect.type}`);
  }
};

export default ItemEffectControl;
