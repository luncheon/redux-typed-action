export interface Action<Payload, Metadata> {
  type:    string
  payload: Payload
  meta:    Metadata
}

export type Handler<State, Payload, Metadata> = (state: State, payload: Payload, meta: Metadata) => State

export interface ActionCreator<State, Payload, Metadata> {
  (payload: Payload): Action<Payload, Metadata>
  type:               string
  handler:            Handler<State, Payload, Metadata>
}

export interface PayloadlessActionCreator<State, Metadata> extends ActionCreator<State, undefined, Metadata> {
  (): Action<undefined, Metadata>
}

export interface MetadatalessActionCreator<State, Payload> extends ActionCreator<State, Payload, undefined> {
  handler: (state: State, payload: Payload) => State
}

export interface SimpleActionCreator<State> extends PayloadlessActionCreator<State, undefined> {
  handler: (state: State) => State
}

export const createAction: {
  <State, Payload, Metadata>(type: string, handler: Handler<State, Payload, Metadata>,   createMetadata: (payload: Payload) => Metadata): ActionCreator<State, Payload, Metadata>
  <State, Payload>          (type: string, handler: Handler<State, Payload, undefined>                                                 ): MetadatalessActionCreator<State, Payload>
  <State, Metadata>         (type: string, handler: Handler<State, undefined, Metadata>, createMetadata: () => Metadata                ): PayloadlessActionCreator<State, Metadata>
  <State>                   (type: string, handler: Handler<State, undefined, undefined>                                               ): SimpleActionCreator<State>
} =
  <State, Payload, Metadata>(type: string, handler: Handler<State, Payload, Metadata>,   createMetadata?: (payload: Payload) => Metadata) => {
  const actionCreator = (
    createMetadata
      ? (payload: Payload) => ({ type, payload, meta: createMetadata(payload) })
      : (payload: Payload) => ({ type, payload })
  ) as ActionCreator<State, Payload, Metadata>
  actionCreator.type = type
  actionCreator.handler = handler
  return actionCreator as any
}

export const createReducer = <State>(actions: Record<string, ActionCreator<State, any, any>>, initialState: State) => {
  const handlers = Object
    .keys(actions)
    .map<[string, Handler<State, any, any>]>(key => [actions[key].type, actions[key].handler])
    .reduce<Record<string, Handler<State, any, any>>>((result, [type, handler]) => (result[type] = handler, result), {})
  const reducer = (state = initialState, action: Action<any, any>) => handlers[action.type] ? handlers[action.type](state, action.payload, action.meta) : state
  return reducer as <A extends { type: any }>(state: State, action: A) => State
}
