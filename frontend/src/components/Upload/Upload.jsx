import { useRef, useState } from 'react'

export default function Upload({ onFileSelect }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  function handleFile(file) {
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onFileSelect(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
        ${dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 bg-white'}`}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-lg object-contain" />
      ) : (
        <div className="space-y-2">
          <p className="text-gray-500 text-sm">Arraste a foto do produto ou clique para selecionar</p>
          <p className="text-gray-400 text-xs">JPG, PNG ou WebP · Máx. 5MB</p>
        </div>
      )}
    </div>
  )
}
