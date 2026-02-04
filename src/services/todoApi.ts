import type { Todo } from "../types/Todo";

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