import styles from "./FullScreenCard.module.css";

function FullScreenCard(props) {
  return (
    <div className={styles.fullScreenCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardText}>{props.children}</div>
      </div>
    </div>
  );
}

export default FullScreenCard;
