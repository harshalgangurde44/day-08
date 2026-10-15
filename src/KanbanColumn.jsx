
import TaskCard from "./TaskCard";

function KanbanColumn({
  column,
  tasks,
  onDelete,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragOver,
}) {
  return (
    <section
      className={`kanban-column ${column.id} ${
        isDragOver ? "drag-over" : ""
      }`}
      onDrop={(event) => onDrop(event, column.id)}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <header className="column-header">
        <div className="column-title">
          <span className={`status-dot ${column.id}`} />
          <h2>{column.title}</h2>
        </div>

        <span className="task-count">{tasks.length}</span>
      </header>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}

        {tasks.length === 0 && (
          <div className="empty-column">
            Drop a task here
          </div>
        )}
      </div>
    </section>
  );
}

export default KanbanColumn;
