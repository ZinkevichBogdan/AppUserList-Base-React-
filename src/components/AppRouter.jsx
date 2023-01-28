import React from 'react'
import { Routes, Route } from "react-router-dom";
import Posts from '../pages/Posts';
import { privateRoutes, publickRoutes } from '../router/router';
import Login from '../pages/Login';
import { useContext } from 'react';
import { AuthContext } from '../context';

function AppRouter() {
  const {isAuth}= useContext(AuthContext)
  console.log(isAuth)
   return (
      isAuth
         ?
         <Routes>
            {privateRoutes.map(privateRoute =>
               <Route
                  key={privateRoute.path}
                  element={<privateRoute.component />}
                  path={privateRoute.path}
                  exact={privateRoute.exact}
               />
            )}
            <Route path="*" element={<Posts />} />


         </Routes>
         :
         <Routes>
            {publickRoutes.map(privateRoute =>
               <Route
                  key={privateRoute.path}
                  element={<privateRoute.component />}
                  path={privateRoute.path}
                  exact={privateRoute.exact}
               />
            )}
            <Route path="*" element={<Login />} />
         </Routes>

   )
}

export default AppRouter
