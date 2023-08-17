import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTaskContext } from "../../context/TaskContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const getEffortSpent = (tasksData) => {
  const data = tasksData.reduce(
    (acc, { status, effortSpent }) => {
      if (status === "Ready") {
        acc[0] = acc[0] + effortSpent;
        return acc;
      }
      if (status === "In Progress") {
        acc[1] = acc[1] + effortSpent;
        return acc;
      }
      if (status === "Testing") {
        acc[2] = acc[2] + effortSpent;
        return acc;
      }
      if (status === "Done") {
        acc[3] = acc[3] + effortSpent;
        return acc;
      }
    },
    [0, 0, 0, 0]
  );
  return {
    labels: ["Ready", "In Progress", "Testing", "Done"],

    datasets: [
      {
        label: "Efforts Spent",
        data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const options = {
  plugins: {
    title: {
      display: true,
      text: "Efforts Spent Analytics",
      font: {
        size: 14,
      },
    },
  },
};
export const EffortsChart = () => {
  const { tasksData } = useTaskContext();
  return (
    <div className=" h-96  p-2 w-[90%] mx-auto">
      <Doughnut
        data={getEffortSpent(tasksData)}
        options={options}
        className="h-full  mx-auto"
      />
    </div>
  );
};
