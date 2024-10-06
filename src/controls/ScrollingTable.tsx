import React, { useEffect, useRef, useState } from 'react';
import { Table as BootstrapTable, TableProps } from 'react-bootstrap';
import './ScrollingTable.css';

interface ScrollingTableProps extends TableProps {
  children: React.ReactNode;
}

const ScrollingTable: React.FC<ScrollingTableProps> = ({ children, className, style, ...props }) => {
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
      return [
        React.cloneElement(
          child,
          { className: 'scrollable-table-content' } as React.HTMLAttributes<HTMLElement>,
          child.props.children,
        ),
        React.cloneElement(
          child,
          { className: 'duplicate scrollable-table-content', ref: duplicate } as React.HTMLAttributes<HTMLElement>,
          child.props.children,
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
