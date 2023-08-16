import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionTypes, initialState, taskReducer } from "./taskReducer";
import { getTasksService } from "../utils/services";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getTasksService();
        console.log({ response });
        if (response?.status === 200) {
          dispatch({
            type: actionTypes.updateTasks,
            payload: response?.data ?? [],
          });
        }
      } catch (err) {
        console.log({ err });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { readyTasks, inProgressTasks, testingTasks, doneTasks } =
    state?.tasksList?.reduce(
      (acc, curr) => {
        if (curr?.status === "Ready") {
          return { ...acc, readyTasks: [...acc.readyTasks, curr] };
        } else if (curr?.status === "In Progress") {
          return { ...acc, inProgressTasks: [...acc.inProgressTasks, curr] };
        } else if (curr?.status === "Testing") {
          return { ...acc, testingTasks: [...acc.testingTasks, curr] };
        } else if (curr?.status === "Done") {
          return { ...acc, doneTasks: [...acc.doneTasks, curr] };
        }
      },
      { readyTasks: [], inProgressTasks: [], testingTasks: [], doneTasks: [] }
    );
  const boardColumns = {
    ready: {
      title: "Ready",
      items: readyTasks,
      color: "border-gray-400",
    },
    inProgress: {
      title: "In Progress",
      items: inProgressTasks,
      color: "border-yellow-400",
    },
    testing: {
      title: "Testing",
      items: testingTasks,
      color: "border-sky-400",
    },

    done: {
      title: "Done",
      items: doneTasks,
      color: "border-green-400",
    },
  };
  return (
    <TaskContext.Provider
      value={{
        tasksList: state.tasksList,

        boardColumns,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
