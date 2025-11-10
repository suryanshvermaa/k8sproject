import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
    const [cookies,,removeCookie]=useCookies(["authToken"]);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!cookies.authToken) navigate('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cookies.authToken])
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
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl glass-card p-8">
                <header className="flex justify-between items-center border-b border-gray-700/40 pb-5 mb-6">
                    <h1 className="text-3xl font-extrabold tracking-tight gradient-text">Welcome to VM App</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded bg-red-600/80 hover:bg-red-600 text-white transition shadow"
                    >
                        Logout
                    </button>
                </header>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex flex-col items-center card-hover">
                        <img
                            src="/avatar.jpeg"
                            alt="Profile"
                            className="w-36 h-36 rounded-full ring-4 ring-purple-500/30 object-cover"
                        />
                        <h2 className="mt-5 text-2xl font-semibold text-gray-200">John Doe</h2>
                        <p className="text-sm text-gray-400">johndoe@example.com</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <p className="max-w-md text-gray-300 leading-relaxed text-sm md:text-base">Provision disposable development & browser workspaces in seconds. Your virtual machine will self‑terminate after the selected duration to save resources.</p>
                        <button
                            onClick={handleLaunchVM}
                            className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition shadow-lg shadow-purple-600/30"
                        >
                            Launch Virtual Machine
                        </button>
                    </div>
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Ephemeral","Secure","Optimized"].map((tag)=> (
                    <div key={tag} className="rounded-xl bg-gray-800/40 border border-gray-700/50 p-4 flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-gray-100">{tag}</h3>
                      <p className="text-xs text-gray-400">{tag==='Ephemeral'?'Auto-cleaned environments after expiry.':tag==='Secure'?'Token-based access with isolated namespaces.':'Images tuned for fast cold starts.'}</p>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    );
};

export default Home;