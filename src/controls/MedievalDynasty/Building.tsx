import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import {
  BuildingData,
  buildingProps,
  BuildingSubTypes,
  isBuildingData,
  isFieldData,
  isHouseData,
  isMarketStallData,
  isStorageBuildingData,
} from '@/data/MedievalDynasty';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import BuildingIcon from './BuildingIcon.tsx';
import ProductionBuilding from './ProductionBuilding.tsx';
import Field from './Field.tsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Building.css';
import Image from '../Image.tsx';
import BuildingHouse from './BuildingHouse.tsx';
import BuildingMarketStall from './BuildingMarketStall.tsx';
import BuildingStorage from '@/controls/MedievalDynasty/BuildingStorage.tsx';

interface BuildingProps {
  building: BuildingSubTypes;
  onUpdate: (updatedBuilding: BuildingSubTypes) => void;
  onRemove: (building: BuildingSubTypes) => void;
  onMoveUp: (building: BuildingSubTypes) => void;
  onMoveDown: (building: BuildingSubTypes) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  inspiringSpeech: number;
  daysPerSeason: number;
  taxPercent: number;
}

export interface BuildingRef {
  collapse(): void;
  expand(): void;
}

const Building = forwardRef<BuildingRef, BuildingProps>(
  (
    {
      building,
      onUpdate,
      onRemove,
      onMoveUp,
      onMoveDown,
      canMoveUp,
      canMoveDown,
      inspiringSpeech,
      daysPerSeason,
      taxPercent,
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(true);
    const [titleContent, setTitleContent] = useState<ReactNode>();
    const [inner, setInner] = useState<ReactNode>();

    useImperativeHandle(ref, () => ({
      collapse() {
        setExpanded(false);
      },
      expand() {
        setExpanded(true);
      },
    }));

    useEffect(() => {
      const getInner = () => {
        switch (true) {
          case isFieldData(building):
            return (
              <Field
                field={building}
                onUpdate={onUpdate}
                inspiringSpeech={inspiringSpeech}
                daysPerSeason={daysPerSeason}
                taxPercent={taxPercent}
                setTitleContent={setTitleContent}
              />
            );
          case isHouseData(building):
            return (
              <BuildingHouse
                data={building}
                onUpdate={onUpdate}
                taxPercent={taxPercent}
                daysPerSeason={daysPerSeason}
                setTitleContent={setTitleContent}
              />
            );
          case isBuildingData(building):
            return (
              <ProductionBuilding
                building={building}
                onUpdate={onUpdate}
                inspiringSpeech={inspiringSpeech}
                taxPercent={taxPercent}
                daysPerSeason={daysPerSeason}
                setTitleContent={setTitleContent}
              />
            );
          case isMarketStallData(building):
            return (
              <BuildingMarketStall
                data={building}
                onUpdate={onUpdate}
                taxPercent={taxPercent}
                inspiringSpeech={inspiringSpeech}
                daysPerSeason={daysPerSeason}
                setTitleContent={setTitleContent}
              />
            );
          case isStorageBuildingData(building):
            return (
              <BuildingStorage
                data={building}
                onUpdate={onUpdate}
                taxPercent={taxPercent}
                daysPerSeason={daysPerSeason}
                setTitleContent={setTitleContent}
              />
            );
          default:
            return <>Unknown building type!</>;
        }
      };
      setInner(getInner());
    }, [building, daysPerSeason, inspiringSpeech, onUpdate, taxPercent]);

    return (
      <Card>
        <Card.Header>
          <span onClick={() => setExpanded(!expanded)} className="cursor-pointer">
            <i
              className={
                (isStorageBuildingData(building) ? 'bi-caret-right' : expanded ? 'bi-caret-down' : 'bi-caret-right') +
                ' building-expander'
              }
            />
            <BuildingIcon building={building.type} className="prefix-icon ms-2" />
            {building.type}
          </span>
          {(isBuildingData(building) || isStorageBuildingData(building)) &&
            (buildingProps[building.type]?.tax?.length ?? 1) > 1 && (
              <ButtonGroup size="sm">
                {buildingProps[building.type]?.tax?.map((_, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    onClick={() => onUpdate({ ...building, level: index } as BuildingData)}
                    active={(building.level ?? 0) === index}
                    className="py-0 border-0"
                  >
                    <Image
                      src={'src/assets/MedievalDynasty/Roman_' + (index + 1) + '.png'}
                      alt={'Level ' + (index + 1)}
                      style={{ height: '1em', width: '1em' }}
                    />
                  </Button>
                ))}
              </ButtonGroup>
            )}
          {titleContent}
          <div className="float-end building-buttons">
            <Button
              className="bi-arrow-up"
              size="sm"
              variant="link"
              aria-label="move up"
              onClick={() => onMoveUp(building)}
              disabled={!canMoveUp}
            />
            <Button
              className="bi-arrow-down"
              size="sm"
              variant="link"
              aria-label="move down"
              onClick={() => onMoveDown(building)}
              disabled={!canMoveDown}
            />
            <Button
              className="bi-x-lg"
              size="sm"
              variant="link"
              aria-label="remove"
              onClick={() => onRemove(building)}
            />
          </div>
        </Card.Header>
        <Card.Body className={isStorageBuildingData(building) || !expanded ? 'hidden' : ''}>{inner}</Card.Body>
      </Card>
    );
  },
);
Building.displayName = 'Building';

export default Building;
