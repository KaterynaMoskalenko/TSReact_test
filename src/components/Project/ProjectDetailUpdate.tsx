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
    state.projects.projects.find((p) => String(p.id) === id)
);

//const dispatch = useDispatch();
const dispatch = useDispatch<AppDispatch>(); //Типизир dispatch, для удобн и безоп с асинх экшенами (thunk).
const navigate = useNavigate();


    const handleSubmit = (updatedProject: Project) => {
        console.log('Updated project:', updatedProject);
            dispatch(updateProject(updatedProject));
             navigate(`/projects-list`); // возвращение на детальную страницу


    };

    if (!id || !project) return <p>🔍 Project is not found. Try again</p>;

    return <ProjectEditForm project={project} onSubmit={handleSubmit} />;

   

}