import { useKanbanStore } from '../store/kanbanStore';
import { FiPlus } from 'react-icons/fi';

export default function Sidebar() {
  const { projects, currentProjectId, addProject, selectProject, deleteProject } = useKanbanStore();
  
  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-4 border-r min-h-screen">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id} className="group relative">
            <button
              className={`w-full text-left p-2 rounded ${
                currentProjectId === project.id 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
              onClick={() => selectProject(project.id)}
            >
              {project.name}
            </button>
            <button
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 text-red-500"
              onClick={() => handleDeleteProject(project.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={() => {
          const name = prompt('Project name:');
          if (name) addProject(name);
        }}
      >
        <FiPlus /> New Project
      </button>
    </aside>
  );
}
