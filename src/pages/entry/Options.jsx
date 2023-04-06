import { useState, useEffect } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./toppingOption";
import { Row } from "react-bootstrap";

const Options = ({ optionType }) => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    // optionType is 'scoops' or 'toppings
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setitems(response.data);
      })
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

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
