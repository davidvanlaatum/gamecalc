import { HTMLAttributes, useEffect, useState } from 'react';
import { getSkillIcon, SkillType } from '@/data/MedievalDynasty';
import Image from '../Image.tsx';

export interface SkillIconProps extends HTMLAttributes<HTMLImageElement> {
  skill?: SkillType;
}

function SkillIcon({ skill, ...extra }: Readonly<SkillIconProps>) {
  const [iconUrl, setIconUrl] = useState<string>();

  useEffect(() => {
    if (skill) {
      getSkillIcon(skill).then(setIconUrl, () => setIconUrl(undefined));
    }
  }, [skill]);

  return <>{skill && <Image src={iconUrl} alt={skill} {...extra} />}</>;
}

export default SkillIcon;
