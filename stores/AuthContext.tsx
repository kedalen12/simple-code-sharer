import { signInAnonymously, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import {authApp} from '../firebase'


type Context = {
    user?: User,
    authState?: 'not-authenticated' | 'authenticated',
    logOut?: () => Promise<void>,
    logIn?: () => void
}

const AuthContext = createContext<Context>({})


export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState<User>()
    const [authState, setAuthState] = useState<'authenticated'|'not-authenticated'>('not-authenticated');
    useEffect(() => {
        authApp?.onAuthStateChanged((user) => {
            console.log(user)
            if(user === null){
                //Not authorized
                signInAnonymously(authApp)
                setAuthState('not-authenticated')
                setUser(undefined)
                return;
            }
            setAuthState('authenticated')
            setUser(user)
        })
    },[])

 

    const logOut = async () => {
        await authApp.signOut()
    }
    const context : Context = {
        user: user,
        authState: authState,
        logOut: logOut
    }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}