import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
  const priorityColors = {
    Low: "text-sky-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="shadow-sm rounded-sm py-4 px-5 bg-white flex  flex-col gap-2"
        >
          <section className="flex justify-between">
            <h3 className="text-sm font-semibold">{task?.name}</h3>
            <h5
              className={`text-xs font-bold ${
                task?.priority
                  ? priorityColors[task?.priority]
                  : "text-green-500"
              }`}
            >
              {task?.priority}
            </h5>
          </section>
          <section>
            <p className="text-xs text-gray-400">{task?.summary}</p>
          </section>
          <section className="flex gap-2 items-end">
            <div>
              <span className="text-xs">Assignee:</span>{" "}
              <span className="font-semibold text-sm">{task?.assignee}</span>
            </div>
            <span className="text-xs px-3 py-0.5 rounded-full bg-gray-200 text-gray-500">
              {task?.startDate}
            </span>
          </section>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
