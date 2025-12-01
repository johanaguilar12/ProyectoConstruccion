import { useState, useEffect } from "react";
import { TableAssignDriver, TableDrivers, TableTrucks } from "../components";
import { useDriversStore, useTrucksStore } from "../../hooks";

export const DeliveryTruckAdmin = () => {
  const {drivers, assignments} = useDriversStore();
  const {trucks} = useTrucksStore();

  return (
    <div className="flex flex-col justify-center items-center"> {/* QUITAR ESTO SI HAY PROBLEMAS */}
      <TableAssignDriver trucks={trucks} drivers={drivers} assignments={assignments} />

      <TableTrucks trucks={trucks} drivers={drivers}/>

      <TableDrivers drivers={drivers} />

    </div>
  );
};
