import { useLocation, useHistory } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import BizCard from "../../components/BizCard/BizCard";
import CardEditUser from "../../components/CardEditUser/CardEditUser";
import axios from "axios";

const CardInfoPage = () => {
  const location = useLocation();
  const history = useHistory();

  const [cardsArr, setCardsArr] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hasChanged, setHasChanged] = useState("");
  useEffect(() => {
    axios.get("/cards/my-cards").then((dataFromServer) => {
      setCardsArr(dataFromServer.data);
    });
  }, [hasChanged]);

  const handleDeleteCard = (id) => {
    axios.delete(`/cards/${id}`).then(() => console.log("deleted!"));
    setHasChanged(id);
  };

  const handleEditCard = (id) => {
    let newCard = cardsArr.find((card) => {
      return card._id === id;
    });
    if (newCard) {
      setSelectedCard({ ...newCard });
    }
  };

  const handleUpdateCard = (name, description, phone, address, id) => {
    const editedCard = cardsArr.find((card) => {
      return card._id === id;
    });

    axios.put(`/cards/${id}`, { name, description, phone, address });
    setSelectedCard(null);
    setHasChanged(id);
  };

  return (
    <Fragment>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cardsArr.map((item) => {
          return (
            <BizCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              phone={item.phone}
              address={item.address}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
            ></BizCard>
          );
        })}
      </div>
      {selectedCard !== null && (
        <CardEditUser
          id={selectedCard._id}
          name={selectedCard.name}
          description={selectedCard.description}
          phone={selectedCard.phone}
          address={selectedCard.address}
          onUpdateCard={handleUpdateCard}
        ></CardEditUser>
      )}
    </Fragment>
  );
};

export default CardInfoPage;
