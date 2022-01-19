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
  onItemEditSubmit?: (id: number, formData: UseFormFieldValues) => void;
}

export enum ListType {
  ACTIVE_TO_DO,
  EXPIRED_TO_DO,
}
