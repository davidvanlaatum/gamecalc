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

  return (
    <Table striped={true} hover={true} className="sticky-header">
      <thead>
        <tr>
          <th className="col-2">
            Building
            <div className={'float-end'}>
              <span onClick={() => treeTableRef.current?.expandAll()} className="bi-folder-plus cursor-pointer m-1" />
              <span
                onClick={() => treeTableRef.current?.collapseAll()}
                className="bi-folder-minus cursor-pointer m-1"
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
              {key} ({data.find((v) => v.key == key)?.children.length})
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
          rowId={(key, child) => key + (child ?? '')}
        />
      </tbody>
    </Table>
  );
}

export default BuildingList;
