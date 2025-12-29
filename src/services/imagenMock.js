// Mock service simulating Google Imagen API
// Simulates a 2-second delay and returns a texture URL

export async function generateTexture(imageFile, signal) {
  return new Promise((resolve, reject) => {
    let settled = false; // Track if promise has been settled
    let timeoutId = null;
    let reader = null;
    let abortHandler = null;
    
    const settle = (callback) => {
      if (!settled) {
        settled = true;
        cleanup();
        callback();
      }
    };
    
    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (reader && reader.readyState === FileReader.LOADING) {
        try {
          reader.abort();
        } catch (e) {
          // Reader might already be done, ignore error
        }
        reader = null;
      }
      if (abortHandler && signal) {
        signal.removeEventListener('abort', abortHandler);
        abortHandler = null;
      }
    };
    
    // Check if already aborted
    if (signal?.aborted) {
      settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
      return;
    }

    // Single abort handler for all cleanup
    abortHandler = () => {
      settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
    };
    
    if (signal) {
      signal.addEventListener('abort', abortHandler, { once: true });
    }

    // Simulate 2-second API delay
    timeoutId = setTimeout(() => {
      timeoutId = null;
      
      // Check if aborted during timeout
      if (signal?.aborted) {
        settle(() => reject(new DOMException('Operation aborted', 'AbortError')));
        return;
      }

      // Create a data URL from the uploaded image file
      reader = new FileReader();
      
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
  });
}
