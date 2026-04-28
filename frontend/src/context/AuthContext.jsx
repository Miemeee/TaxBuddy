import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                return;
            }

            const response = await getMe();

            const payload = response.data?.data || response.data;

            setUser(payload);

        } catch (err) {
            console.error("Fetch user failed:", err);
            setUser(null);
            localStorage.removeItem("token");
        }
    };

    useEffect(() => {
        const init = async () => {
            await fetchUser();
            setLoading(false);
        };

        init();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = {
        user,
        setUser,
        fetchUser,
        loading,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);