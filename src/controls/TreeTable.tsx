import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export interface TreeTableData<K, C> {
  key: K;
  children: C[];
}

export interface TreeTableProps<K, C> {
  data: TreeTableData<K, C>[];
  firstColumnContents: (key: K) => React.ReactNode;
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
          const children = item.children;
          return (
            <React.Fragment key={rowId(key)}>
              <tr>
                <td>
                  <a
                    onClick={() => {
                      this.expand[key] = !this.expand[key];
                      this.forceUpdate();
                    }}
                  >
                    <i className={`bi bi-caret-${this.expand[key] ? 'down' : 'right'}`} />
                    &nbsp;{firstColumnContents(key)}
                  </a>
                </td>
                {remainingColumns(key, this.expand[key] ? children[0] : undefined)}
              </tr>
              {this.expand[key] &&
                children.slice(1).map((child) => (
                  <tr key={rowId(key, child)}>
                    <td></td>
                    {remainingColumns(key, child)}
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
      </>
    );
  }
}

export default TreeTable;
