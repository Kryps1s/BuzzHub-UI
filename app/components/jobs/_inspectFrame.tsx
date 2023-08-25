import { Chip, TextInput } from "@mantine/core";
import { Frame, InspectionJobFormValues } from "../../lib/types/types";
import { UseFormReturnType } from "@mantine/form";

interface FrameFormProps {
  frame: Frame;
  index: number;
  frameIndex: number;
  form: UseFormReturnType<InspectionJobFormValues>;
  }

const FrameForm = ( { frame, index, frameIndex, form } : FrameFormProps ) => {
  //make a checkbox for each of the properties of the frame except notes:
  const frameProperties = Object.keys( frame ).filter( ( key ) => key !== "notes" );
  const checkboxes = frameProperties.map( ( property ) => {
    //first letter uppercase and uppercased camelcase letters as spaces
    const label = property.charAt( 0 ).toUpperCase() + property.slice( 1 ).replace( /([A-Z])/g, " $1" ).trim();
    return (
      <Chip color="teal" variant="filled"
        key={property}
        {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${property}`, { type: "checkbox" } )}
      >{label}</Chip>
    );
  } );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {checkboxes}
      </div>

      <TextInput
        label="notes"
        value={frame.notes}
        onChange={( event ) => {
          form.setFieldValue ( `boxes.${index}.frames.${frameIndex}.notes`, event.currentTarget.value );
        }}
      />
    </>

  );
};

export default FrameForm;