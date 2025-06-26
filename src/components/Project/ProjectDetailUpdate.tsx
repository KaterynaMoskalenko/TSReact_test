import {useParams} from 'react-router';
import { useSelector} from 'react-redux';
import type { RootState } from '@/main';
import type {Project} from '@/models/Project';
import ProjectEditForm from './ProjectEditForm';




export default function ProjectDetailUpdate() {
    const { id } = useParams<{ id: string }>();

    const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => String(p.id) === id)
);
    if (!id || !project) return <p>🔍 Project is not found. Try again</p>;

    return <ProjectEditForm project={project} />;

}