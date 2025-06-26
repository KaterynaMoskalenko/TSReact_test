// projectsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

// Получение списка проектов
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:3001/projects`);
        console.log(response);
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
      const response = await axios.post(`http://localhost:3001/projects`, newProject);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }   
  }
);

// Обновление проекта
// export const updateProject = createAsyncThunk(
//   'projects/updateProject',
//   async (updatedProject) => {
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     fakeProjectsData = fakeProjectsData.map((p) =>
//       p.id === updatedProject.id ? { ...p, ...updatedProject } : p
//     );
//     return updatedProject;
//   }
// );

// Удаление проекта
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, thunkAPI) => {
      try {
         await axios.delete(`http://localhost:3001/projects/${id}`);
        
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
      // .addCase(updateProject.fulfilled, (state, action) => {
      //   state.projects = state.projects.map((p) =>
      //     p.id === action.payload.id ? { ...p, ...action.payload } : p
      //   );
      // })
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
