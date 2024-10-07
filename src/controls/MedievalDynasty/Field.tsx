import { FC, ReactNode, useEffect } from 'react';
import { DevelopmentStage, FieldCalculator, FieldData, Item, RecipeId } from '@/data/MedievalDynasty';
import { Col, Dropdown, Row } from 'react-bootstrap';
import FieldProductionRow from './FieldProductionRow.tsx';
import ItemIcon from './ItemIcon.tsx';
import BuildingTax from '@/controls/MedievalDynasty/BuildingTax.tsx';

export interface FieldProps {
  field: FieldData;
  daysPerSeason: number;
  onUpdate: (updatedBuilding: FieldData) => void;
  inspiringSpeech: number;
  taxPercent: number;
  developmentStage: DevelopmentStage;
  setTitleContent: (content: ReactNode) => void;
}

const Field: FC<FieldProps> = ({
  field,
  onUpdate,
  daysPerSeason,
  inspiringSpeech,
  taxPercent,
  developmentStage,
  setTitleContent,
}) => {
  const calc = new FieldCalculator(field, daysPerSeason, inspiringSpeech, taxPercent);

  useEffect(() => {
    setTitleContent(<BuildingTax tax={calc.tax} developmentStage={developmentStage} />);
  }, [calc.tax, developmentStage, setTitleContent]);

  function setProduction(recipe: RecipeId, value: number) {
    onUpdate({
      ...field,
      size: {
        ...field.size,
        [recipe]: value,
      },
    });
  }

  function removeProduction(recipe: RecipeId) {
    const v = {
      ...field,
      size: {
        ...field.size,
      },
    };
    delete v.size[recipe];
    onUpdate(v);
  }

  return (
    <>
      {calc.production
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((recipe) => (
          <Row key={recipe.id}>
            <FieldProductionRow recipe={recipe} onUpdate={setProduction} onRemove={removeProduction} />
          </Row>
        ))}
      <Row>
        <Col></Col>
        <Col sm={3}>
          <div className="form-control number">{calc.count}</div>
        </Col>
        <Col sm={3}></Col>
      </Row>
      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" disabled={calc.availableRecipes.length == 0}>
            <span className="bi-plus" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {calc.availableRecipes.map(([key, recipe]) => (
              <Dropdown.Item key={key} onClick={() => setProduction(key, 0)}>
                <ItemIcon item={Object.keys(recipe.production)[0] as Item} className="prefix-icon" /> {recipe.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    </>
  );
};

export default Field;
