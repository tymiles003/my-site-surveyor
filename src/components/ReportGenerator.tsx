import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

interface ReportGeneratorProps {
  measurement: number | null;
  attachment: string | null;
  photoCaptured: boolean;
  projectId: string | null;
  projectAddress: string | null;
  scopeOfWork: string | null;
  scheduledDates: string | null;
  deviceSerialNumber: string | null;
  deviceType: string | null;
  deviceLocation: string | null;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  measurement,
  attachment,
  photoCaptured,
  projectId,
  projectAddress,
  scopeOfWork,
  scheduledDates,
  deviceSerialNumber,
  deviceType,
  deviceLocation,
}) => {
  const isReady = measurement !== null && attachment !== null && photoCaptured && projectId !== null;

  const generateReport = () => {
    if (!isReady) {
      alert('Please complete all steps before generating the report.');
      return;
    }

    const reportData = {
      projectId,
      projectAddress,
      scopeOfWork,
      scheduledDates,
      measurement: `${measurement} meters`,
      primaryAttachment: attachment,
      photoCaptured: photoCaptured ? 'Yes' : 'No',
      deviceInfo: {
        serialNumber: deviceSerialNumber || 'N/A',
        type: deviceType || 'N/A',
        location: deviceLocation || 'N/A',
      },
      timestamp: new Date().toISOString(),
    };

    // Simulate report generation (e.g., console log, prepare for PDF/CSV)
    console.log('Generating Report:', reportData);
    alert('Report generated successfully (simulated). Check console for details.');

    // In a real app, you would trigger PDF generation or data submission here
  };

  return (
    <div className="p-6 border border-gray-200 rounded-lg bg-white shadow">
      {!isReady && (
        <div className="flex items-center p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg" role="alert">
          <AlertCircle className="flex-shrink-0 inline w-5 h-5 mr-3" />
          <span className="font-medium">Report Not Ready:</span> Please connect to a project, enter measurement, select attachment, and capture a photo.
        </div>
      )}
      <div className="space-y-3 mb-6 text-sm text-gray-600">
         <p><strong>Project ID:</strong> {projectId || 'N/A'}</p>
         <p><strong>Address:</strong> {projectAddress || 'N/A'}</p>
         <p><strong>Scope:</strong> {scopeOfWork || 'N/A'}</p>
         <p><strong>Scheduled:</strong> {scheduledDates || 'N/A'}</p>
         <hr/>
         <p><strong>Measurement:</strong> {measurement !== null ? `${measurement} m` : 'Not entered'}</p>
         <p><strong>Attachment:</strong> {attachment || 'Not selected'}</p>
         <p><strong>Photo Captured:</strong> {photoCaptured ? 'Yes' : 'No'}</p>
         <hr/>
         <p><strong>Device S/N:</strong> {deviceSerialNumber || 'N/A'}</p>
         <p><strong>Device Type:</strong> {deviceType || 'N/A'}</p>
      </div>
      <button
        onClick={generateReport}
        disabled={!isReady}
        className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
          isReady
            ? 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            : 'bg-gray-400 cursor-not-allowed'
        } transition duration-150 ease-in-out`}
      >
        <FileText className="mr-2 h-5 w-5" />
        Generate Report
      </button>
    </div>
  );
};

export default ReportGenerator;
