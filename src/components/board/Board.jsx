import { useEffect, useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import Header from "../layout/Header";
import { useTaskContext } from "../../context/TaskContext";

// fake data generator

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an task from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Board = () => {
  const { boardColumns, loading, tasksList } = useTaskContext();
  const [state, setState] = useState(boardColumns);
  useEffect(() => {
    setState(boardColumns);
  }, [tasksList]);
  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd].items, source.index, destination.index);
      const newState = { ...state };
      newState[sInd].items = items;
      setState(newState);
    } else {
      const result = move(
        state[sInd].items,
        state[dInd].items,
        source,
        destination
      );

      const newState = { ...state };
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];

      setState(newState);
    }
  }

  return (
    <div>
      <Header />
      <div className="flex w-[90vw] gap-4 bg-gray-100 flex-wrap md:flex-nowrap">
        {loading ? (
          <h1>Loading....</h1>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(state).map(([colId, el], ind) => (
              <div key={colId} className="sm:w-1/3 md:w-1/4">
                <h1
                  className={`text-sm text-neutral-600 uppercase font-semibold border-b-2 p-1 ${el.color}`}
                >
                  {el.title}
                </h1>
                <Droppable droppableId={`${colId}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="  flex flex-col gap-2 m-3"
                    >
                      {el.items.map((task, index) => (
                        <TaskCard task={task} key={task.id} index={index} />
                      ))}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default Board;
