const fetchData = async (supabase) => {
  const { data, error } = await supabase.from("messages").select();
  if (error) throw error;
  return data;
};

const createUser = async (supabase, userEmail, userPassword, userName) => {
  const { user, session, error } = await supabase.auth.signUp(
    {
      email: userEmail,
      password: userPassword,
    },
    { data: { display_name: userName } }
  );
  if (user && !session) return true;
  if (error) return false;
};

export { fetchData, createUser };
