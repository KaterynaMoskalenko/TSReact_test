import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router";

export default function MainPage() {
    
   const isAuth = useSelector(state => state.auth.isAuth);
  
   if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      Main
    </div>
  )
}
