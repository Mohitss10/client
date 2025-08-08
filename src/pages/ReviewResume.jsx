import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please upload a PDF resume');

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('resume', file);

      const { data } = await axios.post(
        '/api/ai/resume-review',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setAnalysis(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] lg:min-h-[85vh] w-full md:w-[85vw] lg:w-[82vw] sm:mx-auto overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 flex flex-col w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#00DA83]" />
            <h1 className="text-xl text-white font-semibold">Resume Review</h1>
          </div>

          <p className="mt-6 text-sm font-medium text-white/90">Upload Resume</p>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent text-white placeholder:text-white/40"
            required
          />
          <p className="text-xs text-white/50 font-light mt-1">
            Supports PDF resume only.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5" />
            )}
            Review Resume
          </button>
        </form>

        {/* Right Column */}
        <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#00DA83]" />
            <h1 className="text-xl text-white font-semibold">Analysis Result</h1>
          </div>

          {!analysis ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <FileText className="w-9 h-9" />
                <p>Upload a resume and click "Review Resume" to get started</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto max-h-[65vh] pr-2 text-sm text-white/80 whitespace-pre-wrap">
              <Markdown>{analysis}</Markdown>
            </div>
          )}
        </div>

      </div>
    </div>
  );

};

export default ReviewResume;
