import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenderDiff from '../RenderDiff.tsx';
import { BuildingType, MedievalDynastyData } from '../../../data/MedievalDynasty';
import { diff } from 'deep-diff';

describe('RenderDiff', () => {
  it('should render', () => {
    const a: MedievalDynastyData = {
      requiredFood: 2,
      requiredWater: 3,
      buildings: [],
    };
    const b: MedievalDynastyData = {
      requiredWood: 1,
      requiredWater: 4,
      buildings: [
        {
          id: '1',
          type: BuildingType.Well,
          totalSkill: 1,
          production: {
            bucketOfWater: 10,
          },
        },
      ],
    };
    const d = diff(a, b);
    const r = render(<RenderDiff diff={d} left={a} right={b} />);
    expect(r.baseElement).toBeInTheDocument();
    expect(r.baseElement).toHaveTextContent(
      'requiredFood: 2 -> null requiredWater: 3->4 buildings: [0]null -> {"id":"1","type":"Well","totalSkill":1,"production":{"bucketOfWater":10}} requiredWood: null -> 1',
    );
  });
});
