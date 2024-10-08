import { props } from "../interface/singleCard.interface";
import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }: props) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="relative card cursor-pointer ">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={card.src}
          alt="card front"
          className="card-img hidden front w-full absolute transition-all ease-in rotate-y-90"
        />
        <img
          src="/images/cover.png"
          alt="card back"
          className=" card-img back transition-all ease-in delay-150"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
