import { FC } from 'react';
import Col from 'react-bootstrap/Col';
import { CloseButton, Form, InputGroup, Row } from 'react-bootstrap';
import ItemIcon from './ItemIcon.tsx';
import { Item } from '@/data/MedievalDynasty';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { v4 as uuid } from 'uuid';

interface MarketStallSellRowProps {
  item: Item;
  percent: number;
  count: number;
  remainingProduction: number;
  onUpdate: (item: Item, count: number) => void;
  onRemove: (item: Item) => void;
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const MarketStallSellRow: FC<MarketStallSellRowProps> = ({
  item,
  percent,
  count,
  remainingProduction,
  onUpdate,
  onRemove,
}) => {
  const id = uuid();
  return (
    <Row>
      <Col>
        <Form.Label column={true} htmlFor={id}>
          <ItemIcon item={item} className="prefix-icon" />
          {item}
        </Form.Label>
      </Col>
      <Col sm={3}>
        <InputGroup>
          <Form.Control
            id={id}
            className="text-end"
            type="number"
            value={percent}
            min={0}
            max={percent + remainingProduction}
            onChange={(ev) => onUpdate(item, parseInt(ev.target.value) || 0)}
          />
          <InputGroupText>%</InputGroupText>
        </InputGroup>
      </Col>
      <Col sm={2} className="d-flex align-items-center justify-content-end">
        {numberFormatter.format(count)}
      </Col>
      <Col sm={1} className="d-flex align-items-center">
        <CloseButton onClick={() => onRemove(item)} />
      </Col>
    </Row>
  );
};

export default MarketStallSellRow;
