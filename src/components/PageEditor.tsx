'use client'

import { useState } from 'react'

type PageEditorProps = {
    content: any
    onUpdate: (content: any) => void
}

export default function PageEditor({ content, onUpdate }: PageEditorProps) {
    return (
        <div className="border rounded-lg p-4 min-h-[400px]">
            <textarea
                className="w-full h-full bg-transparent resize-none focus:outline-none"
                value={content?.text || ''}
                onChange={(e) => onUpdate({ text: e.target.value })}
                placeholder="Start writing..."
            />
        </div>
    )
}
