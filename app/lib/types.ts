export interface Role {
    roleName: string;
    userName: string;
  }

export enum EventType {
    MEETING = "MEETING",
    COLLECTIVE = "COLLECTIVE",
    BEEKEEPING = "BEEKEEPING"
  }

export interface Event {
    eventId?: string;
    type: EventType;
    start: string;
    name: string;
    end: string;
    roles: Role[];
    location: string;
    isMonthly?: boolean;
  }

export interface CalendarEvent {
  title: string,
  start: string,
  backgroundColor: string
}