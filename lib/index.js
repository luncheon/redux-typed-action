"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = function (type, handler, createMetadata) {
    var actionCreator = (createMetadata
        ? function (payload) { return ({ type: type, payload: payload, meta: createMetadata(payload) }); }
        : function (payload) { return ({ type: type, payload: payload }); });
    actionCreator.type = type;
    actionCreator.handler = handler;
    return actionCreator;
};
exports.createReducer = function (actions, initialState) {
    var handlers = Object
        .keys(actions)
        .map(function (key) { return [actions[key].type, actions[key].handler]; })
        .reduce(function (result, _a) {
        var type = _a[0], handler = _a[1];
        return (result[type] = handler, result);
    }, {});
    var reducer = function (state, action) {
        if (state === void 0) { state = initialState; }
        return handlers[action.type] ? handlers[action.type](state, action.payload, action.meta) : state;
    };
    return reducer;
};
