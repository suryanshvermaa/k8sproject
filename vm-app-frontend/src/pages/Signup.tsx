import { useState } from "react";
import { api } from "../lib/api";
import { ToastContainer, toast } from "react-toastify";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
    interface ISignupData{
        name:string;
        password:string;
        email:string;
      }
      const [signupData,setSignupData]=useState<ISignupData>({
        name:"",
        password:"",
        email:""
      });
      const [, setCookie,]=useCookies(["authToken"]);
      const navigate=useNavigate();

      const handleSignUp=async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault();
            const res=await api.post('/api/v1/signup',{...signupData});
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
        }
      }
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  onChange={(e)=>setSignupData({...signupData,name:e.target.value})}
                  value={signupData.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  onChange={(e)=>setSignupData({...signupData,email:e.target.value})}
                  value={signupData.email}
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
                  onChange={(e)=>setSignupData({...signupData,password:e.target.value})}
                  value={signupData.password}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
          <ToastContainer/>
        </div>
  )
}

export default Signup;