import { Table } from 'react-bootstrap';
import TreeTable from '../TreeTable.tsx';
import { BuildingType, RecipeData, recipes } from '@/data/MedievalDynasty';
import RecipeDetailsRow from './RecipeDetailsRow.tsx';
import { useRef } from 'react';
import BuildingIcon from './BuildingIcon.tsx';

function BuildingList() {
  const data = Object.values(BuildingType)
    .map((value) => ({
      key: value,
      children: Object.entries(recipes)
        .filter(([, item]) => item.building == value)
        .sort(([, a], [, b]) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
  const treeTableRef = useRef<TreeTable<BuildingType, [string, RecipeData]>>(null);

  function countForBuilding(building: BuildingType) {
    const count = data.find((v) => v.key == building)?.children.length ?? 0;
    return count ? ` (${count})` : '';
  }

  return (
    <Table striped={true} hover={true} className="sticky-header">
      <caption>{data.length} Buildings</caption>
      <thead>
        <tr>
          <th className="col-2">
            Building
            <div className={'float-end'}>
              <button
                onClick={() => treeTableRef.current?.expandAll()}
                className="bi-folder-plus cursor-pointer m-1 expander"
              />
              <button
                onClick={() => treeTableRef.current?.collapseAll()}
                className="bi-folder-minus cursor-pointer m-1 expander"
              />
            </div>
          </th>
          <th className="col-2">Production</th>
          <th className="col-2">Ingredients</th>
          <th className="col-2">Production</th>
          <th className="col-2">Skill Multiplier</th>
          <th className="col-2">Skill Samples</th>
        </tr>
      </thead>
      <tbody>
        <TreeTable
          ref={treeTableRef}
          data={data}
          firstColumnContents={(key) => (
            <>
              <BuildingIcon building={key} className="prefix-icon" />
              {key}
              {countForBuilding(key)}
            </>
          )}
          remainingColumns={(_item, item) => {
            const [, child] = item ?? [];
            return child ? (
              <RecipeDetailsRow recipe={child} tr={false} showBuildingName={false} />
            ) : (
              <>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </>
            );
          }}
          rowId={(key, child) => key + (child?.[0] ?? '')}
        />
      </tbody>
    </Table>
  );
}

export default BuildingList;
