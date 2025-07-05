import './ProjectForm.scss';
import {
  Input, Button, DatePicker, InputNumber, Typography,
  Form as AntForm, Card, Divider
} from 'antd';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProject } from '../../store/ProjectSlice';
import { useNavigate } from 'react-router';
import moment from 'moment';

const { TextArea } = Input;

const ProjectSchema = Yup.object().shape({
   name: Yup.string().required("Name is required"),
   shortDescription: Yup.string().required("Description is required"),
   detailedDescription: Yup.string().required("Description is required"),
   startDate: Yup.date().required("Date is required"),
   endDate: Yup.date()
   .required("Date is required")
   .min(Yup.ref("startDate"), "End date must be after start date"),
   budget: Yup.number()
   .typeError("Must be a number")
   .positive("The budget must be positive")
   .required("Budget is required"),
});

export default function ProjectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card title="Create New Project" className="project-form-card">
      <Formik
        initialValues={{
          name: "",
          shortDescription: "",
          detailedDescription: "",
          startDate: "",
          endDate: "",
          budget: "",
          risks: "",
          communicationPlan: "",
          evaluationCriteria: "",
        }}
        validationSchema={ProjectSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await dispatch(addProject(values)).unwrap();
            resetForm();
            navigate("/projects-list");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
          <Form as={AntForm} layout="vertical" className="project-edit-form" >
            <AntForm.Item label="Project Name" validateStatus={touched.name && errors.name ? 'error' : ''} help={errors.name}>
              <Input name="name" value={values.name} onChange={handleChange} />
            </AntForm.Item>

            <AntForm.Item label="Short Description" help={errors.shortDescription}>
              <TextArea name="shortDescription" value={values.shortDescription} onChange={handleChange} />
            </AntForm.Item>

            <AntForm.Item label="Detailed Description" help={errors.detailedDescription}>
              <TextArea name="detailedDescription" value={values.detailedDescription} onChange={handleChange} />
            </AntForm.Item>

            <Divider orientation="left">Dates</Divider>
            <AntForm.Item label="Start Date" help={errors.startDate}>
              <DatePicker
                value={values.startDate ? moment(values.startDate) : null}
                onChange={(date, dateStr) => setFieldValue('startDate', dateStr)}
              />
            </AntForm.Item>

            <AntForm.Item label="End Date" help={errors.endDate}>
              <DatePicker
                value={values.endDate ? moment(values.endDate) : null}
                onChange={(date, dateStr) => setFieldValue('endDate', dateStr)}
              />
            </AntForm.Item>

            <Divider orientation="left">Additional</Divider>
            <AntForm.Item label="Budget" help={errors.budget}>
              <InputNumber name="budget" value={values.budget} onChange={(val) => setFieldValue('budget', val)} />
            </AntForm.Item>

          
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              💾 Save Project
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}