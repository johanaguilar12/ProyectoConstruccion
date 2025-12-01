import { useState } from "react";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDriversStore } from "../../../hooks";
import { showErrorAlert, showSuccess } from "../helpers";

export const TableTrucks = ({ trucks = [], drivers = [] }) => {

    const [showForm, setShowForm] = useState(false);
    const { startAssignDriverToTruck } = useDriversStore();
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [formData, setFormData] = useState({ driverName: ""});

    // Validación de seguridad: Asegurar que sean arreglos
    const safeTrucks = Array.isArray(trucks) ? trucks : [];
    const safeDrivers = Array.isArray(drivers) ? drivers : [];

    const handleAssignDriver = (trackingNumber) => {
        setSelectedTruck(trackingNumber);
        setShowForm(true);
    };

    const handleFormAssignSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTruck) {
            showErrorAlert("Seleccione un Camión");
            return;
        }
        try {
            await startAssignDriverToTruck(selectedTruck, formData.driverName);
            setShowForm(false);
            showSuccess("Conductor asignado correctamente");
        } catch (error) {
            setShowForm(false);
            showErrorAlert(error.message);
        }
    }

    return (
        <div className="container__admin shadow-custom w-full max-w-6xl">
            <h2 className="text-lg md:text-2xl font-bold text-center text-customBlue">
                Gestión de Camiones
            </h2>
            <div className="w-full border">
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold">
                        <p>Camión</p>
                        <p>Capacidad</p>
                        <p>Kilometraje</p>
                        <p>Asignar Conductor</p>
                    </div>
                </div>

                <div>
                    {/* CORRECCIÓN: Usamos safeTrucks en lugar de trucks */}
                    {safeTrucks.length === 0 ? (
                        <p className="text-center py-4 text-gray-500">No hay camiones registrados</p>
                    ) : (
                        safeTrucks.map((truck) => (
                            <div
                                key={truck.trackingNumber || truck.id} // Fallback por si trackingNumber falta
                                className="grid grid-cols-2 sm:grid-cols-4 text-center border [&>p]:border"
                            >
                                <p>{truck.trackingNumber}</p>
                                <p>{truck.capacity}</p>
                                <p>{truck.mileage}</p>
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handleAssignDriver(truck.trackingNumber)}
                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 w-[36px] h-[36px] flex items-center justify-center"
                                        title="Agregar conductor"
                                    >
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </button>
                                </div>
                            </div>
                        )))}
                </div>
            </div>

            {showForm && (
                <div className="mt-6">
                    <h3 className="text-base md:text-xl font-bold text-customBlue mb-4">
                        Asignar Conductor al Camión
                    </h3>
                    <form onSubmit={handleFormAssignSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="selectDriver" className="block text-baseclr font-semibold mb-2">
                                Seleccionar Conductor
                            </label>
                            <select
                                value={formData.driverName}
                                id="selectDriver"
                                onChange={(e) =>
                                    setFormData({ ...formData, driverName: e.target.value })
                                }
                                className="w-full px-4 py-2 border border-lineclr rounded-lg"
                            >
                                <option value="">Seleccionar...</option>
                                {/* CORRECCIÓN: Usamos safeDrivers */}
                                {safeDrivers.map((driver, index) => (
                                    <option key={`${driver.licenseNumber}-${index}`} value={driver.name}>
                                        {driver.name}
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
    );
};