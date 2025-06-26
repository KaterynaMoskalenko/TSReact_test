// ProjectsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {  fetchProjects } from '../store/ProjectSlice'; 
//   addProject,
//   updateProject,
//   deleteProject,
// } from '../store/ProjectSlice'; 

import ProjectForm from '../components/Project/ProjectForm';
import '../components/styles/ProjectPage.scss'
import { Link  } from 'react-router';


const ProjectsPage = () => {


  return (
    <section>
     
        <div className='wrapper'>

             <p className="intro-text">Welcome, manager!</p>
            <div className="navigation-links">
            <Link to="/create-project" className="nav-button green">
                🟢 Create new Project
            </Link>
            <p>or</p>
            <Link to="/projects-list" className="nav-button blue">
            🔵 go to the list of existing projects
            </Link>
        </div>


            
        </div>    
    </section>    
    );
};

export default ProjectsPage;
