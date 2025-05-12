import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import { FiPlus } from 'react-icons/fi';
import { useKanbanStore } from '../store/kanbanStore';
import { ColumnId } from '../types';

interface Props {
  id: ColumnId;
  title: string;
  tasks: any[];
}

export default function Column({ id, title, tasks }: Props) {
  const { addTask } = useKanbanStore();
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow"
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <button
        className="mt-4 w-full flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        onClick={() => {
          const title = prompt('Task title:');
          if (title) addTask({ title, columnId: id });
        }}
      >
        <FiPlus /> Add Task
      </button>
    </div>
  );
}
