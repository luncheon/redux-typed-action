import { bindActionCreators, createStore } from 'redux'
import { createAction, createReducer } from '..'

test('Counter example', () => {
  type State = number

  const actionCreators = {
    increment: createAction<State>('INCREMENT', state => state + 1),
    add: createAction<State, number>('ADD', (state, payload) => state + payload),
  }
  expect(actionCreators.increment()).toEqual({ type: 'INCREMENT' })
  expect(actionCreators.add(7)).toEqual({ type: 'ADD', payload: 7 })

  const reducer = createReducer(actionCreators, 10)
  const store = createStore(reducer)

  expect(store.getState()).toBe(10)
  store.dispatch(actionCreators.increment())
  expect(store.getState()).toBe(11)
  store.dispatch(actionCreators.increment())
  expect(store.getState()).toBe(12)
  store.dispatch(actionCreators.add(1000))
  expect(store.getState()).toBe(1012)

  const actions = bindActionCreators(actionCreators, store.dispatch.bind(store))
  actions.increment()
  expect(store.getState()).toBe(1013)
  actions.increment()
  expect(store.getState()).toBe(1014)
  actions.add(100)
  expect(store.getState()).toBe(1114)
})
