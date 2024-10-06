import React from 'react';
import { OverlayTrigger, Popover, PopoverBody } from 'react-bootstrap';
// import { ResponsiveLine } from '@nivo/line';
import { Item, RecipeData } from '@/data/MedievalDynasty';
import ItemIcon from './ItemIcon.tsx';
import BuildingIcon from './BuildingIcon.tsx';

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 5,
});

export interface RecipeDetailsRowProps {
  recipe: RecipeData;
  showSkill?: boolean;
  tr?: boolean;
  showBuildingName?: boolean;
  showName?: boolean;
}

const RecipeDetailsRow: React.FC<RecipeDetailsRowProps> = ({
  recipe,
  showSkill = true,
  tr = true,
  showBuildingName = true,
  showName = true,
}) => {
  // const graphData = () => [
  //   {
  //     id: 'Value from Game',
  //     data: Object.entries(recipe.skillSamples ?? {}).map(([skill, value]) => {
  //       return {
  //         x: skill,
  //         y: value,
  //       };
  //     }),
  //   },
  //   {
  //     id: 'Calculated',
  //     data: [...Array(10).keys()].map((i) => {
  //       return {
  //         x: i + 1,
  //         y: ((recipe.skillMultiplier ?? 0) * (i + 1) * 100).toFixed(2),
  //       };
  //     }),
  //   },
  // ];
  const overlay = (
    <Popover className="popover-auto-width">
      <PopoverBody>
        <div style={{ width: '250px', height: '250px' }}>
          {/*<ResponsiveLine*/}
          {/*  data={graphData()}*/}
          {/*  axisLeft={{*/}
          {/*    legend: 'Production',*/}
          {/*    legendOffset: -30,*/}
          {/*    legendPosition: 'middle',*/}
          {/*  }}*/}
          {/*  axisBottom={{*/}
          {/*    legend: 'Skill',*/}
          {/*    legendOffset: 30,*/}
          {/*    legendPosition: 'middle',*/}
          {/*    format: '.0f',*/}
          {/*  }}*/}
          {/*  enableGridY={true}*/}
          {/*  colors={{ scheme: 'category10' }}*/}
          {/*  theme={{*/}
          {/*    text: {*/}
          {/*      fill: 'white',*/}
          {/*    },*/}
          {/*    tooltip: {*/}
          {/*      container: {*/}
          {/*        background: 'black',*/}
          {/*      },*/}
          {/*    },*/}
          {/*    crosshair: {*/}
          {/*      line: {*/}
          {/*        stroke: 'red',*/}
          {/*      },*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  margin={{ top: 5, right: 10, bottom: 35, left: 40 }}*/}
          {/*  yScale={{*/}
          {/*    type: 'linear',*/}
          {/*    min: 'auto',*/}
          {/*    max: 'auto',*/}
          {/*  }}*/}
          {/*  xScale={{*/}
          {/*    type: 'linear',*/}
          {/*    min: 'auto',*/}
          {/*    max: 'auto',*/}
          {/*  }}*/}
          {/*  isInteractive={true}*/}
          {/*  enableSlices={'x'}*/}
          {/*/>*/}
        </div>
      </PopoverBody>
    </Popover>
  );

  const skillSamples = Object.entries(recipe.skillSamples ?? {}).length ? (
    <OverlayTrigger overlay={overlay} placement="auto-start" trigger="click">
      <td>
        {Object.entries(recipe.skillSamples ?? {})
          .map(
            ([key, value]) =>
              `${value}@${key} (${numberFormatter.format(value - (recipe.skillMultiplier ?? 0) * parseInt(key) * 100)})`,
          )
          .join(', ')}
      </td>
    </OverlayTrigger>
  ) : (
    <td></td>
  );

  const body = (
    <>
      {showName ? (
        <td>
          <ItemIcon item={Object.keys(recipe.production)[0] as Item} className="prefix-icon" />
          {recipe.name}
        </td>
      ) : (
        ''
      )}
      {showBuildingName ? (
        <td>
          <BuildingIcon building={recipe.building} className="prefix-icon" />
          {recipe.building}
        </td>
      ) : (
        ''
      )}
      <td>
        {Object.entries(recipe.ingredients).map(([ingredient, count]) => (
          <span key={ingredient}>
            {count} x <ItemIcon item={ingredient as Item} className="prefix-icon" />
            {ingredient}
            <br />
          </span>
        ))}
      </td>
      <td>
        {Object.entries(recipe.production).map(([ingredient, count]) => (
          <span key={ingredient}>
            {count} x <ItemIcon item={ingredient as Item} className="prefix-icon" />
            {ingredient}
            <br />
          </span>
        ))}
      </td>
      {showSkill ? (
        <>
          <td>{recipe.skillMultiplier ? numberFormatter.format(recipe.skillMultiplier) : ''}</td>
          {skillSamples}
        </>
      ) : (
        ''
      )}
    </>
  );

  return tr ? <tr>{body}</tr> : body;
};

export default RecipeDetailsRow;
