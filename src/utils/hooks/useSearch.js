export const useSearch = () => {
  const searchTasks = (searchQuery, tasksList) => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return searchQuery?.length
      ? tasksList.filter(
          ({ name, assignee, type }) =>
            name.toLowerCase().includes(lowercaseQuery) ||
            assignee.toLowerCase().includes(lowercaseQuery) ||
            type.toLowerCase().includes(lowercaseQuery)
        )
      : tasksList;
  };
  return { searchTasks };
};
