import { FC } from 'react';
import { OverlayTriggerProps } from 'react-bootstrap/OverlayTrigger';
import { RecipeData, RecipeId } from '@/data/MedievalDynasty';
import { OverlayTrigger, Popover, PopoverBody } from 'react-bootstrap';
import RecipeDetailsRow, { RecipeDetailsRowProps } from '@/controls/MedievalDynasty/RecipeDetailsRow.tsx';
import ScrollingTable from '@/controls/ScrollingTable.tsx';

export interface RecipeListPopupProps
  extends Omit<OverlayTriggerProps, 'overlay'>,
    Omit<RecipeDetailsRowProps, 'recipe' | 'showSkill' | 'tr'> {
  enable?: boolean;
  recipes: Partial<Record<RecipeId, RecipeData>>;
}

const RecipeListPopup: FC<RecipeListPopupProps> = ({
  children,
  recipes,
  enable = true,
  showName = true,
  showBuildingName = true,
  ...props
}) => {
  const entries = Object.entries(recipes);
  const overlay = (
    <Popover className="popover-auto-width">
      <PopoverBody>
        <ScrollingTable size="sm" className="mb-0">
          <thead>
            <tr>
              {showName && <th>Recipe</th>}
              {showBuildingName && <th>Building</th>}
              <th>Ingredients</th>
              <th>Production</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([id, recipe]) => (
              <RecipeDetailsRow
                recipe={recipe}
                showSkill={false}
                showName={showName}
                showBuildingName={showBuildingName}
                key={id}
              />
            ))}
          </tbody>
        </ScrollingTable>
      </PopoverBody>
    </Popover>
  );

  return enable && entries.length > 0 ? (
    <OverlayTrigger overlay={overlay} {...props}>
      {children}
    </OverlayTrigger>
  ) : (
    <>{children}</>
  );
};

export default RecipeListPopup;
