import { FC } from 'react';
import ItemIcon from '@/controls/MedievalDynasty/ItemIcon.tsx';
import { DevelopmentStage, developmentStageProps, Item } from '@/data/MedievalDynasty';
import { OverlayTrigger, Popover, PopoverBody, Table } from 'react-bootstrap';

interface BuildingTaxProps {
  tax: number;
  developmentStage: DevelopmentStage;
}

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const BuildingTax: FC<BuildingTaxProps> = ({ tax, developmentStage }) => {
  const baseTax = tax / developmentStageProps[developmentStage].taxMultiplier;

  const popover = (
    <Popover>
      <PopoverBody>
        <Table striped={true} size="sm" className="mb-0">
          <tbody>
            {Object.entries(developmentStageProps)
              .filter(([, value]) => value.taxMultiplier > 0)
              .map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td className="number">
                    {numberFormat.format(baseTax * value.taxMultiplier)}{' '}
                    <ItemIcon item={Item.Coin} className="suffix-icon" />{' '}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </PopoverBody>
    </Popover>
  );

  return (
    <OverlayTrigger overlay={popover} placement="auto">
      <span className="ps-2">
        {numberFormat.format(tax)} <ItemIcon item={Item.Coin} className="suffix-icon" />
      </span>
    </OverlayTrigger>
  );
};

export default BuildingTax;
