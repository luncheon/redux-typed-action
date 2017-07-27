export interface Action<Payload, Metadata> {
    type: string;
    payload: Payload;
    meta: Metadata;
}
export declare type Handler<State, Payload, Metadata> = (state: State, payload: Payload, meta: Metadata) => State;
export interface ActionCreator<State, Payload, Metadata> {
    (payload: Payload): Action<Payload, Metadata>;
    type: string;
    handler: Handler<State, Payload, Metadata>;
}
export interface PayloadlessActionCreator<State, Metadata> extends ActionCreator<State, undefined, Metadata> {
    (): Action<undefined, Metadata>;
}
export interface MetadatalessActionCreator<State, Payload> extends ActionCreator<State, Payload, undefined> {
    handler: (state: State, payload: Payload) => State;
}
export interface SimpleActionCreator<State> extends PayloadlessActionCreator<State, undefined> {
    handler: (state: State) => State;
}
export declare const createAction: {
    <State, Payload, Metadata>(type: string, handler: Handler<State, Payload, Metadata>, metadataFactory: (payload: Payload) => Metadata): ActionCreator<State, Payload, Metadata>;
    <State, Payload>(type: string, handler: Handler<State, Payload, undefined>): MetadatalessActionCreator<State, Payload>;
    <State, Metadata>(type: string, handler: Handler<State, undefined, Metadata>, metadataFactory: () => Metadata): PayloadlessActionCreator<State, Metadata>;
    <State>(type: string, handler: Handler<State, undefined, undefined>): SimpleActionCreator<State>;
};
export declare const createReducer: <State>(actions: Record<string, ActionCreator<State, any, any>>, initialState: State) => <A extends {
    type: any;
}>(state: State, action: A) => State;
