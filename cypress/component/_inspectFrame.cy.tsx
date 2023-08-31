import InspectFrame from '@/app/components/jobs/_inspectFrame';
import { BroodFrame, FrameItemGroup, FrameItemType, InspectionJobFormValues } from '@/app/lib/types/types';
import { UseFormReturnType } from '@mantine/form';

describe('InspectFrame', () => {
    function drag (number:number, x:number, y:number) {
        cy.get(`.piece-${number}`)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { clientX: x, clientY: y })
        .trigger('mouseup', { force: true })
      }
    beforeEach(() => {
        const frame = {
            eggs: {
              label: "Eggs",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            queen: {
              label: "Queen",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            honey: {
              label: "Honey",
              values: [ "0", "0" ],
              type: FrameItemType.PERCENTAGE,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            pollen: {
              label: "Pollen",
              values: [ "0", "0" ],
              type: FrameItemType.PERCENTAGE,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            brood: {
              label: "Brood",
              values: [ "0", "0" ],
              type: FrameItemType.PERCENTAGE,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            drone: {
              label: "Drone",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            queenCups: {
              label: "Queen Cups",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            nectar: {
              label: "Nectar",
              values: [ "0", "0" ],
              type: FrameItemType.PERCENTAGE,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            larvae: {
              label: "Larvae",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            empty: {
              label: "Empty",
              values: [ "0", "0" ],
              type: FrameItemType.RADIO,
              group: FrameItemGroup.BROOD,
              selected: false
            },
            notes: ""
          }as BroodFrame;
        const index = 0;
        const frameIndex = 0;
        const form = {
            getInputProps: (name: string) => {},
        } as UseFormReturnType<InspectionJobFormValues>
         ;
       const props = {
              frame,index,frameIndex,form
            };

        cy.viewport(1920, 1080);
        cy.mount(<InspectFrame {...props} />);
    });

    it('displays everything', () => {
        cy.get('#frame');
        cy.contains('Notes');
        cy.contains('Other');
    });

    it('opens the item picker', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Eggs');
        cy.contains('Queen');
        cy.contains('Honey');
    });

    it('selects an item', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Eggs').click();
        cy.get('#frameItem-0-0-Eggs').should('exist');
    });

    it('selects multiple items', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Eggs').click();
        cy.contains('Queen').click();
        cy.get('#frameItem-0-0-Eggs').should('exist');
        cy.get('#frameItem-0-0-Queen').should('exist');
    });

    it('selects an item and keeps the picker open', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Eggs').click();
        cy.contains('Queen');
    });

    it('scrolls on overflow', () => {});

    it('shows sliders on percentage type items', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-Honey').should('exist');
        cy.get('#frameItem-0-0-Honey > :nth-child(2)').contains('Side A');
        cy.get('#frameItem-0-0-Honey > :nth-child(4)').contains('Side B');
        
    });

    it('moves the slider', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-Honey-sliderA').should('exist');
        cy.get('.mantine-Slider-thumb').first().trigger('mousedown', { which: 1 })
        cy.contains('0')
        .trigger('mousemove', { clientX: 1600, clientY: 0, force: true })
        .contains('100')
        .trigger('mouseup', { force: true })
        cy.contains('100').should('not.exist');


    });

    it('clears an item', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-Honey')
        cy.get('.mantine-MultiSelect-defaultValue > .mantine-UnstyledButton-root').should('exist');
        cy.get('.mantine-MultiSelect-defaultValue > .mantine-UnstyledButton-root').click();
        cy.get('#frameItem-0-0-Honey').should('not.exist');
    })

    it('clears all items', () => {
        cy.get('#frameItemPicker').click();
        cy.contains('Honey').click();
        cy.contains('Eggs').click();
        cy.get('.mantine-UnstyledButton-root').last().click();
    });
});