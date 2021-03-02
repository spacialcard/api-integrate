import {useReducer,useEffect,useCallback} from 'react';


function reducer(state, action) {
    switch(action.type){
        case 'LOADING':
            return{
                loading: true,
                data: null,
                error: null,
            }
        case 'success':
            return{
                loading: false,
                data: action.data,
                error: null,
            }
        case 'error':
            return{
                loading: false,
                data: null,
                error: action.error,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }    
}

export default function useAsync(callback, deps=[], skip = false){
    const [state,dipatch] = useReducer(reducer,{
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = useCallback(async () => {
        dipatch({type: 'LOADING'});
        try{
            const data = await callback();
            dipatch({type: 'success', data});
        }catch(e){
            dipatch({type: 'error', error: e});
        }
    },[callback])

    useEffect(()=>{
        if (skip){
            return;
        }
        fetchData();
        // eslint-disable-next-line
    },deps);

    return [state,fetchData];
}
