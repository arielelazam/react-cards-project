import "./HomePage.css";
import PresentCard from "../../components/PresentCard/PresentCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [cardsArr, setCardsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("/cards/allCards").then((dataFromServer) => {
      setCardsArr(dataFromServer.data);
    });
  }, []);

  useEffect(() => {
    if (cardsArr.length > 0) {
      setLoaded(true);
    }
  }, [cardsArr]);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 home-main-div">
      {!loaded && <h1>loading...</h1>}
      {cardsArr.map((item) => {
        return (
          <PresentCard
            key={item._id}
            id={item._id}
            name={item.name}
            desc={item.description}
            phone={item.phone}
            address={item.address}
          ></PresentCard>
        );
      })}
    </div>
  );
};

export default HomePage;
