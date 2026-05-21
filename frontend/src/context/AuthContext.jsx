import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);           
    const [loading, setLoading] = useState(true);      

    /**
     * Fetch user w/ JWT
     */
    const fetchUser = async () => {
        try {
            // Check JWT 
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                return;
            }

            // Fetch user
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
            // Restore user
            await fetchUser();
            setLoading(false);
        };

        init();
    }, []);

    const logout = async () => {
        try {
            await logoutService();
        } catch (err) {
            console.warn("Logout request failed:", err);
        }

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

/**
 * @throws {Error} If used outside AuthProvider
 * @returns {Object} Auth context value
 */
export const useAuth = () => useContext(AuthContext);