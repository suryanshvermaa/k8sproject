import { IVM } from "../pages/VM";

interface IProps{
    vm:IVM
}
const colorMap: Record<string, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  violet: '#8b5cf6',
};

const VMLaunchLoader = (prop:IProps) => {
    const barColor = colorMap[prop.vm.color] || '#3b82f6';
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 fixed inset-0 w-full">
            <div className="relative w-16 h-16">
                <img src={prop.vm.logo} alt={prop.vm.name} className="w-full h-full object-contain" />
            </div>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">{prop.vm.name} is launching, please wait...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">We will redirect you soon.</p>
            <div className="w-[60%] max-w-md h-2 mt-6 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: barColor, animation: 'progressBar 8s linear forwards' }}
                />
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
