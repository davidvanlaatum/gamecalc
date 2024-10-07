import { FC, ReactNode, useEffect } from 'react';
import { DevelopmentStage, HouseCalculator, HouseData } from '@/data/MedievalDynasty';
import { Form, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import BuildingTax from '@/controls/MedievalDynasty/BuildingTax.tsx';

export interface BuildingHouseProps {
  data: HouseData;
  onUpdate: (updatedBuilding: HouseData) => void;
  taxPercent: number;
  daysPerSeason: number;
  developmentStage: DevelopmentStage;
  setTitleContent: (content: ReactNode) => void;
}

const BuildingHouse: FC<BuildingHouseProps> = ({
  data,
  onUpdate,
  taxPercent,
  daysPerSeason,
  developmentStage,
  setTitleContent,
}) => {
  const calc = new HouseCalculator(data, taxPercent, daysPerSeason);

  useEffect(() => {
    setTitleContent(
      <>
        {calc.count > 1 ? ` x ${calc.count} ` : ''}
        <BuildingTax tax={calc.tax} developmentStage={developmentStage} />
      </>,
    );
  }, [calc.count, calc.tax, developmentStage, setTitleContent]);

  return (
    <InputGroup>
      <InputGroupText>Count</InputGroupText>
      <Form.Control
        type="number"
        value={data.count}
        min={1}
        onChange={(ev) => onUpdate({ ...data, count: parseInt(ev.target.value) })}
      />
    </InputGroup>
  );
};

export default BuildingHouse;
