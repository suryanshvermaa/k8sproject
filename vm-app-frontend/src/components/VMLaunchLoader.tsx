import { IVM } from "../pages/VM";

interface IProps{
    vm:IVM
}
const VMLaunchLoader = (prop:IProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 fixed w-full">
            <div className="relative w-16 h-16">
                <img src={prop.vm.logo} alt={prop.vm.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-4 text-lg text-gray-700">{prop.vm.name} is launching, please wait...</p>
            <p className="text-sm text-gray-500">We will redirect you soon.</p>
            <div className="w-[10%] h-2 mt-4">
                <div
                    className={`bg-${prop.vm.color}-500 h-2 rounded-full`}
                    style={{
                        animation: "progressBar 8s linear forwards"
                    }}
                ></div>
                <style>
                {`
                    @keyframes progressBar {
                        from {
                            width: 0%;
                        }
                        to {
                            width: 100%;
                        }
                    }
                `}
            </style>
            </div>
        </div>
    );
};

export default VMLaunchLoader;
