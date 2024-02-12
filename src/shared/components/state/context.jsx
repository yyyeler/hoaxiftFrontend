import { createContext, useEffect, useReducer } from "react";
import { loadAuthState, storeAuth } from "./storage";
import { useContext } from "react";

export const AuthContext = createContext();

export const AuthDispatchContext = createContext();

export function useAuthState()
{
    return useContext(AuthContext);
}

export function useAuthDispatch()
{
    return useContext(AuthDispatchContext);
}

const authReducer = (authState,action) => {
    switch(action.type){
        case 'login-success' :
            return action.data; 
        case 'logout-success' :
            return {id:0}; 
        default :   
            throw new Error(`unknown action ${action.type}`);
    }
};

export function AuthenticationContext({children})
{
    const [authState,dispatch] = useReducer(authReducer, loadAuthState());

    useEffect(() => {
        storeAuth(authState);
    },[authState]);

    return (
    <AuthContext.Provider value={authState}>
        <AuthDispatchContext.Provider value={dispatch}>
            {children}
        </AuthDispatchContext.Provider>    
    </AuthContext.Provider>);
}