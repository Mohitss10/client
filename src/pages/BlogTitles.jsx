import React from 'react'
import { Hash, Sparkles } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const blogCategories = [
    'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'
  ]

  const [selectedCategories, setSelectedCategories] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategories}`

      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, { headers: { Authorization: `Bearer ${await getToken()}` } })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
    setLoading(false)
  }

  return (
<div className="min-h-[90vh] lg:min-h-[85vh] w-full md:w-[85vw] lg:w-[82vw]  sm:mx-auto">

  <div className="flex flex-col lg:flex-row gap-6">
    {/* Left Column */}
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 w-full max-w-full p-5 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
    >
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 text-[#8E37EB]" />
        <h1 className="text-xl font-semibold text-white">AI Title Generator</h1>
      </div>

      <p className="mt-6 text-sm font-medium text-white/90">Keyword</p>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className="w-full text-white p-2 mt-2 outline-none text-sm rounded-md border border-white/10 bg-transparent placeholder:text-white/40"
        placeholder="The future of artificial intelligence is..."
        required
      />

      <p className="mt-6 text-sm font-medium text-white/90">Category</p>
      <div className="mt-3 flex gap-3 flex-wrap">
        {blogCategories.map((item) => (
          <span
            onClick={() => setSelectedCategories(item)}
            className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${
              selectedCategories === item
                ? 'bg-[#2d1c3f] text-purple-400 border-purple-500'
                : 'text-white/70 border-white/10 hover:bg-white/5'
            }`}
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <button
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-3 mt-8 text-sm rounded-lg cursor-pointer"
      >
        {loading ? (
          <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
        ) : (
          <Hash className="w-5" />
        )}
        Generate title
      </button>
    </form>

    {/* Right Column */}
    <div className="flex-1 w-full max-w-full p-5 rounded-2xl flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 min-h-96 max-h-[600px]">
      <div className="flex items-center gap-3">
        <Hash className="w-5 h-5 text-[#8E37EB]" />
        <h1 className="text-xl font-semibold text-white">Generated titles</h1>
      </div>

      {!content ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Hash className="w-9 h-9" />
            <p>Enter a topic and click "Generate title" to get started</p>
          </div>
        </div>
      ) : (
        <div className="mt-3 h-full overflow-y-scroll text-sm text-white/80">
          <div className="reset-tw">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      )}
    </div>
  </div>
</div>


  )
}

export default BlogTitles
