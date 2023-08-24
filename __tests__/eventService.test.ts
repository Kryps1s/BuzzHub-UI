import { getEvent } from '../app/lib/services/eventService';
import { createEvents } from '../fixtures/events';
import { Event,  RowType } from '../app/lib/types/types';
import { describe, it, expect } from '@jest/globals';

describe('getEvent', () => {
    let events : Event[];
    beforeEach(() => {
        events = createEvents(['MEETING', 'COLLECTIVE', 'BEEKEEPING'],["past", "future", "today"]);
    });

    it('should return an event', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 0);
        expect(event).toBeDefined();
        });
    
    it('should return an event with the correct type', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 0);
        expect(event.type).toBe("BEEKEEPING");
    });

    it('should return an event for today', () => {
        const event = getEvent( events, "TODAY" as RowType, 0);
        expect(event).toBeDefined();
        const today =  new Date().toISOString().slice(0, 10);
        expect(event.start.split("T")[0]).toBe(today);
    });

    it('should return an event for collctive', () => {
        events  = createEvents(['COLLECTIVE','MEETING'],[ "today","future"]);
        let event = getEvent( events, "COLLECTIVE" as RowType, 1);
        expect(event).toBeDefined();
        expect(event.type).toBe("MEETING");
        event = getEvent( events, "COLLECTIVE" as RowType, 0);
        expect(event).toBeDefined();
        expect(event.type).toBe("COLLECTIVE");
    })

    it('should return an event for past', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 0, true);
        expect(event).toBeDefined();
        const today =  new Date()
        expect(new Date(event.start) < today).toBeTruthy();
    });

    it('should return past events in descending order', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 0, true);
        const event2 = getEvent( events, "BEEKEEPING" as RowType, 1, true);
        expect(new Date(event.start) > new Date(event2.start) ).toBeTruthy();
    })

    it('should return future events in ascending order', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 0);
        const event2 = getEvent( events, "BEEKEEPING" as RowType, 1);
        expect(new Date(event.start) < new Date(event2.start) ).toBeTruthy();
    })

    it('should return undefined when there is no event', () => {
        const event = getEvent( events, "BEEKEEPING" as RowType, 100);
        expect(event).toBeUndefined();
    })
});