import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Ruler } from 'lucide-react';

interface MeasurementInputProps {
  onMeasurement: (measurement: number) => void;
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({ onMeasurement }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<{ measurement: number }>();

  const onSubmit = (data: { measurement: number }) => {
    // data.measurement should already be a number due to Controller's handling
    onMeasurement(data.measurement);
    // Optionally reset the form after submission
    // reset({ measurement: undefined }); // Reset to empty/undefined
    alert(`Measurement submitted: ${data.measurement} m`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="measurement" className="block text-sm font-medium text-gray-700 mb-1">
          Pole Height Measurement (meters)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Ruler className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Controller
            name="measurement"
            control={control}
            rules={{
              required: 'Measurement is required',
              valueAsNumber: true, // Ensure the value is treated as a number
              min: { value: 0.01, message: 'Measurement must be positive' },
              validate: value => !isNaN(value) || 'Please enter a valid number' // Check for NaN
            }}
            render={({ field }) => (
              <input
                type="number" // Keep type="number" for browser controls
                step="0.01"
                id="measurement"
                className={`block w-full pl-10 pr-3 py-2 border ${errors.measurement ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                placeholder="e.g., 12.5"
                {...field}
                // react-hook-form's Controller handles onChange conversion with valueAsNumber
              />
            )}
          />
        </div>
         {errors.measurement && <p className="mt-2 text-sm text-red-600">{errors.measurement.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Submit Measurement
        </button>
      </div>
    </form>
  );
};

export default MeasurementInput;
