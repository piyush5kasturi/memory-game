import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleCard from "../../components/SingleCard";
import { CardImages } from "./helpers";
import { shuffledCards } from "../../interface/play.interface";
import { choice } from "../../interface/common.interface";

export default function PlayScreen() {
  const { number = 0 } = useParams();
  const navigate = useNavigate();
  const range: number = Math.floor((+number * +number) / 2);
  const cardImages = CardImages(range);
  const [cards, setCards] = useState<shuffledCards[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<choice | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<choice | null>(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards: shuffledCards[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card: choice) => {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  //compare 2 cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className="max-w-3xl p-2 mx-auto">
        <div className="flex">
          <button
            className="bg-blue-400 rounded px-8 py-2 mr-4 mt-2"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Back
          </button>
          <h1 className="font-bold my-2 text-2xl sm:text-3xl ">Memory Game</h1>
        </div>
        {+number % 2 !== 0 || +number < 2 ? (
          <p className="mt-2 text-2xl text-red-500">
            Grid Value either in negative or not an even number. Please check
            and try again.
          </p>
        ) : (
          <>
            <p className="text-lg mt-2">No of Turns: {turns} </p>
            <button
              onClick={shuffleCards}
              className="bg-blue-400 rounded px-4 py-2 mr-4 mt-2 mb-2"
            >
              New Game
            </button>
            <div
              className={`grid gap-[7px] `}
              style={{
                gridTemplateColumns: `repeat(${number}, minmax(0, 1fr))`,
              }}
            >
              {cards.map((card) => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={
                    card === choiceOne || card === choiceTwo || card.matched
                  }
                  disabled={disabled}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
