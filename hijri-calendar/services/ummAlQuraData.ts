import { HijriDate } from '../types';

// Standardized Hijri Month Data (1-12)
// This serves as the source of truth for "Full Month" names for both Local and API data.
export const HIJRI_MONTHS_DATA: Record<number, { en: string; ar: string }> = {
  1: { en: 'Muharram', ar: 'محرم' },
  2: { en: 'Safar', ar: 'صفر' },
  3: { en: 'Rabiʻ al-Awwal', ar: 'ربيع الأول' },
  4: { en: 'Rabiʻ al-Thani', ar: 'ربيع الآخر' },
  5: { en: 'Jumada al-Awwal', ar: 'جمادى الأولى' },
  6: { en: 'Jumada al-Thani', ar: 'جمادى الآخرة' },
  7: { en: 'Rajab', ar: 'رجب' },
  8: { en: 'Shaʻban', ar: 'شعبان' },
  9: { en: 'Ramadan', ar: 'رمضان' },
  10: { en: 'Shawwal', ar: 'شوال' },
  11: { en: 'Dhu al-Qaʻdah', ar: 'ذو القعدة' },
  12: { en: 'Dhu al-Hijjah', ar: 'ذو الحجة' },
};

// Map identifying strings returned by Intl.DateTimeFormat to month numbers
// Includes common abbreviations and potential full names to ensure correct mapping
const INTL_TO_NUMBER: Record<string, number> = {
  // Standard abbreviated (often returned by Intl)
  'Muharram': 1,
  'Safar': 2,
  'Rabiʻ I': 3,
  'Rabiʻ II': 4,
  'Jumada I': 5,
  'Jumada II': 6,
  'Rajab': 7,
  'Shaʻban': 8,
  'Ramadan': 9,
  'Shawwal': 10,
  'Dhu al-Qidah': 11,
  'Dhu al-Hijjah': 12,
  // Full names or variants (safeguard)
  'Rabiʻ al-Awwal': 3,
  'Rabiʻ al-Thani': 4,
  'Jumada al-Awwal': 5,
  'Jumada al-Thani': 6,
  'Dhu al-Qaʻdah': 11,
};

export const getLocalHijriDate = (date: Date): HijriDate => {
  // We use Intl to simulate reading from a perfected local JSON file
  const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const parts = formatter.formatToParts(date);
  const dayPart = parts.find(p => p.type === 'day')?.value || '1';
  const monthPart = parts.find(p => p.type === 'month')?.value || 'Muharram';
  const yearPart = parts.find(p => p.type === 'year')?.value || '1446';

  // Resolve standard data
  const monthNum = INTL_TO_NUMBER[monthPart] || 1;
  const standardMonth = HIJRI_MONTHS_DATA[monthNum] || HIJRI_MONTHS_DATA[1];

  return {
    day: dayPart,
    month: {
      number: monthNum,
      en: standardMonth.en,
      ar: standardMonth.ar,
    },
    year: yearPart,
    designation: {
      abbreviated: 'AH',
      expanded: 'Anno Hegirae',
    },
  };
};