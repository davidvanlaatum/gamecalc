import { HTMLAttributes, useEffect, useState } from 'react';
import { BuildingType, getBuildingIcon } from '../../data/MedievalDynasty';
import Image from '../Image.tsx';

export interface ItemIconProps extends HTMLAttributes<HTMLImageElement> {
  building: BuildingType;
  level?: number;
}

function BuildingIcon({ building, level, className, ...extra }: Readonly<ItemIconProps>) {
  function toRoman(num: number) {
    if (num < 1 || num > 10) {
      throw new Error('Invalid Roman number: ' + num);
    }
    return 'I'.repeat(num);
  }

  const [iconUrl, setIconUrl] = useState<string>();
  useEffect(() => {
    getBuildingIcon(building).then(setIconUrl);
  }, [building]);
  return (
    <span title={building + (level ? ' ' + toRoman(level) : '')}>
      <Image className={[className, 'zoom-icon-3x'].filter((x) => x).join(' ')} src={iconUrl} {...extra} />
      {level && level > 0 && (
        <Image
          className={[className, 'zoom-icon-1-5x'].filter((x) => x).join(' ')}
          src={`src/assets/MedievalDynasty/Roman_${level}.png`}
        />
      )}
    </span>
  );
}

export default BuildingIcon;
