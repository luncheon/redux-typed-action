# redux-typed-action

Typesafely create actions and reducers for [Redux](https://github.com/reactjs/redux) in TypeScript.

## Usage

```typescript
import { createAction, createReducer } from 'redux-typed-action'

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
```

```typescript
import { bindActionCreators, combineReducers, createStore } from 'redux'
import counterReducer, { CounterState, counterActions } from './modules/counter'  // import the above

export interface State {
  counter: CounterState
  // ...some other states
}

export const store = createStore<State>(combineReducers({
  counter: counterReducer,
  // ...some other reducers
}))

const dispatch = store.dispatch.bind(store)

export const actions = {
  counter: bindActionCreators(counterActions, dispatch),
  // ...some other action creators
}

console.log(store.getState())     // { counter: 0 }
actions.counter.increment()
console.log(store.getState())     // { counter: 1 }
actions.counter.add(100)
console.log(store.getState())     // { counter: 101 }

// actions.counter.increment(100) // compile error
// actions.counter.add('100')     // compile error
```

## API

### `createAction<State, Payload, Metadata>(type: string, handler: (state: State, payload: Payload, metadata: Metadata) => State, createMetadata: (payload: Payload) => Metadata) => ActionCreator<State, Payload, Metadata>`

Returns a new action creator having `type` and `handler`.

### `createReducer<State>(actions: Record<string, ActionCreator<State, any, any>>, initialState: State) => Reducer<State>`

Returns a new reducer.
