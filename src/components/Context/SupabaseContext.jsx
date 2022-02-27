import React from "react";
import { createClient } from "@supabase/supabase-js";

const SupabaseContext = React.createContext(undefined);
const SupabaseContextSet = React.createContext(undefined);

const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = React.useState(() => {
    return createClient(
      "https://kbnohoywferidgyxzvnc.supabase.co",
      process.env.REACT_APP_SUPABASE_KEY
    );
  });
  console.log(supabase);
  return (
    <SupabaseContext.Provider value={supabase}>
      <SupabaseContextSet.Provider value={setSupabase}>
        {children}
      </SupabaseContextSet.Provider>
    </SupabaseContext.Provider>
  );
};

export { SupabaseContext, SupabaseProvider };
