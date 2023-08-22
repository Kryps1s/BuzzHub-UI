import {render, screen, waitFor } from '@testing-library/react';
import CalendarContainer from '../app/components/calendarContainer';

describe('CalendarContainer', () => {
    it('has calendar', async () => {  
        render(<CalendarContainer events={[]} />);
        const currentMonth = new Date().toLocaleString('default', { year:'numeric', month: 'long' })
        expect(screen.getByText(currentMonth)).toBeInTheDocument();
    });

    it('has events', async () => {
        const events = [
            {
                id: 1,
                title: 'test event',
                date: new Date()
            }
        ]
        render(<CalendarContainer events={events} />);
        expect(screen.getByText('test event')).toBeInTheDocument();
    });

    it ('has list and month view', async () => {
        const events = [
            {
                id: 1,
                title: 'test event',
                date: new Date()
            }
        ]
        render(<CalendarContainer events={events} />);
        expect(screen.getByText('list')).toBeInTheDocument();
        expect(screen.getByText('month')).toBeInTheDocument();
    });

    it ('switches to list view', async () => {
        const events = [
            {
                id: 1,
                title: 'test event',
                date: new Date(),
            }
        ]
        render(<CalendarContainer events={events} />);
        //get list Button

        const button = screen.getByText('list');
        expect(button).toBeInTheDocument();
        button.click();
        expect(screen.getByText('test event')).toBeInTheDocument();
        //find a div by class name
        const list = screen.get('fc-list');
        expect(list).toBeInTheDocument();
    });
})
