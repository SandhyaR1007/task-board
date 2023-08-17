import moment from "moment/moment";
import { Draggable } from "react-beautiful-dnd";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";

const priorityColors = {
  Low: <AiOutlineArrowDown className="text-green-500 font-bold text-lg" />,
  High: <BiErrorCircle className="text-red-500 font-bold text-lg" />,
  Medium: <AiOutlineArrowUp className="text-yellow-500 font-bold text-lg" />,
};
const TaskCard = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="shadow-sm rounded-sm py-4 px-5 bg-white flex  flex-col gap-2 hover:bg-gray-200 transition"
        >
          <section className="flex justify-between">
            <h3 className="text-sm font-semibold">{task?.name}</h3>
            <h5>{priorityColors[task?.priority]}</h5>
          </section>
          <section>
            <p className="text-xs text-gray-400">{task?.summary}</p>
          </section>
          <section className="flex gap-4 items-end">
            <div>
              <span className="text-xs">Assignee:</span>{" "}
              <span className="font-semibold text-xs">{task?.assignee}</span>
            </div>
            <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">
              {moment(task?.startDate).format("MMM Do YY")}
            </span>
          </section>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
