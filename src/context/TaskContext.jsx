import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionTypes, initialState, taskReducer } from "./taskReducer";
import { getTasksService } from "../utils/services";
import { useSearch } from "../utils/hooks/useSearch";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const { searchTasks } = useSearch();
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
          setTasksData(response?.data ?? []);
        }
      } catch (err) {
        console.log({ err });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateTasksList = (updatedTasks) => {
    dispatch({
      type: actionTypes.updateTasks,
      payload: updatedTasks,
    });
  };

  const updateSearchQuery = useCallback(
    (searchText) => {
      dispatch({
        type: actionTypes.updateSearchQuery,
        payload: searchText,
      });
    },
    [state]
  );

  const { readyTasks, inProgressTasks, testingTasks, doneTasks } = searchTasks(
    state.searchQuery,
    tasksData
  )?.reduce(
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
    Ready: {
      title: "Ready",
      items: readyTasks,
      color: "border-gray-400",
    },
    "In Progress": {
      title: "In Progress",
      items: inProgressTasks,
      color: "border-yellow-400",
    },
    Testing: {
      title: "Testing",
      items: testingTasks,
      color: "border-sky-400",
    },

    Done: {
      title: "Done",
      items: doneTasks,
      color: "border-green-400",
    },
  };
  return (
    <TaskContext.Provider
      value={{
        tasksList: state.tasksList,
        searchQuery: state.searchQuery,
        tasksData,
        setTasksData,
        boardColumns,
        loading,
        updateTasksList,
        updateSearchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
