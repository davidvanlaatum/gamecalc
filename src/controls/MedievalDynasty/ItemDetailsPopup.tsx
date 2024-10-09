import { FC } from 'react';
import { OverlayTrigger, Popover, PopoverBody, Table } from 'react-bootstrap';
import { OverlayTriggerProps } from 'react-bootstrap/OverlayTrigger';
import { Item, itemCalculatedProperties, itemProperties, rotRates, technologyLevels } from '@/data/MedievalDynasty';
import ItemIcon from '@/controls/MedievalDynasty/ItemIcon.tsx';
import ItemEffectControl from '@/controls/MedievalDynasty/ItemEffectControl.tsx';
import BuildingIcon from '@/controls/MedievalDynasty/BuildingIcon.tsx';

export interface ItemDetailsPopupProps extends Omit<OverlayTriggerProps, 'overlay'> {
  item: Item;
  enable?: boolean;
}

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const ItemDetailsPopup: FC<ItemDetailsPopupProps> = ({ children, item, enable = true, ...props }) => {
  const {
    type,
    basePrice,
    weight,
    rots,
    plantingSeasons,
    harvestSeasons,
    technology,
    effects,
    provides,
    byproduct,
    grows,
  } = itemProperties[item] ?? {};
  const { usedInBuildings, usedInRecipes, producedInBuildings, producedInRecipes } =
    itemCalculatedProperties[item] ?? {};
  const popup = (
    <Popover className="popover-auto-width" {...props}>
      <PopoverBody className="p-2">
        <Table size="sm" className="mb-0" striped={false} borderless={true}>
          <tbody>
            <tr>
              <td colSpan={2} className="text-center">
                <ItemIcon item={item} />
              </td>
            </tr>
            {type && (
              <tr>
                <th>Type</th>
                <td>{type}</td>
              </tr>
            )}
            {weight !== undefined && (
              <tr>
                <th>Weight</th>
                <td>{weight} Kg</td>
              </tr>
            )}
            {technology && (
              <tr>
                <th>Technology</th>
                <td>
                  {technology?.type &&
                    (technology.type == 'None' ? (
                      'None'
                    ) : (
                      <div>
                        <BuildingIcon
                          className="prefix-icon"
                          building={technologyLevels[technology.type][technology.level ?? 0]?.[0]}
                        />
                        {technologyLevels[technology.type][technology.level ?? 0]?.[0]}{' '}
                        {technologyLevels[technology.type][technology.level ?? 0]?.[1]}
                        {' ('}
                        {technology.type} {technology.level}
                        {')'}
                      </div>
                    ))}
                </td>
              </tr>
            )}
            {provides && (
              <tr>
                <th>Provides</th>
                <td>
                  {provides.map((x) => (
                    <div key={x.item}>
                      <ItemIcon item={x.item} className="prefix-icon" /> {x.item} x {x.amount}
                    </div>
                  ))}
                </td>
              </tr>
            )}
            {rots && (
              <>
                <tr>
                  <th>Rot</th>
                  <td>
                    Inventory
                    <div className="float-end">{rotRates[rots][0] * 100}%</div>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    Non-food Storage
                    <div className="float-end ms-3">{rotRates[rots][1] * 100}%</div>
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    Food Storage
                    <div className="float-end">{rotRates[rots][2] * 100}%</div>
                  </td>
                </tr>
              </>
            )}
            {plantingSeasons && (
              <tr>
                <th>Seasons</th>
                <td>
                  {plantingSeasons?.[0]} -&gt; {harvestSeasons?.[0]}
                </td>
              </tr>
            )}
            {plantingSeasons?.[1] && (
              <tr>
                <th></th>
                <td>
                  {plantingSeasons?.[1]} -&gt; {harvestSeasons?.[1]}
                </td>
              </tr>
            )}
            {basePrice !== undefined && basePrice > 0 && (
              <>
                <tr>
                  <th>Buy for</th>
                  <td>
                    {new Array<number>(4)
                      .fill(basePrice * 1.5)
                      .map((x, i) => x - basePrice * (0.1 * i))
                      .map((x) => numberFormat.format(x))
                      .join(' / ')}
                  </td>
                </tr>
                <tr>
                  <th>Sell for</th>
                  <td>
                    {new Array<number>(4)
                      .fill(basePrice / 2)
                      .map((x, i) => x + basePrice * (0.1 * i))
                      .map((x) => numberFormat.format(x))
                      .join(' / ')}
                  </td>
                </tr>
              </>
            )}
            {grows && (
              <tr>
                <th>Grows</th>
                <td>
                  <ItemIcon item={grows} className="prefix-icon" />
                  {grows}
                </td>
              </tr>
            )}
            {effects && (
              <tr>
                <th>Effects</th>
                <td>
                  <ul>
                    {effects.map((effect) => (
                      <li key={effect.type}>
                        <ItemEffectControl effect={effect} />
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {byproduct && (
              <tr>
                <th>Byproduct</th>
                <td>
                  {byproduct?.item && (
                    <>
                      <ItemIcon item={byproduct.item} className="prefix-icon" />
                      {byproduct.item} x {byproduct?.amount}
                    </>
                  )}
                </td>
              </tr>
            )}
            {producedInBuildings.length > 0 && (
              <tr>
                <th>Produced In</th>
                <td>
                  {producedInBuildings.map((x) => (
                    <div key={x}>
                      <BuildingIcon building={x} className="prefix-icon" />
                      {x} (x{Object.values(producedInRecipes).filter((y) => y.building === x).length})
                    </div>
                  ))}
                </td>
              </tr>
            )}
            {usedInBuildings.length > 0 && (
              <tr>
                <th>Used In</th>
                <td>
                  {usedInBuildings.map((x) => (
                    <div key={x}>
                      <BuildingIcon building={x} className="prefix-icon" />
                      {x} (x{Object.values(usedInRecipes).filter((y) => y.building === x).length})
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </PopoverBody>
    </Popover>
  );
  return enable && !itemProperties[item]?.synthetic ? (
    <OverlayTrigger overlay={popup} {...props}>
      {children}
    </OverlayTrigger>
  ) : (
    <>{children}</>
  );
};

export default ItemDetailsPopup;
