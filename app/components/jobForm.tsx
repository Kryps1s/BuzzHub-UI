"use client";
import { useState, useRef } from "react";
import { Stepper, Button, Group, NumberInput, Title, Textarea, NumberInputHandlers, rem, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import SearchSelectTable from "./searchSelectTable";
import { Accordion } from "@mantine/core";
import BoxForm from "./jobs/_inspectBox";
import Link from "next/link";
import { Box, TrelloMember } from "../lib/types";

interface JobFormProps {
  jobs: string[];
  trelloMembers: TrelloMember[];
}

const JobForm = ( { trelloMembers } : JobFormProps ) : React.JSX.Element => {

  const createBox = ( index:number ) : Box => ( {
    box: index.toString(),
    frames:Array( 10 ).fill( {
      queen: false,
      queenCups: false,
      honey: false,
      pollen: false,
      brood: false,
      drone: false,
      nectar: false,
      eggs: false,
      larvae: false,
      notes: ""
    } )
  } );

  const [ active, setActive ] = useState ( 0 );

  const handlers = useRef<NumberInputHandlers>();

  const participants : TrelloMember[] = [];
  const form = useForm ( {
    initialValues: {
      participants,
      boxes: [ createBox( 2 ), createBox( 1 ) ],
      nextSteps: ""
    }
  } );

  const nextStep = () : void =>
    setActive ( ( current ) => current < 4 ? current + 1 : current );

  const submit = () : void => {
    const report = createReport();
    report.pop(); //TODO: send report to api
    nextStep();
  };
  const createReport = () : string[] => {
    const report = [];
    //check if there are any participants and that
    if ( form.values.participants.length === 0 ) {
      report.push( "# Participants" );
      report.push( " " );
      const fullNames = form.values.participants.map( ( participant ) => `**${participant.fullName}**` );
      report.push( fullNames.join( ", " ) );
      report.push( " " );
      report.push( "---" );
    }

    report.push( "# Box Overview" );
    form.values.boxes.forEach( ( box, index ) => {
      report.push( `## Box ${index + 1}` );
      box.frames.forEach( ( frame, index ) => {
        let frameReport = " - Frame " + ( index + 1 ) + ": ";
        //if all boolean properties are false, and notes empty, just write "skipped"
        if ( Object.values( frame ).every( ( value ) => typeof value !== "boolean" || value === false ) && frame.notes === "" ) {
          report.push( frameReport + "_skipped_" );
        }
        else {
        //loop over each property of the frame
          Object.entries( frame ).forEach( ( [ key, value ] ) => {
          //if the value is true, add it to the report
            if ( value === true ) {
              frameReport += `${key}, `;
            }
          } );
          report.push( frameReport );
          //if there are notes, add them to the report
          if ( frame.notes !== "" ) {
            report.push( `  - ${frame.notes}` );
          }
        }
      } );
      report.push( " " );
    } );
    report.push( "---" );
    report.push( "# Next Steps" );
    report.push( " " );
    report.push( form.values.nextSteps );
    //join with escaped newlines
    return report;
  };

  const prevStep = () => setActive ( ( current ) => ( current > 0 ? current - 1 : current ) );
  //map each box to an accordion item, and each boolean to a checkbox
  const accordionItems = form.values.boxes.map( ( box, index ) => (
    <Accordion.Item value={box.box.toString()} key={box.box.toString() + index}>
      <Accordion.Control>Box #{box.box}</Accordion.Control>
      <Accordion.Panel>
        <BoxForm box={box} index={index} form={form}/>
      </Accordion.Panel>
    </Accordion.Item>
  )
  );
  const setBoxes = ( boxes:number | "" ) => {
    if( typeof boxes === "number" ) {
      const newBoxes = [];
      //reverse the order of the boxes so that the newest box is first
      for ( let i = boxes; i > 0; i-- ) {
        newBoxes.push( createBox( i ) );
      }
      form.setValues( { ...form.values, boxes: newBoxes } );
    }
  };

  return (
    <>
      <Stepper className="px-4" active={active} onStepClick={setActive}>
        <Stepper.Step label="Setup" description="Take attendance">
          <div className=" w-full px-4 overflow-x-hidden overflow-y-scroll">
            <Title className="flex justify-center mb-4" order={2}>Check all of the members that are at the inspection.</Title>
            <SearchSelectTable data={ trelloMembers } formField={"participants"} form={form}/>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Setup" description="Hive Prep">

          <div className="flex flex-col align-middle">
            <Title className="flex justify-center mb-4" order={2}>How many boxes are you inspecting?</Title>
            <Group className="flex justify-center" spacing={5}>
              <ActionIcon size={42} variant="default" onClick={() => handlers.current?.decrement()}>
            –
              </ActionIcon>

              <NumberInput
                hideControls
                readOnly
                value={form.values.boxes.length}
                onChange={( qty ) => setBoxes( qty )}
                handlersRef={handlers}
                max={10}
                min={1}
                step={1}
                styles={{ input: { width: rem( 54 ), textAlign: "center" } }}
              />

              <ActionIcon size={42} variant="default" onClick={() => handlers.current?.increment()}>
            +
              </ActionIcon>
            </Group>
          </div>

        </Stepper.Step>

        <Stepper.Step label="Inspection" description="Notes">

          <Title className="flex justify-center mb-4" order={2}>Log your notes</Title>
          <Accordion defaultValue={form.values.boxes[0].box.toString()}>

            {accordionItems}

          </Accordion>
        </Stepper.Step>

        <Stepper.Step label="Inspection" description="Next Steps">
          <Textarea
            className="px-6 py-2"
            placeholder="Write notes for the next inspection here."
            label="Next Steps"
            radius="sm"
            size="xl"
            value={form.values.nextSteps}
            onChange={( event ) => {
              form.setFieldValue ( "nextSteps", event.currentTarget.value );
            }}
          />
        </Stepper.Step>

        <Stepper.Completed>
          <div className="overflow-y-scroll">
            <Title order={2}> Your report has been added to the Trello card. Thank you for trying BuzzHub Beta! 🐝</Title>

          </div>
        </Stepper.Completed>

      </Stepper>

      <Group className=" sticky bottom-0 right-2 md:relative md:bottom-auto mt-8 md:mt-0" position="right" mt="md">
        {active !== 0 && active <3 && (
          <Button className="mt-4 border border-slate-200" onClick={prevStep}>
            Back
          </Button>
        )}
        {active ===4 && <Link href="/"><Button className="mr-4 mt-4 border border-slate-200" >Done</Button></Link>}
        {active <3 && <Button className="mr-4 mt-4 border border-slate-200" onClick={nextStep}>Next step</Button>}
        {active === 3 && <Button className="mr-4 mt-4 border border-slate-200" onClick={submit}>Submit</Button>}
      </Group>
    </>
  );
};

export default JobForm;