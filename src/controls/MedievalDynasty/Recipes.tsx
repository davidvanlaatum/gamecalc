import { BuildingType, Item, itemProperties, RecipeData, recipes } from '../../data/MedievalDynasty';
import RecipeDetailsRow from './RecipeDetailsRow.tsx';
import { Table } from 'react-bootstrap';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

type sortOptions = 'building' | 'name';

function combinedSortFunction(
  ...funcs: ((a: [string, RecipeData], b: [string, RecipeData]) => number)[]
): (a: [string, RecipeData], b: [string, RecipeData]) => number {
  return (a, b) => {
    for (const func of funcs) {
      const result = func(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}

function sortFunction(sort: sortOptions): (a: [string, RecipeData], b: [string, RecipeData]) => number {
  switch (sort) {
    case 'building':
      return combinedSortFunction(([, a], [, b]) => a.building.localeCompare(b.building), sortFunction('name'));
    case 'name':
      return ([, a], [, b]) => a.name.localeCompare(b.name);
  }
}

function Recipes() {
  const [sort, setSort] = useState<sortOptions>('building');
  const [filterName, setFilterName] = useState<string | null>('');
  const [filterBuilding, setFilterBuilding] = useState<string | null>(null);
  const [filterIngredient, setFilterIngredient] = useState<Item | null>(null);
  const [filterProduction, setFilterProduction] = useState<Item | null>(null);

  function onFilterByName(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterName(event.target.value || null);
  }

  function onFilterBuilding(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterBuilding(event.target.value || null);
  }

  function onFilterIngredient(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterIngredient((event.target.value as Item) || null);
  }

  function onFilterProduction(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterProduction((event.target.value as Item) || null);
  }

  function filter(recipe: RecipeData) {
    if (filterName && !recipe.name.toLowerCase().includes(filterName.toLowerCase())) {
      return false;
    } else if (filterBuilding && recipe.building !== filterBuilding) {
      return false;
    } else if (filterIngredient && !recipe.ingredients[filterIngredient]) {
      return false;
    } else return !(filterProduction && !recipe.production[filterProduction]);
  }

  return (
    <Table striped={true} hover={true} className="sticky-header">
      <thead>
        <tr>
          <th onClick={() => setSort('name')} className="cursor-pointer">
            Name
          </th>
          <th onClick={() => setSort('building')} className="cursor-pointer">
            Building
          </th>
          <th>Ingredients</th>
          <th>Production</th>
          <th>Skill Multiplier</th>
          <th>Skill Samples</th>
        </tr>
        <tr>
          <th>
            <Form.Control onChange={onFilterByName} placeholder="type to filter by name" />
          </th>
          <th>
            <Form.Select onChange={onFilterBuilding}>
              <option value="">-</option>
              {Object.values(BuildingType)
                .sort((a, b) => a.localeCompare(b))
                .map((building) => (
                  <option key={building} value={building}>
                    {building}
                  </option>
                ))}
            </Form.Select>
          </th>
          <th>
            <Form.Select onChange={onFilterIngredient}>
              <option value="">-</option>
              {Object.values(Item)
                .filter((item) => !itemProperties[item]?.synthetic)
                .sort((a, b) => a.localeCompare(b))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </Form.Select>
          </th>
          <th>
            <Form.Select onChange={onFilterProduction}>
              <option value="">-</option>
              {Object.values(Item)
                .filter((item) => !itemProperties[item]?.synthetic)
                .sort((a, b) => a.localeCompare(b))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </Form.Select>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(recipes)
          .filter(([, recipe]) => filter(recipe))
          .sort(sortFunction(sort))
          .map(([id, recipe]) => (
            <RecipeDetailsRow key={id} recipe={recipe} />
          ))}
      </tbody>
    </Table>
  );
}

export default Recipes;
