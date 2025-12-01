import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrdersStore, useTrucksStore } from "../../../hooks";
import { faEdit, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TableTrackAssignments } from "./TableTrackAssignments";
import { showErrorAlert, showSuccess } from "../helpers";


export const FormAssignmnetOrderToTruck = () => {
    const {trucks, orderTruckAssignments, startAssignOrderToTruck} = useTrucksStore();
    const {orders} = useOrdersStore();

    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [showFormSetOrder, setShowFormSetOrder] = useState(false);
    const [formData, setFormData] = useState({
        orderId: "",
    });

    const findTruck = ( truckId = '' ) => {
        return trucks.find((truck) => truck.id === truckId);
    }

    const handleAssignOrder = ( truckId = '' ) => {
        const truck = findTruck(truckId);
        setSelectedTruck(truck);
        setShowFormSetOrder(true);
    }

    const handleFormAssingOrder = async ( e ) => {
        e.preventDefault();
        setSelectedOrderId(formData.orderId);

        try {
            await startAssignOrderToTruck(selectedOrderId, selectedTruck.id);
            setShowFormSetOrder(true);
            showSuccess("Orden Asignada al Camión correctamente");
        } catch (error) {
            setShowFormSetOrder(true);
            showErrorAlert(error.message);
        }
    }

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="container__admin shadow-custom w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
            Agregar Una Orden a Un Camión
        </h2>

        <div className="w-full border"> {/** Table */}
                <div> {/** thead */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold"> {/** tr */}
                        <p>Camión</p>
                        <p>Conductor</p>
                        <p>Acciones</p>
                    </div>
                </div>
                
                <div> {/** tbody */}
                {trucks?.filter((truck) => (!!truck.driver) !== false).map((truck) => (
                    <div
                        key={truck.id}
                        className="grid grid-cols-2 sm:grid-cols-3 text-center border [&>p]:border"
                    > {/** tr */}
                        <p>{truck.trackingNumber}</p>
                        <p>{truck.driver?.name}</p>
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={() => handleAssignOrder(truck.id)}
                                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 w-[36px] h-[36px] flex items-center justify-center"
                                title="Agregar Orden"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            </div> {/* fin tabla*/}
            {showFormSetOrder && (
                <div className="mt-6">
                    <h3 className="text-base md:text-xl font-bold text-customBlue mb-4">
                        Asignar Orden al Camión
                    </h3>
                    <form onSubmit={handleFormAssingOrder} className="space-y-4">
                        <div>
                            <label htmlFor="selectOrder" className="block text-baseclr font-semibold mb-2">
                                Seleccionar Orden
                            </label>
                            <select
                                value={formData.orderId}
                                id="selectOrder"
                                onChange={(e) =>
                                    setFormData({ ...formData, orderId: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-lineclr rounded-lg"
                            >
                            <option value="">Seleccionar...</option>
                            {orders.map((order) => (
                                <option key={order.orderID} value={order.orderID}>
                                    {`${order.destination} - ${order.deliveryDate}`}
                                </option>
                            ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 text-sm md:text-base"
                        >
                            Asignar
                        </button>
                    </form>
                </div>
            )}
        </div>

        <TableTrackAssignments orderTruckAssignments={orderTruckAssignments}/>
    </div>
  )
}
