import { StatusChart } from "./StatusChart";
import { EffortsChart } from "./EffortsChart";

const Analytics = () => {
  return (
    <div className=" w-[80%] mx-auto flex flex-col gap-5  items-center  pt-5 ">
      <StatusChart />
      <EffortsChart />
    </div>
  );
};

export default Analytics;
