import { UseFormFieldValues } from './form';

export interface ListItemInterface {
  id: number;
  title: string;
  isChecked: boolean;
  subTitle?: string;
}

export interface ListProps {
  title?: string;
  list: ListItemInterface[];
  itemClassName?: string;
  onItemClick?: (id: number) => void;
  onItemComplete?: (id: number) => void;
  onItemDelete?: (id: number) => void;
  onItemEditSubmit?: (id: number, values: UseFormFieldValues) => void;
}