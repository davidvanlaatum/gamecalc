import {
  BuildingCalculator,
  BuildingData,
  buildingProps,
  DevelopmentStage,
  Item,
  RecipeId,
} from '@/data/MedievalDynasty';
import { FC, ReactNode, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import SkillIcon from './SkillIcon.tsx';
import { Dropdown, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/InputGroupText';
import BuildingProductionRow from './BuildingProductionRow.tsx';
import ItemIcon from './ItemIcon.tsx';
import BuildingTax from '@/controls/MedievalDynasty/BuildingTax.tsx';

interface ProductionBuildingProps {
  building: BuildingData;
  onUpdate: (updatedBuilding: BuildingData) => void;
  inspiringSpeech: number;
  taxPercent: number;
  daysPerSeason: number;
  developmentStage: DevelopmentStage;
  setTitleContent: (content: ReactNode) => void;
}

const ProductionBuilding: FC<ProductionBuildingProps> = ({
  building,
  onUpdate,
  inspiringSpeech,
  taxPercent,
  daysPerSeason,
  developmentStage,
  setTitleContent,
}) => {
  const calc = new BuildingCalculator(building, inspiringSpeech, taxPercent, daysPerSeason);

  useEffect(() => {
    setTitleContent(<BuildingTax tax={calc.tax} developmentStage={developmentStage} />);
  }, [calc.tax, developmentStage, setTitleContent]);

  function setProduction(recipe: RecipeId, value: number) {
    onUpdate({
      ...building,
      production: {
        ...building.production,
        [recipe]: value,
      },
    });
  }

  function removeProduction(recipe: RecipeId) {
    const v = {
      ...building,
      production: {
        ...building.production,
      },
    };
    delete v.production[recipe];
    onUpdate(v);
  }

  const skillId = uuid();

  return (
    <>
      <Row>
        <InputGroup size="sm">
          <InputGroupText>
            <Form.Label column={true} htmlFor={skillId}>
              Total Skill
              <SkillIcon skill={buildingProps[building.type]?.skill} className="suffix-icon zoom-icon-1-5x" />
            </Form.Label>
          </InputGroupText>
          <Form.Control
            className="text-end"
            id={skillId}
            type="number"
            value={building.totalSkill}
            min={0}
            onChange={(ev) => onUpdate({ ...building, totalSkill: parseInt(ev.target.value) || 0 })}
          />
          <InputGroupText>Production</InputGroupText>
          <div className="form-control text-end my-auto align-content-center" style={{ height: '100%' }}>
            {calc.totalProduction}
          </div>
          <InputGroupText>%</InputGroupText>
        </InputGroup>
      </Row>
      {calc.production
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((recipe) => (
          <Row key={recipe.id}>
            <BuildingProductionRow
              recipe={recipe}
              remainingProduction={calc.remainingProduction}
              onUpdate={setProduction}
              onRemove={removeProduction}
              isValid={calc.totalProductionValid}
            />
          </Row>
        ))}
      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" disabled={calc.availableRecipes.length == 0}>
            <span className="bi-plus" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {calc.availableRecipes
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([key, recipe]) => (
                <Dropdown.Item key={key} onClick={() => setProduction(key, 0)}>
                  <ItemIcon item={Object.keys(recipe.production)[0] as Item} className="prefix-icon" />
                  {recipe.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </>
  );
};

export default ProductionBuilding;
