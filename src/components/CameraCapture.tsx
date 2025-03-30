import React, { useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: () => void;
  projectAddress: string | null;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, projectAddress }) => {
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    // Simulate camera capture
    console.log(`Simulating photo capture for project at: ${projectAddress || 'Unknown Address'}`);
    setCaptured(true);
    onCapture();
    alert(`Simulated photo capture for ${projectAddress || 'the current project'}.`);
  };

  return (
    <div className="space-y-4 text-center">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Capture Site Photo
      </label>
      <button
        onClick={handleCapture}
        disabled={captured}
        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
          captured
            ? 'bg-green-600 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        } transition duration-150 ease-in-out`}
      >
        {captured ? (
          <>
            <CheckCircle className="mr-2 h-5 w-5" /> Photo Captured
          </>
        ) : (
          <>
            <Camera className="mr-2 h-5 w-5" /> Capture Photo
          </>
        )}
      </button>
       {captured && <p className="mt-2 text-sm text-green-700">Photo successfully captured (simulated).</p>}
    </div>
  );
};

export default CameraCapture;
