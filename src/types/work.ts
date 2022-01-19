export interface Work {
  id: number;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  expiredAt: Date;
}

export interface ToDoListData {
  list: Work[];
  lastId: number;
}
