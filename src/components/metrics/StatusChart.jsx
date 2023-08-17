import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useTaskContext } from "../../context/TaskContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Task Criticality Metrics",
      font: {
        size: 14,
      },
    },
  },
  responsive: true,
  interaction: {
    intersect: false,
  },

  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Ready", "In Progress", "Testing", "Done"];

const createChartData = (arr) => {
  let lowArr = arr
    .filter(({ priority }) => priority === "Low")
    .reduce(
      (acc, curr) => {
        if (curr.status === "Ready") {
          acc[0] = acc[0] + 1;
          return acc;
        }
        if (curr.status === "In Progress") {
          acc[1] = acc[1] + 1;
          return acc;
        }
        if (curr.status === "Testing") {
          acc[2] = acc[2] + 1;
          return acc;
        }
        if (curr.status === "Done") {
          acc[3] = acc[3] + 1;
          return acc;
        }
      },
      [0, 0, 0, 0]
    );
  let mediumArr = arr
    .filter(({ priority }) => priority === "Medium")
    .reduce(
      (acc, curr) => {
        if (curr.status === "Ready") {
          acc[0] = acc[0] + 1;
          return acc;
        }
        if (curr.status === "In Progress") {
          acc[1] = acc[1] + 1;
          return acc;
        }
        if (curr.status === "Testing") {
          acc[2] = acc[2] + 1;
          return acc;
        }
        if (curr.status === "Done") {
          acc[3] = acc[3] + 1;
          return acc;
        }
      },
      [0, 0, 0, 0]
    );
  let highArr = arr
    .filter(({ priority }) => priority === "High")
    .reduce(
      (acc, curr) => {
        if (curr.status === "Ready") {
          acc[0] = acc[0] + 1;
          return acc;
        }
        if (curr.status === "In Progress") {
          acc[1] = acc[1] + 1;
          return acc;
        }
        if (curr.status === "Testing") {
          acc[2] = acc[2] + 1;
          return acc;
        }
        if (curr.status === "Done") {
          acc[3] = acc[3] + 1;
          return acc;
        }
      },
      [0, 0, 0, 0]
    );
  return { lowArr, mediumArr, highArr };
};
export const getData = (tasksData) => {
  const { lowArr, mediumArr, highArr } = createChartData(tasksData);

  return {
    labels,
    datasets: [
      {
        label: "Low",
        data: lowArr,
        backgroundColor: "#55efc4",

        stack: "Stack 0",
      },
      {
        label: "Medium",
        data: mediumArr,
        backgroundColor: "#ffeaa7",
        stack: "Stack 1",
      },
      {
        label: "High",
        data: highArr,
        backgroundColor: "#fab1a0",
        stack: "Stack 2",
      },
    ],
  };
};

export const StatusChart = () => {
  const { tasksData } = useTaskContext();

  return (
    <div className=" h-96  p-2 w-[90%] ">
      <Bar
        options={options}
        data={getData(tasksData)}
        className="h-full mx-auto"
      />
    </div>
  );
};
