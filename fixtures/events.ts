import { Event, EventType } from '../app/lib/types/types';

export const createEvents = ( EventTypes : string[], Times : string[] ) : Event[] => {
    // Sample event types
  
  function generateEvent(eventId:string, type:EventType, time:string, i:number) : Event {
    const today = new Date();
    let start = new Date();
    switch (time) {
        case "past":
            start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0, 0, 0, 0);
            break;
        case "future":
            start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 0, 0, 0, 0);
            break;
        case "today":
            start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, + i);
    }
    return {
      eventId,
      type,
      start: start.toISOString(),
      name: ` Event ${eventId}`,
    };
  }
    const events : Event[] = [];
    EventTypes.forEach((type) => {
        Times.forEach((time) => {
            for (let i = 0; i < 5; i++) {
                const randomId = Math.floor(Math.random() * 1000000).toString();
                let event = generateEvent(randomId,type as EventType, time, i);
                if(type === "MEETING"){
                  event.roles = [{roleName: "Facilitator", user: {"fullName": "John Doe", id: randomId, username: "jdoe"}},
                  {roleName: "Jockey", user: {"fullName": "Luna", id: randomId, username: "jdoe"}},
                  {roleName: "Scribe", user: {"fullName": "Petrie", id: randomId, username: "jdoe"}}]
                }
                events.push(event);
            }
        });
        
    });  
    return events;
  }
  
