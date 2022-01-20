import ListItem from './ListItem';
import { UseFormFieldValues } from '../../types/form';
import { ListItemInterface, ListType } from '../../types/list';

interface ListProps {
  title?: string;
  list: ListItemInterface[];
  mode: ListType;
  itemClassName?: string;
  onItemClick?: (id: number) => void;
  onItemComplete?: (id: number) => void;
  onItemDelete?: (id: number) => void;
  onItemEditSubmit?: (id: number, formData: UseFormFieldValues) => void;
}

function List(props: ListProps): JSX.Element {
  const {
    title,
    list,
    mode,
    itemClassName,
    onItemClick,
    onItemEditSubmit,
    onItemComplete,
    onItemDelete,
  } = props;
  const makeItems = (): JSX.Element[] => {
    return list.map(item => (
      <ListItem
        key={item.id}
        mode={mode}
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
