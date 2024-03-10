"use client";
import { ActionIcon, Group, NumberInput, NumberInputHandlers, rem } from "@mantine/core";
import { useRef } from "react";

interface QuantityProps {
    value: number;
    max?: number;
    min?: number;
    onChangeCallback?: ( value: number ) => void;
    }
const Quantity = ( { value, max=6, min=1, onChangeCallback } : QuantityProps ) => {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group className="flex justify-center mx-auto my-1" spacing={5}>
      <ActionIcon size={42} variant="default" onClick={() => handlers.current?.decrement()}>
            –
      </ActionIcon>
      <NumberInput
        hideControls
        readOnly
        value={value}
        onChange={onChangeCallback}
        handlersRef={handlers}
        max={max}
        min={min}
        step={1}
        styles={{ input: { width: rem( 54 ), textAlign: "center" } }}
      />

      <ActionIcon size={42} variant="default" onClick={() => handlers.current?.increment()}>
            +
      </ActionIcon>
    </Group>
  );
};

export default Quantity;