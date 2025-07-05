
import {
  Form as AntForm,
  Input,
  Button,
  Typography,
  Divider,
  Space,
  Card,
  Row,
  Col
} from 'antd';
import { Formik, FieldArray, Form} from 'formik';
import { useMemo } from 'react';
import type { Project } from '@/models/Project';
import './ProjectEditForm.scss'; // Import your styles

const { TextArea } = Input;
const { Title, Text } = Typography;

const generateId = () => Math.random().toString(36).substring(2, 15);

interface Props {
  project: Project;
  onSubmit: (values: Project) => void;
}

export default function ProjectEditForm({ project, onSubmit }: Props) {
  const initialValues = useMemo(() => ({
    ...project,
    tasks: (project.tasks ?? []).map((task) => ({
      id: typeof task === 'string' ? generateId() : task.id ?? generateId(),
      title: typeof task === 'string' ? task : task.title,
      assignedTo: task.assignedTo ?? ''
    })),
    leads: (project.leads ?? []).map((lead) => ({
      id: typeof lead === 'string' ? generateId() : lead.id ?? generateId(),
      value: typeof lead === 'string' ? lead : lead.value
    })),

  }), [project]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange, setFieldValue }) => (
          <Form className="project-edit-form">

    
          <Card title="Edit Project">
            <Title level={4}>General Info</Title>

            <AntForm.Item label="Project Name">
              <Input name="name" value={values.name} onChange={handleChange} />
            </AntForm.Item>

            <AntForm.Item label="Short Description">
              <Input name="shortDescription" value={values.shortDescription} onChange={handleChange} />
            </AntForm.Item>

            <AntForm.Item label="Detailed Description">
              <TextArea
                name="detailedDescription"
                value={values.detailedDescription}
                onChange={handleChange}
                rows={3}
              />
            </AntForm.Item>

            <Divider orientation="left">Dates</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <AntForm.Item label="Start Date">
                  <Input
                    type="date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleChange}
                  />
                </AntForm.Item>
              </Col>
              <Col span={12}>
                <AntForm.Item label="End Date">
                  <Input
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleChange}
                  />
                </AntForm.Item>
              </Col>
            </Row>

            <AntForm.Item label="Budget">
              <Input
                type="number"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                // placeholder="Budget"
              />
            </AntForm.Item>

            <AntForm.Item label="Risks">
              <TextArea
                name="risks"
                value={values.risks}
                onChange={handleChange}
                rows={3}
                placeholder="List potential risks"
              />
            </AntForm.Item>

            <AntForm.Item label="Communication Plan">
              <TextArea
                name="communicationPlan"
                value={values.communicationPlan}
                onChange={handleChange}
                rows={3}
                placeholder="Describe communication plan"
              />
            </AntForm.Item>

            <AntForm.Item label="Evaluation Criteria">
              <TextArea
                name="evaluationCriteria"
                value={values.evaluationCriteria}
                onChange={handleChange}
                rows={3}
                placeholder="Define success metrics"
              />
            </AntForm.Item>
          </Card>

          <Divider orientation="left">Tasks</Divider>
          <FieldArray name="tasks">
            {({ push, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }}>
                {values.tasks.map((task, index) => (
                  <Card key={task.id} size="small">
                    <AntForm.Item label={`Task ${index + 1}`}>
                      <Input
                        name={`tasks.${index}.title`}
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Task title"
                      />
                    </AntForm.Item>

                    <AntForm.Item label="Assigned To">
                      <Input
                        name={`tasks.${index}.assignedTo`}
                        value={task.assignedTo}
                        onChange={handleChange}
                        placeholder="Responsible person's name"
                      />
                    </AntForm.Item>

                    <Button type="text" danger onClick={() => remove(index)}>
                      ❌ Remove Task
                    </Button>
                  </Card>
                ))}
                <Button type="dashed" onClick={() =>
                  push({ id: generateId(), title: '', assignedTo: '' })
                }>
                  ➕ Add Task
                </Button>
              </Space>
            )}
          </FieldArray>

          <Divider orientation="left">Leads</Divider>
          <FieldArray name="leads">
            {({ push, remove }) => (
              <Space direction="vertical" style={{ width: '100%' }}>
                {values.leads.map((lead, index) => (
                  <Card key={lead.id} size="small">
                    <AntForm.Item label={`Lead ${index + 1}`}>
                      <Input
                        name={`leads.${index}.value`}
                        value={lead.value}
                        onChange={handleChange}
                      />
                    </AntForm.Item>
                    <Button type="text" danger onClick={() => remove(index)}>
                      ❌ Remove Lead
                    </Button>
                  </Card>
                ))}
                {values.leads.length < 2 && (
                  <Button type="dashed" onClick={() =>
                    push({ id: generateId(), value: '' })
                  }>
                    ➕ Add Lead
                  </Button>
                )}
                {values.leads.length >= 2 && (
                  <Text type="danger">❗ Максимум 2 лидa на проект</Text>
                )}
              </Space>
            )}
          </FieldArray>

          <Divider />
          <Button type="primary" htmlType="submit">
            💾 Save Project
          </Button>
  
        </Form>
      )}
    </Formik>
  );
}















