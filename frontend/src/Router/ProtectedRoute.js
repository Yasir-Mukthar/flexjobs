import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user');

 useEffect(()=>{
    if (!user) {
        return navigate("/");
      }
 },[user,navigate])

  return element;
};

export const PublicRoute= ({element})=>{
  const navigate = useNavigate()
  const user = localStorage.getItem('user');

 useEffect(()=>{
    if (user) {
        return navigate("/");
      }
 },[user,navigate])

  return element;
}

export default ProtectedRoute;