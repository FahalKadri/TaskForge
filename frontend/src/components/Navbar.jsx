import { Plus, Settings, Moon, Sun } from "lucide-react";

const Navbar = ({ darkMode, setDarkMode, onNewTaskClick }) => {
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav
      className={`flex justify-between items-center px-6 py-3 mx-auto mt-4 w-[90%] max-w-6xl 
        rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300
        ${
          darkMode
            ? "bg-[#0d1117]/70 border-slate-800"
            : "bg-white/60 border-gray-200"
        }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <span
          className={`font-semibold px-4 py-1.5 rounded-lg text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white`}
        >
          TaskForge
        </span>
        <Settings
          className={`${
            darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
          } transition cursor-pointer`}
          size={20}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onNewTaskClick}
          className={`px-4 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition 
            ${
              darkMode
                ? "bg-[#1e2329] hover:bg-[#2a3037] text-gray-200 border-slate-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
            }`}
        >
          <Plus size={16} /> New Task
        </button>

        <button
          onClick={toggleTheme}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition 
            ${
              darkMode
                ? "bg-[#1e2329] border border-slate-700 text-yellow-400"
                : "bg-gray-200 border border-gray-300 text-gray-800"
            }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
