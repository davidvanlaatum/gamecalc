import { FC, ReactNode, useEffect } from 'react';
import { HouseCalculator, HouseData, Item } from '../../data/MedievalDynasty';
import { Form, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import ItemIcon from './ItemIcon.tsx';

export interface BuildingHouseProps {
  data: HouseData;
  onUpdate: (updatedBuilding: HouseData) => void;
  taxPercent: number;
  setTitleContent: (content: ReactNode) => void;
}

const BuildingHouse: FC<BuildingHouseProps> = ({ data, onUpdate, taxPercent, setTitleContent }) => {
  const calc = new HouseCalculator(data, taxPercent);

  useEffect(() => {
    setTitleContent(
      <>
        {calc.count > 1 ? ` x ${calc.count} ` : ''}
        <span className="ps-2">
          {calc.tax} <ItemIcon item={Item.Coin} className="suffix-icon" />
        </span>
      </>,
    );
  }, [calc.tax, setTitleContent]);

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
