import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Paperclip } from 'lucide-react';

interface AttachmentSelectorProps {
  onAttachmentSelect: (attachment: string) => void;
}

const attachments = [
  'Transformer',
  'Crossarm',
  'Insulator',
  'Streetlight',
  'Communication Cable',
  'Guy Wire',
  'Other',
];

const AttachmentSelector: React.FC<AttachmentSelectorProps> = ({ onAttachmentSelect }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ attachment: string }>();

  const onSubmit = (data: { attachment: string }) => {
    onAttachmentSelect(data.attachment);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
          Select Primary Attachment
        </label>
         <div className="mt-1 relative rounded-md shadow-sm">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Paperclip className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Controller
            name="attachment"
            control={control}
            rules={{ required: 'Please select an attachment' }}
            defaultValue=""
            render={({ field }) => (
              <select
                id="attachment"
                className={`block w-full pl-10 pr-3 py-2 border ${errors.attachment ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                {...field}
              >
                <option value="" disabled>-- Select Attachment --</option>
                {attachments.map((att) => (
                  <option key={att} value={att}>
                    {att}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
         {errors.attachment && <p className="mt-2 text-sm text-red-600">{errors.attachment.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Confirm Attachment
        </button>
      </div>
    </form>
  );
};

export default AttachmentSelector;
