import { useTaskContext } from "../../context/TaskContext";

const FilterBySeverity = () => {
  const {
    updateFilters,
    filters: { severity },
  } = useTaskContext();
  return (
    <select
      value={severity}
      onChange={(e) => updateFilters("severity", e.target.value)}
      className="text-sm text-gray-700 outline-none border rounded-md px-2 py-0.5 bg-white"
    >
      <option value="" disabled selected className="text-xs">
        Select Severity
      </option>
      <option value="Low" className="text-xs">
        Low
      </option>
      <option value="Medium" className="text-xs">
        Medium
      </option>
      <option value="High" className="text-xs">
        High
      </option>
    </select>
  );
};
const FilterByStartDate = () => {
  const {
    updateFilters,
    filters: { startDate },
  } = useTaskContext();
  return (
    <label className="text-sm text-gray-700  border rounded-md px-2 py-0.5 bg-white">
      <input
        type="date"
        className="outline-none"
        value={startDate}
        onChange={(e) => updateFilters("startDate", e.target.value)}
      />
    </label>
  );
};
const FilterByEndDate = () => {
  const {
    updateFilters,
    filters: { endDate },
  } = useTaskContext();
  return (
    <label className="text-sm text-gray-700  border rounded-md px-2 py-0.5 bg-white ">
      <input
        type="date"
        className="outline-none"
        value={endDate}
        onChange={(e) => updateFilters("endDate", e.target.value)}
      />
    </label>
  );
};

const ClearFilters = () => {
  const { clearFilters } = useTaskContext();
  return (
    <button
      onClick={clearFilters}
      className="px-2 py-0.5 rounded-md text-white bg-emerald-500 text-[0.65rem]"
    >
      Clear Filters
    </button>
  );
};
export { FilterBySeverity, FilterByStartDate, FilterByEndDate, ClearFilters };
