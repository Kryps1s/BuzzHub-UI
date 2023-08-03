import { Accordion } from "@mantine/core";
import FrameForm from "./_inspectFrame";
import { Box, InspectionJobFormValues } from "../../lib/types";
import { UseFormReturnType } from "@mantine/form";

interface BoxFormProps {
    box: Box;
    index: number;
    form: UseFormReturnType<InspectionJobFormValues>;
}

const BoxForm = ( { box, index, form } : BoxFormProps ) => {
  const accordionItems = box.frames.map( ( frame, frameIndex:number ) => (

    <Accordion.Item value={`${index}-${frameIndex}`} key={`${index}-${frameIndex}`}>
      <Accordion.Control>Frame #{frameIndex+1}</Accordion.Control>
      <Accordion.Panel>
        <FrameForm frame={frame} frameIndex={frameIndex} index={index} form={form}/>
      </Accordion.Panel>
    </Accordion.Item>
  ) );

  return (
    <Accordion className='overflow-scroll h-80 md:h-full'>

      {accordionItems}

    </Accordion>
  );
};

export default BoxForm;