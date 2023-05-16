import { Button } from "react-bootstrap";
import Options from "./Options";
import GrandTotal from "./GrandTotal";

const OrderEntry = ({ setOrderPhase }) => {
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
};

export default OrderEntry;
