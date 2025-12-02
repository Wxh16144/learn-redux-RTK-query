import { Button, Flex } from "antd";
import { store, useAppDispatch, useAppSelector } from "../store";
import { increment, decrement } from "../store/counter";
import { useEffect, useState } from "react";

import { createSelector } from "@reduxjs/toolkit";

const selectCounterValue = createSelector(
  (state: { counter: { value: number } }) => state.counter.value,
  (value) => value
);

function IncrementWithSubscription() {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const currentValue = selectCounterValue(store.getState());
      setDisabled(currentValue >= 10);
    });
    return unSubscribe;
  }, []);

  return (
    <Button
      type="primary"
      onClick={() => dispatch(increment())}
      disabled={disabled}
    >
      Increment (With Subscription)
    </Button>
  );
}

function Increment() {
  const counterValue = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();

  return (
    <Button
      type="primary"
      onClick={() => dispatch(increment())}
      disabled={counterValue >= 10}
    >
      Increment
    </Button>
  );
}

function Decrement() {
  const counterValue = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Button
      type="primary"
      onClick={() => dispatch(decrement())}
      disabled={counterValue <= 0}
    >
      Decrement
    </Button>
  );
}

function CounterValue() {
  const counterValue = useAppSelector((state) => state.counter.value);
  return <div>Counter Value: {counterValue}</div>;
}

export default function Counter() {
  return (
    <Flex align="center" gap={8} style={{ padding: 32 }}>
      <Decrement />
      <CounterValue />
      <IncrementWithSubscription />
      <Increment />
    </Flex>
  );
}
