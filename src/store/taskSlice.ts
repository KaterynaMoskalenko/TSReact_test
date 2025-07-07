import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import type { FullTask } from "@/models/Project";
import axios from "axios";


// Create an entity adapter for tasks создаем нормализов структуру
const tasksAdapter = createEntityAdapter<FullTask>();

const initialState = tasksAdapter.getInitialState({
  loading: false,
  error: null as string | null
});

export const updateTaskAsyncThunk = createAsyncThunk(
  'tasks/updateTask',
  async (
    {
      id,
      projectId,
      patch,
    }: { id: string; projectId: string; patch: Partial<FullTask> },
    thunkAPI
  ) => {
    try {
      const projectUrl = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
      // Получаем текущий проект
      const response = await axios.get(projectUrl);
      const project = response.data;

      // Обновляем нужную задачу
      const updatedTasks = (project.tasks ?? []).map((task: FullTask) =>
        task.id === id ? { ...task, ...patch } : task
      );

      const updatedProject = { ...project, tasks: updatedTasks };

      // Отправляем весь обновлённый проект
      const putResponse = await axios.put(projectUrl, updatedProject);
      return putResponse.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          error.response?.statusText ||
          'Ошибка при обновлении задачи через проект';
        return thunkAPI.rejectWithValue(msg);
      }
      return thunkAPI.rejectWithValue('Не удалось обновить задачу через проект');
    }
  }
);



const taskSlice = createSlice({
  name: "tasks",
    initialState,
    reducers: {
      // Tasks from Array of projects
      setTaskFromPProjects: (state, action: PayloadAction<{ projects: { name: string; id: string; tasks?: FullTask[] }[] }>) => {
        const allTasks = action.payload.projects.flatMap(project =>
          (project.tasks ?? []).map(task => ({
            ...task,
            key: task.id, // Добавляем ключ для React
            projectId: project.id, // ✅ Добавляем projectId

            projectTitle: project.name || 'Unknown Project'
          }))
        );
        tasksAdapter.setAll(state, allTasks);
      },
        addTask: tasksAdapter.addOne,
        removeTask: tasksAdapter.removeOne,
        updateTask: tasksAdapter.updateOne,
       
    },
    extraReducers: (builder) => {
        builder
            // .addCase("tasks/fetchTasks/pending", (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase("tasks/fetchTasks/fulfilled", (state, action: any) => {
            //     tasksAdapter.setAll(state, action.payload);
            //     state.loading = false;
            // })
            // .addCase("tasks/fetchTasks/rejected", (state, action: any) => {
            //     state.loading = false;
            //     state.error = action.error?.message || "Failed to load tasks";
            // })
            .addCase(updateTaskAsyncThunk.fulfilled, (state, action) => {
                tasksAdapter.upsertOne(state, action.payload);
});

    }
});

export default taskSlice.reducer;
export const { setTaskFromPProjects } = taskSlice.actions;

