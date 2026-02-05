// Importerar React oc useState-hooken som används för att hantera formulärets tillstånd
import { useState } from "react";

// Beskriver props för TodoForm-komponenten (det som formuläret tar emot och skickar vidare till App-komponenten)
interface TodoFormProps {
    onAddTodo: (title: string, description: string) => void;
}

// Funktionen som representerar TodoForm-komponenten
function TodoForm({ onAddTodo }: TodoFormProps) {
    const [title, setTitle] = useState("");     // State för titel
    const [description, setDescription] = useState("");     // State för beskrivning
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});     // State för felmeddelanden

    const validate = (): boolean => {
        const newErrors: { title?: string; description?: string } = {};

        if (title.trim().length < 3) {
            newErrors.title = "Titeln måste vara minst 3 tecken";
        }

        if (description.length > 200) {
            newErrors.description = "Beskrivningen får max vara 200 tecken";
        }

        setErrors(newErrors);
        // Returnera true om inga fel finns
        return Object.keys(newErrors).length === 0;
    };

    // Funktion som körs när formuläret skickas
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();     // Förhindra att sidan laddas om vid formulärskickning

        if (validate()) {
            onAddTodo(title, description);
            setTitle("");
            setDescription("");
            setErrors({});
        }
    };

    // Rensa titelfel när användaren börjar skriva på nytt
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (errors.title) {
            setErrors({ ...errors, title: undefined });
        }
    };

    // Rensa beskrivningsfel när användaren börjar skriva på nytt
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (errors.description) {
            setErrors({ ...errors, description: undefined });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Lägg till ny To Do</h2>

            <div>
                <label htmlFor="title">Titel:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}    // När användaren skriver i titelfältet, uppdatera state
                />
                {errors.title && <span>{errors.title}</span>}
            </div>

            <div>
                <label htmlFor="description">Beskrivning (valfri):</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={3}
                />
                {errors.description && <span>{errors.description}</span>}
            </div>

            <button type="submit">Lägg till</button>
        </form>
    );
}

export default TodoForm;
