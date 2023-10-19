"use client";
import { Accordion } from "@mantine/core";
import FrameForm from "./_inspectFrame";
import { Box, InspectionJobFormValues } from "../../lib/types/types";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";

interface BoxFormProps {
    box: Box;
    index: number;
    form: UseFormReturnType<InspectionJobFormValues>;
    initialState: string[][];
    updateBoxState: ( boxIndex : number, value : string[][] ) => void;
}

const scollToTop = ( boxIndex : number, frameIndex : number ) => {
  const element = document.getElementById( `frame-container-${boxIndex}-${frameIndex}` );
  setTimeout( () => {
    if ( element ) {
      element.scrollIntoView( { behavior: "smooth", block: "start" } );
    }
  }, 175 );
};

const BoxForm = ( { box, index, form, initialState, updateBoxState } : BoxFormProps ) => {

  //manage state of selected frame items for each frame

  const [ frameStates, setFrameStates ] = useState( initialState );

  const updateFrameState = ( frameIndex : number, value : string[] ) => {
    const newFrameStates = [ ...frameStates ];
    newFrameStates[frameIndex] = value;
    setFrameStates( newFrameStates );
    updateBoxState( index, newFrameStates );
  };

  const accordionItems = box.frames.map( ( frame, frameIndex:number ) => (
    <Accordion.Item id={`frame-container-${index}-${frameIndex}`} value={`${index}-${frameIndex}`} onClick={() => scollToTop( index, frameIndex )} key={`${index}-${frameIndex}`}>
      <Accordion.Control>Frame #{frameIndex+1}</Accordion.Control>
      <Accordion.Panel>
        <FrameForm
          frame={frame}
          frameIndex={frameIndex}
          index={index}
          form={form}
          initialState={frameStates[frameIndex]}
          updateFrameState={updateFrameState}
        />
      </Accordion.Panel>
    </Accordion.Item>
  ) );
  return (
    <Accordion className='overflow-scroll max-h-96'>
      {accordionItems}
    </Accordion>
  );
};

export default BoxForm;