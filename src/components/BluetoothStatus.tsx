import React from 'react';
import { BluetoothConnected, BluetoothOff } from 'lucide-react';

interface BluetoothStatusProps {
  isConnected: boolean;
}

const BluetoothStatus: React.FC<BluetoothStatusProps> = ({ isConnected }) => {
  return (
    <div className={`flex items-center space-x-2 p-3 rounded-md ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {isConnected ? (
        <>
          <BluetoothConnected className="h-5 w-5" />
          <span className="text-sm font-medium">Bluetooth Connected</span>
        </>
      ) : (
        <>
          <BluetoothOff className="h-5 w-5" />
          <span className="text-sm font-medium">Bluetooth Disconnected</span>
        </>
      )}
    </div>
  );
};

export default BluetoothStatus;
