// Importerar Todo-typen från TodoInterface.ts
import type { Todo } from "../interfaces/TodoInterface";

// Url till mitt API
const API_URL = "http://159.223.216.135/api/todo";

// Exporterar en asynkron funktion som returnerar en Promise med en array av Todo-objekt
export const getTodos = async (): Promise<Todo[]> => {
    //Gör ett fetch-anrop till API_URL
    const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
};

// Skapa ny todo (plocka bort id från Todo-typen eftersom det genereras av servern)
export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
};

// Uppdatera todo (skicka hela objektet inklusive id)
export const updateTodo = async (id: number, todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return todo;
};

// Ta bort todo med givet id och returnerar en Promise som inte returnerar något värde
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
};