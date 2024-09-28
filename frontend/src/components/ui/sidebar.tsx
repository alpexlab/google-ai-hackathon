// Sidebar.tsx
const Sidebar = () => {
  return (
    <div className=" w-64 min-h-screen p-4 shadow-lg">
      {/* <h2 className="text-white text-lg font-semibold mb-4">AiDoc</h2> */}
      <ul className="text-black">
        <li className="py-2">
          <a href="#" className="flex items-center space-x-2 bg-blue-500 text-white p-2 rounded-md">
            <span>👤</span> {/* Icon placeholder */}
            <span>Patients</span>
          </a>
        </li>
        <li className="py-2">
          <a href="#" className="flex items-center space-x-2">
            <span>💬</span> {/* Icon placeholder */}
            <span>Chat</span>
          </a>
        </li>
        {/* Additional items if needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
