export const createAction = (type, handler, createMetadata) => {
    const actionCreator = (createMetadata
        ? (payload) => ({ type, payload, meta: createMetadata(payload) })
        : (payload) => ({ type, payload }));
    actionCreator.type = type;
    actionCreator.handler = handler;
    return actionCreator;
};
export const createReducer = (actions, initialState) => {
    const handlers = Object
        .keys(actions)
        .map(key => [actions[key].type, actions[key].handler])
        .reduce((result, [type, handler]) => (result[type] = handler, result), {});
    const reducer = (state = initialState, action) => handlers[action.type] ? handlers[action.type](state, action.payload, action.meta) : state;
    return reducer;
};
