export interface HijriDate {
  day: string;
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
}

export interface AlAdhanResponse {
  code: number;
  status: string;
  data: {
    hijri: HijriDate;
    gregorian: {
      date: string;
      format: string;
      day: string;
      weekday: {
        en: string;
      };
      month: {
        number: number;
        en: string;
      };
      year: string;
    };
  };
}

export interface LocalCalendarData {
  [dateString: string]: HijriDate;
}