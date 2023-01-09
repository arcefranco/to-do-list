import { ToDo } from "./ToDo";

export interface InitialState {
  user?: string;
  todos: ToDo[];
  todosBackUp: ToDo[];
  title: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
