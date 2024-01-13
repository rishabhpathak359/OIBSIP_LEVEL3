// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserSignedIn } from '../utils/userSlice';

const PrivateRoute = ({ element }) => {
  const isUserSignedIn = useSelector(selectIsUserSignedIn);

  return isUserSignedIn ? element : <Navigate to="/register" />;
};

export default PrivateRoute;
