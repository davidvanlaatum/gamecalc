import { FC, ReactNode, useEffect } from 'react';
import { Item, StorageBuildingCalculator, StorageBuildingData } from '@/data/MedievalDynasty';
import ItemIcon from '@/controls/MedievalDynasty/ItemIcon.tsx';

interface BuildingStorageProps {
  data: StorageBuildingData;
  onUpdate: (updatedBuilding: StorageBuildingData) => void;
  taxPercent: number;
  daysPerSeason: number;
  setTitleContent: (content: ReactNode) => void;
}

const BuildingStorage: FC<BuildingStorageProps> = ({ data, taxPercent, daysPerSeason, setTitleContent }) => {
  const calc = new StorageBuildingCalculator(data, taxPercent, daysPerSeason);
  useEffect(() => {
    setTitleContent(
      <span className="ps-2">
        {calc.tax} <ItemIcon item={Item.Coin} className="suffix-icon" />
      </span>,
    );
  }, [calc.tax, setTitleContent]);

  return <></>;
};

export default BuildingStorage;
