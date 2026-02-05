import type { Todo, TodoStatus } from "../interfaces/TodoInterface";
import TodoItem from "./TodoItem";

// Definierar props för TodoList-komponenten, inklusive en array av todo-objekt och funktioner för att uppdatera status och radera todo
interface TodoListProps {
    todos: Todo[];
    onUpdateStatus: (id: number, status: TodoStatus) => void;
    onDeleteTodo: (id: number) => void;
}

// Funktionen som representerar TodoList-komponenten
function TodoList({ todos, onUpdateStatus, onDeleteTodo }: TodoListProps) {
    if (todos.length === 0) {
        return <p>Inga uppgifter ännu. Lägg till din första!</p>;
    }

    // Sortera todos efter status
    const sortedTodos = [...todos].sort((a, b) => {
        const statusOrder: { [key in TodoStatus]: number } = {
            "Pågående": 1,
            "Ej påbörjad": 2,
            "Avklarad": 3,
        };
        return statusOrder[a.status] - statusOrder[b.status];
    });

    return (
        // Rendera varje todo med TodoItem-komponenten
        <div>
            <h2>Mina To Dos ({todos.length})</h2>
            {sortedTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdateStatus={onUpdateStatus}
                    onDeleteTodo={onDeleteTodo}
                />
            ))}
        </div>
    );
}

export default TodoList;
