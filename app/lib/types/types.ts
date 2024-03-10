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

export enum BuzzhubColors {
  GREEN_DARK = "#B5D6B2",
  GREEN_DARKER = "#8ABF8A",
  GREEN_DARKEST = "#5F9C5F",
  YELLOW = "#FBC86A",
  YELLOW_DARK = "#FCB017",
  NAVY = "#545778",
  NAVY_DARK = "#2B2D42",
  GREY_LIGHT = "#F8F9FA"
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
  type: BoxType;
  frames: Frame[];
}

export enum FrameItemType {
  QUANTITY = "QUANTITY",
  PERCENTAGE = "PERCENTAGE",
  RADIO = "RADIO"
}

export enum BoxType {
  BROOD = "BROOD",
  HONEY = "HONEY",
}

export enum FrameItemGroup {
  QUEEN = "QUEEN",
  EMPTY = "EMPTY",
  HONEY = "HONEY",
  BROOD = "BROOD",
}

export interface FrameItem
{
  label: string;
  type: FrameItemType;
  values?: ( string | number )[];
  value?: string | number;
  group: FrameItemGroup;
  radioOptions?: string[];
  selected:boolean;
  destroyed?:boolean;
}

export interface Frame {
  frame: string;
  uncappedHoney : FrameItem
  cappedHoney : FrameItem
  pollen : FrameItem
  nectar : FrameItem
  empty : FrameItem
  unbuilt : FrameItem
  notes : string
}

export interface BroodFrame extends Frame {
  practiceQueenCells : FrameItem,
  supercedureQueenCells : FrameItem,
  droneCells : FrameItem
  droneFrame : FrameItem
  eggs : FrameItem
  larvae : FrameItem
  brood : FrameItem
}

export interface HoneyFrame extends Frame {
  harvested : boolean
}

export interface TrelloMember{
  id: string;
  fullName: string;
  username: string;
}

export interface InspectionJobFormValues {
  participants: TrelloMember[];
  boxes: Box[];
  nextSteps: {
    goal: string;
    full: boolean;
    date: Date;
  };
  general: {
    weather: string;
    overview: string;
    time: Date;
    temperment: string;
  }
}

export interface Agenda{
  BEEKEEPING: Category;
  COLLECTIVE: Category;
}
export interface Category{
  [key:string]: Task[];
  unassigned: Task[];
  inProgress: Task[];
  completed: Task[];
}
export interface Task{
  eventId: string;
  idList: string;
  labels: string[];
  name: string;
  participants: string[];
  start: string | null;
}

interface MeetingAgendaRole<T>{
  name: string;
  value: T;
}
export interface MeetingAgendaDetails<T>{
  date: Date;
  location: string;
  id: string;
  isMonthly: boolean;
  roles: MeetingAgendaRole<T>[];
}

export interface Meeting<T> {
  details : MeetingAgendaDetails<T>;
  agenda: Agenda;
  next?: MeetingAgendaDetails<T>;
}