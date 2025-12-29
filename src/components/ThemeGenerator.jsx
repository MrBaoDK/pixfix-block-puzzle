import { useState, useRef, useEffect } from 'react';
import { generateTexture } from '../services/imagenMock';

function ThemeGenerator({ onTextureGenerated }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setMessage('Please upload an image file');
      return;
    }
    
    // Cancel any existing operation
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this operation
    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    setMessage('Generating texture (simulating Imagen API)...');
    
    try {
      const result = await generateTexture(file, abortControllerRef.current.signal);
      
      if (result.success) {
        setMessage('Texture generated successfully!');
        onTextureGenerated(result.textureUrl);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Operation was cancelled, don't show error message
        return;
      }
      setMessage('Error generating texture');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleReset = () => {
    onTextureGenerated(null);
    setMessage('Texture reset to default');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-4">Theme Generator</h2>
      
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="image-upload" 
            className={`
              block w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg
              text-center cursor-pointer hover:bg-blue-700 transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating...
              </span>
            ) : (
              'Upload Image for Texture'
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isLoading}
            className="hidden"
          />
        </div>
        
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg
                   hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset to Default
        </button>
        
        {message && (
          <div className={`
            p-3 rounded-lg text-sm text-center
            ${message.includes('Error') || message.includes('Please') 
              ? 'bg-red-500/20 text-red-300' 
              : 'bg-green-500/20 text-green-300'
            }
          `}>
            {message}
          </div>
        )}
        
        <div className="text-xs text-gray-400 text-center">
          Upload an image to apply it as a texture to filled blocks.
          <br />
          Simulates 2-second Imagen API delay.
        </div>
      </div>
    </div>
  );
}

export default ThemeGenerator;
