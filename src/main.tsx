

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import projectsReducer from './store/ProjectSlice.js';



export const store = configureStore({
  reducer: {
    auth: authReducer, // Додаємо authSlice
    projects: projectsReducer,   
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
