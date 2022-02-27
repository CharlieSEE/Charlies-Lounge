import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./Message.module.css";

const Message = ({
  keyProp,
  authorName,
  content,
  avatarURL,
  created_at,
  owner,
}) => {
  const transformTimestamp = (timestamp) => {
    const date = timestamp.slice(0, timestamp.indexOf("T"));
    const time = timestamp.slice(
      timestamp.indexOf("T") + 1,
      timestamp.indexOf(".")
    );
    return `${time} | ${date}`;
  };
  return (
    <div key={keyProp} className={owner ? styles.msgRight : styles.msgLeft}>
      {!owner ? (
        <img
          src={avatarURL}
          width="300"
          height="300"
          alt={`${authorName}'s avatar`}
          className={styles.avatar}
        />
      ) : null}
      <div className={styles.author}>{authorName}</div>
      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <div className={styles.time}>{transformTimestamp(created_at)}</div>
    </div>
  );
};

export default Message;
