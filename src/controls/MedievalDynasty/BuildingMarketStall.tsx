import { FC, ReactNode, useEffect } from 'react';
import { Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import ItemIcon from './ItemIcon.tsx';
import { Item, ItemCategory, MarketStallCalculator, MarketStallData, SkillType } from '@/data/MedievalDynasty';
import SkillIcon from './SkillIcon.tsx';
import { v4 as uuid } from 'uuid';
import MarketStallSellRow from './MarketStallSellRow.tsx';

interface BuildingStallProps {
  data: MarketStallData;
  onUpdate: (updatedBuilding: MarketStallData) => void;
  taxPercent: number;
  inspiringSpeech: number;
  daysPerSeason: number;
  setTitleContent: (content: ReactNode) => void;
}

const BuildingMarketStall: FC<BuildingStallProps> = ({
  data,
  onUpdate,
  taxPercent,
  inspiringSpeech,
  daysPerSeason,
  setTitleContent,
}) => {
  const calc = new MarketStallCalculator(data, taxPercent, inspiringSpeech, daysPerSeason);

  useEffect(() => {
    setTitleContent(
      <>
        {' - '}
        <Form.Select
          size="sm"
          className="d-inline"
          style={{ width: 'unset' }}
          value={data.itemType ?? ''}
          onChange={(ev) =>
            onUpdate({
              ...data,
              itemType: ev.target.value == '' ? undefined : (ev.target.value as ItemCategory),
            })
          }
        >
          <option value="">-</option>
          {Object.entries(ItemCategory)
            .filter(([, value]) => value != ItemCategory.Other)
            .map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
        </Form.Select>
        <span className="ps-2">
          {calc.tax} <ItemIcon item={Item.Coin} className="suffix-icon" />
        </span>
      </>,
    );
  }, [calc.tax, data, onUpdate, setTitleContent]);
  const skillId = uuid();

  function setProduction(item: Item, value: number) {
    onUpdate({
      ...data,
      items: {
        ...data.items,
        [item]: value,
      },
    });
  }

  function onRemove(value: Item) {
    const items = { ...data.items };
    delete items[value];
    onUpdate({
      ...data,
      items,
    });
  }

  return (
    <>
      <Row>
        <InputGroup size="sm">
          <InputGroupText>
            <Form.Label column={true} htmlFor={skillId}>
              Total Skill
              <SkillIcon skill={SkillType.Diplomacy} className="suffix-icon zoom-icon-1-5x" />
            </Form.Label>
          </InputGroupText>
          <Form.Control
            className="text-end"
            id={skillId}
            type="number"
            value={data.totalSkill}
            min={0}
            onChange={(ev) => onUpdate({ ...data, totalSkill: parseInt(ev.target.value) || 0 })}
          />
          <InputGroupText>Production</InputGroupText>
          <div className="form-control text-end my-auto align-content-center" style={{ height: '100%' }}>
            {calc.totalProduction}
          </div>
          <InputGroupText>%</InputGroupText>
        </InputGroup>
      </Row>

      {calc.production.map((item) => (
        <MarketStallSellRow
          key={item.item}
          item={item.item}
          percent={item.percent}
          count={item.count}
          remainingProduction={calc.remainingProduction}
          onUpdate={setProduction}
          onRemove={onRemove}
        />
      ))}
      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" disabled={!data.itemType || calc.availableItems.length == 0}>
            <span className="bi-plus" />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: '80vh', overflow: 'auto' }}>
            {calc.availableItems
              .sort(([a], [b]) => a.localeCompare(b))
              .map((key) => (
                <Dropdown.Item key={key} onClick={() => setProduction(key, 0)}>
                  <ItemIcon item={key} className="prefix-icon" />
                  {key}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </>
  );
};

export default BuildingMarketStall;
