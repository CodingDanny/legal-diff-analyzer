export interface ApiDiffResponse {
  // Define the expected response structure based on your backend
  // This should match what your backend returns
  differences: any[];
}

export const analyzePdfDiff = async (file1: File, file2: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);

  try {
    const response = await fetch('http://localhost:8000/pdf-diff', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};