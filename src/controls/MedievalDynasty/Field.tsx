import { FC, ReactNode, useEffect } from 'react';
import { FieldCalculator, FieldData, Item, RecipeId } from '@/data/MedievalDynasty';
import { Col, Dropdown, Row } from 'react-bootstrap';
import FieldProductionRow from './FieldProductionRow.tsx';
import ItemIcon from './ItemIcon.tsx';

export interface FieldProps {
  field: FieldData;
  daysPerSeason: number;
  onUpdate: (updatedBuilding: FieldData) => void;
  inspiringSpeech: number;
  taxPercent: number;
  setTitleContent: (content: ReactNode) => void;
}

const Field: FC<FieldProps> = ({ field, onUpdate, daysPerSeason, inspiringSpeech, taxPercent, setTitleContent }) => {
  const calc = new FieldCalculator(field, daysPerSeason, inspiringSpeech, taxPercent);

  useEffect(() => {
    setTitleContent(
      <span className="ps-2">
        {calc.tax} <ItemIcon item={Item.Coin} className="suffix-icon" />
      </span>,
    );
  }, [calc.tax, setTitleContent]);

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
      <Row>
        <Col></Col>
        <Col sm={3} className="number">
          {calc.production.reduce((t, c) => t + c.size, 0)}
        </Col>
        <Col sm={3}></Col>
      </Row>
      {calc.production
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((recipe) => (
          <Row key={recipe.id}>
            <FieldProductionRow recipe={recipe} onUpdate={setProduction} onRemove={removeProduction} />
          </Row>
        ))}
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
