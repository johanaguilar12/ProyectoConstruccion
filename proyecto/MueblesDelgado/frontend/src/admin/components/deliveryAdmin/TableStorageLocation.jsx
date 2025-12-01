import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";

export const TableStorageLocation = ({ storageLocations = [] }) => {
    const [selectedStorageLocation, setSelectedStorageLocation] = useState(null);

    // BLINDAJE: Aseguramos que sea un arreglo
    const safeLocations = Array.isArray(storageLocations) ? storageLocations : [];

    const handleViewDetail = (storage) => {
        setSelectedStorageLocation(storage);
        // CORREGIDO: Antes decía 'route', ahora usa 'storage'
        alert(`Detalles del almacenamiento: ${JSON.stringify(storage, null, 2)}`);
    };

    return(
        <div className="container__admin shadow-custom w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-center text-customBlue">
                Gestión de Ubicaciones de Almacenamiento
            </h2>
            <div className="w-full border">
                <div>
                    <div className="grid grid-cols-5 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold">
                        <p>Storage ID</p>
                        <p>Product ID</p>
                        <p>Rack Number</p>
                        <p>Cell Number</p>
                        <p>Detalles</p>
                    </div>
                </div>

                <div>
                    {safeLocations.length === 0 ? (
                        <p className="text-center p-4">No hay ubicaciones registradas</p>
                    ) : (
                        safeLocations.map((storage) =>(
                            <div key={storage.id || Math.random()}
                                 className="grid grid-cols-5 text-center border [&>p]:border">
                                <p>{storage.id}</p>
                                <p>{storage.productId}</p>
                                <p>{storage.rackNumber}</p>
                                <p>{storage.cellNumber}</p>
                                <div className="flex justify-center items-center gap-2">
                                    {/* CORREGIDO: Pasamos el objeto completo 'storage' */}
                                    <button onClick={() => handleViewDetail(storage)}
                                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 w-[36px] h-[36px] flex items-center justify-center"
                                            title="ver detalles">
                                        <FontAwesomeIcon icon={faWarehouse}/>
                                    </button>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </div>
    );
};