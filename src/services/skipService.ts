
import { Skip, SkipResponse } from "../types/skip";

export const fetchSkips = async (postcode: string = 'LE10', area: string = 'Hinckley'): Promise<SkipResponse> => {
  try {
    const response = await fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch skips');
    }
    
    // The API returns an array directly, not an object with a skips property
    const skipsData = await response.json();
    return { skips: skipsData };
  } catch (error) {
    console.error('Error fetching skips:', error);
    return { skips: [] };
  }
};
