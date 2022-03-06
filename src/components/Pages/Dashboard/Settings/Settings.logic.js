/**
 * Get avatar's public url
 * @param {Supabase} supabase Supabase client
 * @param {String} currentUser Current User's UUID
 * @param {String} extension Avatar's extension
 * @returns {String} Avatar's public URL
 */
const getNewAvatarPublicURL = async (supabase, currentUser, extension) => {
  const { publicURL } = await supabase.storage
    .from("avatars")
    .getPublicUrl(`${currentUser}/avatar.${extension}`);
  return publicURL;
};

/**
 * Update avatar
 * @param {Supabase} supabase Supabase client
 * @param {String} currentUser Current User's UUID
 * @param {String} extension Avatar's extension
 * @param {File} newAvatarFle New avatar file
 */
const updateNewAvatar = async (
  supabase,
  currentUser,
  extension,
  newAvatarFle
) => {
  const { error } = await supabase.storage
    .from("avatars")
    .update(`${currentUser}/avatar.${extension}`, newAvatarFle);

  if (error) {
    // File doesn't exist neeed to create one
    const { error } = await supabase.storage
      .from("avatars")
      .upload(`${currentUser}/avatar.${extension}`, newAvatarFle);

    if (error) {
      throw new Error(`${error.statusCode}: ${error.message}`);
    }
  }
};

/**
 * Update user table with new public URL
 * @param {Supabase} supabase Supabase client
 * @param {String} currentUser Current User's UUID
 * @param {String} publicURL Public URL to avatar
 */
const updateUserAvatarURL = async (supabase, currentUser, publicURL) => {
  const { error } = await supabase
    .from("user")
    .update({ avatarURL: publicURL })
    .match({ id: currentUser });
  if (error) throw new Error(`${error.statusCode}: ${error.message}`);
};

/**
 * Update current user username
 * @param {Supabase} supabase Supabase client
 * @param {String} newUsername New username
 */
const updateUsername = async (supabase, newUsername) => {
  const { error } = await supabase
    .from("user")
    .update({
      display_name: newUsername,
    })
    .match({ id: supabase.auth.currentUser.id });
  if (error) throw new Error(`${error.statusCode}: ${error.message}`);
};

export {
  updateUserAvatarURL,
  updateNewAvatar,
  getNewAvatarPublicURL,
  updateUsername,
};
