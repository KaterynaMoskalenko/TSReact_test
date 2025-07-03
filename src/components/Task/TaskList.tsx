import { Formik, Form, Field } from 'formik';
import { FullTask } from '@/models/Project';


interface TasksListProps {
    tasks: FullTask[];
    onUpdate: (updatedTask: FullTask) => void;
}

export default function TaskList({tasks, onUpdate}: TasksListProps) {
  return (
    
    
        <div>TaskList</div>
  )
}