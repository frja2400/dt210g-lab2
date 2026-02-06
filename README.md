# Todo Frontend

Detta repository innehåller en frontend-applikation för att hantera todos, byggd med React, TypeScript och Vite. Applikationen kommunicerar med ett REST API och erbjuder full CRUD-funktionalitet med validering och sortering.

## Länk

Applikationen finns tillgänglig på följande URL: **http://159.223.216.135**

## Installation

För att installera och köra lokalt:

* `git clone https://github.com/frja2400/dt210g-lab2.git`
* `cd dt210g-lab2`
* `npm install`
* Starta utvecklingsservern: `npm run dev`


## Funktioner

* **Skapa todos** - Lägg till nya uppgifter med titel och beskrivning
* **Uppdatera status** - Ändra status mellan "Ej påbörjad", "Pågående" och "Avklarad"
* **Radera todos** - Ta bort uppgifter
* **Automatisk sortering** - Todos sorteras efter status (Pågående → Ej påbörjad → Avklarad)
* **Validering** - Titel måste vara minst 3 tecken, beskrivning max 200 tecken
* **Felhantering** - Visar felmeddelanden vid API-problem
* **Laddningsstatus** - Indikerar när data hämtas

## Projektstruktur
```
src/
├── components/
│   ├── TodoForm.tsx        # Formulär för att lägga till todos
│   ├── TodoItem.tsx        # Visar en enskild todo
│   └── TodoList.tsx        # Listar alla todos
├── interfaces/
│   └── TodoInterface.ts    # TypeScript-typer
├── services/
│   └── todoApi.ts          # API-kommunikation
├── App.tsx                 # Huvudkomponent
├── App.css                 # Styling
└── main.tsx                # Applikationens startpunkt
```

## Datamodell
```typescript
export type TodoStatus = "Ej påbörjad" | "Pågående" | "Avklarad";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
}
```

## API-kommunikation

Applikationen kommunicerar med ett REST API via följande funktioner:

| Funktion | Metod | Ändpunkt | Beskrivning |
|----------|-------|----------|-------------|
| `getTodos()` | GET | `/api/todo` | Hämtar alla todos |
| `createTodo()` | POST | `/api/todo` | Skapar ny todo |
| `updateTodo()` | PUT | `/api/todo/:id` | Uppdaterar todo |
| `deleteTodo()` | DELETE | `/api/todo/:id` | Raderar todo |

### API-konfiguration

API-URL:en är definierad i `src/services/todoApi.ts`:
```typescript
const API_URL = "http://159.223.216.135/api/todo";
```

## Validering

Formuläret validerar input innan det skickas till API:et:

* **Titel:** Minst 3 tecken (obligatorisk)
* **Beskrivning:** Max 200 tecken (valfri)

Valideringsfel visas direkt i formuläret och försvinner när användaren börjar skriva.

## Bygga för produktion
```bash
npm run build
```

Detta skapar en optimerad produktionsversion i `dist/`-mappen som kan publiceras till en webbserver.

## Backend

Denna frontend är byggd för att fungera med Todo API:
**https://github.com/frja2400/TodoAPI**
