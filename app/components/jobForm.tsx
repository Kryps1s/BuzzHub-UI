"use client";
import { useState, useEffect } from "react";
import { Stepper,
  Button,
  Group,
  Title,
  Textarea,
  Loader,
  Blockquote,
  ScrollArea,
  TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import useEventsStore from "../store/events";
import SelectTrelloMembersTable from "./selectTrelloMembersTable";
import { Accordion } from "@mantine/core";
import BoxForm from "./jobs/_inspectBox";
import Link from "next/link";
import { Box, TrelloMember, Frame, BroodFrame, FrameItemType, FrameItemGroup } from "../lib/types/types";
import { POST } from "../api/graphql/route";
import Quantity from "./jobs/quantity";

interface JobFormProps {
  jobs: string[];

  trelloMembers: TrelloMember[];
  id: string;
}

const JobForm = ( { trelloMembers, id } : JobFormProps ) : React.JSX.Element => {
  const createFrame = (): Frame => ( {
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
      label: "Drone Cells",
      value:  1,
      type: FrameItemType.QUANTITY,
      destroyed: false,
      group: FrameItemGroup.BROOD,
      selected: false
    },
    queenCups: {
      label: "Queen Cups",
      value: 1,
      type: FrameItemType.QUANTITY,
      destroyed: false,
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
  } as BroodFrame );
  const createBox = ( index:number ) : Box => ( {
    box: index.toString(),
    frames:Array( 10 ).fill( createFrame() )
  } );

  const [ active, setActive ] = useState ( 0 );
  const [ loading, setLoading ] = useState ( false );
  const [ submissionError, setSubmissionError ] = useState ( "" );
  const [ leader, setLeader ] = useState ( "" );
  useEventsStore( ( state ) => state.selectedEvent );
  useEffect( () => {
    //on unload of the page, warn the user if they have unsaved changes
    const unload = ( event : BeforeUnloadEvent ) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener( "beforeunload", unload );
    return () => window.removeEventListener( "beforeunload", unload );
  }, [ ] );

  const { goal = null, link = null } = useEventsStore( ( state ) => state.selectedEvent ) || {};

  const participants : TrelloMember[] = [];
  const form = useForm ( {
    initialValues: {
      participants,
      general: {
        weather: "",
        overview: "",
        temperment: "",
        time: new Date()
      },
      boxes: [ createBox( 2 ), createBox( 1 ) ],
      nextSteps: ""
    },
    validate: {
      participants: ( value ) => {
        if ( value.length === 0 ) {
          return "Please select at least one participant.";
        }
        if ( !leader ) {
          return "Please select a leader.";
        }
        return null;
      }
    }
  } );

  useEffect( () => {
    //get stepper element and apply a css rule to it's first child
    const stepper = document.getElementById( "stepper" );
    if ( stepper ) {
      const firstChild = stepper.firstChild as HTMLElement;
      firstChild?.setAttribute( "style", "overflow-x: scroll;" );
      //get second child and apply a css rule to it
      const secondChild = stepper.children[1] as HTMLElement;
      secondChild?.setAttribute( "style", "height: 95%;" );
    }
  }, [ ] );

  const goToStep = ( item :number ) : void =>{
    form.validate();
    if( form.isValid() ) {
      setActive( item );
    }
  };

  const submit = async () => {
    const participantsArray = form.values.participants.map( ( participant ) => participant.id );
    const participantsJSON = `[${participantsArray.map( ( id ) => `"${id}"` ).join( "," )}]`;
    try{
      setLoading( true );
      const report = createReport();
      const req = new Request( "http://buzzhub.com", {
        method: "POST",
        body: JSON.stringify( {
          query: `mutation SaveBeekeepingReport {
    saveBeekeepingReport(
    eventId: "${id}"
    report: "${report}"
    participants: ${participantsJSON}
    ) {
                message
            }
        }`
        } )
      } );
      await POST( req );
      goToStep( active+1 );
    }catch ( error : unknown ) {
      if ( error instanceof Error )
      {
        setSubmissionError( error.message );
      }
    }
    finally{
      setLoading( false );
    }
  };

  const createReport = () : string => {
    const report = [];
    report.push( "# Inspection Report" );
    report.push( " " );
    report.push( `## [Previous Inspection](https://trello.com/c/${link})` );
    report.push( " " );
    if( goal ) {
      report.push( "# Goals" );
      report.push( `## ${goal}` );
      report.push( " " );
      report.push( "---" );
    }
    // //check if there are any participants and that
    report.push( `# Leader: **${leader}**` );
    report.push( " " );
    if ( form.values.participants.length !== 0 ) {
      report.push( "# Participants" );
      report.push( " " );
      const fullNames = form.values.participants.map( ( participant ) => `**${participant.fullName}**` );
      report.push( fullNames.join( ", " ) );
      report.push( " " );
      report.push( "---" );
    }

    report.push( "# Notes" );
    report.push( " " );
    report.push( "## General" );
    report.push( " " );
    report.push( `### Time of Inspection: ${form.values.general.time.toLocaleString()}` );
    if( form.values.general.weather !== "" ) {
      report.push( " " );
      report.push( `### Weather: ${form.values.general.weather}` );
    }
    if( form.values.general.overview !== "" ) {
      report.push( " " );
      report.push( `### Overview: ${form.values.general.overview}` );
    }
    if( form.values.general.temperment !== "" ) {
      report.push( " " );
      report.push( `### Overview: ${form.values.general.temperment}` );
    }
    form.values.boxes.forEach( ( box ) => {
      report.push( `## Box ${box.box}` );
      box.frames.forEach( ( frame, index ) => {
        const frameReport = " - Frame " + ( index + 1 ) + ": ";
        //if all boolean properties are false, and notes empty, just write "skipped"
        if ( Object.values( frame ).every( ( value ) => ( ( typeof value === "object" && !value.selected ) || ( typeof value === "string" && value==="" ) ) ) && frame.notes === "" ) {
          report.push( frameReport + "_skipped_" );
        }
        else {
          report.push( frameReport );
          Object.entries( frame ).forEach( ( [ key, value ] ) => {
            if ( typeof frame[key as keyof Frame] === "object" && value.selected ) {
              switch ( value.type ) {
              case FrameItemType.RADIO:
                break;
              case FrameItemType.PERCENTAGE:
                report.push( `${value.label}: ${value.values[0]}%/${value.values[1]}%` );
                break;
              case FrameItemType.QUANTITY:
                report.push( `${value.label}: ${value.value} ${value.destroyed? "" : "NOT "}destroyed` );
                break;
              default:
                break;
              }
            }
          } );
          //if there are notes, add them to the report
          if ( frame.notes !== "" ) {
            report.push( `  - ${frame.notes}` );
          }
        }
      } );
      report.push( " " );
    } );
    report.push( "---" );
    report.push( "# Next Steps➡️" );
    report.push( " " );
    report.push( form.values.nextSteps );
    //join with escaped newlines
    return encodeURIComponent( report.join( "\n" ) );
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
  ) );
  accordionItems.unshift(
    <Accordion.Item value="0" key="0">
      <Accordion.Control>General</Accordion.Control>
      <Accordion.Panel>
        <Textarea
          className="px-6 py-2"
          placeholder="General inspection notes"
          label="Overview"
          radius="sm"
          size="md"
          value={form.values.general.overview}
          onChange={( event ) => {
            form.setFieldValue ( "general.overview", event.currentTarget.value );
          }}
        />
        <TextInput
          className="px-6 py-2"
          placeholder="Describe the weather"
          label="Weather"
          radius="sm"
          size="md"
          value={form.values.general.weather}
          onChange={( event ) => {
            form.setFieldValue ( "general.weather", event.currentTarget.value );
          }
          }/>
        <TextInput
          className="px-6 py-2"
          placeholder="Describe the bee's temperment"
          label="Temperment"
          radius="sm"
          size="md"
          value={form.values.general.temperment}
          onChange={( event ) => {
            form.setFieldValue ( "general.temperment", event.currentTarget.value );
          }
          }/>
        <DateTimePicker
          className="px-6 py-2"
          value={form.values.general.time}
          onChange={( value ) => {
            form.setFieldValue ( "general.time", value );
          }
          }
          label="Time of inspection"
        />
      </Accordion.Panel>
    </Accordion.Item>
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
    <form>
      <Stepper id='stepper' className="px-4 max-w-4xl mx-auto h-4/5" active={active} onStepClick={goToStep}>

        <Stepper.Step label="Setup" description="Take attendance">
          <div className="w-full max-w-xl mx-auto h-full px-4 ">
            <Title className="flex justify-center mb-4" order={2}>Select who is at the inspection.</Title>
            <Title className="flex justify-center mb-4" order={2} id="errorMessage" color="red">{form.errors.participants}</Title>
            <SelectTrelloMembersTable options={{ "leader":{ leader, setLeader } }} data={ trelloMembers } formValueName={"participants"} setFormValue={form.setFieldValue} preselectedValues={form.values.participants}/>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Setup" description="Hive Prep">
          <div className="flex flex-col align-middle h-full">
            <Title className="flex justify-center mb-4" order={2}>How many boxes are you inspecting?</Title>
            <Quantity onChangeCallback={setBoxes} value={form.values.boxes.length} />
            {goal &&
              <div className="flex flex-col h-3/4">
                <Title className="flex justify-center mb-4" order={2}>Goals for this inspection:</Title>
                <ScrollArea className="flex-grow"><Blockquote className="flex justify-center mt-4 whitespace-break-spaces "> {goal}</Blockquote></ScrollArea>
              </div>
            }
          </div>
        </Stepper.Step>

        <Stepper.Step label="Inspection" id="notes" description="Notes">
          <div className="w-full max-w-xl mx-auto h-full px-4 ">
            <Accordion className="h-full">

              {accordionItems}

            </Accordion>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Inspection" description="Next Steps">
          <div className="w-full max-w-xl mx-auto h-full px-4 ">
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
            <Title className="color-red-600">{submissionError}</Title>
          </div>
        </Stepper.Step>

        <Stepper.Completed>
          <div className="overflow-y-scroll w-full max-w-xl mx-auto h-full px-4 ">
            <Title order={2}> Your report has been added to the Trello card. Thank you for trying BuzzHub Beta! 🐝</Title>
          </div>
        </Stepper.Completed>
      </Stepper>

      <Group className="h-1/5 max-w-xl mx-auto my-auto" position="right" >
        {active !== 0 && active <4 && (
          <Button id="backStep" className="mt-4 border bg-cyan-700 border-slate-200" onClick={prevStep}>
            Back
          </Button>
        )}
        {active ===4 && <Link href="/"><Button className="mr-4 mt-4 border bg-cyan-700 border-slate-200" >Done</Button></Link>}
        {active <3 && <Button id="nextStep" className="mr-4 mt-4 bg-cyan-700 border border-slate-200" onClick={() => goToStep( active+1 )}>Next step</Button>}
        {active === 3 && loading && <Loader/>}
        {active === 3 && <Button id="submitForm" className="mr-4 mt-4 bg-cyan-700 border border-slate-200" disabled={loading} onClick={submit}>Submit</Button>}
      </Group>
    </form>
  );
};

export default JobForm;