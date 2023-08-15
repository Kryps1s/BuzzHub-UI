export interface Role {
    roleName: string;
    user: TrelloMember;
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

export interface EventCard {
  image: string;
  name: string;
  start: string;
  eventId: string;
  type: string;
  jobs?: string[];
  hives?: string[];
  location?: string;
  roles?: Role[];
}

export interface CalendarEvent {
  title: string,
  start: string,
  backgroundColor: string
}

export interface User {
  name: string;
  access_token: string;
  refresh_token: string;
  email: string;
  trello: string;
}

export interface Box {
  box: string;
  frames: Frame[];
}

export interface Frame {
  frame: string;
  eggs : boolean
  queen : boolean
  honey : boolean
  pollen : boolean
  brood : boolean
  drone : boolean
  queenCups : boolean
  nectar : boolean
  larvae : boolean
  notes : string
}

export interface TrelloMember{
  id: string;
  fullName: string;
  username: string;
}

export interface InspectionJobFormValues {
  participants: TrelloMember[];
  boxes: Box[];
  nextSteps: string;
}