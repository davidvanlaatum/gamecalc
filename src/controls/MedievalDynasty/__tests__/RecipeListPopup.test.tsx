import { describe, expect, it } from 'vitest';
import { fireEvent, getByRole, getByText, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeListPopup from '../RecipeListPopup';
import { act } from 'react';
import { RecipeData, RecipeId, recipes } from '@/data/MedievalDynasty';
import '@/__tests__/matchers';

describe('RecipeListPopup', () => {
  it('should render', async () => {
    const data = Object.entries(recipes).filter(([, d]) => d.name === 'Log') as [RecipeId, RecipeData][];
    const { baseElement } = render(
      <RecipeListPopup recipes={Object.fromEntries(data)}>
        <span>Hover Me</span>
      </RecipeListPopup>,
    );

    await act(async () => {
      fireEvent.mouseOver(getByText(baseElement, 'Hover Me'));
    });

    const popup = await waitFor(() => getByRole(baseElement, 'tooltip'));
    const headerRow = popup.querySelector('table thead tr')!;
    ['Recipe', 'Building', 'Ingredients', 'Production'].forEach((text, i) => {
      expect(headerRow.children[i]).toHaveTextContent(text);
    });

    const bodyRow = popup.querySelector('table tbody tr')!;
    ['Log', 'Woodshed', '2 x Axe Durability', '1 x Log'].forEach((text, i) => {
      expect(bodyRow.children[i]).toHaveExactlyTextContent(text);
    });

    await act(async () => {
      fireEvent.mouseOut(getByText(baseElement, 'Hover Me'));
    });

    expect(popup).not.toBeInTheDocument();
  });
});
