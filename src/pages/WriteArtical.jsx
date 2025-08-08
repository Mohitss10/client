import React, { useState } from 'react';
import { Edit, Sparkles, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articalLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1200, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articalLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [showConfig, setShowConfig] = useState(true); // start open
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const token = await getToken();
      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setContent(data.content);
        if (window.innerWidth < 1024) {
          // Collapse on mobile/tablet after generation
          setShowConfig(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] lg:min-h-[85vh] w-50vw md:w-[85vw] lg:w-[82vw] sm:mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT COLUMN */}
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
        >
          {/* Heading */}
          <div
            className="flex items-center justify-between gap-3 cursor-pointer lg:cursor-default"
            onClick={() => {
              if (window.innerWidth < 1024) setShowConfig(!showConfig);
            }}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 text-[#4A7AFF]" />
              <h1 className="text-xl text-white font-semibold">Article Configuration</h1>
            </div>
            <div className="lg:hidden transition-transform duration-300"
                 style={{ transform: `rotate(${showConfig ? 180 : 0}deg)` }}>
              <ChevronDown className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Smooth collapsible content */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden lg:overflow-visible lg:max-h-none`}
            style={{
              maxHeight: showConfig ? '1000px' : '0px',
              opacity: showConfig ? 1 : 0,
            }}
          >
            <p className="mt-6 text-sm font-medium text-white/90">Article Topic</p>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="w-full text-white p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent placeholder:text-white/40"
              placeholder="The future of artificial intelligence is..."
              required
            />

            <p className="m-4 text-sm font-medium text-white/90">Article Length</p>
            <div className="mt-3 flex gap-3 flex-wrap">
              {articalLength.map((item, index) => (
                <span
                  onClick={() => setSelectedLength(item)}
                  className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
                    selectedLength.text === item.text
                      ? 'bg-[#1a2b4a] text-blue-400 border-blue-500'
                      : 'text-white/70 border-white/10 hover:bg-white/5'
                  }`}
                  key={index}
                >
                  {item.text}
                </span>
              ))}
            </div>

            <button
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                <Edit className="w-5" />
              )}
              Generate article
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN */}
        <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 min-h-96 max-h-[600px]">
          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-[#4A7AFF]" />
            <h1 className="text-xl text-white font-semibold">Generated article</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Edit className="w-9 h-9" />
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-white/80 markdown-body">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 p-6 bg-black/30 border border-white/10 rounded-xl text-white">
      <h2 className="text-lg font-bold mb-3">Write High-Quality Articles with AI</h2>
      <p className="text-sm text-white/80 mb-2">
        Our AI article writer helps you create engaging, well-structured, and SEO-friendly content in just minutes — perfect for blogs, websites, and social media.
      </p>
      <p className="text-sm text-white/80 mb-2">
        Simply enter your topic or keywords, and our system will generate a complete article with relevant headings, clear formatting, and a natural flow.
      </p>
      <p className="text-sm text-white/80">
        Save time, boost productivity, and focus on your ideas while AI handles the heavy lifting of writing.
      </p>
    </div>
    </div>
  );
};

export default WriteArticle;
