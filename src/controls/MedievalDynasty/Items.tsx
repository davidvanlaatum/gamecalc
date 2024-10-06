import { Form, Table } from 'react-bootstrap';
import { useState } from 'react';
import {
  BuildingType,
  Item,
  itemCalculatedProperties,
  ItemCategory,
  itemProperties,
  providers,
  recipes,
  technologyLevels,
} from '@/data/MedievalDynasty';
import ItemIcon from './ItemIcon.tsx';
import BuildingIcon from './BuildingIcon.tsx';
import ItemDetailsPopup from '@/controls/MedievalDynasty/ItemDetailsPopup.tsx';
import RecipeListPopup from '@/controls/MedievalDynasty/RecipeListPopup.tsx';

function Items() {
  const [providesIsZero, setProvidesIsZero] = useState<boolean>(false);
  const [filterProducedIn, setFilterProducedIn] = useState<BuildingType | null | undefined>();
  const [filterUsedIn, setFilterUsedIn] = useState<BuildingType | null | undefined>();
  const [filterByName, setFilterByName] = useState<string | null>(null);
  const [filterProvides, setFilterProvides] = useState<Item | undefined>();
  const [filterByType, setFilterByType] = useState<ItemCategory | null>();

  function provides(item: Item): Item[] {
    return [item, ...(itemProperties[item]?.provides?.map((v) => v.item) ?? [])];
  }

  const items = Object.values(Item)
    .filter((item) => !itemProperties[item]?.synthetic)
    .filter((item) => !providesIsZero || itemProperties[item]?.provides?.some((v) => v.amount === 0))
    .filter(
      (item) =>
        filterProducedIn === undefined ||
        (filterProducedIn === null && !Object.values(recipes).some((recipe) => recipe.production[item])) ||
        (filterProducedIn &&
          Object.values(recipes).some((recipe) => recipe.production[item] && recipe.building === filterProducedIn)),
    )
    .filter(
      (item) =>
        filterUsedIn === undefined ||
        (filterUsedIn === null &&
          !Object.values(recipes).some((recipe) => provides(item).some((item) => recipe.ingredients[item]))) ||
        (filterUsedIn &&
          Object.values(recipes).some(
            (recipe) => provides(item).some((item) => recipe.ingredients[item]) && recipe.building === filterUsedIn,
          )),
    )
    .filter(
      (item) => filterProvides === undefined || itemProperties[item]?.provides?.some((v) => v.item === filterProvides),
    )
    .filter(
      (item) =>
        filterByType === undefined ||
        itemProperties[item]?.type === filterByType ||
        (filterByType === null && !itemProperties[item]?.type),
    )
    .filter((item) => !filterByName || item.toLowerCase().includes(filterByName.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  function row(item: Item) {
    const { provides, weight, technology, type, basePrice } = itemProperties[item] ?? {};
    return (
      <>
        <td>
          <ItemDetailsPopup item={item} placement="auto">
            <div>
              <ItemIcon item={item} className="prefix-icon" />
              {item}
            </div>
          </ItemDetailsPopup>
        </td>
        <RecipeListPopup
          recipes={itemCalculatedProperties[item].producedInRecipes}
          showBuildingName={itemCalculatedProperties[item].producedInBuildings.length > 1}
          placement="auto"
        >
          <td>
            {itemCalculatedProperties[item].producedInBuildings.map((value) => (
              <div key={value}>
                <BuildingIcon building={value} className="prefix-icon" />
                {value}
              </div>
            ))}
          </td>
        </RecipeListPopup>
        <RecipeListPopup
          recipes={itemCalculatedProperties[item].usedInRecipes}
          showBuildingName={itemCalculatedProperties[item].usedInBuildings.length > 1}
          placement="auto"
        >
          <td>
            {itemCalculatedProperties[item].usedInBuildings.map((value) => (
              <div key={value}>
                <BuildingIcon building={value} className="prefix-icon" />
                {value}
              </div>
            ))}
          </td>
        </RecipeListPopup>
        <td>
          {provides
            ?.filter((v) => v.item !== item)
            .map((v) => (
              <div key={v.item}>
                <ItemIcon item={v.item} className="prefix-icon" />
                {v.item}
              </div>
            ))}
        </td>
        <td className="number">{provides?.map((v) => <div key={v.item}>{v.amount}</div>)}</td>
        <td className="number">
          {provides?.filter((v) => v.item !== item).map((v) => <div key={v.item}>{v.priority}</div>)}
        </td>
        <td>{type}</td>
        <td className="number">
          {weight}
          {weight && 'kg'}
        </td>
        <td className="number">{basePrice}</td>
        <td>
          {technology?.type &&
            (technology.type == 'None' ? (
              'None'
            ) : (
              <BuildingIcon
                className="inline-icon"
                building={technologyLevels[technology.type][technology.level ?? 0]?.[0]}
                level={technologyLevels[technology.type][technology.level ?? 0]?.[1]}
              />
            ))}
        </td>
      </>
    );
  }

  return (
    <Table striped={true} hover={true} className="sticky-header">
      <thead>
        <tr>
          <th>Item</th>
          <th>Produced In</th>
          <th>Used In</th>
          <th>Provides</th>
          <th>Amount</th>
          <th>Priority</th>
          <th>Type</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Tech</th>
        </tr>
        <tr>
          <th>
            <Form.Control
              placeholder="type to filter"
              onChange={(ev) => setFilterByName(ev.target.value != '' ? ev.target.value : null)}
            />
          </th>
          <th>
            <Form.Select
              onChange={(ev) =>
                setFilterProducedIn(
                  ev.target.value === 'none'
                    ? null
                    : ev.target.value === 'all'
                      ? undefined
                      : (ev.target.value as BuildingType),
                )
              }
            >
              <option value="all">All</option>
              <option value="none">None</option>
              {Object.values(BuildingType).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </th>
          <th>
            <Form.Select
              onChange={(ev) =>
                setFilterUsedIn(
                  ev.target.value === 'none'
                    ? null
                    : ev.target.value === 'all'
                      ? undefined
                      : (ev.target.value as BuildingType),
                )
              }
            >
              <option value="all">All</option>
              <option value="none">None</option>
              {Object.values(BuildingType).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </th>
          <th>
            <Form.Select
              onChange={(ev) => setFilterProvides(ev.target.value == '' ? undefined : (ev.target.value as Item))}
            >
              <option value="">-</option>
              {Object.keys(providers).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </th>
          <th>
            <Form.Check type="switch" label="0" onChange={(ev) => setProvidesIsZero(ev.target.checked)} />
          </th>
          <th></th>
          <th>
            <Form.Select
              onChange={(ev) =>
                setFilterByType(
                  ev.target.value == ''
                    ? undefined
                    : ev.target.value == 'none'
                      ? null
                      : (ev.target.value as ItemCategory),
                )
              }
            >
              <option value="">-</option>
              <option value="none">None</option>
              {Object.entries(ItemCategory).map(([key, value]) => (
                <option key={key} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item}>{row(item)}</tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Items;
