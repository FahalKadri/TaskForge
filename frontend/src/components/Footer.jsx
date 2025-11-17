const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 w-full text-center py-2 text-sm tracking-wide border-t backdrop-blur-md z-40
        ${
          darkMode
            ? "bg-slate-900/80 text-gray-400 border-slate-800"
            : "bg-gray-100/80 text-gray-600 border-gray-300"
        }`}
    >
      <div className="max-w-3xl mx-auto">
        <p>
          Built by{" "}
          <span className="font-semibold text-indigo-500">TaskForge</span>
        </p>
        <p className="text-xs mt-1">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
