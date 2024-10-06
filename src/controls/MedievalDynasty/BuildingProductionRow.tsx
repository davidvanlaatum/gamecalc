import React from 'react';
import { BuildingRecipeCalculator, RecipeId } from '@/data/MedievalDynasty';
import Col from 'react-bootstrap/Col';
import { CloseButton, InputGroup, OverlayTrigger, Popover, PopoverBody, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { v4 as uuid } from 'uuid';
import ItemIcon from './ItemIcon.tsx';
import RecipeDetailsRow from './RecipeDetailsRow.tsx';

export interface BuildingProductionRowProps {
  recipe: BuildingRecipeCalculator;
  remainingProduction: number;
  onUpdate: (recipe: RecipeId, percent: number) => void;
  onRemove: (recipe: RecipeId) => void;
  isValid: boolean;
}

const BuildingProductionRow: React.FC<BuildingProductionRowProps> = ({
  recipe,
  remainingProduction,
  onUpdate,
  onRemove,
  isValid,
}) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const id = uuid();

  const nameOverlay = (
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

  const countOverlay = (
    <Popover className="popover-auto-width">
      <PopoverBody>
        <Table size="sm" className="mb-0" borderless={true}>
          <thead>
            <tr>
              {recipe.ingredients.length > 0 && <th>Ingredients</th>}
              <th>Production</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {recipe.ingredients.length > 0 && (
                <td>
                  {recipe.ingredients.map(([ingredient, count]) => (
                    <div key={ingredient}>
                      <ItemIcon item={ingredient} className="prefix-icon" />
                      {ingredient} x {numberFormatter.format(count)}
                    </div>
                  ))}
                </td>
              )}
              <td>
                {recipe.production.map(([item, count]) => (
                  <div key={item}>
                    <ItemIcon item={item} className="prefix-icon" />
                    {item} x {numberFormatter.format(count)}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </Table>
      </PopoverBody>
    </Popover>
  );

  return (
    <>
      <Col>
        <OverlayTrigger overlay={nameOverlay}>
          <Form.Label column={true} htmlFor={id}>
            <ItemIcon item={recipe.production[0][0]} className="prefix-icon" />
            {recipe.name}
          </Form.Label>
        </OverlayTrigger>
      </Col>
      <Col sm={3}>
        <InputGroup>
          <Form.Control
            id={id}
            type="number"
            value={recipe.percent ?? 0}
            min={0}
            htmlSize={3}
            max={recipe.percent + remainingProduction}
            isInvalid={!isValid}
            onChange={(ev) => onUpdate(recipe.id, parseInt(ev.target.value) || 0)}
            className="text-end"
          />
          <InputGroupText>%</InputGroupText>
        </InputGroup>
      </Col>
      <OverlayTrigger overlay={countOverlay}>
        <Col sm={2} className="d-flex align-items-center justify-content-end">
          {numberFormatter.format(recipe.count)}
        </Col>
      </OverlayTrigger>
      <Col sm={1} className="d-flex align-items-center">
        <CloseButton onClick={() => onRemove(recipe.id)} />
      </Col>
    </>
  );
};

export default BuildingProductionRow;
