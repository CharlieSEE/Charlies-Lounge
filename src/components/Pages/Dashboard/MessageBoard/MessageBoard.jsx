import { useEffect, useRef, useContext, useState } from "react";
import { SupabaseContext } from "../../../Context/SupabaseContext";

import Message from "./Message/Message";
import MsgInputField from "./MsgInputField/MsgInputField";
import MsgInputSubmit from "./MsgInputSubmit/MsgInputSubmit";

import styles from "./MessageBoard.module.css";

const MsgBoard = () => {
  const [messages, setMessages] = useState([]);
  const [currentMsg, setcurrentMsg] = useState("");
  const [msgSub, setmsgSub] = useState(undefined);

  const supabase = useContext(SupabaseContext);
  const messageBox = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("messages").insert([
      {
        content: currentMsg,
        author_ID: supabase.auth.currentUser.id,
      },
    ]);
    if (error) console.error(error);
    setcurrentMsg("");
  };

  useEffect(() => {
    if (messageBox) {
      messageBox.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, created_at, user(id, display_name, avatarURL), content")
        .limit(100)
        .order("created_at", { ascending: true });
      if (error) throw console.error(error);
      return data;
    };
    fetchData()
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error(error));
    const subscription = supabase
      .from("messages")
      .on("INSERT", (payload) => {
        const getUser = async () => {
          return await supabase
            .from("user")
            .select("id, display_name, avatarURL")
            .match({ id: payload.new.author_ID });
        };
        getUser().then((user) => {
          const msg = payload.new;
          msg.user = user.data[0];
          setMessages((prevMsg) => {
            return [...prevMsg, msg];
          });
        });
      })
      .subscribe();
    setmsgSub(subscription);
    return () => {
      supabase.removeSubscription(msgSub);
      setmsgSub(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  return (
    <div>
      <div className={styles.wrapper} ref={messageBox}>
        {messages
          ? messages.map((msg) => {
              return (
                <Message
                  keyProp={msg.id}
                  content={msg.content}
                  authorName={msg.user.display_name}
                  avatarURL={msg.user.avatarURL}
                  created_at={msg.created_at}
                  owner={msg.user.id === supabase.auth.currentUser.id}
                />
              );
            })
          : null}
      </div>
      <form className={styles.msgInput} onSubmit={sendMessage}>
        <MsgInputField
          placeholder="Type..."
          maxLength={255}
          value={currentMsg}
          onChange={(e) => {
            setcurrentMsg(e.target.value);
          }}
        />
        <MsgInputSubmit onClick={sendMessage} />
      </form>
    </div>
  );
};

export default MsgBoard;
