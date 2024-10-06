import useLocalStorage from '../../useLocalstorage.ts';
import {
  BuildingOrField,
  BuildingSubTypes,
  BuildingType,
  isHouseData,
  Item,
  MedievalDynastyCalculator,
  MedievalDynastyData,
} from '@/data/MedievalDynasty';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Global from './Global.tsx';
import Building, { BuildingRef } from './Building.tsx';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, Dropdown } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import Usage from './Usage.tsx';
import AllowConsume from './AllowConsume.tsx';
import { useEffect, useRef, useState } from 'react';
import { useAlerts } from '../Alerts.tsx';
import BuildingIcon from './BuildingIcon.tsx';
import ItemIcon from './ItemIcon.tsx';

function Calculator() {
  const [data, setData] = useLocalStorage<MedievalDynastyData>('medieval_dynasty', {});
  const calc = new MedievalDynastyCalculator(data);
  const alerts = useAlerts();
  const buildingRefs = useRef<(BuildingRef | null)[]>([]);
  const [buildingCount, setBuildingCount] = useState<number>();

  useEffect(() => {
    const log: string[] = [];
    const fixed = calc.fixErrors(log);
    if (JSON.stringify(data) !== JSON.stringify(fixed)) {
      console.log(log);
      alerts.addAlerts(log);
      setData(fixed);
    }
  });

  function updateBuilding(building: BuildingSubTypes) {
    setData({
      ...data,
      buildings: data.buildings?.map((b) => (b.id == building.id ? building : b)),
    });
  }

  function removeBuilding(building: BuildingSubTypes) {
    setData({
      ...data,
      buildings: data.buildings?.filter((b) => b.id != building.id),
    });
  }

  function moveBuildingUp(building: BuildingSubTypes) {
    const newBuildings = [...(data.buildings ?? [])];
    const i = newBuildings.findIndex((b) => b.id == building.id);
    const tmp = newBuildings[i];
    newBuildings[i] = newBuildings[i - 1];
    newBuildings[i - 1] = tmp;
    setData({
      ...data,
      buildings: newBuildings,
    });
  }

  function moveBuildingDown(building: BuildingOrField) {
    const newBuildings = [...(data.buildings ?? [])];
    const i = newBuildings.findIndex((b) => b.id == building.id);
    const tmp = newBuildings[i];
    newBuildings[i] = newBuildings[i + 1];
    newBuildings[i + 1] = tmp;
    setData({
      ...data,
      buildings: newBuildings,
    });
  }

  function addBuilding(type: BuildingType) {
    setData({
      ...data,
      buildings: [...(data.buildings ?? []), { id: uuid(), type, totalSkill: 0 } as BuildingSubTypes],
    });
  }

  const addToBuildings = (el: BuildingRef | null) => {
    if (el && !buildingRefs.current.includes(el)) {
      buildingRefs.current.push(el);
    }
  };

  function expandAll() {
    buildingRefs.current.forEach((ref) => {
      if (ref?.expand) {
        ref.expand();
      }
    });
  }

  function collapseAll() {
    buildingRefs.current.forEach((ref) => {
      if (ref?.collapse) {
        ref.collapse();
      }
    });
  }

  useEffect(() => {
    setBuildingCount(data.buildings?.map((v) => (isHouseData(v) ? v.count : 1) ?? 1).reduce((a, b) => a + b, 0));
  }, [data.buildings]);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Global data={data} onUpdate={setData} />
            <Row>
              <Col>{buildingCount} buildings</Col>
              <Col className="text-end">
                <span onClick={() => expandAll()} className="bi-folder-plus cursor-pointer m-1"></span>
                <span onClick={() => collapseAll()} className="bi-folder-minus cursor-pointer m-1"></span>
              </Col>
            </Row>
            {data.buildings?.map((building, index) => (
              <Building
                key={building.id}
                building={building}
                onUpdate={updateBuilding}
                onRemove={removeBuilding}
                onMoveUp={moveBuildingUp}
                onMoveDown={moveBuildingDown}
                canMoveUp={index > 0}
                canMoveDown={index < data.buildings!.length - 1}
                inspiringSpeech={calc.inspiringSpeech}
                daysPerSeason={calc.daysPerSeason}
                taxPercent={calc.taxPercent}
                ref={addToBuildings}
              />
            ))}
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                <span className="bi-plus" />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ maxHeight: '80vh', overflow: 'auto' }}>
                {Object.entries(BuildingType)
                  .sort(([, a], [, b]) => a.valueOf().localeCompare(b.valueOf()))
                  .map(([key, value]) => (
                    <Dropdown.Item key={key} onClick={() => addBuilding(value)}>
                      <BuildingIcon building={value} className="prefix-icon" /> {value} (
                      {calc.buildings.filter((b) => b.type === value).length})
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Usage usage={calc.itemUsage()} />
        <Accordion>
          <AccordionItem eventKey="food" title="Food">
            <AccordionHeader>
              <ItemIcon item={Item.Food} className="prefix-icon" />
              Food
            </AccordionHeader>
            <AccordionBody>
              <AllowConsume
                allow={data.foodConsumeAllowList ?? {}}
                onUpdate={(value) => setData({ ...data, foodConsumeAllowList: value })}
                type={Item.Food}
              />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="wood" title="Wood">
            <AccordionHeader>
              <ItemIcon item={Item.Wood} className="prefix-icon" />
              Wood
            </AccordionHeader>
            <AccordionBody>
              <AllowConsume
                allow={data.woodConsumeAllowList ?? {}}
                onUpdate={(value) => setData({ ...data, woodConsumeAllowList: value })}
                type={Item.Wood}
              />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem eventKey="water" title="Water">
            <AccordionHeader>
              <ItemIcon item={Item.Water} className="prefix-icon" />
              Water
            </AccordionHeader>
            <AccordionBody>
              <AllowConsume
                allow={data.waterConsumeAllowList ?? {}}
                onUpdate={(value) => setData({ ...data, waterConsumeAllowList: value })}
                type={Item.Water}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Col>
    </Row>
  );
}

export default Calculator;
