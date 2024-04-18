import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // invertion de 1 et -1 pour afficher les slides du plus récent au plus ancien
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const nextCard = () => {
    // ajout d'un if pour vérifier la présence de "byDateDesc"
    if(byDateDesc && byDateDesc.length > 0){
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      5000
    )};
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // déplacement de key dans la div parent
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
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
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Changement de _ en dotSlide */}
              {byDateDesc.map((dotSlide, radioIdx) => (
                <input
                // Changement de la key
                  key={`radio-${dotSlide.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // Ajout de readOnly pour gérer l'erreur console "checked without onChange"
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
