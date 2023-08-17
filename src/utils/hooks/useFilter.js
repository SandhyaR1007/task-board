export const useFilter = () => {
  const filterBySeverity = (selectedValue, tasksData) => {
    return selectedValue.length > 0
      ? tasksData.filter(({ priority }) => priority === selectedValue)
      : tasksData;
  };
  const filterByStartDate = (selectedValue, tasksData) => {
    return selectedValue.length > 0
      ? tasksData.filter(
          ({ startDate }) => new Date(startDate) >= new Date(selectedValue)
        )
      : tasksData;
  };
  const filterByEndDate = (selectedValue, tasksData) => {
    return selectedValue.length > 0
      ? tasksData.filter(
          ({ endDate }) => new Date(selectedValue) >= new Date(endDate)
        )
      : tasksData;
  };
  return { filterBySeverity, filterByStartDate, filterByEndDate };
};
