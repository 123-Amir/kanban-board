import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Task, ColumnId } from '../types';

interface KanbanState {
  projects: Project[];
  currentProjectId: string | null;
  darkMode: boolean;
  addProject: (name: string) => void;
  renameProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  editTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, toColumn: ColumnId) => void;
  toggleDarkMode: () => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      projects: [{
        id: 'demo',
        name: 'Demo Project',
        tasks: [{
          id: '1',
          title: 'Welcome to Kanban!',
          columnId: 'todo',
          createdAt: new Date().toISOString()
        }]
      }],
      currentProjectId: 'demo',
      darkMode: false,
      addProject: (name) => set((state) => ({
        projects: [...state.projects, {
          id: crypto.randomUUID(),
          name,
          tasks: []
        }]
      })),
      renameProject: (id, name) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, name } : p
        )
      })),
      deleteProject: (id) => set((state) => {
        const projects = state.projects.filter(p => p.id !== id);
        return {
          projects,
          currentProjectId: projects.length ? projects[0].id : null
        };
      }),
      selectProject: (id) => set({ currentProjectId: id }),
      addTask: (task) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === state.currentProjectId ? {
            ...p,
            tasks: [...p.tasks, {
              ...task,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString()
            }]
          } : p
        )
      })),
      editTask: (taskId, updates) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === state.currentProjectId ? {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId ? { ...t, ...updates } : t
            )
          } : p
        )
      })),
      deleteTask: (taskId) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === state.currentProjectId ? {
            ...p,
            tasks: p.tasks.filter(t => t.id !== taskId)
          } : p
        )
      })),
      moveTask: (taskId, toColumn) => set((state) => ({
        projects: state.projects.map(p => 
          p.id === state.currentProjectId ? {
            ...p,
            tasks: p.tasks.map(t => 
              t.id === taskId ? { ...t, columnId: toColumn } : t
            )
          } : p
        )
      })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'kanban-store' }
  )
);

