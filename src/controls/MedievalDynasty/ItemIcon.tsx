import { HTMLAttributes, useEffect, useState } from 'react';
import { getItemIcon, Item } from '../../data/MedievalDynasty';
import Image from '../Image.tsx';

export interface ItemIconProps extends HTMLAttributes<HTMLImageElement> {
  item: Item;
}

function ItemIcon({ item, className, ...extra }: Readonly<ItemIconProps>) {
  const [iconUrl, setIconUrl] = useState<string>();
  const zoom = item == Item.Food || item == Item.Water || item == Item.Wood;

  useEffect(() => {
    getItemIcon(item).then(setIconUrl);
  }, [item]);

  return (
    <Image
      className={[className, zoom ? 'zoom-icon-2x' : className ? 'zoom-icon-1-5x' : undefined]
        .filter((x) => x)
        .join(' ')}
      src={iconUrl}
      {...extra}
    />
  );
}

export default ItemIcon;
