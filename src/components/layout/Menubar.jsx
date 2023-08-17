import { AiFillFolder } from "react-icons/ai";
import { BsBarChartSteps } from "react-icons/bs";
import { NavLink } from "react-router-dom";
const Menubar = () => {
  return (
    <div className="bg-gray-800 text-white  px-2 py-8 w-16 fixed top-0 bottom-0">
      <ul className="flex flex-col gap-5 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-emerald-500" : "text-white"
            }
          >
            <AiFillFolder className="text-2xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "text-emerald-500" : "text-white"
            }
          >
            <BsBarChartSteps className="text-2xl" />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menubar;
