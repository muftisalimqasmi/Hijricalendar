import { getLocalHijriDate, HIJRI_MONTHS_DATA } from './ummAlQuraData';
import { HijriDate, AlAdhanResponse } from '../types';

export const fetchHijriDate = async (): Promise<{ date: HijriDate; source: 'local' | 'api' }> => {
  const today = new Date();
  
  // 1. Load from local source (Simulating the JSON lookup)
  // This is instant and requires no network.
  const localData = getLocalHijriDate(today);
  const dayNumber = parseInt(localData.day, 10);

  // 2. Logic: If Day 1-28, return local immediately.
  if (dayNumber >= 1 && dayNumber <= 28) {
    console.log(`Day is ${dayNumber} (1-28). Using local data.`);
    return { date: localData, source: 'local' };
  }

  // 3. Logic: If Day 29+, check API for moon sighting confirmation.
  console.log(`Day is ${dayNumber} (29+). Checking API...`);
  
  try {
    // Format date as DD-MM-YYYY for AlAdhan API
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const dateStr = `${dd}-${mm}-${yyyy}`;

    // 5-second timeout for the fetch
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`, {
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json: AlAdhanResponse = await response.json();
    const apiDate = json.data.hijri;

    // Normalize API Month Names to ensure "Full Month" display consistency
    // e.g., if API returns "Jumada I", we force "Jumada al-Awwal"
    const monthNum = apiDate.month.number;
    if (HIJRI_MONTHS_DATA[monthNum]) {
      apiDate.month.en = HIJRI_MONTHS_DATA[monthNum].en;
      apiDate.month.ar = HIJRI_MONTHS_DATA[monthNum].ar;
    }

    return { date: apiDate, source: 'api' };

  } catch (error) {
    console.warn('API check failed or timed out. Falling back to local data.', error);
    // Fallback to local data on error
    return { date: localData, source: 'local' };
  }
};