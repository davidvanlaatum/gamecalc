import React, { useEffect, useRef, useState } from 'react';
import { Table as BootstrapTable, TableProps } from 'react-bootstrap';
import './ScrollingTable.css';

interface ExtendedTableProps extends TableProps {
  className?: string;
}

const ScrollingTable: React.FC<ExtendedTableProps> = ({ children, className, style, ...props }) => {
  const containerRef = useRef<HTMLTableElement>(null);
  const duplicate = useRef<HTMLTableSectionElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollDuration, setScrollDuration] = useState('10s');

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const contentHeight = containerRef.current.scrollHeight - (duplicate.current?.clientHeight ?? 0);
      setIsScrollable(contentHeight > containerHeight);
      const duration = contentHeight / 100; // Adjust the divisor to control speed
      setScrollDuration(`${duration}s`);
    }
  }, [children]);

  const wrappedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'tbody') {
      const element = child as React.ReactElement<HTMLElement>;
      return [
        React.cloneElement(
          element,
          { className: 'scrollable-table-content' },
          element.props.children as React.ReactNode,
        ),
        React.cloneElement(
          element,
          {
            className: 'duplicate scrollable-table-content',
            ref: duplicate,
          } as React.RefAttributes<HTMLTableSectionElement>,
          element.props.children as React.ReactNode,
        ),
      ];
    }
    return child;
  });

  return (
    <BootstrapTable
      ref={containerRef}
      className={['scrollable-table-container', className, isScrollable ? 'scrollable' : null]
        .filter((x) => x)
        .join(' ')}
      style={{ ...style, '--scroll-duration': scrollDuration } as React.CSSProperties}
      {...props}
    >
      {wrappedChildren}
    </BootstrapTable>
  );
};

export default ScrollingTable;
