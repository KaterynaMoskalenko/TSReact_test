
import 'antd/dist/reset.css'; // для Ant Design v5
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import projectsReducer from './store/ProjectSlice.js';
import taskReducer from './store/taskSlice'; 


export const store = configureStore({
  reducer: {
    auth: authReducer, // Додаємо authSlice
    projects: projectsReducer, 
    tasks: taskReducer,  
  }, 

});


const root = document.getElementById('root') as HTMLElement;
createRoot(root).render(
  <Provider store={store}>
      <App /> 
  </Provider>
);

// Типы хранилища
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
