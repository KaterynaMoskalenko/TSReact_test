import React from 'react';
import { Link } from 'react-router';
import './Header.scss'

const NAVIGATION = [
   {
        id: 'MAIN',
        title: 'Main',
        url: '/',
    },
     {
        id: 'PROJECT',
        title: 'Projects',
        url: '/manager',
    },
    {
        id: 'TASK',
        title: 'Tasks',
        url: '/tasks',
    },

]


export default function Header() {
  return (
    <header>
         <nav>
            <ul>
                {NAVIGATION.map(item => (
                    <li key={item.id}>
                        <Link to={item.url}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
      
      
    </header>
  )
}
