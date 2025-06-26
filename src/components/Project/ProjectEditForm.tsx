import { Formik, Form, Field, FieldArray } from 'formik';
import type { Project } from '@/models/Project';


interface Props {
  project: Project;
  onSubmit: (values: Project) => void;
}

export default function ProjectEditForm({ project, onSubmit }: Props) {
  return (
    <Formik
  initialValues={{
    ...project,
    tasks: project.tasks ?? [],
    leads: project.leads ?? [],
  }}
  onSubmit={onSubmit}
>
      {({ values }) => (
        <Form>
          <Field name="name" placeholder="Project Name" />
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
                  <div key={task.id}>
                    <Field name={`tasks.${index}.title`} placeholder={`Task ${index + 1}`} />
                    <button type="button" onClick={() => remove(index)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => push({ id: Date.now(), title: '' })}>
                  ➕ Add Task
                </button>
              </div>
            )}
          </FieldArray>

          <h4>Leads</h4>
          {/* <FieldArray name="leads">
            {({ push, remove }) => (
              <div>
                {values.leads.map((lead, index) => (
                  <div key={index}>
                    <Field name={`leads.${index}`} placeholder={`Lead ${index + 1}`} />
                    <button type="button" onClick={() => remove(index)}>❌</button>
                  </div>
                ))}
                <button type="button" onClick={() => push('')}>➕ Add Lead</button>
              </div>
            )}
          </FieldArray> */}

          <br />
          <button type="submit">💾 Save</button>
        </Form>
      )}
    </Formik>
  );
}