export const initialState = {
  tasksList: [],
};

export const actionTypes = {
  updateTasks: "UPDATE_TASKS",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.updateTasks:
      return { ...state, tasksList: action.payload };
    default:
      return { ...state };
  }
};
