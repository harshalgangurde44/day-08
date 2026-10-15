import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import "./styles.css";

const INITIAL_TASKS = [
  { id: 1, title: "Build login page", priority: "High", status: "todo" },
  { id: 2, title: "Fix navigation bar", priority: "Medium", status: "todo" },
  { id: 3, title: "Integrate REST API", priority: "High", status: "inprogress" },
  { id: 4, title: "Set up project", priority: "Low", status: "done" },
];

const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "inprogress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  function handleAddTask(event) {
    event.preventDefault();

    const title = newTitle.trim();
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
      priority: newPriority,
      status: "todo",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle("");
    setNewPriority("Medium");
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleDragStart(event, id) {
    setDraggedId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(id));
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(event, columnId) {
    event.preventDefault();
    setDragOverColumn(columnId);
  }

  function handleDragLeave(event, columnId) {
    // Ignore transitions between children within the same column.
    if (
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setDragOverColumn((current) =>
      current === columnId ? null : current
    );
  }

  function handleDrop(event, status) {
    event.preventDefault();

    const id = Number(event.dataTransfer.getData("text/plain"));

    if (Number.isFinite(id) && id > 0) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );
    }

    setDraggedId(null);
    setDragOverColumn(null);
  }

  function handleDragEnd() {
    setDraggedId(null);
    setDragOverColumn(null);
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">PROJECT MANAGEMENT</p>
          <h1>Kanban Board</h1>
          <p className="subtitle">
            Organize your work, one task at a time.
          </p>
        </div>

        <div className="total-tasks">
          <span>Total tasks</span>
          <strong>{tasks.length}</strong>
        </div>
      </header>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="What needs to be done?"
          aria-label="New task title"
          maxLength={100}
        />

        <select
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
          aria-label="Task priority"
        >
          <option value="Low">Low priority</option>
          <option value="Medium">Medium priority</option>
          <option value="High">High priority</option>
        </select>

        <button className="add-btn" type="submit">
          + Add Task
        </button>
      </form>

      <div className="kanban-board">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              onDelete={handleDeleteTask}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragLeave={(event) =>
                handleDragLeave(event, column.id)
              }
              onDrop={handleDrop}
              isDragOver={dragOverColumn === column.id}
            />
          );
        })}
      </div>

      {draggedId !== null && (
        <p className="drag-status" aria-live="polite">
          Moving task #{draggedId} — drop it into a column.
        </p>
      )}
    </main>
  );
}

export default App;

