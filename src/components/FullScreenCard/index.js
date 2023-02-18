import "./FullScreenCard.css";

function FullScreenCard(props) {
  return (
    <div className={"fullScreenCard"}>
      <div className={"cardContent"}>
        <div className={"cardText"}>{props.children}</div>
      </div>
    </div>
  );
}

export default FullScreenCard;
