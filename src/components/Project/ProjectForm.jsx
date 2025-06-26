import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProject } from '../../store/ProjectSlice'
import './ProjectForm.scss'
import { useNavigate } from "react-router";
import ProjectList from "./ProjectList";
import axios from 'axios';

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
        const newProject = { ...values };     
        
        try {
          await dispatch(addProject(newProject)).unwrap();
          alert("Project has been saved!");
          resetForm();
          navigate("/projects-list");
        } catch (error) {
           alert("Mistake while saving project 😢");
            console.error(error);
        }  
    }}

    >
      {({ isSubmitting }) => (
        <Form>
          {/* Общая информация */}
        <section className="sectionForm-create">
            <div>
                <h2>General information</h2>
                <Field name="name" placeholder="Project name" />
                <ErrorMessage name="name" component="div" />

                <Field name="shortDescription" placeholder="Brief description" />
                <ErrorMessage name="shortDescription" component="div" />

                <Field name="detailedDescription" placeholder="Extended description" />
                <ErrorMessage name="detailedDescription" component="div" />

                <Field type="date" name="startDate" />
                <ErrorMessage name="startDate" component="div" />

                <Field type="date" name="endDate" />
                <ErrorMessage name="endDate" component="div" />
            </div>
            <div className="wrapAdditionalForm">     
          
                <p>
                    {/* Бюджет */}
                    <h2>Budget</h2>
                    <Field type="number" name="budget" placeholder="Planned expenses" />
                    <ErrorMessage name="budget" component="div" />
                </p>
                <p>
                    {/* Риски */}
                    <h2>Risks</h2>
                    <Field name="risks" placeholder="Possible risks" />
                    <ErrorMessage name="risks" component="div" />
                </p>
                <p>    
                    {/* Коммуникации */}
                    <h2>Communications</h2>
                    <Field name="communicationPlan" placeholder="Каналы связи и график отчетности" />
                    <ErrorMessage name="communicationPlan" component="div" />
                </p>
                <p>   
                    {/* Оценка проекта */}
                    <h2>Project grade</h2>
                    <Field name="evaluationCriteria" placeholder="Communication channels and reporting schedule" />
                    <ErrorMessage name="evaluationCriteria" component="div" />
                </p>    
          </div>  
        </section>      

          <button className="btnFormCreate" type="submit" disabled={isSubmitting}>
            Create project
          </button>
        </Form>
      )}
    </Formik>
  );
}


