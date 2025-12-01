import { TableRoutes } from "../components";
import { useOrdersStore } from "../../hooks";

export const DeliveryRoutes = () => {
  const {orders} = useOrdersStore();

  return (
    <div className="flex flex-col justify-center items-center">
        {/**TableRoutes Component */}
        <TableRoutes orders={orders}/>
    </div>
  );
};
