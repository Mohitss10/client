import React, { useState } from 'react';
import { Image, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => 
  {
  const imageStyle = [
    'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style'
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [showLeftCol, setShowLeftCol] = useState(true); // For toggle

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image in ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
<div className="min-h-[90vh] lg:min-h-[85vh] w-full max-w-full overflow-x-hidden sm:mx-auto">
  <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden">

        {/* Left Column */}
        <form
          onSubmit={onSubmitHandler}
          className={`flex-1 w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 
            transition-all duration-500 ease-in-out
            ${showLeftCol ? 'max-h-[2000px] opacity-100' : 'max-h-16 overflow-hidden opacity-80 lg:max-h-full lg:opacity-100'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#00AD25]" />
              <h1 className="text-xl font-semibold text-white">AI Image Generator</h1>
            </div>
            {/* Toggle Arrow for Mobile */}
            <svg
              onClick={() => setShowLeftCol(!showLeftCol)}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 text-white cursor-pointer transition-transform duration-300 lg:hidden ${showLeftCol ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <p className="mt-6 text-sm font-medium text-white/90">Describe Your Image</p>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full p-2 mt-2 text-white outline-none text-sm rounded-md border border-white/10 bg-transparent placeholder:text-white/40"
            placeholder="Describe what you want to see in the image..."
            required
          />

          <p className="mt-6 text-sm font-medium text-white/90">Style</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            {imageStyle.map((item) => (
              <span
                onClick={() => setSelectedStyle(item)}
                className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${selectedStyle === item
                  ? 'bg-[#0c1c13] text-green-400 border-green-500'
                  : 'text-white/70 border-white/10 hover:bg-white/5'
                  }`}
                key={item}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center gap-2">
            <label className="relative cursor-pointer" htmlFor="publishToggle">
              <input
                type="checkbox"
                id="publishToggle"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-white/20 rounded-full peer-checked:bg-green-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm text-white/90">Make this image Public</p>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-3 mt-4 text-sm rounded-lg cursor-pointer"
          >
            {loading ? (
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5" />
            )}
            Generate Image
          </button>
        </form>

        {/* Right Column */}
        <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 min-h-96">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-[#00AD25]" />
            <h1 className="text-xl font-semibold text-white">Generated Image</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Image className="w-9 h-9" />
                <p>Enter a description and click "Generate Image" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex-1 overflow-y-scroll flex flex-col gap-4">
              <img
                src={content}
                alt="Generated"
                className="max-w-full rounded-lg border border-white/10"
              />

              <button
                type="button"
                onClick={async () => {
                  try {
                    const response = await fetch(content, { mode: 'cors' });
                    if (!response.ok) throw new Error('Image fetch failed');

                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'generated-image.png';
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
                className="bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 rounded-lg text-sm text-center w-fit"
              >
                Download Image
              </button>
            </div>
          )}
        </div>

      </div>
      <div className="mt-12 p-6 bg-black/30 border border-white/10 rounded-xl text-white">
      <h2 className="text-lg font-bold mb-3">Generate Stunning Images with AI</h2>
      <p className="text-sm text-white/80 mb-2">
        Create high-quality, unique images instantly using our AI image generator — perfect for art, design projects, social media, and marketing.
      </p>

    </div>
    </div>
    
  );
}

export default GenerateImages;
