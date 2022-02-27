import { useState, useContext } from "react";
import { SupabaseContext } from "../../../Context/SupabaseContext";

const Settings = () => {
  const [newNick, setNewNick] = useState("");
  const supabase = useContext(SupabaseContext);
  const nickChanged = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("user")
      .update({
        display_name: newNick,
      })
      .match({ id: supabase.auth.currentUser.id });
    if (data) window.location.reload();
    if (error) throw error;
  };
  return (
    <div>
      Settings
      <h3>Nick change</h3>
      <form onSubmit={nickChanged}>
        <input
          type="text"
          value={newNick}
          onChange={(e) => {
            setNewNick(e.target.value);
          }}
          placeholder="Nowa nazwa"
        />
        <input type="submit" value="Zapisz" />
      </form>
      <h3>Avatar change</h3>
      <form>
        <input type="file" src="" alt="" />
      </form>
    </div>
  );
};

export default Settings;
