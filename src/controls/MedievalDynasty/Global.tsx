import { FC } from 'react';
import {
  DevelopmentStage,
  developmentStageProps,
  Item,
  MedievalDynastyCalculator,
  MedievalDynastyData,
} from '@/data/MedievalDynasty';
import Form from 'react-bootstrap/Form';
import { convertStringToFloatOrCurrentValue, validNumber } from '@/utils.ts';
import ItemIcon from './ItemIcon.tsx';
import Row from 'react-bootstrap/Row';
import { InputGroup, ToggleButton } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import RomanNumberIcon from '@/controls/MedievalDynasty/RomanNumberIcon.tsx';

export interface GlobalProps {
  data: MedievalDynastyData;
  onUpdate: (data: MedievalDynastyData) => void;
}

const Global: FC<GlobalProps> = ({ data, onUpdate }) => {
  const calc = new MedievalDynastyCalculator(data);
  return (
    <>
      <Row>
        <InputGroup size="sm">
          <InputGroupText>
            <Form.Label column={true}>
              <ItemIcon item={Item.Food} className="input-group-icon" />
            </Form.Label>
          </InputGroupText>
          <Form.Control
            type="number"
            value={data.requiredFood}
            min={0}
            isInvalid={!validNumber(data.requiredFood, { min: 0, maxDecimals: 1 })}
            onChange={(ev) =>
              onUpdate({
                ...data,
                requiredFood: convertStringToFloatOrCurrentValue(ev.target.value, data.requiredFood),
              })
            }
          />
          <InputGroupText>
            <Form.Label column={true}>
              <ItemIcon item={Item.Water} className="input-group-icon" />
            </Form.Label>
          </InputGroupText>
          <Form.Control
            type="number"
            value={data.requiredWater}
            min={0}
            isInvalid={!validNumber(data.requiredWater, { min: 0, maxDecimals: 1 })}
            onChange={(ev) =>
              onUpdate({
                ...data,
                requiredWater: convertStringToFloatOrCurrentValue(ev.target.value, data.requiredWater),
              })
            }
          />
          <InputGroupText>
            <Form.Label column={true} htmlFor="requiredWood">
              <ItemIcon item={Item.Wood} className="input-group-icon" />
              <span className="visually-hidden">Wood</span>
            </Form.Label>
          </InputGroupText>
          <Form.Control
            type="number"
            value={data.requiredWood}
            min={0}
            id="requiredWood"
            isInvalid={!validNumber(data.requiredWood, { min: 0, maxDecimals: 1 })}
            onChange={(ev) =>
              onUpdate({
                ...data,
                requiredWood: convertStringToFloatOrCurrentValue(ev.target.value, data.requiredWood),
              })
            }
          />
          <InputGroupText>
            <Form.Label column={true} htmlFor="daysPerSeason">
              D/S
            </Form.Label>
          </InputGroupText>
          <Form.Control
            type="number"
            value={data.daysPerSeason}
            min={1}
            id="daysPerSeason"
            isInvalid={!validNumber(data.daysPerSeason, { min: 1, maxDecimals: 0 })}
            onChange={(ev) =>
              onUpdate({
                ...data,
                daysPerSeason: convertStringToFloatOrCurrentValue(ev.target.value, data.daysPerSeason),
              })
            }
          />
        </InputGroup>
      </Row>
      <Row>
        <InputGroup size="sm">
          <InputGroupText>
            <Form.Label column={true} htmlFor="inspiringSpeech">
              Inspiring Speech
            </Form.Label>
          </InputGroupText>
          {[0, 1, 2, 3].map((i) => (
            <ToggleButton
              key={i}
              type="radio"
              name="inspiringSpeech"
              id={'inspiringSpeech' + i}
              aria-label={'Inspiring Speech ' + i}
              title={'Inspiring Speech ' + i}
              checked={(data.inspiringSpeech ?? 0) === i}
              value={data.inspiringSpeech ?? 0}
              onChange={() => onUpdate({ ...data, inspiringSpeech: i })}
              className="d-flex align-items-center justify-content-center"
              variant="secondary"
              size="sm"
            >
              {i > 0 ? <RomanNumberIcon value={i} alt={`${i}`} className="inline-icon zoom-icon-2x" /> : <>&nbsp;</>}
            </ToggleButton>
          ))}
          <InputGroupText>
            <Form.Label column={true} htmlFor="developmentStage">
              Stage
            </Form.Label>
          </InputGroupText>
          <Form.Select
            id="developmentStage"
            value={data.developmentStage}
            onChange={(ev) => onUpdate({ ...data, developmentStage: ev.target.value as DevelopmentStage })}
          >
            {Object.entries(DevelopmentStage).map(([key, value]) => (
              <option key={key} value={key} disabled={!calc.availableDevelopmentStages.includes(value)}>
                {value} ({developmentStageProps[value].buildingLimit})
              </option>
            ))}
          </Form.Select>
          <InputGroupText>Tax</InputGroupText>
          <Form.Control
            type="number"
            value={data.taxPercent}
            min={0}
            max={300}
            step={10}
            htmlSize={3}
            isInvalid={!validNumber(data.taxPercent, { min: 0, max: 300, maxDecimals: 0, multipleOf: 10 })}
            onChange={(ev) =>
              onUpdate({ ...data, taxPercent: convertStringToFloatOrCurrentValue(ev.target.value, data.taxPercent) })
            }
          />
          <InputGroupText>%</InputGroupText>
        </InputGroup>
      </Row>
    </>
  );
};

export default Global;
