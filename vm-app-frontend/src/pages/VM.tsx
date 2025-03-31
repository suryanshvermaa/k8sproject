import { useState } from "react";
import VMLaunchLoader from "../components/VMLaunchLoader";

export interface IVM{
    name:string,
    logo:string,
    color:string
}

const VM = () => {
    const [launching,setLaunching]=useState<boolean>(false); 
    const [VM,setVM]=useState<IVM|null>();
    const virtualMachines = [
        {
            name: "Ubuntu",
            logo: "/vms/ubuntu-icon.svg",
            color:"red"
        },
        {
            name: "CentOS",
            logo: "/vms/centos-icon.svg",
            color:"violet"
        },
        {
            name: "VS Code",
            logo: "/vms/vscode-icon.svg",
            color:"blue"
        },
        {
            name: "Chrome Browser",
            logo: "/vms/chrome-icon.svg",
            color:"red"
        },
    ];

    const handleLaunch = (vm: IVM) => {
        setLaunching(true);
        setVM(vm);
    };
    return (
        <div className="text-center p-[20px]">
            {
                launching && VM?.name && <VMLaunchLoader vm={VM}/>
            }
            <h1 className="text-3xl font-semibold m-5">Launch Virtual Machines</h1>
            <div className="flex justify-center gap-[20px] flex-wrap">
                {virtualMachines.map((vm) => (
                    <div
                        key={vm.name}
                        className="border border-gray-300 rounded-lg p-4 text-center"
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
        </div>
    );
};

export default VM;