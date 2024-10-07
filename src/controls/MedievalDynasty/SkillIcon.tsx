import { getSkillIcon, SkillType } from '@/data/MedievalDynasty';
import Image, { ImageProps } from '../Image.tsx';

export interface SkillIconProps extends Omit<ImageProps, 'src'> {
  skill?: SkillType;
}

function SkillIcon({ skill, ...extra }: Readonly<SkillIconProps>) {
  return <>{skill && <Image src={getSkillIcon(skill)} alt={skill} {...extra} />}</>;
}

export default SkillIcon;
