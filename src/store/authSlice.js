//import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { isAuth: localStorage.getItem("isAuth") === "true" },
//   reducers: {
//     login: (state, action) => {
//       if (action.payload.username === "admin" && action.payload.password === "admin") {
//         state.isAuth = true;
//         //localStorage.setItem("isAuth", "true");
//       }
//     },
//     logout: (state) => {
//       state.isAuth = false;
//       localStorage.removeItem("isAuth");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронное действие для входа пользователя (замените на реальный API вызов)
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    // Симуляция задержки запроса (например, вызов API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === 'admin' && password === 'adminpass') {
      return { username, role: 'admin', token: 'admin-token' };
    } else if (username === 'manager' && password === 'managerpass') {
        localStorage.setItem('userPassword', password);


      return { username, role: 'manager', token: 'manager-token' };
    }  else if (username === 'user' && password === 'userpass') { // Добавляем третий случай
      return { username, role: 'user', token: 'user-token' };
    } else {
      // Возвращаем отклонённый промис с ошибкой
      return thunkAPI.rejectWithValue('Неверное имя пользователя или пароль');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { username: action.payload.username, role: action.payload.role };
        state.token = action.payload.token;
        state.isAuth = true; // Добавляем обновление флага авторизации

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;