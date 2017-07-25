import { createAction, createReducer } from '../../..'

export type CounterState = number

export const counterActions = {
  add: createAction<CounterState, number>('ADD', (state, payload) => state + payload),
  increment: createAction<CounterState>('INCREMENT', state => state + 1),
  decrement: createAction<CounterState>('DECREMENT', state => state - 1),
}

export default createReducer(counterActions, 0)

console.log(counterActions.increment()) // { type: 'INCREMENT' }
console.log(counterActions.add(100))    // { type: 'ADD', payload: 100 }
// counterActions.increment(100)        // compile error
// counterActions.add('100')            // compile error
