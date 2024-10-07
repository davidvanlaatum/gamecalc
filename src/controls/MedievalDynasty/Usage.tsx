import { ItemUsage } from '@/data/MedievalDynasty';
import { FC, useState } from 'react';
import { Card, FormCheck, OverlayTrigger, Popover, PopoverBody, Table } from 'react-bootstrap';
import ItemIcon from './ItemIcon.tsx';
import ItemDetailsPopup from '@/controls/MedievalDynasty/ItemDetailsPopup.tsx';

interface UsageProps {
  usage: ItemUsage[];
}

const Usage: FC<UsageProps> = ({ usage }) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [justNeg, setJustNeg] = useState<boolean>(false);
  const data = usage.filter((item) => !justNeg || item.net < 0);

  function getTooltip(item: ItemUsage) {
    return (
      <Popover className="popover-auto-width">
        <PopoverBody className="pb-0">
          <Table striped={true}>
            <tbody>
              {[...item.log]
                .sort((a, b) => a.amount - b.amount)
                .map((log) => (
                  <tr key={log.log}>
                    <td>
                      {log.log}
                      {log.count > 1 && ` x ${log.count}`}
                    </td>
                    <td className={[log.amount < 0 ? 'negative' : '', 'text-end'].join(' ')}>
                      {numberFormatter.format(log.amount)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </PopoverBody>
      </Popover>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Table striped={true} hover={true} className="sticky-header">
          <thead>
            <tr>
              <th className="col-6">
                Item
                <div className="float-end">Average Daily</div>
              </th>
              <th className="col-2">Produced</th>
              <th className="col-2">Consumed</th>
              <th className="col-2">
                Net
                <FormCheck type="switch" className="float-end" onChange={(ev) => setJustNeg(ev.target.checked)} />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.item}>
                <ItemDetailsPopup item={item.item} placement="auto">
                  <td>
                    <ItemIcon item={item.item} className="prefix-icon" />
                    {item.item}
                  </td>
                </ItemDetailsPopup>
                <td className="text-end">{numberFormatter.format(item.produced)}</td>
                <td className="text-end">{numberFormatter.format(item.consumed)}</td>
                <OverlayTrigger key={item.item} overlay={getTooltip(item)} placement="right-end">
                  <td className={(item.net < 0 ? 'negative ' : '') + 'text-end'}>{numberFormatter.format(item.net)}</td>
                </OverlayTrigger>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Usage;
