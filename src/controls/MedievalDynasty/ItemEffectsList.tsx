import { FC } from 'react';
import { Table } from 'react-bootstrap';
import TreeTable from '@/controls/TreeTable.tsx';
import { effectItems, Item, ItemEffect } from '@/data/MedievalDynasty';
import ItemIcon from '@/controls/MedievalDynasty/ItemIcon.tsx';
import ItemDetailsPopup from '@/controls/MedievalDynasty/ItemDetailsPopup.tsx';
import ItemEffectControl from '@/controls/MedievalDynasty/ItemEffectControl.tsx';

const ItemEffectListDetail: FC<{ item?: Item; effect?: ItemEffect }> = ({ item, effect }) => {
  return (
    <>
      <ItemDetailsPopup item={item} enable={item !== undefined} placement="auto">
        <td>
          {item && (
            <>
              <ItemIcon item={item} className="prefix-icon" />
              {item}
            </>
          )}
        </td>
      </ItemDetailsPopup>
      <td>{effect && <ItemEffectControl effect={effect} />}</td>
    </>
  );
};

const ItemEffectsList: FC = () => {
  function detail(item: Item | undefined, effect: ItemEffect | undefined) {
    return <ItemEffectListDetail item={item} effect={effect} />;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>Effect</th>
          <th>Item</th>
          <th style={{ width: '70%' }}></th>
        </tr>
      </thead>
      <tbody>
        <TreeTable
          data={Object.entries(effectItems).map(([effect, items]) => ({
            key: effect,
            children: Object.entries(items),
          }))}
          firstColumnContents={(key, children) => key + ' (' + children.length + ')'}
          remainingColumns={(_, child) => detail(child?.[0] as Item, child?.[1] as ItemEffect)}
          rowId={(key, child) => key + child?.[0]}
        />
      </tbody>
    </Table>
  );
};

export default ItemEffectsList;
