import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from "react";
import db from "@/firebase/config"
import { getUser } from "@/firebase/usuario/usuario";
import { CHCUser } from "@/firebase/usuario/usuario";

interface Props extends PropsWithChildren {}

const AuthContext = createContext<[CHCUser | null, boolean]>([null, true]);

export const AuthProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<CHCUser | null>(null);

    useEffect(() => {
        const unsubscribe = db.onAuthStateChanged(db.auth, (currentUser) => {
            if (currentUser == null) {
                setUser(null);
                setLoading(false);
                return;
            }
            
            if (user == null) {
                getUser(currentUser.uid)
                    .then(loggedUser => {
                        setUser(loggedUser);
                        setLoading(false);
                    })
                    .catch(error => console.error('Error getting user', error));
            }

        });

        
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={[user, loading]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
