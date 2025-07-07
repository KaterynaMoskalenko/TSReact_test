import { useEffect, useState } from 'react';
import {setTaskFromPProjects} from '@/store/taskSlice';
import { AppDispatch } from '@/main';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/main';
// import the selector if you have one, otherwise remove this line
import type { FullTask } from '@/models/Project';
import TaskTable from '@/components/Task/TaskList';
import TaskFilterPanel from '@/components/Task/TaskFilterPanel';

type Props = {}

export default function TasksPage({}: Props) {

  const dispatch = useDispatch<AppDispatch>(); 
  const projects = useSelector((state: RootState) => state.projects.projects);
  const allTasks = useSelector((state: RootState) => state.tasks.entities);

  const [filters, setFilters] = useState({
    status: undefined as FullTask['status'] | undefined,
    assignedTo: undefined as string | undefined,
    deadlineBefore: undefined as string | undefined,
    priority: undefined as FullTask['priority'] | undefined,
  });
  
 
useEffect(() => {
  if (projects.length > 0) {
    const projectsWithStringId = projects.map(project => ({
      ...project,
      id: String(project.id),
    }));
    dispatch(setTaskFromPProjects({ projects: projectsWithStringId }));
  }
}, [dispatch, projects]);

const filteredTasks = Object.values(allTasks).filter(task => {
  if (!task) return false; // Skip if task is undefined
  return (!filters.status || task.status === filters.status) &&
         (!filters.assignedTo || task.assignedTo === filters.assignedTo) &&
          (!filters.deadlineBefore || (task.deadline && new Date(task.deadline) <= new Date(filters.deadlineBefore))) &&
           (!filters.priority || task.priority === filters.priority);
  });

  
  return (
    <div>
      <h1>All Tasks</h1>   
       <TaskFilterPanel onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))} />

      <TaskTable tasks={filteredTasks} />


    </div>
  );
};