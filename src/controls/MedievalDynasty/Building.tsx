import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import {
  BuildingData,
  buildingProps,
  BuildingSubTypes,
  DevelopmentStage,
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
import BuildingHouse from './BuildingHouse.tsx';
import BuildingMarketStall from './BuildingMarketStall.tsx';
import BuildingStorage from '@/controls/MedievalDynasty/BuildingStorage.tsx';
import RomanNumberIcon from '@/controls/MedievalDynasty/RomanNumberIcon.tsx';

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
  developmentStage: DevelopmentStage;
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
      developmentStage,
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
                developmentStage={developmentStage}
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
                developmentStage={developmentStage}
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
                developmentStage={developmentStage}
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
                developmentStage={developmentStage}
                setTitleContent={setTitleContent}
              />
            );
          case isStorageBuildingData(building):
            return (
              <BuildingStorage
                data={building}
                taxPercent={taxPercent}
                daysPerSeason={daysPerSeason}
                developmentStage={developmentStage}
                setTitleContent={setTitleContent}
              />
            );
          default:
            return <>Unknown building type!</>;
        }
      };
      setInner(getInner());
    }, [building, daysPerSeason, developmentStage, inspiringSpeech, onUpdate, taxPercent]);

    return (
      <Card>
        <Card.Header>
          <button onClick={() => setExpanded(!expanded)} className="expander">
            <i
              className={
                (!isStorageBuildingData(building) && expanded ? 'bi-caret-down' : 'bi-caret-right') +
                ' building-expander'
              }
            />
            <BuildingIcon building={building.type} className="prefix-icon ms-2" />
            {building.type}
          </button>
          {(isBuildingData(building) || isStorageBuildingData(building)) &&
            (buildingProps[building.type]?.tax?.length ?? 1) > 1 && (
              <ButtonGroup size="sm">
                {buildingProps[building.type]?.tax
                  ?.map((_, i) => i)
                  .map((index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      onClick={() => onUpdate({ ...building, level: index } as BuildingData)}
                      active={(building.level ?? 0) === index}
                      className="py-0 border-0"
                    >
                      <RomanNumberIcon value={index + 1} className="inline-icon" alt={'Level ' + (index + 1)} />
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
