import { useDispatch, useSelector } from "react-redux";
import './ProjectList.scss';
import {  fetchProjects } from '../../store/ProjectSlice'; 
import { useEffect } from "react";
import DeleteProjectButton from './DeleteProjectButton';
import { useNavigate, useNavigation } from "react-router";

 export default function ProjectList() {
  const projects = useSelector((state) => state.projects.projects);
  //console.log(projects)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchProjects());
  },[])


  return (
    <div>
      <h2>current list of projects</h2>
      {projects.length === 0 ? (
        <p>Any projects</p>
      ) : (
        <ul>
                    {projects.map((project) => (
                        <li key={project.id} >
                          <div>
                              <strong>{project.name}</strong> — {project.shortDescription}
                              <p><em>Date of starting:</em> {project.startDate} | <em>Finaly date:</em> {project.endDate}</p>
                          </div>
                          <div className="wrapperBtn">
                              <button //onClick={() => toggleTasks(project.id)}
                              > Update
                              {/* {expandedProjectId === project.id ? 'Hide tasks' : 'Show tasks'} */}
                              </button>
                              <button onClick={() => {
                                console.log('project:', project);
                                navigate(`/projects/${project.id}/edit`)}
                              }>

                              Edit
                              </button>
                            
                              <DeleteProjectButton projectId={project.id} />

                          </div>
               
                        </li>
                    ))}
                    </ul>      
      )}
    </div>
  );
 }

