import { useState } from 'react'
import {BrowserRouter, Route, Routes, Link} from 'react-router';
import Header from './components/Header/Header';
import './App.css'
import { useSelector } from 'react-redux';
import MainPage from './pages/MainPage';
import ProjectsPages from './pages/ProjectsPages';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectList from './components/Project/ProjectList';
import ProjectForm from './components/Project/ProjectForm';

import ProjectDetailUpdate from './components/Project/ProjectDetailUpdate';

function App() {
  const [count, setCount] = useState(0);
  const isAuth = useSelector((state) => state.auth.isAuth) || localStorage.getItem("isAuth") === "true";
console.log('isAuth:', isAuth);


  return (
    <>
     <BrowserRouter>
    <Header />
   
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
    

         {isAuth && (
          <>
            <Route path="/manager" element={<ProjectsPages />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/projects-list" element={<ProjectList />} />
            <Route path='/projects/:id' element={<ProjectDetailUpdate />} />
            <Route path="/projects/:id/edit" element={<ProjectDetailUpdate />} />

          </>
        )} 
      </Routes>

      <footer></footer>
    </BrowserRouter>  

    </>
  )
}

export default App
