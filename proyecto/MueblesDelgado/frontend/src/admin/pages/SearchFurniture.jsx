import { useState } from "react";
import { TableStorageLocation } from "../components";

export const SearchFurniture = () => {

  const storageLocations = [
    {id:1, productId: "P001", rackNumber:"R-001", cellNumber: "C-001"},
    {id:2, productId: "P002", rackNumber:"R-002", cellNumber: "C-002"},
    {id:3, productId: "P003", rackNumber:"R-003", cellNumber: "C-003"},
    {id:4, productId: "P004", rackNumber:"R-004", cellNumber: "C-004"},

  ];
  return (
    <div className="flex flex-col justify-center items-center">
        {/**TableRoutes Component */}
        <TableStorageLocation storageLocations={storageLocations}/>
    </div>
  );
};