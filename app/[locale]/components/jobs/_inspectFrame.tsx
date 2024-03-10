"use client";
import { MultiSelect, Slider, TextInput, Text, Group, Switch, NumberInputHandlers, ActionIcon, NumberInput, rem } from "@mantine/core";
import { Frame, FrameItem, FrameItemType, InspectionJobFormValues } from "../../../lib/types/types";
import { UseFormReturnType } from "@mantine/form";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface FrameFormProps {
  frame: Frame;
  index: number;
  frameIndex: number;
  form: UseFormReturnType<InspectionJobFormValues>;
  initialState: string[];
  updateFrameState: ( frameIndex : number, value : string[] ) => void;
  }

const FrameForm = ( { frame, index, frameIndex, form, initialState, updateFrameState } : FrameFormProps ) => {
  const t = useTranslations( "Beekeeping" );
  const keys = Object.keys( frame ).filter( ( key ) => {
    const propertyValue = frame[key as keyof Frame];
    return typeof propertyValue === "object";
  } );
  const frameItems = keys.map( ( key ) => frame[key as keyof Frame] ) as FrameItem[];
  const labels = frameItems.map( item => ( {
    value: item.label,
    label: item.label,
    group: item.group as string
  } ) );

  const [ selected, setSelected ] = useState<string[]>( initialState );
  // eslint-disable-next-line
  const handlersArray = frameItems.map( () => useRef<NumberInputHandlers>() );
  const updateValue = ( value: string[] ) => {
    setSelected( value );
    updateFrameState( frameIndex, value );
    frameItems.forEach( item => item.selected = false );
    value.forEach( label => {
      const item = frameItems.find( item => item.label === label );
      if ( item ) {
        item.selected = true;
      }
    } );
  };
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
    const frameItem = form.values.boxes[index].frames[frameIndex][itemKey as keyof Frame] as FrameItem;
    let val, destroyed;
    if ( item?.type === FrameItemType.QUANTITY ) {
      val = frameItem.value as number;
      destroyed = frameItem.destroyed as boolean;
    }
    const itemIndex = selected.indexOf( label );

    return (
      <div id={`frameItem-${index}-${frameIndex}-${itemKey}`} key={label} className="row-span-1 flex items-center flex-col h-32 border rounded-md border-buzzhub-green">
        <label className="ml-2">{label}</label>
        {
          item?.type === FrameItemType.PERCENTAGE && (
            <>
              <Text>{`${t( "Side" )} A`}</Text>
              <Slider id={`frameItem-${index}-${frameIndex}-${itemKey}-sliderA`} min={0} max={100} {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.values.${0}` )} step={10} className="w-4/5" />
              <Text>{`${t( "Side" )} B`}</Text>
              <Slider id={`frameItem-${index}-${frameIndex}-${itemKey}=sliderB`} min={0} max={100} {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.values.${1}` )} step={10} className="w-4/5" />
            </>
          )
        }
        {
          item?.type === FrameItemType.QUANTITY && (
            <Group position="center" className="flex flex-col">
              <Group className="flex justify-center mx-auto my-1" spacing={5}>
                <ActionIcon size={42} variant="default" onClick={( () => handlersArray[itemIndex].current?.decrement() ) }>
            –
                </ActionIcon>
                <NumberInput
                  hideControls
                  id={`frameItem-${index}-${frameIndex}-${itemKey}-quantity`}
                  {...form.getInputProps( `boxes.${index}.frames.${frameIndex}.${itemKey}.value` )}
                  handlersRef={handlersArray[itemIndex]}
                  max={99}
                  value={val}
                  min={1}
                  step={1}
                  styles={{ input: { width: rem( 54 ), textAlign: "center" } }}
                />

                <ActionIcon size={42} variant="default" onClick={() => handlersArray[itemIndex].current?.increment()}>
            +
                </ActionIcon>
              </Group>
              <Switch
                checked={destroyed}
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
        label={t( "Notes" )}
        value={frame.notes}
        onChange={( event ) => {
          form.setFieldValue ( `boxes.${index}.frames.${frameIndex}.notes`, event.currentTarget.value );
        }}/>
      <div className="w-full flex">
        <MultiSelect className="flex-grow"

          id={`frameItemPicker-${index}-${frameIndex}`}
          placeholder={t( "addItems" )}
          searchable
          value={selected}
          onChange={( value ) => updateValue( value )}
          nothingFound={t( "noItems" )}
          clearable
          data={labels}
        />
      </div>
      <span className="w-full overflow-y-scroll flex-grow grid grid-cols-2 grid-flow-row h-40">{items}</span>
    </div>
  );
};

export default FrameForm;