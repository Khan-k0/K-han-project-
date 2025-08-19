import KanbanBoard from "./components/KanbanBoard";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <h1>Kanban (Trello 스타일)</h1>
      <KanbanBoard />
    </div>
  );
}
