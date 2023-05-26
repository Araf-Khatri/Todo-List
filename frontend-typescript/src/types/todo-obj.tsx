export type TodoObj = {
  _id: string;
  userId?: string;
  name: string;
  description: string;
  completed: boolean;
};

export type ActionsObj = {
  payload?: TodoObj | string;
  id?: string;
  type: string;
};
