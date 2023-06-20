import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Options from "./Options";
import GrandTotal from "./GrandTotal";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderEntry = ({ setOrderPhase }) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const { totals } = useOrderDetails();
  const scoopsTotal = totals.scoops;

  useEffect(() => {
    if (scoopsTotal > 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [scoopsTotal]);

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
      <Button disabled={disabledButton} onClick={() => setOrderPhase("review")}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
