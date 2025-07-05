import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { updateTask } from '@/store/taskSlice';
import { AppDispatch } from '@/main';
import { fetchTasks } from '@/store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/main';
// import the selector if you have one, otherwise remove this line
import type { FullTask } from '@/models/Project';


type Props = {}


export default function TasksPage({}: Props) {

  const dispatch = useDispatch<AppDispatch>(); 
  // If you want all tasks from all projects flattened into a single array:
  const tasks = useSelector((state: RootState) =>
    state.projects.projects.flatMap(project => project.tasks)
  ); // Получаем все задачи из Redux

//   Первая projects — имя slice (например, в store.ts: { projects: projectsReducer }).
// Вторая projects — массив проектов внутри slice'а.
//  flatMap():1.Проходит по каждому проекту 2. Извлекает массив tasks. «Сплющивает» все массивы задач в один большой массив.
// Результат: переменная tasks теперь содержит все задачи из всех проектов, единым массивом.

useEffect(() => {
  dispatch(fetchTasks())
}, [dispatch])

return (
  <div>
    <h1>Tasks</h1>    

    <ul>
      {tasks.map((task, idx) => (
        <li key={task.id ?? idx}>{task.title ?? 'Untitled Task'}</li>
      ))}
    </ul>
 

  </div>
);
};