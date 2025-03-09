import WindowHeader from "./WindowHeader";

function Panel({ title, children }) {
  return (
    <div className="w-full lg:w-1/2 flex flex-col">
      <WindowHeader title={title} />
      <div className="p-3 bg-white border border-gray-700 rounded-b-2xl h-[400px] sm:h-[500px] overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Panel;
