export default function ({dispatch}) {
    function isPromise(payload) {
        return payload && payload.then && typeof payload.then === 'function';
    }

    return next => action => {
        if (!isPromise(action.payload)) {
            return next(action);
        }

        action.payload.then(response => {
            return dispatch({...action, payload: response});
        });
    }
}