import React from 'react'
import { FaBrain } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react'

const aiToolsData = [
  {
    title: 'AI Article Writer',
    description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
    Icon: SquarePen,
    path: '/ai/write-article',
    colSpan: 'sm:col-span-1',
    rowSpan: 'sm:row-span-2',
  },
  {
    title: 'Blog Title Generator',
    description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
    Icon: Hash,
    path: '/ai/blog-titles',
    colSpan: 'sm:col-span-1',
    rowSpan: 'sm:row-span-1',
  },
  {
    title: 'AI Image Generation',
    description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI.',
    Icon: Image,
    path: '/ai/generate-images',
    colSpan: 'sm:col-span-2',
    rowSpan: 'sm:row-span-1',
  },
  {
    title: 'Background Removal',
    description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
    Icon: Eraser,
    path: '/ai/remove-background',
    colSpan: 'sm:col-span-1',
    rowSpan: 'sm:row-span-1',
  },
  {
    title: 'AIMatrix',
    description: 'Elevate your workflow with intuitive AI tools.',
    Icon: Eraser,
    colSpan: 'sm:col-span-2',
    rowSpan: 'sm:row-span-1',
  },
  {
    title: 'Object Removal',
    description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
    Icon: Scissors,
    path: '/ai/remove-object',
    colSpan: 'sm:col-span-3',
    rowSpan: 'sm:row-span-1',
  },
  {
    title: 'Resume Reviewer',
    description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
    Icon: FileText,
    path: '/ai/review-resume',
    colSpan: 'sm:col-span-1',
    rowSpan: 'sm:row-span-1',
  },
];


const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-20 xl:px-32">
      <div className="mx-auto max-w-screen-2xl">

        {/* Header */}
        <div className="text-center py-6">
          <h2 className="text-4xl sm:text-5xl font-bold  text-slate-400 bg-clip-text animate-gradient">
            Our AI Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Discover various AI tools displayed in a dynamic, responsive layout crafted for modern web experiences.
          </p>
        </div>

        {/* Grid Container */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {aiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => user && tool.path && navigate(tool.path)}
              className={`relative overflow-hidden p-6 rounded-2xl shadow-xl text-slate-400 transition-transform duration-300 hover:scale-105 backdrop-blur-md border border-white/20 ${tool.colSpan} ${tool.rowSpan} cursor-pointer`}
              style={{
                background:
                  tool.title === 'AIMatrix'
                    ? 'linear-gradient(135deg, #c084fc, #ec4899, #3b82f6)' // custom gradient only for 'AIMatrix'
                    : tool.bgImage
                      ? undefined
                      : `linear-gradient(135deg, ${tool.bg?.from}, ${tool.bg?.to})`,
              }}

            >
              {/* Background Image (if exists) */}
              {tool.bgImage && (
                <img
                  src={tool.bgImage}
                  alt={tool.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-70"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}

                <div className="mb-4">
                  <tool.Icon
                    className={`text-white ${tool.title === 'AIMatrix' ? 'w-0 h-0' : 'w-10 h-10'}`}
                  />
                </div>

                {/* Title + Description */}
                <h3
                  className={`${tool.title === 'AIMatrix' ? 'font-bold text-7xl' : 'text-lg'
                    }`}
                >
                  {tool.title}
                </h3>


                <p
                  className={`text-white/90 ${tool.title === 'AIMatrix' ? 'text-2xl' : 'text-sm'
                    }`}
                >
                  {tool.description}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AiTools
