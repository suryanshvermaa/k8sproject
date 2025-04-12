import { useState } from "react";
import VMLaunchLoader from "../components/VMLaunchLoader";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useCookies } from "react-cookie";

export interface IVM{
    name:string,
    logo:string,
    color:string,
    duration?:number,
    price?:number,
    image?:string,
    password?:string
}

const VM = () => {
    const [launching,setLaunching]=useState<boolean>(false); 
    const [VM,setVM]=useState<IVM|null>();
    const [cookies,,]=useCookies(["authToken"]);
    const virtualMachines = [
        {
            name: "Ubuntu",
            logo: "/vms/ubuntu-icon.svg",
            color:"red",
            image:"suryanshvermaa/ubuntu:1.0.0"
        },
        {
            name: "CentOS",
            logo: "/vms/centos-icon.svg",
            color:"violet",
            image:"suryanshvermaa/centos:1.0.0"
        },
        {
            name: "VS Code",
            logo: "/vms/vscode-icon.svg",
            color:"blue",
            image:"suryanshvermaa/vs-code:1.0.1"
        },
        {
            name: "Chrome Browser",
            logo: "/vms/chrome-icon.svg",
            color:"red",
            image:"suryanshvermaa/chrome:1.0.0"
        },
    ];

    const handleLaunch = (vm: IVM) => {
        setVM({...VM,...vm});
    };
    const handleVMLaunch=async()=>{
        try {
            setLaunching(true);
            const apiObj={
                vm:VM?.name,
                image:VM?.image,
                duration:VM?.duration,
                password:VM?.password,
                authToken:cookies.authToken
            }
            const res=await axios.post("http://localhost:3000/vm/createVM",apiObj);
            await toast.success(res.data.message,{
                position:"bottom-right",
                theme:"dark",
                closeButton:true
            })
            setTimeout(()=>{
                location.href=res.data.data.url;
                setLaunching(false);
            },10*1000);
        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message,{
                position:"bottom-right",
                theme:"dark",
                closeButton:true
            })
        }
    }

    if(launching&&VM) return <VMLaunchLoader vm={VM}/>
    else return (
        <div className="text-center p-[20px]">
            {/* <ToastContainer/> */}
            <h1 className="text-3xl font-semibold m-5">Launch Virtual Machines</h1>
            <div className="flex justify-center gap-[20px] flex-wrap">
            {virtualMachines.map((vm) => (
                <div
                key={vm.name}
                className="border border-gray-300 min-w-44 rounded-lg p-4 text-center"
                >
                <img
                    src={vm.logo}
                    alt={`${vm.name} logo`}
                    className="w-24 h-24 object-contain mx-auto"
                />
                <h3 className="mt-2 text-lg font-medium">{vm.name}</h3>
                <button 
                    onClick={() => handleLaunch(vm)}
                    className="mt-3 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
                >
                    Launch
                </button>
                </div>
            ))}
            </div>

            {VM && VM.name && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Launch {VM.name}</h2>
                <div className="flex relative w-full  justify-center items-center py-5">
                    <img src={VM.logo} alt={VM.name} className="w-16 h-16 object-contain" />
                </div>
                <div className="mb-4">
                    <input
                    type="number"
                    id="duration"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    onChange={(e) => {
                        const duration = Number(e.target.value) || 0;
                        setVM({ ...VM, duration, price: duration*1.4});
                    }}
                    placeholder="Enter Duration (in minutes):"
                    value={VM.duration}
                    />
                </div>

                <div className="mb-4">
                    <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    onChange={(e) => {
                        setVM({ ...VM, password:e.target.value});
                    }}
                    placeholder="Enter VM Password"
                    value={VM.password}
                    />
                </div>
                <h1 className="text-gray-600 font-mono">User: kasm_user  (bydefault)</h1>
                {VM.duration && (
                    <p className="text-lg font-mono text-gray-700 mb-4">
                        Price: Rs:{VM.price?.toFixed(4)}
                    </p>
                )}
                <div className="flex justify-between w-full gap-4 mt-3">
                    <button
                    onClick={() => setVM(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleVMLaunch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                    Launch Machine
                    </button>
                </div>
                </div>
                <ToastContainer/>
            </div>
            )}
        </div>
    );
};

export default VM;