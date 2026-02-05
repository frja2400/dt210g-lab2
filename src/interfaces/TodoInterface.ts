export type TodoStatus = "Ej påbörjad" | "Pågående" | "Avklarad";

// Interface som representerar en todo
export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
}