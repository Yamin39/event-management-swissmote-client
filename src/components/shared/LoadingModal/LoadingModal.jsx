/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const LoadingModal = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-200">
        <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
        <p className="text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
