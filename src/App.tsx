import React, { useState } from 'react';
import BluetoothStatus from './components/BluetoothStatus';
import MeasurementInput from './components/MeasurementInput';
import AttachmentSelector from './components/AttachmentSelector';
import CameraCapture from './components/CameraCapture';
import ReportGenerator from './components/ReportGenerator';
import ArcGISWorkforce from './components/ArcGISWorkforce';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { SupabaseProvider, useSupabaseAuth } from './components/AuthContext';
import { Bolt } from 'lucide-react';

function AppContent() {
  const { session, user } = useSupabaseAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [isProjectConnected, setIsProjectConnected] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectAddress, setProjectAddress] = useState<string | null>(null);
  const [scopeOfWork, setScopeOfWork] = useState<string | null>(null);
  const [scheduledDates, setScheduledDates] = useState<string | null>(null);
  const [deviceSerialNumber, setDeviceSerialNumber] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [deviceLocation, setDeviceLocation] = useState<string | null>(null);


  // Simulated project assignments data (CSV data would be parsed here in a real app)
  const projectAssignments = [
    {
      projectId: 'PROJ-2024-123',
      projectAddress: '123 Main Street, Anytown',
      scopeOfWork: 'Replace damaged pole',
      scheduledDates: '2024-08-15',
    },
    {
      projectId: 'PROJ-2024-456',
      projectAddress: '456 Oak Avenue, Anotherville',
      scopeOfWork: 'Install new transformer',
      scheduledDates: '2024-08-22',
    },
  ];

  // Simulated devices data (database query would fetch this in a real app)
  const devices = [
    {
      deviceSerialNumber: 'TRU-12345',
      deviceType: 'TruPulse 200x',
      deviceLocation: 'Truck 1',
    },
    {
      deviceSerialNumber: 'CAM-67890',
      deviceType: 'Mobile Camera',
      deviceLocation: 'Technician 1',
    },
  ];


  const handleConnectBluetooth = () => {
    // Simulate Bluetooth connection
    setIsConnected(true);
    alert('Simulating Bluetooth connection to TruPulse 200x');
  };

  const handleMeasurementInput = (value: number) => {
    setMeasurement(value);
  };

  const handleAttachmentSelect = (value: string) => {
    setAttachment(value);
  };

  const handlePhotoCapture = () => {
    setPhotoCaptured(true);
  };

  const handleProjectConnect = (projectId: string) => {
    setIsProjectConnected(true);
    setProjectId(projectId);
    // Simulate fetching project details and device info based on projectId
    const selectedProject = projectAssignments.find(p => p.projectId === projectId);
    if (selectedProject) {
      setProjectAddress(selectedProject.projectAddress);
      setScopeOfWork(selectedProject.scopeOfWork);
      setScheduledDates(selectedProject.scheduledDates);
    }
    const selectedDevice = devices.find(d => d.deviceType === 'TruPulse 200x'); // Example: Fetch device info
    if (selectedDevice) {
      setDeviceSerialNumber(selectedDevice.deviceSerialNumber);
      setDeviceType(selectedDevice.deviceType);
      setDeviceLocation(selectedDevice.deviceLocation);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-10">
            <div className="flex justify-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                <Bolt className="text-indigo-600 h-8 w-8" />
                <span>Utility Pole Measurement</span>
              </h1>
            </div>

            {session ? (
              <div className="space-y-8">
                <div className="text-center border-b pb-4 mb-4">
                  <p className="text-lg text-gray-600">Welcome, <span className="font-medium text-indigo-700">{user?.email}</span></p>
                  <div className="mt-4">
                     <Logout />
                  </div>
                </div>

                <ArcGISWorkforce onProjectConnect={handleProjectConnect} />

                <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-inner">
                   <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <BluetoothStatus isConnected={isConnected} />
                    {!isConnected && (
                      <button
                        onClick={handleConnectBluetooth}
                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      >
                        Connect Bluetooth
                      </button>
                    )}
                  </div>
                  <MeasurementInput onMeasurement={handleMeasurementInput} />
                  <AttachmentSelector onAttachmentSelect={handleAttachmentSelect} />
                  <CameraCapture onCapture={handlePhotoCapture} projectAddress={projectAddress} />
                </div>

                <div className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Generated Report</h2>
                  <ReportGenerator
                    measurement={measurement}
                    attachment={attachment}
                    photoCaptured={photoCaptured}
                    projectId={projectId}
                    projectAddress={projectAddress}
                    scopeOfWork={scopeOfWork}
                    scheduledDates={scheduledDates}
                    deviceSerialNumber={deviceSerialNumber}
                    deviceType={deviceType}
                    deviceLocation={deviceLocation}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                 <h2 className="text-xl font-semibold text-gray-700 text-center">Please Sign In</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Sign Up</h3>
                        <Signup />
                    </div>
                     <div className="p-6 border rounded-lg bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Log In</h3>
                        <Login />
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  );
}

export default App;
