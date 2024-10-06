import React from 'react';
import { Item, providers } from '@/data/MedievalDynasty';
import { Form, Table } from 'react-bootstrap';
import ItemIcon from './ItemIcon.tsx';

export interface AllowConsumeProps {
  allow: Partial<Record<Item, boolean>>;
  onUpdate: (data: Partial<Record<Item, boolean>>) => void;
  type: Item;
}

const AllowConsume: React.FC<AllowConsumeProps> = ({ allow, onUpdate, type }) => {
  const providedBy = providers[type];
  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Amount</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {providedBy.map(({ item, provides }) => (
          <tr key={item}>
            <td>
              <Form.Check
                id={item}
                type="switch"
                label={
                  <>
                    <ItemIcon item={item} className="prefix-icon" />
                    {item}
                  </>
                }
                checked={allow[item] ?? true}
                onChange={(ev) => onUpdate({ ...allow, [item]: ev.target.checked })}
              />
            </td>
            <td>{provides.amount}</td>
            <td>{provides.priority}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AllowConsume;
