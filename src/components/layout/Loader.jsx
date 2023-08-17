import { Skeleton } from "antd";

const Loader = ({ loading }) => {
  return (
    <div className="flex gap-5 flex-wrap p-3">
      {new Array(20).fill("card").map((data) => (
        <div className="w-64 bg-white p-3 rounded-sm">
          <Skeleton loading={loading} />
        </div>
      ))}
    </div>
  );
};

export default Loader;
