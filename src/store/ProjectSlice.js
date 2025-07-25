// projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import type { Project } from '@/models/Project';

// Фейковые данные для демонстрации
let fakeProjectsData = [
  {
    id: 1,
    name: 'Project 1',
    shortDescription: 'description project number 1',
    startDate: '01.01.2025',
    endDate: '01.01.2026',
    tasks: [
      { id: 1, title: 'Task #1' },
      { id: 2, title: 'Task #2' },
    ],
  },
  {
    id: 2,
    name: 'Project 2 ',
    shortDescription: 'description project number 2',
    startDate: '01.02.2025',
    endDate: '01.09.2026',
     tasks: [
       { id: 3, title: 'Task #3' },
    ],
  },
];

// fetch("https://mock-api-legt.onrender.com/projects")
console.log(import.meta.env.VITE_API_URL)

// Получение списка проектов
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, thunkAPI) => {
    try {
        //const response = await axios.get(`http://localhost:3001/projects`);
        //const response = await axios.get("https://mock-api-legt.onrender.com/projects")
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);

        //console.log(response);
        return response.data;
    } catch (error) {
      //send error in reducer
      return thunkAPI.rejectWithValue(error.message)
    }     
  }
);

// Создание нового проекта
export const addProject = createAsyncThunk(
  'projects/addProject',
  async (newProject, thunkAPI) => {
    try  {
      //const response = await axios.post(`http://localhost:3001/projects`, newProject);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, newProject);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }   
  }
);


// Обновление проекта с помощью дженерик <> наеписан 
// createAsyncThunk<Project, Project, ...>
// Первый Project — это то, что функция вернёт (обновлённый проект).
// Второй Project —  примет на вход ( данные, которые  обнов).
/**
 * @typedef {import('@/models/Project').Project} Project
 */

/**
 * @type {import('@reduxjs/toolkit').AsyncThunk<Project, Project, { rejectValue: string }>}
 */
/**
 * @typedef {import('@/models/Project').Project} Project
 */

/**
 * @type {import('@reduxjs/toolkit').AsyncThunk<Project, Project, { rejectValue: string }>}
 */

export const updateProject = createAsyncThunk(
//<
//Project,                 //thun возвращает 
//Project                  //thunk принимает     

  'projects/updateProject',
  async (updatedProject, thunkAPI) => {
    try {
      // PUT обновл сущность,  не созд новую
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/projects/${updatedProject.id}`,
        updatedProject
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка при обновлении проекта');
    }
  }
);

// Удаление проекта
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, thunkAPI) => {
      try {
         await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
        
          return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.delete || 'Error by removing')
    }   
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [...fakeProjectsData],
    loading: false,
    error: null,
  },
  reducers: {
    // Дополнительные синхронные редьюсеры можно добавить здесь
    addProject: (state, action) => {
      state.projects.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //======================//
      .addCase(addProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // добавили в Reduxproject
           })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //======================//
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        );
      })
       .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        console.log('deleted payload:', action.payload)
        state.projects = state.projects.filter(p => p.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});


export default projectsSlice.reducer;

// Селектор для получения списка проектов
// export const selectProjects = (state) => state.project.projects;
// export const selectProjectStatus = (state) => state.project.status;
