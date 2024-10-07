import { FC, ReactNode, useEffect } from 'react';
import { DevelopmentStage, StorageBuildingCalculator, StorageBuildingData } from '@/data/MedievalDynasty';
import BuildingTax from '@/controls/MedievalDynasty/BuildingTax.tsx';

interface BuildingStorageProps {
  data: StorageBuildingData;
  taxPercent: number;
  daysPerSeason: number;
  developmentStage: DevelopmentStage;
  setTitleContent: (content: ReactNode) => void;
}

const BuildingStorage: FC<BuildingStorageProps> = ({
  data,
  taxPercent,
  daysPerSeason,
  developmentStage,
  setTitleContent,
}) => {
  const calc = new StorageBuildingCalculator(data, taxPercent, daysPerSeason);
  useEffect(() => {
    setTitleContent(<BuildingTax tax={calc.tax} developmentStage={developmentStage} />);
  }, [calc.tax, developmentStage, setTitleContent]);

  return <></>;
};

export default BuildingStorage;
