import InspectFrame from '@/app/[locale]/components/jobs/_inspectFrame';
import { Box, BroodFrame, Frame, FrameItemGroup, FrameItemType, InspectionJobFormValues } from '@/app/lib/types/types';
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
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.BROOD,
            selected: false
          },
          cappedHoney: {
            label: "Capped Honey",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.HONEY,
            selected: false
          },
          uncappedHoney: {
            label: "Uncapped Honey",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.HONEY,
            selected: false
          },
          pollen: {
            label: "Pollen",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.HONEY,
            selected: false
          },
          brood: {
            label: "Capped Brood",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.BROOD,
            selected: false
          },
          droneCells: {
            label: "Drone Cells",
            value:  1,
            type: FrameItemType.QUANTITY,
            destroyed: false,
            group: FrameItemGroup.BROOD,
            selected: false
          },
          droneFrame: {
            label: "Drone Frame",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.BROOD,
            selected: false
          },
          practiceQueenCells: {
            label: "Practice Queen Cups",
            value: 1,
            type: FrameItemType.QUANTITY,
            destroyed: false,
            group: FrameItemGroup.QUEEN,
            selected: false
          },
          supercedureQueenCells: {
            label: "Supercedure Queen Cups",
            value: 1,
            type: FrameItemType.QUANTITY,
            destroyed: false,
            group: FrameItemGroup.QUEEN,
            selected: false
          },
          nectar: {
            label: "Nectar",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.HONEY,
            selected: false
          },
          larvae: {
            label: "Larvae",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.BROOD,
            selected: false
          },
          empty: {
            label: "Empty",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.EMPTY,
            selected: false
          },
          unbuilt: {
            label: "Unbuilt",
            values: [ "0", "0" ],
            type: FrameItemType.PERCENTAGE,
            group: FrameItemGroup.EMPTY,
            selected: false
          },
          notes: ""
        } as BroodFrame;
        const index = 0;
        const frameIndex = 0;
        const form = {
            values: {
                boxes: [
                  {
                    frames:[
                      frame] as Frame[]
                  }
              ] as Box[]
            },
            getInputProps: (name: string) => {},
        } as UseFormReturnType<InspectionJobFormValues>
         ;
       const props = {
              frame,index,frameIndex,form,initialState:[],updateFrameState:()=>{}
            };

        cy.viewport(1920, 1080);
        cy.mount(<InspectFrame {...props} />);
    });

    it('displays everything', () => {
        cy.get('#frame');
        cy.get('#frameItemPicker-0-0');
        cy.contains('Notes');
    });

    it('opens the item picker', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Eggs');
        cy.contains('Queen');
        cy.contains('Honey');
    });

    it('selects an item', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Eggs').click();
        cy.get('#frameItem-0-0-eggs').should('exist');
    });

    it('selects multiple items', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Eggs').click();
        cy.contains('Queen').click();
        cy.get('#frameItem-0-0-eggs').should('exist');
        cy.get('#frameItem-0-0-practiceQueenCells').should('exist');
    });

    it('selects an item and keeps the picker open', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Eggs').click();
        cy.contains('Queen');
    });

    it('scrolls on overflow', () => {});

    it('shows sliders on percentage type items', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-cappedHoney').should('exist');
        cy.get('#frameItem-0-0-cappedHoney > :nth-child(2)').contains('Side A');
        cy.get('#frameItem-0-0-cappedHoney > :nth-child(4)').contains('Side B');
        
    });

    it('moves the slider', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-cappedHoney-sliderA').should('exist');
        cy.get('.mantine-Slider-thumb').first().trigger('mousedown', { which: 1 })
        cy.contains('0')
        .trigger('mousemove', { clientX: 1600, clientY: 0, force: true })
        .contains('100')
        .trigger('mouseup', { force: true })
        cy.contains('100').should('not.exist');


    });

    it('clears an item', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Honey').click();
        cy.get('#frameItem-0-0-cappedHoney')
        cy.get('.mantine-MultiSelect-defaultValue > .mantine-UnstyledButton-root').should('exist');
        cy.get('.mantine-MultiSelect-defaultValue > .mantine-UnstyledButton-root').click();
        cy.get('#frameItem-0-0-cappedHoney').should('not.exist');
    })

    it('clears all items', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Honey').click();
        cy.contains('Eggs').click();
        cy.get('.mantine-UnstyledButton-root').last().click();
    });

    it('adds a quantity item', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Drone Cells').click();
        cy.get('#frameItem-0-0-droneCells').should('exist');
        cy.get('#frameItem-0-0-droneCells-quantity')
        cy.contains('Destroyed');
    });

    it('adds a quantity item and marks as destroyed', () => {
        cy.get('#frameItemPicker-0-0').click();
        cy.contains('Drone Cells').click();
        cy.get('#frameItem-0-0-droneCells').should('exist');
        cy.get('#frameItem-0-0-droneCells-quantity').should('have.value', '1');
        cy.contains('+').click();
        cy.get('#frameItem-0-0-droneCells-quantity').should('have.value', '2');
        cy.contains('–').click();
        cy.get('#frameItem-0-0-droneCells-quantity').should('have.value', '1');
        cy.contains('–').click();
        cy.get('#frameItem-0-0-droneCells-quantity').should('have.value', '1');
        cy.get('#frameItem-0-0-droneCells-quantity').type('{backspace}');
        cy.get('#frameItem-0-0-droneCells-quantity').type('13');
        cy.get('#frameItem-0-0-droneCells-quantity').type('{enter}');
        cy.get('#frameItem-0-0-droneCells-quantity').should('have.value', '13');
    });
});
