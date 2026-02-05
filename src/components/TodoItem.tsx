import type { Todo, TodoStatus } from "../interfaces/TodoInterface";

// Definierar props för TodoItem-komponenten, inklusive todo-objektet och funktioner för att uppdatera status och radera todo
interface TodoItemProps {
    todo: Todo;
    onUpdateStatus: (id: number, status: TodoStatus) => void;
    onDeleteTodo: (id: number) => void;
}

// Funktionen som representerar TodoItem-komponenten
function TodoItem({ todo, onUpdateStatus, onDeleteTodo }: TodoItemProps) {

    // Funktion för att få rätt klass baserat på status
    const getStatusClass = (status: TodoStatus) => {
        switch (status) {
            case "Avklarad":
                return "status-avklarad";
            case "Pågående":
                return "status-pågående";
            case "Ej påbörjad":
                return "status-ej-påbörjad";
            default:
                return "";
        }
    };

    return (
        <article className={`todo-item ${getStatusClass(todo.status)}`}>
            <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
            </div>

            <div className="todo-actions">
                <select
                    value={todo.status}
                    onChange={(e) => onUpdateStatus(todo.id, e.target.value as TodoStatus)}
                    className="status-select"
                >
                    <option value="Ej påbörjad">Ej påbörjad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Avklarad">Avklarad</option>
                </select>

                <button onClick={() => onDeleteTodo(todo.id)} className="delete-btn" aria-label="Radera todo">×</button>
            </div>
        </article>
    );
}

export default TodoItem;
