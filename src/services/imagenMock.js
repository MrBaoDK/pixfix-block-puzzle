// Mock service simulating Google Imagen API
// Simulates a 2-second delay and returns a texture URL

export async function generateTexture(imageFile, signal) {
  return new Promise((resolve, reject) => {
    // Check if already aborted
    if (signal?.aborted) {
      reject(new DOMException('Operation aborted', 'AbortError'));
      return;
    }

    // Simulate 2-second API delay
    const timeoutId = setTimeout(() => {
      // Check again after timeout
      if (signal?.aborted) {
        reject(new DOMException('Operation aborted', 'AbortError'));
        return;
      }

      // Create a data URL from the uploaded image file
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (!signal?.aborted) {
          resolve({
            success: true,
            textureUrl: e.target.result,
            message: 'Texture generated successfully'
          });
        }
      };
      
      reader.onerror = () => {
        if (!signal?.aborted) {
          resolve({
            success: false,
            textureUrl: null,
            message: 'Failed to read image file'
          });
        }
      };
      
      // Abort handler for FileReader
      const abortHandler = () => {
        reader.abort();
        reject(new DOMException('Operation aborted', 'AbortError'));
      };
      
      if (signal) {
        signal.addEventListener('abort', abortHandler, { once: true });
      }
      
      if (imageFile) {
        reader.readAsDataURL(imageFile);
      } else {
        resolve({
          success: false,
          textureUrl: null,
          message: 'No image file provided'
        });
      }
    }, 2000);

    // Handle abort during timeout
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timeoutId);
        reject(new DOMException('Operation aborted', 'AbortError'));
      }, { once: true });
    }
  });
}
