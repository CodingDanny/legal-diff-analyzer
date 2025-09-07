import { DiffElement } from '@/components/DiffViewer';

export interface ApiDiffResponse {
  differences: DiffElement[];
}

export const analyzePdfDiff = async (file1: File, file2: File): Promise<DiffElement[]> => {
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);

  try {
    const response = await fetch('https://legal-document-change-analyzer-dannyhucke.replit.app/pdf-diff', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Handle the raw API response and map it to our DiffElement format
    const rawData: any[] = Array.isArray(result) ? result : [];
    
    // Map the backend response to match our DiffElement interface
    return rawData.map((item: any): DiffElement => ({
      type: item.type,
      content: item.content,
      old_index: item.old_index,
      new_index: item.new_index,
      old_range: item.old_range,
      new_range: item.new_range,
      old_content: item.old_content,
      new_content: item.new_content,
      similarity: item.similarity,
      inline_diff: item.inline_diff,
      // Handle classification and impact_analysis properly
      classification: (() => {
        // If impact_analysis exists at the top level, move it under classification
        if (item.impact_analysis) {
          return {
            decision: (item.classification?.decision || 'Critical') as 'Critical' | 'Minor' | 'Formatting',
            impact_analysis: {
              legal_implications: item.impact_analysis.legal_implications,
              affected_party: item.impact_analysis.affected_party,
              severity: item.impact_analysis.severity as 'low' | 'medium' | 'high'
            }
          };
        }
        // If classification already exists, use it as-is
        return item.classification;
      })()
    }));
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};