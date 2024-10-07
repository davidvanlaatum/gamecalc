import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, getByText, queryByRole, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetailsPopup from '@/controls/MedievalDynasty/ItemDetailsPopup.tsx';
import { getItemIcon, Item, itemProperties } from '@/data/MedievalDynasty';
import { act } from 'react';
import '@/__tests__/matchers';

describe('ItemDetailsPopup', () => {
  Object.values(Item).forEach((item) => {
    it(`should render ${item} and trigger popup`, async () => {
      const { baseElement } = render(
        <ItemDetailsPopup item={item}>
          <span>Hover Me</span>
        </ItemDetailsPopup>,
      );
      // eslint-disable-next-line @typescript-eslint/require-await
      await act(async () => {
        fireEvent.mouseOver(getByText(baseElement, 'Hover Me'));
      });
      const props = itemProperties[item] ?? {};
      if (props.synthetic) {
        expect(queryByRole(baseElement, 'tooltip')).not.toBeInTheDocument();
      } else {
        const popup = (await waitFor(() => getByRole(baseElement, 'tooltip'))).getElementsByTagName('table').item(0)!;
        expect(popup).toBeInTheDocument();
        await waitFor(async () => {
          // eslint-disable-next-line @typescript-eslint/require-await
          await act(async () => {
            const expectedIcon = getItemIcon(item);
            const itemImg = popup.getElementsByTagName('img').item(0);
            expect(itemImg).toBeInTheDocument();
            expect(itemImg, baseElement.innerHTML).toHaveAttribute('src', expectedIcon);
          });
        });
        if (props.weight !== undefined) {
          const weight = getByText(popup, 'Weight').nextSibling;
          expect(weight).toBeInTheDocument();
          expect(weight).toHaveExactlyTextContent(`${props.weight} Kg`);
        }
      }
    });
  });
});
