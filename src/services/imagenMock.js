// Mock service simulating Google Imagen API
// Simulates a 2-second delay and returns a texture URL

export async function generateTexture(imageFile) {
  return new Promise((resolve) => {
    // Simulate 2-second API delay
    setTimeout(() => {
      // Create a data URL from the uploaded image file
      const reader = new FileReader();
      
      reader.onload = (e) => {
        resolve({
          success: true,
          textureUrl: e.target.result,
          message: 'Texture generated successfully'
        });
      };
      
      reader.onerror = () => {
        resolve({
          success: false,
          textureUrl: null,
          message: 'Failed to read image file'
        });
      };
      
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
  });
}
