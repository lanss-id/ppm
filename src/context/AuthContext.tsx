'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type UserRole = 'admin' | 'guru' | 'guest';

interface UserProfile {
    id: string;
    email: string;
    nama: string | null;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    loading: boolean;
    profileLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string, nama: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    isAdmin: boolean;
    isGuru: boolean;
    canAccessAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);

    // Fetch user profile from database
    const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
        setProfileLoading(true);
        try {
            const { data, error } = await supabase
                .from('users_profile')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return null;
            }
            return data as UserProfile;
        } finally {
            setProfileLoading(false);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!isMounted) return;

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const prof = await fetchProfile(session.user.id);
                    if (isMounted) {
                        setProfile(prof);
                    }
                } else {
                    setProfileLoading(false);
                }
            } catch (error) {
                console.error('Auth init error:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (!isMounted) return;

                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    const prof = await fetchProfile(session.user.id);
                    if (isMounted) {
                        setProfile(prof);
                    }
                } else {
                    setProfile(null);
                    setProfileLoading(false);
                }
            }
        );

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, [fetchProfile]);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) setLoading(false);
        return { error: error as Error | null };
    };

    const signUp = async (email: string, password: string, nama: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { nama },
            },
        });
        return { error: error as Error | null };
    };

    const signOut = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
        setLoading(false);
    };

    const isAdmin = profile?.role === 'admin';
    const isGuru = profile?.role === 'guru';
    const canAccessAdmin = isAdmin || isGuru;

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                profile,
                loading,
                profileLoading,
                signIn,
                signUp,
                signOut,
                isAdmin,
                isGuru,
                canAccessAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
