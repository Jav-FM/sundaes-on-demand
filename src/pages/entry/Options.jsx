import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setitems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // optionType is 'scoops' or 'toppings
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setitems(response.data);
      })
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace null with Topping.Options when available
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionIems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionIems}</Row>;
};

export default Options;
