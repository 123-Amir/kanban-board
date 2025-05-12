import { DndContext, DragOverlay, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useKanbanStore } from '../store/kanbanStore';
import Column from './Column';
import TaskCard from './TaskCard';
import { useState } from 'react';
import { ColumnId } from '../types';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
] as const;

export default function Board() {
  const { projects, currentProjectId, moveTask } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<any>(null);
  const project = projects.find(p => p.id === currentProjectId);

  const handleDragStart = (event: any) => {
    setActiveTask(event.active.data.current?.task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    moveTask(
      active.id.toString(),
      over.data.current?.columnId as ColumnId
    );
    setActiveTask(null);
  };

  if (!project) return <div className="p-8">Select a project to get started</div>;

  return (
    <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-800">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {columns.map(column => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={project.tasks.filter(t => t.columnId === column.id)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} isDragging />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
