import React, { useEffect, useState, useRef } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  
  const timeoutRef = useRef(null);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex === byDateDesc.length - 1 ? 0 : prevIndex + 1));
  };

  const prevCard = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? byDateDesc.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const handleRadioChange = (idx) => {
    setIndex(idx);
    clearTimeout(timeoutRef.current);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event) => (
        <React.Fragment key={event.id}>
          <div
            className={`SlideCard SlideCard--${index === byDateDesc.indexOf(event) ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
            key={`${byDateDesc[radioIdx].title}`}
            type="radio"
            name="radio-button"
            checked={index === radioIdx}
            onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>
      <button type="button" onClick={prevCard}>Previous</button>
      <button type="button" onClick={nextCard}>Next</button>
    </div>
  );
};

export default Slider;