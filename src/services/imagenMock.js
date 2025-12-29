// Mock service simulating Google Imagen API
// Simulates a 2-second delay and returns a texture URL

export async function generateTexture(imageFile, signal) {
  return new Promise((resolve, reject) => {
    let settled = false; // Track if promise has been settled
    
    const settle = (callback) => {
      if (!settled) {
        settled = true;
        callback();
      }
    };
    
    // Check if already aborted
    if (signal?.aborted) {
      settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
      return;
    }

    // Simulate 2-second API delay
    const timeoutId = setTimeout(() => {
      // Check again after timeout
      if (signal?.aborted) {
        settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
        return;
      }

      // Create a data URL from the uploaded image file
      const reader = new FileReader();
      
      // Abort handler for FileReader
      const abortHandler = () => {
        reader.abort();
        settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
      };
      
      if (signal) {
        signal.addEventListener('abort', abortHandler, { once: true });
      }
      
      reader.onload = (e) => {
        if (!signal?.aborted) {
          settle(() => resolve({
            success: true,
            textureUrl: e.target.result,
            message: 'Texture generated successfully'
          }));
        }
      };
      
      reader.onerror = () => {
        if (!signal?.aborted) {
          settle(() => resolve({
            success: false,
            textureUrl: null,
            message: 'Failed to read image file'
          }));
        }
      };
      
      if (imageFile) {
        reader.readAsDataURL(imageFile);
      } else {
        settle(() => resolve({
          success: false,
          textureUrl: null,
          message: 'No image file provided'
        }));
      }
    }, 2000);

    // Handle abort during timeout
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
      }, { once: true });
    }
  });
}
