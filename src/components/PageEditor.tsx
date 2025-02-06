'use client'

type PageEditorProps = {
    content: { text: string } // why is it string?
    onUpdate: (content: { text: string }) => void // why is it string?
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
