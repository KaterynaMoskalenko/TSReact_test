import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProject } from '../../store/ProjectSlice';

export default function DeleteProjectButton({ projectId}) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure?');
        if (confirmDelete) {
            dispatch(deleteProject(projectId))
        }
    }

  return (
    <div>
       <button onClick={handleDelete} >  Delete  </button>
    </div>
  )
}


