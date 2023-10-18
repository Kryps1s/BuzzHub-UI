"use client";
import { useState, useEffect } from "react";
import { Stepper,
  Button,
  Group,
  Switch,
  Title,
  Textarea,
  Loader,
  Blockquote,
  ScrollArea,
  TextInput } from "@mantine/core";
import { DatePicker, DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import useEventsStore from "../store/events";
import SelectTrelloMembersTable from "./selectTrelloMembersTable";
import { Accordion } from "@mantine/core";
import BoxForm from "./jobs/_inspectBox";
import Link from "next/link";
import { Box, TrelloMember, Frame, BroodFrame, FrameItemType, FrameItemGroup, BoxType, HoneyFrame } from "../lib/types/types";
import { POST } from "../api/graphql/route";
import Quantity from "./jobs/quantity";

interface JobFormProps {
  jobs: string[];

  trelloMembers: TrelloMember[];
  id: string;
}

const JobForm = ( { trelloMembers, id } : JobFormProps ) : React.JSX.Element => {
  const createBroodFrame = (): Frame => ( {
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
  } as BroodFrame );

  const createHoneyFrame = (): Frame => ( {
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
    nectar: {
      label: "Nectar",
      values: [ "0", "0" ],
      type: FrameItemType.PERCENTAGE,
      group: FrameItemGroup.HONEY,
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
  } as HoneyFrame );

  const createBroodBox = ( index:number ) : Box => ( {
    box: index.toString()+"-brood",
    type: BoxType.BROOD,
    frames:Array( 10 ).fill( createBroodFrame() )
  } );

  const createHoneyBox = ( index:number ) : Box => ( {
    box: index.toString()+"-honey",
    type: BoxType.HONEY,
    frames:Array( 10 ).fill( createHoneyFrame() )
  } );

  const [ active, setActive ] = useState ( 0 );
  const [ loading, setLoading ] = useState ( false );
  const [ submissionError, setSubmissionError ] = useState ( "" );
  const [ leader, setLeader ] = useState ( "" );
  const [ boxState, setBoxState ] = useState( Array( 2 ).fill( 0 ).map( () => Array( 10 ).fill( [] ) ) );
  const updateBoxState = ( boxIndex : number, value : string[][] ) => {
    const newBoxState = [ ...boxState ];
    newBoxState[boxIndex] = value;
    setBoxState( newBoxState );
  };

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
      boxes: [ createBroodBox( 2 ), createBroodBox( 1 ) ],
      nextSteps: {
        goal: "",
        date: new Date(),
        full: true
      }
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
      const nextInspection = form.values.nextSteps.date ?
        {
          //get date as yyyy-mm-dd string
          date: form.values.nextSteps.date.toISOString().split( "T" )[0],
          full: form.values.nextSteps.full,
          goal: form.values.nextSteps.goal
        }
        : null;
      let mutation = `mutation SaveBeekeepingReport {
        saveBeekeepingReport(
            eventId: "${id}"
            report: "${report}"
            participants: ${participantsJSON}`;

      if ( nextInspection ) {
        mutation += `
        nextInspection: "${nextInspection.date}"
        full: ${nextInspection.full}
        goal: "${nextInspection.goal}"`;
      }else{
        mutation += `
            nextInspection: null`;
      }

      mutation += `
        ) {
            message
        }
    }`;

      const req = new Request( "http://buzzhub.com", {
        method: "POST",
        body: JSON.stringify( {
          query: mutation
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
    ///match form selected states to the box state matrix
    form.values.boxes.forEach( ( box, boxIndex ) => {
      box.frames.forEach( ( frame, frameIndex ) => {
        //loop over frame items
        Object.entries( frame ).forEach( ( [ key, value ] ) => {
          //if the frame item is a boolean
          //set the selected property to the value in the box state matrix
          if ( typeof frame[key as keyof Frame] !== "string" && "selected" in value ) {
            if ( value instanceof Object ) {
              value.selected = boxState[boxIndex][frameIndex].includes( value.label );
            }
          }
        } );
      } );
    } );

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
      report.push( `### Temperment: ${form.values.general.temperment}` );
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
    report.push( form.values.nextSteps.goal );
    //join with escaped newlines
    return encodeURIComponent( report.join( "\n" ) );
  };

  const prevStep = () => setActive ( ( current ) => ( current > 0 ? current - 1 : current ) );
  //map each box to an accordion item, and each boolean to a checkbox
  const accordionItems = form.values.boxes.map( ( box, index ) => (
    <Accordion.Item value={box.box.toString()} key={box.box.toString() + index}>
      <Accordion.Control>Box #{box.box}</Accordion.Control>
      <Accordion.Panel>
        <BoxForm
          box={box}
          index={index}
          form={form}
          initialState = {boxState[index] || []}
          updateBoxState={updateBoxState}
        />
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
  const setBroodBoxes = ( boxes:number | "" ) => {
    const newBoxes = form.values.boxes.filter( ( box ) => box.type !== "BROOD" );

    if( typeof boxes === "number" ) {
      //reverse the order of the boxes so that the newest box is first
      for ( let i = boxes; i > 0; i-- ) {
        newBoxes.push( createBroodBox( i ) );
      }
      setBoxes( newBoxes );
    }
  };
  const setHoneyBoxes = ( boxes:number | "" ) => {
    const broodQty = getBoxTypeQuantity( form.values.boxes, "BROOD" as BoxType );
    //remove old honey boxes
    const newBoxes = form.values.boxes.filter( ( box ) => box.type !== "HONEY" );

    if( typeof boxes === "number" ) {
      //reverse the order of the boxes so that the newest box is first
      for ( let i = 0; i < boxes; i++ ) {
        newBoxes.unshift( createHoneyBox( i + 1 + broodQty ) );
      }
      setBoxes( newBoxes );
    }
  };

  const setBoxes = ( boxes : Box[] ) => {
    //reverse loop through boxes,
    //set box name to index + type
    for ( let i = boxes.length - 1; i >= 0; i-- ) {
      boxes[i].box = `${boxes.length-i}-${boxes[i].type.toLowerCase()}`;
    }
    form.setValues( { ...form.values, boxes } );
    const newBoxState = Array( boxes.length ).fill( 0 ).map( () => Array( 10 ).fill( [] ) );
    setBoxState( newBoxState );
  };

  const getBoxTypeQuantity = ( boxes:Box[], type:BoxType ) : number => {
    let quantity = 0;
    boxes.forEach( ( box ) => {
      if( box.type === type ) {
        quantity++;
      }
    } );
    return quantity;
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
            <Title className="flex justify-center mb-4" order={2}>How many boxes are in the hive?</Title>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col">
                <Title className="flex justify-center mb-4" order={2}>Brood</Title>
                <Quantity onChangeCallback={setBroodBoxes} min={1} max={3} value={getBoxTypeQuantity( form.values.boxes, "BROOD" as BoxType )} />
              </div>
              <div className="flex flex-col">
                <Title className="flex justify-center mb-4" order={2}>Honey</Title>
                <Quantity onChangeCallback={setHoneyBoxes} max={2} min={0} value={getBoxTypeQuantity( form.values.boxes, "HONEY" as BoxType )} />
              </div>

            </div>
            {goal &&
              <div className="flex flex-col h-3/4">
                <Title className="flex justify-center mt-8" order={4}>Notes from last inspection:</Title>
                <ScrollArea className="flex-grow"><Blockquote className="flex justify-center whitespace-break-spaces "> {goal}</Blockquote></ScrollArea>
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
          <div className="w-full flex flex-col max-w-xl mx-auto h-full px-4 ">
            <Title className="flex justify-center mb-4" order={2}>Next Inspection</Title>
            <DatePicker
              placeholder="Pick date"
              value={form.values.nextSteps.date}
              onChange={( value ) => {
                form.setFieldValue ( "nextSteps.date", value );
              }}
              allowDeselect
              maw={400}
              mx="auto"
            />
            <Switch
              checked={form.values.nextSteps.full}

              {...form.getInputProps( "nextSteps.full" )}
              labelPosition="left"
              label="Inspection type"
              className="mx-auto"
              size="xl"
              onLabel="FULL"
              offLabel="PARTIAL"
            />

            <Textarea
              className="px-6 py-2"
              placeholder="Write the goal of the next inspection here."
              label="Next Steps"
              radius="sm"
              size="xl"
              value={form.values.nextSteps.goal}
              onChange={( event ) => {
                form.setFieldValue ( "nextSteps.goal", event.currentTarget.value );
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