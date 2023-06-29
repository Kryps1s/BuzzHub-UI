export interface Role {
    roleName: string;
    userName: string;
  }
  
export enum EventType {
    MEETING,
    COLLECTIVE,
    BEEKEEPING,
  }
  
export interface Event {
    eventId?: string;
    type: EventType;
    start: string;
    end: string;
    roles: Role[];
    location: string;
  }