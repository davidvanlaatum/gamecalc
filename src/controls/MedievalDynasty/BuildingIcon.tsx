import { BuildingType, getBuildingIcon } from '@/data/MedievalDynasty';
import Image, { ImageProps } from '../Image.tsx';
import RomanNumberIcon from '@/controls/MedievalDynasty/RomanNumberIcon.tsx';

export interface ItemIconProps extends Omit<ImageProps, 'src'> {
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

  return (
    <span title={building + (level ? ' ' + toRoman(level) : '')}>
      <Image
        className={[className, 'zoom-icon-3x'].filter((x) => x).join(' ')}
        src={getBuildingIcon(building)}
        {...extra}
      />
      {level && level > 0 && (
        <RomanNumberIcon className={[className, 'zoom-icon-1-5x'].filter((x) => x).join(' ')} value={level} />
      )}
    </span>
  );
}

export default BuildingIcon;
