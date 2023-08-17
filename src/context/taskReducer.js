export const initialState = {
  tasksList: [],
  searchQuery: "",
  filters: {
    severity: "",
    startDate: "",
    endDate: "",
  },
};

export const actionTypes = {
  updateTasks: "UPDATE_TASKS",
  updateSearchQuery: "UPDATE_SEARCH_QUERY",
  updateFilters: "UPDATE_FILTERS",
  clearFilters: "CLEAR_FILTERS",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.updateTasks:
      return { ...state, tasksList: action.payload };
    case actionTypes.updateSearchQuery:
      return { ...state, searchQuery: action.payload };
    case actionTypes.updateFilters:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };
    case actionTypes.clearFilters:
      return {
        ...state,
        searchQuery: "",
        filters: {
          severity: "",
          startDate: "",
          endDate: "",
        },
      };
    default:
      return { ...state };
  }
};
