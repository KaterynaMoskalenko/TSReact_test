import {useParams, useNavigate} from 'react-router';
import { useDispatch, useSelector} from 'react-redux';
import type { RootState } from '@/main';
import type {Project} from '@/models/Project';
import { updateProject } from '@/store/ProjectSlice';
import ProjectEditForm from './ProjectEditForm';
import type { AppDispatch } from '@/main';


export default function ProjectDetailUpdate() {
    const { id } = useParams<{ id: string }>();

    const project = useSelector((state: RootState) => // получить данные из глобального состояния Redux.
    state.projects.projects.find((p) => String(p.id) === id) as Project
);
console.log('project from Redux:', project);
//const dispatch = useDispatch();
const dispatch = useDispatch<AppDispatch>(); //Типизир dispatch, для удобн и безоп с асинх экшенами (thunk).
const navigate = useNavigate();


    const handleSubmit = async (updatedProject: Project) => {
        console.log('SUBMIT');
            dispatch(updateProject(updatedProject));
            console.log(updateProject) 
        
             navigate(`/projects-list`); // возвращение на детальную страницу


    };

    if (!id || !project) return <p>🔍 Project is not found. Try again</p>;



    return <ProjectEditForm project={project} onSubmit={handleSubmit} />;

   

}