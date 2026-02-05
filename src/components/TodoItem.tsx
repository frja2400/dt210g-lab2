import type { Todo, TodoStatus } from "../interfaces/TodoInterface";

// Definierar props för TodoItem-komponenten, inklusive todo-objektet och funktioner för att uppdatera status och radera todo
interface TodoItemProps {
    todo: Todo;
    onUpdateStatus: (id: number, status: TodoStatus) => void;
    onDeleteTodo: (id: number) => void;
}

// Funktionen som representerar TodoItem-komponenten
function TodoItem({ todo, onUpdateStatus, onDeleteTodo }: TodoItemProps) {
    return (
        <div>
            <div>
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
            </div>

            <div>
                <select
                    value={todo.status}
                    onChange={(e) => onUpdateStatus(todo.id, e.target.value as TodoStatus)}
                >
                    <option value="Ej påbörjad">Ej påbörjad</option>
                    <option value="Pågående">Pågående</option>
                    <option value="Avklarad">Avklarad</option>
                </select>

                <button onClick={() => onDeleteTodo(todo.id)}>Radera</button>
            </div>
        </div>
    );
}

export default TodoItem;
