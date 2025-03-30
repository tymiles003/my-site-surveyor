import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MapPin } from 'lucide-react';

interface ArcGISWorkforceProps {
  onProjectConnect: (projectId: string) => void;
}

// Simulated project assignments data (replace with actual API call)
const projectAssignments = [
  { projectId: 'PROJ-2024-123', description: '123 Main St - Pole Replacement' },
  { projectId: 'PROJ-2024-456', description: '456 Oak Ave - Transformer Install' },
  { projectId: 'PROJ-2024-789', description: '789 Pine Ln - Cable Repair' },
];

const ArcGISWorkforce: React.FC<ArcGISWorkforceProps> = ({ onProjectConnect }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ projectId: string }>();

  const onSubmit = (data: { projectId: string }) => {
    onProjectConnect(data.projectId);
    alert(`Connected to Project: ${data.projectId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border border-gray-200 rounded-lg bg-white shadow">
       <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
         <MapPin className="mr-2 h-5 w-5 text-indigo-600"/> Connect to Workforce Project
       </h3>
      <div>
        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
          Select Project Assignment
        </label>
        <Controller
          name="projectId"
          control={control}
          rules={{ required: 'Please select a project' }}
          defaultValue=""
          render={({ field }) => (
            <select
              id="projectId"
              className={`block w-full pl-3 pr-10 py-2 border ${errors.projectId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...field}
            >
              <option value="" disabled>-- Select Project --</option>
              {projectAssignments.map((proj) => (
                <option key={proj.projectId} value={proj.projectId}>
                  {proj.projectId} - {proj.description}
                </option>
              ))}
            </select>
          )}
        />
         {errors.projectId && <p className="mt-2 text-sm text-red-600">{errors.projectId.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Connect Project
        </button>
      </div>
    </form>
  );
};

export default ArcGISWorkforce;
