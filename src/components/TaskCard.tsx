import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useKanbanStore } from '../store/kanbanStore';

export default function TaskCard({ task, isDragging = false }: { task: any; isDragging?: boolean }) {
  const { deleteTask } = useKanbanStore();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-600 p-4 rounded shadow hover:shadow-lg transition-shadow"
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium">{task.title}</h4>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              // Implement edit functionality
            }}
          >
            <FiEdit />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
          >
            <FiTrash />
          </button>
        </div>
      </div>
      {task.description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>}
    </div>
  );
}

