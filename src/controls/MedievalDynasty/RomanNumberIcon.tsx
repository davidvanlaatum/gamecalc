import { ImageProps } from 'react-bootstrap';
import { FC } from 'react';
import Image from '@/controls/Image.tsx';
import { getRoman } from '@/data/MedievalDynasty';

export interface RomanNumberIconProps extends Omit<ImageProps, 'src'> {
  value: number;
}

const RomanNumberIcon: FC<RomanNumberIconProps> = ({ value, ...props }) => {
  return <Image src={getRoman(value)} {...props} />;
};

export default RomanNumberIcon;
