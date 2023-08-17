import { StatusChart } from "./StatusChart";
import { EffortsChart } from "./EffortsChart";

const Analytics = () => {
  return (
    <div className=" w-full flex flex-col gap-5  items-center  pt-5 ">
      <StatusChart />
      <EffortsChart />
    </div>
  );
};

export default Analytics;
