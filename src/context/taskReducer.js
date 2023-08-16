export const initialState = {
  tasksList: [],
  searchQuery: "",
};

export const actionTypes = {
  updateTasks: "UPDATE_TASKS",
  updateSearchQuery: "UPDATE_SEARCH_QUERY",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.updateTasks:
      return { ...state, tasksList: action.payload };
    case actionTypes.updateSearchQuery:
      return { ...state, searchQuery: action.payload };
    default:
      return { ...state };
  }
};
