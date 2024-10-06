import { FC, useEffect, useState } from 'react';
import {
  DevelopmentStage,
  developmentStageProps,
  isHouseData,
  Item,
  MedievalDynastyData,
} from '@/data/MedievalDynasty';
import Form from 'react-bootstrap/Form';
import { convertStringToFloatOrCurrentValue } from '@/utils.ts';
import ItemIcon from './ItemIcon.tsx';
import Row from 'react-bootstrap/Row';
import { InputGroup, ToggleButton } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';

export interface GlobalProps {
  data: MedievalDynastyData;
  onUpdate: (data: MedievalDynastyData) => void;
}

const Global: FC<GlobalProps> = ({ data, onUpdate }) => {
  const [buildingCount, setBuildingCount] = useState<number>(0);

  useEffect(() => {
    const n =
      data.buildings
        ?.map((building) => (isHouseData(building) ? (building.count ?? 1) : 1))
        .reduce((a, b) => a + b, 0) ?? 0;
    if (n !== buildingCount) {
      setBuildingCount(n);
    }
  }, [buildingCount, data.buildings]);

  useEffect(() => {
    if (
      buildingCount > 0 &&
      buildingCount > developmentStageProps[data.developmentStage ?? DevelopmentStage.Traveler].buildingLimit
    ) {
      onUpdate({
        ...data,
        developmentStage: Object.entries(developmentStageProps)
          .filter(([, p]) => p.buildingLimit >= buildingCount)
          .map(([key]) => key as DevelopmentStage)
          .find((v) => v),
      });
    }
  }, [buildingCount, data, onUpdate]);

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
              {i > 0 ? (
                <img
                  alt={`${i}`}
                  className="inline-icon zoom-icon-2x"
                  src={`src/assets/MedievalDynasty/Roman_${i}.png`}
                />
              ) : (
                i
              )}
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
              <option key={key} value={key} disabled={buildingCount > developmentStageProps[value].buildingLimit}>
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
