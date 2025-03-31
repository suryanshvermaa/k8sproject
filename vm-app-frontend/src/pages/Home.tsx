import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Home: React.FC = () => {
    const [cookies,,removeCookie]=useCookies(["authToken"]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!cookies.authToken) navigate('/login');
    },[handleLogout])
    function handleLogout() {
        removeCookie("authToken");
        toast.success("You have Logout successfully",{
             closeOnClick:true,
            theme:'dark'
        })
    };

    const handleLaunchVM = () => {
        navigate('/vm');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <header className="flex justify-between items-center border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome to VM App</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </header>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center">
                        <img
                            src="/avatar.jpeg"
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-2 border-gray-300"
                        />
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">John Doe</h2>
                        <p className="text-gray-500">johndoe@example.com</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <button
                            onClick={handleLaunchVM}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                        >
                            Launch Virtual Machine
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Home;