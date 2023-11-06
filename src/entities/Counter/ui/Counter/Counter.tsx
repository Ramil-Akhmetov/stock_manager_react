import { Button, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import {
  ReducerList,
  useAsyncReducer,
} from '@/shared/lib/hooks/useAsyncReducer.ts';
import { getCounterValue } from '../../model/selectors/counter.ts';
import {
  counterActions,
  counterReducer,
} from '../../model/slice/CounterSlice.ts';

const reducers: ReducerList = {
  counter: counterReducer,
};

export const Counter = memo(() => {
  const dispatch = useAppDispatch();
  const value = useSelector(getCounterValue);
  useAsyncReducer({ reducers });

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <Typography variant="h1" data-testid="value-title">
        {value}
      </Typography>
      <Button
        variant="contained"
        data-testid="decrement-btn"
        onClick={decrement}
      >
        decrement
      </Button>
      <Button
        variant="contained"
        data-testid="increment-btn"
        onClick={increment}
      >
        increment
      </Button>
    </div>
  );
});
