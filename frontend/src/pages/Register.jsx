import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {toast} from "react-hot-toast";
import logo from '../assets/pizza.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser, selectIsUserSignedIn, selectUser } from '../utils/userSlice';
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserSignedIn = useSelector(selectIsUserSignedIn);
  const user=useSelector(selectUser);
  const [isSignIn, setIsSignIn] = useState(isUserSignedIn);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const resetFields = () => {
    setData({
      name: '',
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    resetFields();
  }, [isUserSignedIn]);

  useEffect(() => {
    if (isUserSignedIn && user.users[0]) {
      if (user.users[0].name === "Admin") {
        navigate("/admin");
      } else {
        navigate('/');
      }
    } else {
      navigate('/register'); 
    }
  }, [isUserSignedIn, user, navigate]);
  
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response = await axios.post('/register', formData);

      if (response.data.err) {
        toast.error(response.data.err);
      } else {
        resetFields();
        toast.success('Registered Successfully!!');
        setIsSignIn(true);
      }

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const responseData = await axios.post('/login', { email, password });

      if (responseData.data.err) {
        toast.error(responseData.data.err);
      } else {
        resetFields();
        toast.success('Login successful');
        dispatch(addUser((responseData.data)));
        
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };
  return (
    <section className="bg-white dark:bg-yellow-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <form className="w-full max-w-md" onSubmit={(e) => {
         e.preventDefault();
           if (isSignIn) {
            handleSignIn(e);
          } else {
           handleRegister(e);
          }
        }}>
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src={logo}
              alt=""
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              href="#"
              className={`${isSignIn ? "border-b-2 border-blue-500 dark:border-blue-400" : "border-b dark:border-gray-400"} w-1/3 pb-4  font-medium text-center text-gray-500 capitalize  dark:text-gray-300`}
              onClick={()=>setIsSignIn(true)}
            >
              sign in
            </button>

            <button
              href="#"
              className={`${!isSignIn ? "border-b-2 border-blue-500 dark:border-blue-400" : "border-b dark:border-gray-400"} w-1/3 pb-4 font-medium text-center text-gray-800 capitalize  dark:text-white`}
              onClick={()=>setIsSignIn(false)}
            >
              sign up
            </button>
          </div>

         { !isSignIn && <><div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input 
                type="text" 
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                placeholder="Username"
                value={data.name}
                onChange={(e)=>{setData({ ...data, name: e.target.value });}} />
            </div>

            <label for="dropzone-file" class="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-gray-500 border-dashed rounded-lg cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>

                <h2 class="mx-3 text-gray-400">Profile Photo</h2>

                <input id="dropzone-file" type="file" class="hidden" />
            </label>
            </>}

            <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input 
                type="email" 
                class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                placeholder="Email address" 
                value={data.email}
                onChange={(e)=>{setData({ ...data, email: e.target.value });}}/>
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input 
                type="password" 
                class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                placeholder="Password" 
                value={data.password}
                onChange={(e)=>{setData({ ...data, password: e.target.value });}}/>
            </div>
            {isSignIn && <button className='dark:text-white pt-3'>Forgot password?</button>}
          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium shadow-lg tracking-wide text-white capitalize transition-colors duration-300 transform bg-yellow-800 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
             { isSignIn ? "Sign In ": "Sign Up"}
            </button>

            <div className="mt-6 text-center">
              <button
                className="text-sm text-blue-500 hover:underline dark:text-white"
                onClick={()=>setIsSignIn(!isSignIn)}
              >
               {isSignIn ? "Don't have an account?" :"Already have an account?"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
