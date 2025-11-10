import { api } from '../lib/api';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
   
    interface ISignupData{
        password:string;
        email:string;
      }
      const [loginData,setLoginData]=useState<ISignupData>({
        password:"",
        email:""
      });
      const [, setCookie,]=useCookies(["authToken"]);
      const navigate=useNavigate();

      const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault();
            const res=await api.post('/api/v1/login',{...loginData});
            const date = new Date();
            date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
            setCookie("authToken",res.data.data.authToken,{expires:date});
            toast.success(res.data.message, {
                position: "bottom-right",
                closeOnClick:true,
                theme:'dark'
              });
            navigate("/");
        } catch (error:any) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-right",
                closeOnClick:true,
                theme:'dark'
              });
            console.log(error.message);
        }
      }
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
                  value={loginData.email}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                  value={loginData.password}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <ToastContainer/>
        </div>
  )
};

export default Login;