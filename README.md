# redux-typed-action

Typesafely create actions and reducers for [Redux](https://github.com/reactjs/redux) in TypeScript.  
Using this library possibly makes modules [Ducks](https://github.com/erikras/ducks-modular-redux)-like.


## Usage

Create action creators and a reducer using `createAction` and `createReducer` provided by redux-typed-action.

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
// counterActions.increment(100)        // compile error: payload of increment() requires undefined
// counterActions.add('100')            // compile error: payload of add() requires number
```

And use them normally with `combineReducers`, `createStore`, `bindActionCreators` of Redux.

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

// actions.counter.increment(100) // compile error: payload of increment() requires undefined
// actions.counter.add('100')     // compile error: payload of add() requires number
```

## Why?

Using Redux requires some boilerplate code.
In TypeScript, redundant code increases.  
The reducer have to identify the **type** of the action by the `type` property.
Therefore, **each action should be typed explicitly** and that type will be shared with the action creator and the reducer.

```typescript
// cf. https://stackoverflow.com/questions/35482241/how-to-type-redux-actions-and-redux-reducers-in-typescript
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD = 'ADD'

interface IncrementAction {
  type: typeof INCREMENT
}
interface DecrementAction {
  type: typeof DECREMENT
}
interface AddAction {
  type: typeof ADD
  payload: number
}

type Action = IncrementAction | DecrementAction | AddAction

const increment: () => IncrementAction = () => ({ type: INCREMENT })
const decrement: () => DecrementAction = () => ({ type: DECREMENT })
const add: (payload: number) => AddAction = payload => ({ type: ADD, payload })

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case ADD:
      return state + action.payload
    default:
      return state
  }
}
```

But it is painful to define type for each action.

This library offers you to declare type of payload as an **inline type literal** and use that payload immediately once.

```typescript
const someAction = createAction<State, { prop1: Prop1, prop2?: Prop2 }>('SOME_ACTION', (state, { prop1, prop2 }) => ({ ...state, prop1, prop2 }))
```

The created action creator requires a parameter of the type declared above.
The compiler and IDE will help you.
I think this way is safe, efficient and easy to maintain.

## API

### `createAction<State, Payload, Metadata>(type: string, handler: (State, Payload, Metadata) => State, metadataFactory: Payload => Metadata) => ActionCreator<State, Payload, Metadata>`

Returns a new action creator having `type` and `handler`.

### `createReducer<State>(actions: Record<string, ActionCreator<State, any, any>>, initialState: State) => Reducer<State>`

Returns a new reducer.
