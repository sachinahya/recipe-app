import { Divider } from '@material-ui/core';
import { CSSProperties, ReactElement } from 'react';
import { FixedSizeList } from 'react-window';

interface ListItemsProps<T> {
  children(props: { item: T; index: number; style?: CSSProperties }): ReactElement;
  items: T[];
  virtualized?: boolean;
  dividers?: boolean;
  height?: number;
  itemSize?: number;
  width?: string | number;
}

const ListItems = <T extends Record<string, unknown>>({
  children,
  items,
  virtualized,
  dividers,
  height,
  itemSize,
  width = '100%',
}: ListItemsProps<T>): ReactElement | null => {
  if (virtualized) {
    if (height == null || itemSize == null)
      throw new Error('Must specify height and itemSize props for virtualized lists.');
    return (
      <FixedSizeList height={height} itemCount={items.length} itemSize={itemSize} width={width}>
        {({ style, index }) => children({ item: items[index], index, style })}
      </FixedSizeList>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        if (dividers && index > 0) {
          return (
            <>
              <Divider />
              {children({ item, index })}
            </>
          );
        }

        return children({ item, index });
      })}
    </>
  );
};

export default ListItems;
