import { ImageProps } from 'react-bootstrap';
import { FC, useEffect } from 'react';
import Image from '@/controls/Image.tsx';
import { getRoman } from '@/data/MedievalDynasty';

export interface RomanNumberIconProps extends Omit<ImageProps, 'src'> {
  value: number;
}

const RomanNumberIcon: FC<RomanNumberIconProps> = ({ value, ...props }) => {
  useEffect(() => {
    if (value < 1 || (value > 3 && value != 6)) {
      throw new Error('Invalid Roman number: ' + value);
    }
  }, [value]);
  return <Image src={getRoman(value)} {...props} />;
};

export default RomanNumberIcon;
