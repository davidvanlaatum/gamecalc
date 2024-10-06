import { Table } from 'react-bootstrap';
import { Item, itemProperties, ItemPropertiesProvides, providers, ProvidesByProduct } from '../../data/MedievalDynasty';
import 'bootstrap-icons/font/bootstrap-icons.css';
import TreeTable from '../TreeTable.tsx';
import ItemIcon from './ItemIcon.tsx';

export interface Provides {
  key: Item;
  children: ProvideChildren[];
}

export interface ProvideChildren extends ItemPropertiesProvides {
  byproduct?: ProvidesByProduct;
}

function Provides() {
  const provides: Provides[] = Object.entries(providers)
    .map(([item, providedBy]) => ({
      key: item as Item,
      children: providedBy.map((providedBy) => ({
        ...providedBy.provides,
        item: providedBy.item,
        byproduct: itemProperties[providedBy.item]?.byproduct,
      })),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));

  return (
    <Table striped={true} hover={true} className="sticky-header">
      <thead>
        <tr>
          <th></th>
          <th>Provided By</th>
          <th>Amount</th>
          <th>Priority</th>
          <th>Byproduct</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TreeTable<Item, ProvideChildren>
          data={provides}
          firstColumnContents={(key) => (
            <>
              <ItemIcon item={key} className="prefix-icon" />
              {key}
            </>
          )}
          remainingColumns={(_key, child) => (
            <>
              <td>
                {child && (
                  <>
                    <ItemIcon item={child.item} className="prefix-icon" />
                    {child.item}
                  </>
                )}
              </td>
              <td className="number col-sm-1">{child?.amount}</td>
              <td className="number col-sm-1">{child?.priority}</td>
              <td>
                {child?.byproduct?.item && (
                  <>
                    <ItemIcon item={child.byproduct.item} className="prefix-icon" />
                    {child.byproduct.item}
                  </>
                )}
              </td>
              <td>{child?.byproduct?.amount}</td>
            </>
          )}
          rowId={(key, child) => (child ? key + child.item : key)}
        />
      </tbody>
    </Table>
  );
}

export default Provides;
