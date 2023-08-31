export interface Role {
    roleName: string;
    user: TrelloMember;
  }

export enum EventType {
    MEETING = "MEETING",
    COLLECTIVE = "COLLECTIVE",
    BEEKEEPING = "BEEKEEPING"
  }

export enum RowType {
  TODAY= "TODAY",
  BEEKEEPING= "BEEKEEPING",
  COLLECTIVE= "COLLECTIVE",
}

export interface Event {
    eventId: string;
    type: EventType;
    start: string;
    name: string;
    end?: string;
    roles?: Role[];
    location?: string;
    isMonthly?: boolean;
    goal?: string | null;
    jobs?: string[];
    hives?: string[];
    link?: string | null;
    notes?: string;
  }

export interface CalendarEvent {
  title: string,
  start: string,
  backgroundColor: string,
  url?: string
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

export enum FrameItemType {
  QUANTITY = "QUANTITY",
  PERCENTAGE = "PERCENTAGE",
  RADIO = "RADIO"
}

export enum FrameItemGroup {
  QUEEN = "QUEEN",
  EMPTY = "EMPTY",
  HONEY = "HONEY",
  BROOD = "BROOD",
}

export interface FrameItem
{
  name: string;
  label: string;
  type: FrameItemType;
  values: ( string | number )[];
  group: FrameItemGroup;
  radioOptions?: string[];
  selected:boolean;
}

export interface Frame {
  frame: string;
  honey : FrameItem
  cappedHoney : FrameItem
  pollen : FrameItem
  nectar : FrameItem
  empty : FrameItem
  notes : string
}

export interface BroodFrame extends Frame {
  queenCups : FrameItem,
  drone : FrameItem
eggs : FrameItem
 queen : FrameItem
  larvae : FrameItem
brood : FrameItem

}

export interface HoneyFrame extends Frame {
  harvested : FrameItem
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
  general: {
    weather: string;
    overview: string;
    time: Date;
    temperment: string;
  }
}