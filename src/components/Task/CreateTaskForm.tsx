import { Formik, Form, Field } from 'formik';
import { FullTask } from '@/models/Project';


type Props = {}

export default function CreateTaskForm({}: Props) {
  const initialValues: Omit<FullTask, 'id'> = {
    title: '',
    status: 'новая',
    deadline: '',
    assignedTo: '',
    description: '',
    priority: 'средний',
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Отправка задачи на сервер:', values);
    // Здесь можно сделать dispatch или axios.post
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="task-form">
          <label>
            Название:
            <Field name="title" />
          </label>

          <label>
            Статус:
            <Field as="select" name="status">
              <option value="новая">новая</option>
              <option value="в процессе">в процессе</option>
              <option value="завершена">завершена</option>
            </Field>
          </label>

          <label>
            Дедлайн:
            <Field name="deadline" type="date" />
          </label>

          <label>
            Приоритет:
            <Field as="select" name="priority">
              <option value="низкий">низкий</option>
              <option value="средний">средний</option>
              <option value="высокий">высокий</option>
            </Field>
          </label>

          <label>
            Ответственный:
            <Field name="assignedTo" />
          </label>

          <label>
            Описание:
            <Field as="textarea" name="description" />
          </label>

          <label>
            Завершено:
            <Field type="checkbox" name="completed" />
          </label>

          <button type="submit">Добавить задачу</button>
        </Form>
      )}
    </Formik>

  )
}

// not UUSE!!!!!!!!!!