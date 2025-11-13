const Navbar = ({ darkMode, setDarkMode, onNewTaskClick }) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 border-b backdrop-blur-md z-50 transition-all duration-300
        ${
          darkMode
            ? "bg-slate-900/80 border-slate-800 text-gray-200"
            : "bg-gray-100/80 border-gray-300 text-gray-800"
        }`}
    >
      {/* Logo / Brand */}
      <h1 className="text-xl font-semibold tracking-wide">
        TaskForge ⚙️
      </h1>

      <div className="flex items-center gap-4">
        {/* New Task Button */}
        <button
          onClick={onNewTaskClick}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-indigo-500 hover:bg-indigo-400 text-white"
            }`}
        >
          + New Task
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition
            ${
              darkMode
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700"
                : "bg-white border-gray-300 hover:bg-gray-200"
            }`}
          title="Toggle theme"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
