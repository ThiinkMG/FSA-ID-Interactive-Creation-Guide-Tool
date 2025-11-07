interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ darkMode: _darkMode, onToggleDarkMode: _onToggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo and branding */}
        <a
          href="https://www.mycollegefinance.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-3 group"
        >
          <img
            src="https://static.wixstatic.com/media/c24a60_2b6231b666214539ae22ebd2dffe7a09~mv2.png"
            alt="My College Finance Logo"
            className="w-[50px] sm:w-[65px] h-[50px] sm:h-[65px] object-contain transition-transform group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-brand-blue dark:text-blue-400">
              MY COLLEGE FINANCE
            </span>
            <span className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 tracking-wider uppercase font-medium">
              EDUCATE • MOTIVATE • ELEVATE
            </span>
          </div>
        </a>

        {/* Dark Mode Toggle - Hidden temporarily */}
        {/* <button
          onClick={onToggleDarkMode}
          className="flex items-center gap-2 rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 shadow-md border-2 border-gray-300 dark:border-gray-600"
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          aria-pressed={darkMode}
          title={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          <span className="text-2xl" aria-hidden="true">{darkMode ? "☀️" : "🌙"}</span>
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 hidden sm:inline">
            {darkMode ? "Light" : "Dark"}
          </span>
        </button> */}
      </div>
    </header>
  );
}
