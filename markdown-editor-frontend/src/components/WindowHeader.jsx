function WindowHeader({ title }) {
  return (
    <div className="bg-gray-800 text-white flex items-center px-4 py-2 rounded-t-2xl">
      <div className="flex space-x-2 mr-3">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
      <span className="font-semibold">{title}</span>
    </div>
  );
}

export default WindowHeader;