export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      const width = img.width;
      const height = img.height;
      resolve({ width, height });
    };

    img.onerror = function () {
      reject(new Error("Could not load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};
