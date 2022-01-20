import ListItem from './ListItem';
import { UseFormFieldValues } from '../../types/form';
import { ListItemInterface } from '../../types/list';

interface ListProps {
  title?: string;
  list: ListItemInterface[];
  itemClassName?: string;
  enableCheck?: boolean;
  enableDelete?: boolean;
  enableSubmit?: boolean;
  onItemClick?: (id: number) => void;
  onItemComplete?: (id: number) => void;
  onItemDelete?: (id: number) => void;
  onItemEditSubmit?: (id: number, formData: UseFormFieldValues) => void;
}

function List(props: ListProps): JSX.Element {
  const {
    title,
    list,
    itemClassName,
    onItemClick,
    onItemEditSubmit,
    onItemComplete,
    onItemDelete,
    ...otherProps
  } = props;
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
        {...otherProps}
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
