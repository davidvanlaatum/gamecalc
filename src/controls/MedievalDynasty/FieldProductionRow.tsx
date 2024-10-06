import React from 'react';
import { FieldRecipeCalculator, RecipeId } from '../../data/MedievalDynasty';
import { v4 as uuid } from 'uuid';
import Col from 'react-bootstrap/Col';
import { CloseButton, Form, OverlayTrigger, Popover, PopoverBody, Table } from 'react-bootstrap';
import ItemIcon from './ItemIcon.tsx';
import RecipeDetailsRow from './RecipeDetailsRow.tsx';

export interface FieldProductionRowProps {
  onUpdate: (recipe: RecipeId, percent: number) => void;
  onRemove: (recipe: RecipeId) => void;
  recipe: FieldRecipeCalculator;
}

const FieldProductionRow: React.FC<FieldProductionRowProps> = ({ onUpdate, onRemove, recipe }) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const id = uuid();

  const overlay = (
    <Popover className="popover-auto-width">
      <PopoverBody>
        <Table size="sm" className="mb-0" borderless={true}>
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Production</th>
            </tr>
          </thead>
          <tbody>
            <RecipeDetailsRow recipe={recipe.recipe} showBuildingName={false} showSkill={false} showName={false} />
          </tbody>
        </Table>
      </PopoverBody>
    </Popover>
  );

  return (
    <>
      <Col>
        <OverlayTrigger overlay={overlay}>
          <Form.Label column={true} htmlFor={id}>
            <ItemIcon item={recipe.production[0][0]} className="prefix-icon" /> {recipe.name}
          </Form.Label>
        </OverlayTrigger>
      </Col>
      <Col sm={3}>
        <Form.Control
          id={id}
          type="number"
          value={recipe.size ?? 0}
          min={0}
          htmlSize={3}
          onChange={(ev) => onUpdate(recipe.id, parseInt(ev.target.value) || 0)}
          className="text-end"
        />
      </Col>
      <Col sm={2} className="d-flex align-items-center justify-content-end">
        {numberFormatter.format(recipe.production[0][1])}
      </Col>
      <Col sm={1} className="d-flex align-items-center">
        <CloseButton onClick={() => onRemove(recipe.id)} />
      </Col>
    </>
  );
};

export default FieldProductionRow;
