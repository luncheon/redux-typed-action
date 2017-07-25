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

console.log(store.getState())   // { counter: 0 }
actions.counter.increment()
console.log(store.getState())   // { counter: 1 }
actions.counter.add(100)
console.log(store.getState())   // { counter: 101 }

// actions.counter.increment(100) // compile error
// actions.counter.add('100')     // compile error
