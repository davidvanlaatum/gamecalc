import { FC } from 'react';
import { ItemEffect, ItemEffectType } from '@/data/MedievalDynasty';
import { formatDuration } from '@/utils.ts';

export interface ItemEffectProps {
  effect: ItemEffect;
}

const ItemEffectControl: FC<ItemEffectProps> = ({ effect }) => {
  switch (effect.type) {
    case ItemEffectType.HealthPerSecond:
      return (
        <>
          {(effect.value ?? 0) > 0 ? '+' : ''}
          {effect.value}/s Health for {formatDuration(effect.duration)}
        </>
      );
    case ItemEffectType.LessStaminaConsumption:
      return (
        <>
          {effect.value}% {effect.type} for {formatDuration(effect.duration)}
        </>
      );
    case ItemEffectType.MoreDamage:
      return (
        <>
          {effect.value}% more Damage for {formatDuration(effect.duration)}
        </>
      );
    case ItemEffectType.Poisoning:
      return <>{effect.value}% poisoning</>;
    default:
      return (
        <>
          {effect.value} {effect.type} {formatDuration(effect.duration)}
        </>
      );
  }
};

export default ItemEffectControl;
