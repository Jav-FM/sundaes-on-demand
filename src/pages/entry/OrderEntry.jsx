import Options from "./Options";
import GrandTotal from "./GrandTotal";

const OrderEntry = () => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
    </div>
  );
};

export default OrderEntry;
