import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react"

type UserContextType = {
  user?: User;
  getSessionData: () => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// This allows the the context to be accessed via any component or page. Use something like "session = useUserContext()" and you can access state and functions via "session?.user?.id" "session?.signOut()" etc
export const useUserContext = () => {
  return useContext(UserContext);
}

// Please read to better understand:
// https://vercel.com/guides/react-context-state-management-nextjs
// https://react.dev/reference/react/useContext
//
// This function is used in app/providers.tsx in order to implement the context as a way for the user session to be accessed globally.
export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const supabase = createClient();
  const [user, setUser] = useState<User | undefined>(undefined);

  const getSessionData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user)
    }
    console.log("user id", user?.id);
  }

  const signOut = () => {
    supabase.auth.signOut()
    setUser(undefined);
  }

  return (
    <UserContext.Provider value={{ user, getSessionData, signOut }} >
      {children}
    </UserContext.Provider>
  )
}
