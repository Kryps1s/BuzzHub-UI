import { Agenda } from '@/app/lib/types/types'
import MeetingAgenda from '../../app/[locale]/components/meeting/agenda'

describe('Meeting Agenda', () => {

    const mockTask = () => {
        return {
            "eventId": Math.random().toString(),
            "name": `name${Math.random().toString()}`,
            "participants": [],
            "idList": "123",
            "labels": [],
            "start": null
        }
    }
    const mockAgenda : Agenda = {
        "BEEKEEPING": {
            "completed": [
                mockTask()
            ],
            "inProgress": [
                mockTask(),
                mockTask()
            ],
            "unassigned": []
        },
        "COLLECTIVE":
        {
            "completed": [
                mockTask()
            ],
            "inProgress": [
                mockTask(),
                mockTask()
            ],
            "unassigned": []
        }
    }

    const mountMeetingAgenda = (agenda: Agenda = mockAgenda) => {
        cy.mount(<MeetingAgenda agenda={agenda} />);
    };

  it('renders', () => {
    mountMeetingAgenda();
    cy.contains('BEEKEEPING')
    cy.contains('COLLECTIVE')
    })

    it('renders with empty agenda', () => {
        mountMeetingAgenda({
            "BEEKEEPING": {
                "completed": [],
                "inProgress": [],
                "unassigned": []
                    },
                    "COLLECTIVE":
                    {
                        "completed": [],
                        "inProgress": [],
                        "unassigned": []
                        }
                        });
        cy.contains('BEEKEEPING')
        cy.contains('COLLECTIVE')
        })

   
 })

