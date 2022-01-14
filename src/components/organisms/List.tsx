import React, { FormEvent } from 'react';
import ListItem, { ListItemInterface } from '../molecules/ListItem';

export interface ListProps {
  title?: string;
  list: ListItemInterface[];
  itemClassName?: string;
  onItemClick?: (id: number) => void;
  onItemComplete?: (id: number) => void;
  onItemDelete?: (id: number) => void;
  onItemEditSubmit?: (id: number, e: FormEvent<HTMLFormElement>) => void;
}

function List({
  title,
  list,
  itemClassName,
  onItemClick,
  onItemEditSubmit,
  onItemComplete,
  onItemDelete,
}: ListProps): JSX.Element {
  const makeItems = (): JSX.Element[] => {
    return list.map(item => (
      <ListItem
        key={item.id}
        item={item}
        className={itemClassName}
        onClick={onItemClick}
        onChangeStatus={onItemComplete}
        onDelete={onItemDelete}
        onEditSubmit={onItemEditSubmit}
      />
    ));
  };
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul>{makeItems()}</ul>
    </>
  );
}

export default List;