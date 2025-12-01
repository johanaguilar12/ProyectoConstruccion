import { Navigate } from "react-router-dom";
import { Admin, DeliveryRoutes, DeliveryTruckAdmin, InventoryAdmin, SearchFurniture } from "../pages";
import { CreateAccountForm, DeleteAccountForm, FormAddOrder, FormAssignmnetOrderToTruck, OrderAdministration, RegisterDriverForm, RegisterTruckForm } from "../components";


export const AdminRoutes = [
  // {
  //   index: true,
  //   element: <Admin />,
  // },
  {
    path: 'deliveryroutes',
    element: <DeliveryRoutes />,
  },
  {
    // path: 'inventoryadmin',
    index: true,
    element: <InventoryAdmin />,
  },
  {
    path: 'searchfurniture',
    element: <SearchFurniture />,
  },
  {
    path: 'createaccount',
    element: <CreateAccountForm />,
  },
  {
    path: 'deleteaccount',
    element: <DeleteAccountForm />,
  },
  {
    path: 'registerdriver',
    element: <RegisterDriverForm />,
  },
  {
    path: 'registertruck',
    element: <RegisterTruckForm />,
  },
  {
    path: 'deliveryAdmin',
    element: <DeliveryTruckAdmin />,
  },
  {
    path: 'orderassignment',
    element: <FormAssignmnetOrderToTruck />,
  },
  {
    path: 'addorder',
    element: <FormAddOrder />,
  },
  {
    path: 'orderadministration',
    element: <OrderAdministration />,
  },
  {
    path: "*",
    element: <Navigate to={"/login"} />,
  },
];
