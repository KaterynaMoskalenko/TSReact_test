import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
    <h1>404 - Страница не найдена</h1>
    <p>Извините, такой страницы не существует.</p>
    <Link to="/">Вернуться на главную</Link>
  </div>

  )
}
