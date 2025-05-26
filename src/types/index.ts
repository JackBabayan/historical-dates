export interface Event {
    year: number;
    description: string;
  }
  
  export interface Period {
    id: number;
    name: string;
    startYear: number;
    endYear: number;
    events: Event[];
  }