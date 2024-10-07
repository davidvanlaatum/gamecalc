import { getItemIcon, Item } from '@/data/MedievalDynasty';
import Image, { ImageProps } from '../Image.tsx';

export interface ItemIconProps extends Omit<ImageProps, 'src'> {
  item: Item;
}

function ItemIcon({ item, className, ...extra }: Readonly<ItemIconProps>) {
  const zoom = item == Item.Food || item == Item.Water || item == Item.Wood;

  return (
    <Image
      className={[className, zoom ? 'zoom-icon-2x' : className ? 'zoom-icon-1-5x' : undefined]
        .filter((x) => x)
        .join(' ')}
      src={getItemIcon(item)}
      {...extra}
    />
  );
}

export default ItemIcon;
