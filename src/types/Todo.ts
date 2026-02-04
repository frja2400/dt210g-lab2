export type TodoStatus = "Ej påbörjad" | "Pågående" | "Avklarad";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
}