import { useKanbanStore } from '../store/kanbanStore';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useKanbanStore();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
    </button>
  );
}
