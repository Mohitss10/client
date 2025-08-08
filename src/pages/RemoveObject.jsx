import React, { useState } from 'react';
import { Scissors, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [file, setFile] = useState(null);
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload an image');
    if (!object.trim()) return toast.error('Please describe the object to remove');

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      formData.append('object', object);

      const { data } = await axios.post(
        '/api/ai/remove-image-object',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setProcessedImage(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] lg:min-h-[85vh] w-full md:w-[85vw] lg:w-[82vw]  sm:mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 ">

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 flex flex-col w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#ff4aea]" />
            <h1 className="text-xl font-semibold text-white">Object Removal</h1>
          </div>

          <p className="mt-6 text-sm font-medium text-white/90">Upload Image</p>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent text-white placeholder:text-white/40"
            required
          />

          <p className="mt-6 text-sm font-medium text-white/90">Describe Object Name to Remove</p>
          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={4}
            className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent text-white placeholder:text-white/40"
            placeholder="e.g., watch or spoon (only a single object name)"
            required
          />

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#450065] to-[#eb37d3] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Scissors className="w-5" />
            )}
            Remove Object
          </button>
        </form>

        {/* Right Column */}
        <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-[#ff4aea]" />
            <h1 className="text-xl font-semibold text-white">Processed Image</h1>
          </div>

          {!processedImage ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Scissors className="w-9 h-9" />
                <p>Upload an image and click "Remove Object" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex-1 overflow-y-scroll flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full rounded-lg border border-white/10"
                />

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const response = await fetch(processedImage, { mode: 'cors' });
                      if (!response.ok) throw new Error('Image fetch failed');

                      const blob = await response.blob();
                      const blobUrl = window.URL.createObjectURL(blob);

                      const link = document.createElement('a');
                      link.href = blobUrl;
                      link.download = 'object-removed.png';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(blobUrl);

                      toast.success("Image downloaded!", {
                        duration: 3000,
                        style: {
                          background: '#5df252',
                          color: '#ffffff',
                          border: '1px solid #00AD25'
                        },
                        icon: '✅'
                      });
                    } catch (err) {
                      toast.error("Download failed!", {
                        duration: 3000,
                        style: {
                          background: '#2f1c1c',
                          color: '#ffffff',
                          border: '1px solid #ff4d4d'
                        },
                        icon: '⚠️'
                      });
                      console.error("Download error:", err);
                    }
                  }}
                  className="bg-gradient-to-r from-[#450065] to-[#eb37d3] text-white px-4 py-2 rounded-lg text-sm text-center w-fit"
                >
                  Download Image
                </button>
              </div>

            </div>

          )}
        </div>
      </div>
    </div>
  );

};

export default RemoveObject;
