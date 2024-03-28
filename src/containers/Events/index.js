import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);



  // Filtrer les événements en fonction du type sélectionné
  const filteredEvents = data?.events.filter((event) => type === null || event.type === type);

  // Calculer le nombre total de pages pour la pagination
  const pageNumber = Math.ceil((filteredEvents?.length || 0) / PER_PAGE);

  // Liste des types d'événements disponibles
  const typeList = new Set(data?.events.map((event) => event.type));

  // Gérer le changement de type d'événement
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  return (
    <>
      {error && <div>An error occured</div>}

      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={["Tous", ...Array.from(typeList)]}
        onChange={(value) => changeType(value === "Tous" ? null : value)}
      />

      <div id="events" className="ListContainer">
        {filteredEvents
          ?.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
          .map((event) => (
            <Modal key={event.id} Content={<ModalEvent event={event} />}>
              {({ setIsOpened }) => (
                <EventCard
                  onClick={() => setIsOpened(true)}
                  imageSrc={event.cover}
                  title={event.title}
                  date={new Date(event.date)}
                  label={event.type}
                />
              )}
            </Modal>
          ))}
      </div>

      <div className="Pagination">
        {[...Array(pageNumber)].map((_, index) => (
          <button key={filteredEvents[index].id} type="button" onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EventList;
