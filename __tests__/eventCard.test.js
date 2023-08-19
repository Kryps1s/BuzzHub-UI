import {render, screen, waitFor} from '@testing-library/react';
import {EventCard} from '../app/components/eventCard';
import { useSelectedTabStore } from '../app/store/selectedTab';

const getTestBeekeepingEvent = ()  => ({
    name: "test name",
    start: new Date(Date.now()),
    end: new Date(Date.now()),
    type: "BEEKEEPING",
    eventId: "test id",
    jobs: ["INSPECT"]
}) 
const getTestMeetingEvent = ()  => ({
    name: "test name",
    start: new Date(Date.now()),
    end: new Date(Date.now()),
    type: "MEETING",
    eventId: "test id",
    roles : [
        {
            roleName : "Jockey",
            user : {
                fullName : "test user"
            }
        },
        {
            roleName : "Scribe",
            user : {
                fullName : "test user 2"
            }
        },
        {
            roleName : "Facilitator",
            user : {
                fullName : "test user 3"
            }
        }
    ]
}) 

describe('EventCard', () => {
    it('has event name', async () => {  
        const testProps = getTestBeekeepingEvent();  
        render(<EventCard happeningNow={testProps} />);
        await waitFor(() => {
            const eventName = screen.getByText(/test name/i)
        expect(eventName).toBeInTheDocument();
        });
    });
    it('has event start time', async () => {
        const testProps = getTestBeekeepingEvent();  
        render(<EventCard happeningNow={testProps} />);
        await waitFor(() => {
            const regex = new RegExp(testProps.start.toLocaleString( "en-CA", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
                hour12: true
              }))
            const eventStart = screen.getByText(regex)
        expect(eventStart).toBeInTheDocument();

        });
    })
    it('shows meeting roles', async () => {
        const testProps = getTestMeetingEvent();  
        render(<EventCard happeningNow={testProps} />);
        await waitFor(() => {
            const regex = new RegExp(testProps.roles[0].user.fullName)
            const user = screen.getAllByText(regex)
            expect(user).toHaveLength(3);

        });
    })
    it('shows upcoming event by default', async () => {
        //set selected tab to past
        useSelectedTabStore.setState({selectedTab: "upcoming"});
        const upcoming = getTestBeekeepingEvent();  
        const past = getTestBeekeepingEvent();
        upcoming.jobs = ["NUC"];
        upcoming.name = "upcoming";
        past.name = "past";
        render(<EventCard past={past} upcoming={upcoming} />);
        await waitFor(() => {
            const upcomingJob = screen.getByText(/upcoming/i)
            const pastJob = screen.queryByText(/past/i)
            expect(upcomingJob).toBeInTheDocument();
            expect(pastJob).not.toBeInTheDocument();
        });
    })
    it('shows past event when selected', async () => {
        
        useSelectedTabStore.setState({selectedTab: "past"});
        const upcoming = getTestBeekeepingEvent();  
        const past = getTestBeekeepingEvent();
        upcoming.jobs = ["NUC"];
        upcoming.name = "upcoming";
        past.name = "past";
        render(<EventCard past={past} upcoming={upcoming} />);
        
        await waitFor(() => {
            const upcomingJob = screen.queryByText(/upcoming/i);
            const pastJob = screen.queryByText(/past/i);
            
            expect(upcomingJob).not.toBeInTheDocument();
            expect(pastJob).toBeInTheDocument();
        });
    });
    it('shows happening now event regardless of selected', async () => {
        useSelectedTabStore.setState({selectedTab: "past"});
        const happeningNow = getTestBeekeepingEvent();  
        happeningNow.jobs = ["NUC"];
        happeningNow.name = "happening now";
        render(<EventCard happeningNow={happeningNow} />);
        await waitFor(() => {
            expect(screen.queryByText(/happening now/i)).toBeInTheDocument();
        });
        useSelectedTabStore.setState({selectedTab: "upcoming"});
        await waitFor(() => {
            expect(screen.queryByText(/happening now/i)).toBeInTheDocument();
        });
    });
    it('stops showing past event when selected', async () => {
        // Set the selectedTab to "past" in the Zustand store
        useSelectedTabStore.setState({ selectedTab: "past" });
    
        const upcoming = getTestBeekeepingEvent();  
        const past = getTestBeekeepingEvent();
        upcoming.jobs = ["NUC"];
        upcoming.name = "upcoming";
        past.name = "past";
        render(<EventCard past={past} upcoming={upcoming} />);
    
        // Wait for the component to update
        await waitFor(() => {
            const upcomingJob = screen.queryByText(/upcoming/i);
            const pastJob = screen.queryByText(/past/i);
            expect(upcomingJob).not.toBeInTheDocument();
            expect(pastJob).toBeInTheDocument();
        });
    
        // Set the selectedTab to "upcoming" in the Zustand store
        useSelectedTabStore.setState({ selectedTab: "upcoming" });
    
        // Wait for the component to update again
        await waitFor(() => {
            const upcomingJob = screen.queryByText(/upcoming/i);
            const pastJob = screen.queryByText(/past/i);
            expect(upcomingJob).toBeInTheDocument();
            expect(pastJob).not.toBeInTheDocument();
        });    });

});
