import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

const GrandTotal = () => {
  const { totals } = useOrderDetails();

  return (
    <>
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
    </>
  );
};

export default GrandTotal;
