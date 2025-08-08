import React from 'react'
import { Edit, Sparkles } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articalLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1200, text: 'Long (1200+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articalLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()
  // FIXED useEffect
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
          headers: { Authorization: `Bearer ${await getToken()}` }
        })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
<div className="min-h-[90vh] lg:min-h-[85vh] w-full  md:w-[85vw] lg:w-[82vw]  sm:mx-auto">

  {/* Left + Right Columns Container */}
  <div className="flex flex-col lg:flex-row gap-6">

    {/* left col */}
    <form onSubmit={onSubmitHandler} className="flex-1 w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 text-[#4A7AFF]" />
        <h1 className="text-xl text-white font-semibold">Article Configuration</h1>
      </div>

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
    </form>

    {/* right col */}
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
</div>

);
}

export default WriteArticle
