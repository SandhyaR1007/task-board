import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { actionTypes, initialState, taskReducer } from "./taskReducer";
import { getTasksService } from "../utils/services";
import { useSearch } from "../utils/hooks/useSearch";
import { useFilter } from "../utils/hooks/useFilter";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { searchTasks } = useSearch();
  const { filterBySeverity, filterByStartDate, filterByEndDate } = useFilter();
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

  const updateSearchQuery = (searchText) => {
    dispatch({
      type: actionTypes.updateSearchQuery,
      payload: searchText,
    });
  };

  const updateFilters = (filterType, filterValue) => {
    dispatch({
      type: actionTypes.updateFilters,
      payload: { filterType, filterValue },
    });
  };
  const clearFilters = () => {
    dispatch({
      type: actionTypes.clearFilters,
    });
    setSearchText("");
  };
  let filteredData = searchTasks(state.searchQuery, tasksData);
  filteredData = filterBySeverity(state.filters.severity, filteredData);
  filteredData = filterByStartDate(state.filters.startDate, filteredData);
  filteredData = filterByEndDate(state.filters.endDate, filteredData);

  const { readyTasks, inProgressTasks, testingTasks, doneTasks } =
    filteredData?.reduce(
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
        filters: state.filters,
        tasksData,
        searchText,
        setSearchText,
        setTasksData,
        boardColumns,
        loading,
        updateTasksList,
        updateSearchQuery,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
