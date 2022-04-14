import "./PresentCard.css";
import logo from "../../assets/logo.png";

const PresentCard = (props) => {
  return (
    <div className="col present-card-div">
      <div className="card h-100">
        <img src={logo} className="card-img-top" alt="User Image" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <h6 className="card-subtitle mb-2 font-bolder">{props.phone}</h6>
          <h6 className="card-subtitle mb-2">{props.address}</h6>
        </div>
      </div>
    </div>
  );
};

export default PresentCard;
