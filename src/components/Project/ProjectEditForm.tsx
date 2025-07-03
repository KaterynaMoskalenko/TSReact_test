import { Formik, Form, Field, FieldArray } from 'formik';
import type { Project } from '@/models/Project';
import type { Task } from '@/models/Project';
import type { Lead } from '@/models/Project';
import { useMemo } from 'react';
// хук React, который запоминает результат вычислений между рендерами, 
// если не изменились зависимости.
//  При каждом рендере компонента ProjectEditForm мы создаём объект initialValues.
// Без useMemo он будет пересоздаваться каждый раз, даже если project не изменился.
//  А это может привести к неожиданным эффектам (например, Formik сбросит состояние формы) или просто к лишним вычислениям.
//  Функция внутри useMemo один раз обрабатывает входной project:
//  Преобразует tasks и leads в массивы объектов с id и содержимым (title и value)
//  Если task или lead не имели id, мы создаём новый через generateId()
//  [project] — это массив зависимостей. Если project не изменится, React не будет пересоздавать initialValues.
// Formik отслеживает initialValues, и если они изменились — сбрасывает форму.
//  useMemo предотвращает нежелательные сбросы, потому что объект остаётся прежним между рендерами, пока project не поменяется.



const generateId = () => Math.random().toString(36).substring(2, 15);

interface Props {
  project: Project;
  onSubmit: (values: Project) => void;
}

export default function ProjectEditForm({ project, onSubmit }: Props) {
  //  компонент ничего не делает с данными: он просто собирает их и вызывает onSubmit.

    const initialValues= useMemo(() => ({
    ...project,
    tasks: (project.tasks ?? []).map((task) =>
//  оператор нулевого слияния (??) даёт безопасную замену- пустой массив []
      typeof task === 'string'
        ? { id: generateId(), title: task }
        : { id: task.id ?? generateId(), title: task.title }
    ),
    leads: (project.leads ?? []).map((lead) =>
      typeof lead === 'string'
        ? { id: generateId(), value: lead }
        : { id: lead.id ?? generateId(), value: lead.value }
    ),
  }), [project]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ values }) => (
        <Form>
          <Field name="name" placeholder="Project Name" /> 
          {/* - Field — это как input, но управляется Formik. */}
          <Field name="shortDescription" as="textarea" placeholder="Short Description" />
          <Field name="detailedDescription" as="textarea" placeholder="Detailed Description" />
          <Field name="startDate" type="date" />
          <Field name="endDate" type="date" />
          <Field name="budget" placeholder="Budget" />
          <Field name="risks" as="textarea" placeholder="Risks" />
          <Field name="communicationPlan" as="textarea" placeholder="Communication Plan" />
          <Field name="evaluationCriteria" as="textarea" placeholder="Evaluation Criteria" />

          <h4>Tasks</h4>
          <FieldArray name="tasks">
            {({ push, remove }) => (
              <div>
                {values.tasks.map((task, index) => (
                  <div key={task.id}                  >
                    <Field name={`tasks.${index}.title`} placeholder={`Task ${index + 1}`} />
                    <Field name={`tasks.${index}.id`} type="hidden" />
                    <button type="button" onClick={() => remove(index)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => push({id:generateId(), title: '' })}>
                  ➕ Add Task
                </button>
              </div>
            )}
          </FieldArray>

          <h4>Leads</h4>
          <FieldArray name="leads">
            {/* FieldArray позволяет работать с массивом полей, управляет массивом значений в форме, values.leads будет массив.
 This is Component*/}
           {({ push, remove }) => (
              <div>
                {values.leads.map((lead, index) => (
                  <div key={lead.id}>
                    <Field name={`leads.${index}.value`} placeholder={`Lead ${index + 1}`} />
                    <Field name={`leads.${index}.id`} type="hidden" />
                    <button type="button" onClick={() => remove(index)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => push({id: generateId(), value:''})}>➕ Add Lead</button>
              </div>
            )}
          </FieldArray>

          <br />
          <button type="submit">💾 Save</button>
        </Form>
      )}
    </Formik>
  );
}




























