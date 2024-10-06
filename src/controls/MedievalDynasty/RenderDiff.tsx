import React from 'react';
import { Diff as DiffObject } from 'deep-diff';

export interface DiffProps {
  diff?: DiffObject<any, any>[];
  left?: object;
  right?: object;
}

const RenderDiff: React.FC<DiffProps> = ({ diff }) => {
  function renderChange(d: DiffObject<any, any>): string {
    switch (d.kind) {
      case 'N':
        return 'null -> ' + JSON.stringify(d.rhs) + '\n';
      case 'D':
        return JSON.stringify(d.lhs) + ' -> null\n';
      case 'E':
        return JSON.stringify(d.lhs) + '->' + JSON.stringify(d.rhs) + '\n';
      case 'A':
        return '[' + d.index + ']' + renderChange(d.item) + '\n';
    }
  }

  return (
    <div className="border-bottom">
      {diff?.map((d, index) => (
        <div key={index}>
          {d.path?.join('.')}: {renderChange(d)}
        </div>
      ))}
    </div>
  );
};

export default RenderDiff;
