export default function createAsyncDispatch(type, promiseFn){
    const success = `${type}_success`;
    const error = `${type}_error`;

    async function actionHandler(dispatch, ...rest){
        dispatch({type});
        try{
            const data = await promiseFn(...rest);
            dispatch({
                type: success,
                data,
            });
        }catch(e){
            dispatch({
                type: error,
                error: e,
            });
        }
    }
    return actionHandler;
}
export const initalAsyncState = {
    loading: false,
    data: null,
    error: null,
}

const loadingState = {
    loading: true,
    data: null,
    error: null,
}

const SUCCESS = data => ({
    loading: false,
    data,
    error: null,
});

const Error = e => ({
    loading: false,
    data: null,
    error: e,
});

export function createAsyncHandler(type, key){
    const success = `${type}_success`;
    const error = `${type}_error`;


    function handler(state,action){
        switch(action.type){
            case type:
                return{
                    ...state,
                    [key]: loadingState
                }
            case success:
                return{
                    ...state,
                    [key]: SUCCESS(action.data),
                }
            case error:
                return{
                    ...state,
                    [key]: Error(action.error),
                }
            default:
                return state;
        }
    }

    return handler;
}