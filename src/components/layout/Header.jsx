import { AiOutlineArrowLeft } from "react-icons/ai";
const Header = () => {
  return (
    <header className="p-2">
      <section className="flex items-start gap-5">
        <span className="p-2 border rounded-sm cursor-not-allowed">
          <AiOutlineArrowLeft />
        </span>
        <section>
          <h1 className="text-lg text-gray-700 font-semibold">
            Basic Structure Kanban Project
          </h1>
          <p className="text-xs text-gray-400 font-semibold">Paymo SRL</p>
        </section>

        <span className="bg-emerald-400 text-[0.55rem] px-2 py-0.5 text-white rounded-3xl self-start mt-2">
          #BSKP
        </span>
      </section>
    </header>
  );
};

export default Header;
