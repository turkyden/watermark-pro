/**
 * Get the Base64 data(url) from file blob
 * @param file AntD Upload file blob
 * @returns Promise<T>
 */
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
