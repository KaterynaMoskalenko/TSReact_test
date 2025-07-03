import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { updateTask } from '@/store/taskSlice';
import { AppDispatch } from '@/main';
import { fetchTasks } from '@/store/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/main';
// import the selector if you have one, otherwise remove this line
import type { FullTask } from '@/models/Project';
import CreateTaskForm from '@/components/Task/CreateTaskForm';

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

     <div className="task-list">
      {tasks.map((task) => (
        <Formik<FullTask>
          key={task.id}
          initialValues={task}
          onSubmit={(values) => { dispatch(updateTask(values)); }}
        >
          <Form className="task-card">
            <div>
              <label><strong>Название:</strong></label>
              <Field name="title" />
            </div>

            <div>
              <label><strong>Статус:</strong></label>
              <Field as="select" name="status">
                <option value="новая">новая</option>
                <option value="в процессе">в процессе</option>
                <option value="завершена">завершена</option>
              </Field>
            </div>

            <div>
              <label><strong>Приоритет:</strong></label>
              <Field as="select" name="priority">
                <option value="низкий">низкий</option>
                <option value="средний">средний</option>
                <option value="высокий">высокий</option>
              </Field>
            </div>

            <div>
              <label><strong>Срок:</strong></label>
              <Field name="deadline" type="date" />
            </div>

            <div>
              <label><strong>Ответственный:</strong></label>
              <Field name="assignedTo" />
            </div>

            <div>
              <label><strong>Описание:</strong></label>
              <Field as="textarea" name="description" />
            </div>

            <div>
              <label><strong>Завершено:</strong></label>
              <Field type="checkbox" name="completed" />
            </div>

            <button type="submit">Сохранить</button>
          </Form>
        </Formik>
      ))}
    </div>

  </div>
);
};