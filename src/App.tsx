import { useState, useEffect } from "react";
import type { Todo } from "./interfaces/TodoInterface";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/todoApi";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  // State för att lagra todos, laddningsstatus och eventuella felmeddelanden
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta todos när komponenten mountas(skapas och visas i DOM)
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Kunde inte hämta todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string, description: string) => {
    try {
      setError(null); // Rensa tidigare fel
      const newTodo = await createTodo({
        title,
        description,
        status: "Ej påbörjad",
      });
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError("Kunde inte skapa todo");
    }
  };

  const handleUpdateStatus = async (id: number, status: Todo["status"]) => {
    try {
      setError(null);   // Rensa tidigare fel
      const todoToUpdate = todos.find((t) => t.id === id);    // Hitta todo som ska uppdateras
      if (!todoToUpdate) return;

      const updated = await updateTodo(id, {    // Uppdatera todo med ny status
        ...todoToUpdate,
        status,
      });

      // Uppdatera state med den uppdaterade todon
      setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError("Kunde inte uppdatera todo");
      console.error(err);
    }
  };


  const handleDeleteTodo = async (id: number) => {
    try {
      setError(null); // Rensa tidigare fel
      await deleteTodo(id);

      // Uppdatera state genom att filtrera bort den raderade todon
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Kunde inte ta bort todo");
    }
  };

  if (loading) return <div className="loading">Laddar...</div>;

  return (
    // Huvudstrukturen för appen med rubrik, felmeddelanden, formulär för att lägga till todo och listan av todos
    <div className="app">
      <div className="pin-bl"></div>
      <div className="pin-br"></div>
      <h1>Lägg till To Dos</h1>

      {error && <div className="error-message">{error}</div>}

      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onUpdateStatus={handleUpdateStatus}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;

