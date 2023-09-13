import { Accordion } from "@mantine/core";
import FrameForm from "./_inspectFrame";
import { Box, InspectionJobFormValues } from "../../lib/types/types";
import { UseFormReturnType } from "@mantine/form";

interface BoxFormProps {
    box: Box;
    index: number;
    form: UseFormReturnType<InspectionJobFormValues>;
}

const scollToTop = ( boxIndex : number, frameIndex : number ) => {
  const element = document.getElementById( `frame-container-${boxIndex}-${frameIndex}` );
  setTimeout( () => {
    if ( element ) {
      element.scrollIntoView( { behavior: "smooth", block: "start" } );
    }
  }, 175 );
};

const BoxForm = ( { box, index, form } : BoxFormProps ) => {
  const accordionItems = box.frames.map( ( frame, frameIndex:number ) => (
    <Accordion.Item id={`frame-container-${index}-${frameIndex}`} value={`${index}-${frameIndex}`} onClick={() => scollToTop( index, frameIndex )} key={`${index}-${frameIndex}`}>
      <Accordion.Control>Frame #{frameIndex+1}</Accordion.Control>
      <Accordion.Panel>
        <FrameForm frame={frame} frameIndex={frameIndex} index={index} form={form}/>
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