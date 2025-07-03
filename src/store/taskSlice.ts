import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { FullTask } from "@/models/Project";
import axios from "axios";


// Create an entity adapter for tasks создаем нормализов структуру
const tasksAdapter = createEntityAdapter<FullTask>();

const initialState = tasksAdapter.getInitialState({
  loading: false,
  error: null as string | null
});

// work with axios. auto parsit JSON and create actions
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
    return response.data;
  } catch (error) {
    // Можна передати помилку далі, щоб її обробити у reducer
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch tasks');
    }
    return thunkAPI.rejectWithValue('Failed to fetch tasks');
  }
});


const taskSlice = createSlice({
  name: "tasks",
    initialState,
    reducers: {
        addTask: tasksAdapter.addOne,
        removeTask: tasksAdapter.removeOne,
        updateTask: tasksAdapter.updateOne,
        setTasks: tasksAdapter.setAll
    },
    extraReducers: (builder) => {
        builder
            .addCase("tasks/fetchTasks/pending", (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase("tasks/fetchTasks/fulfilled", (state, action: any) => {
                tasksAdapter.setAll(state, action.payload);
                state.loading = false;
            })
            .addCase("tasks/fetchTasks/rejected", (state, action: any) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to load tasks";
            });
    }
});

export default taskSlice;