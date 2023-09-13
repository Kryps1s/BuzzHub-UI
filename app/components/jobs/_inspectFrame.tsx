"use client";
import { MultiSelect, Slider, TextInput, Text, Group, Switch, NumberInputHandlers, ActionIcon, NumberInput, rem } from "@mantine/core";
import { Frame, FrameItem, FrameItemType, InspectionJobFormValues } from "../../lib/types/types";
import { UseFormReturnType } from "@mantine/form";
import { useRef, useState } from "react";

interface FrameFormProps {
  frame: Frame;
  index: number;
  frameIndex: number;
  form: UseFormReturnType<InspectionJobFormValues>;
  }

const FrameForm = ( { frame, index, frameIndex, form } : FrameFormProps ) => {
  //get all properties with type FrameItem
  const keys = Object.keys( frame ).filter( ( key ) => {
    const propertyValue = frame[key as keyof Frame];
    return typeof propertyValue === "object";
  } );
  const frameItems = keys.map( ( key ) => frame[key as keyof Frame] ) as FrameItem[];
  const labels = frameItems.map( item => item.label );
  //init to all frame items selected
  const getInitialValue = ( items: FrameItem[] ) => {
    const initialValue: string[] = [];
    items.forEach( item => {
      if ( item.selected ) {
        initialValue.push( item.label );
      }
    } );
    return initialValue;
  };

  const [ selected, setSelected ] = useState<string[]>( getInitialValue( frameItems ) );

  const handlers = useRef<NumberInputHandlers>();

  const updateValue = ( value: string[] ) => {
    setSelected( value );
    //set all frame items to not selected
    frameItems.forEach( item => item.selected = false );
    //set selected frame items to selected
    value.forEach( label => {
      const item = frameItems.find( item => item.label === label );
      if ( item ) {
        item.selected = true;
      }
    } );};
  //build the checkboxes when selected changes
  const items = selected.map( ( label ) => {

    const item = frameItems.find( ( item ) => item.label === label );
    //find the name of the property who's label matches the selected label
    const itemKey = Object.keys( frame ).find( ( key ) => {
      const propertyValue = frame[key as keyof Frame];
      return typeof propertyValue === "object" && propertyValue.label === label;
    } );
    if ( !itemKey ) {
      return null;
    }
    return (
      <div id={`frameItem-${index}-${frameIndex}-${itemKey}`} key={label} className="row-span-1 flex items-center flex-col h-32 border rounded-md border-buzzhub-green">
        <label className="ml-2">{label}</label>
        {
          item?.type === FrameItemType.PERCENTAGE && (
            <>
              <Text>Side A</Text>
              <Slider id={`frameItem-${index}-${frameIndex}-${itemKey}-sliderA`} min={0} max={100} {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.values.${0}` )} step={10} className="w-4/5" />
              <Text>Side B</Text>
              <Slider id={`frameItem-${index}-${frameIndex}-${itemKey}=sliderB`} min={0} max={100} {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.values.${1}` )} step={10} className="w-4/5" />
            </>
          )
        }
        {
          item?.type === FrameItemType.QUANTITY && (
            <Group position="center" className="flex flex-col">
              <Group className="flex justify-center mx-auto my-1" spacing={5}>
                <ActionIcon size={42} variant="default" onClick={() => handlers.current?.decrement()}>
            –
                </ActionIcon>
                <NumberInput
                  hideControls
                  id={`frameItem-${index}-${frameIndex}-${itemKey}-quantity`}
                  {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.value` )}
                  handlersRef={handlers}
                  max={99}
                  value={form.values.boxes[index].frames[frameIndex][itemKey as keyof Frame].value}
                  min={1}
                  step={1}
                  styles={{ input: { width: rem( 54 ), textAlign: "center" } }}
                />

                <ActionIcon size={42} variant="default" onClick={() => handlers.current?.increment()}>
            +
                </ActionIcon>
              </Group>
              <Switch
                checked={form.values.boxes[index].frames[frameIndex][itemKey as keyof Frame].destroyed}
                size="md"
                id={`frameItem-${index}-${frameIndex}-${itemKey}-destroyed`}
                label="Destroyed"
                {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.destroyed` )}
              />
            </Group>
          )
        }
      </div>
    );
  } );

  return (
    <div id="frame" className="w-full flex flex-col-reverse">
      <TextInput
        label="Notes"
        value={frame.notes}
        onChange={( event ) => {
          form.setFieldValue ( `boxes.${index}.frames.${frameIndex}.notes`, event.currentTarget.value );
        }}/>
      <div className="w-full flex">
        <MultiSelect className="flex-grow"

          id={`frameItemPicker-${index}-${frameIndex}`}
          placeholder="Click here to add items"
          searchable
          value={selected}
          onChange={( value ) => updateValue( value )}
          nothingFound="No options"
          clearable
          data={labels}
        />
      </div>
      <span className="w-full overflow-y-scroll flex-grow grid grid-cols-2 grid-flow-row h-40">{items}</span>
    </div>
  );
};

export default FrameForm;