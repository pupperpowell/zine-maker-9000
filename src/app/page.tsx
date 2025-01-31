'use client'

import { useState } from 'react'
import { motion, Reorder } from 'framer-motion'

export default function Home() {
  const [pages, setPages] = useState<number[]>([])

  const addPage = () => {
    setPages([...pages, pages.length])
  }

  return (
    <div className="min-h-screen p-8">
      <button 
        onClick={addPage}
        className="mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        +
      </button>
      
      <Reorder.Group 
        axis="x" 
        values={pages} 
        onReorder={setPages}
        className="flex overflow-x-auto gap-4 pb-4"
      >
        {pages.map((pageIndex) => (
          <Reorder.Item
            key={pageIndex}
            value={pageIndex}
            whileDrag={{
              scale: 1.1,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              cursor: "grabbing"
            }}
          >
            <motion.div 
              className="flex-shrink-0 aspect-[5.5/8.5] w-32 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 cursor-grab"
              whileHover={{ scale: 1.025 }}
              transition={{ type: "spring", stiffness: 800 }}
            >
              Page {pageIndex + 1}
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
