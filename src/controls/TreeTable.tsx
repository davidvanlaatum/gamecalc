import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export interface TreeTableData<K, C> {
  key: K;
  children: C[];
}

export interface TreeTableProps<K, C> {
  data: TreeTableData<K, C>[];
  firstColumnContents: (key: K, children: C[]) => React.ReactNode;
  remainingColumns: (key: K, child?: C) => React.ReactNode;
  rowId: (key: K, child?: C) => string;
}

class TreeTable<K extends string, C> extends React.Component<TreeTableProps<K, C>> {
  expand: Partial<{ [key in K]: boolean }> = {};

  public expandAll() {
    for (const key of this.props.data.map((item) => item.key)) {
      this.expand[key] = true;
    }
    this.forceUpdate();
  }

  public collapseAll() {
    for (const key of this.props.data.map((item) => item.key)) {
      this.expand[key] = false;
    }
    this.forceUpdate();
  }

  public allExpanded() {
    return this.props.data.every((item) => this.expand[item.key]);
  }

  render() {
    const { data, rowId, remainingColumns, firstColumnContents } = this.props;
    return (
      <>
        {data.map((item) => {
          const key = item.key;
          return item.children.slice(0, this.expand[key] ? undefined : 1).map((child, index) => (
            <tr key={rowId(key, child)}>
              <td>
                {index == 0 && (
                  <button
                    onClick={() => {
                      this.expand[key] = !this.expand[key];
                      this.forceUpdate();
                    }}
                    className="expander"
                  >
                    <i className={`bi bi-caret-${this.expand[key] ? 'down' : 'right'}`} />
                    &nbsp;{firstColumnContents(key, item.children)}
                  </button>
                )}
              </td>
              {remainingColumns(key, this.expand[key] ? child : undefined)}
            </tr>
          ));
        })}
      </>
    );
  }
}

export default TreeTable;
