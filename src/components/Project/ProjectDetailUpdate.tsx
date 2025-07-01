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

    const handleSubmit = (updatedProject: Project) => {
        console.log('Updated project:', updatedProject);
        // TODO: Implement actual update logic here
        // For now, just log the updated project data
    };

    if (!id || !project) return <p>🔍 Project is not found. Try again</p>;

    return <ProjectEditForm project={project} onSubmit={handleSubmit} />;

}