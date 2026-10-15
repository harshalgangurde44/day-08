
function TaskCard({ task, onDelete, onDragStart, onDragEnd }) {
    return (
      <article
        className="task-card"
        draggable
        onDragStart={(event) => onDragStart(event, task.id)}
        onDragEnd={onDragEnd}
      >
        <div className="task-card-header">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
  
          <button
            className="delete-btn"
            type="button"
            aria-label={`Delete ${task.title}`}
            onClick={() => onDelete(task.id)}
            draggable={false}
          >
            ×
          </button>
        </div>
  
        <h3>{task.title}</h3>
        <p className="task-id">Task #{task.id}</p>
        <span className="drag-hint">⠿ Drag to move</span>
      </article>
    );
  }
  
  export default TaskCard;
  