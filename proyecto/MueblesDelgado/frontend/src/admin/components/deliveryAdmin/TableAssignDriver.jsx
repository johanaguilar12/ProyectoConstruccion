import { useState } from "react";
import { useDriversStore } from "../../../hooks";
import { showErrorAlert, showSuccess } from "../helpers";

// CORRECCIÓN: Valores por defecto y validación de arrays
export const TableAssignDriver = ({ trucks = [], drivers = [] }) => {

    const [selectedTruck, setSelectedTruck] = useState("");
    const [selectedDriver, setSelectedDriver] = useState("");
    const { startAssignDriverToTruck } = useDriversStore();

    // BLINDAJE: Aseguramos que sean arreglos reales
    const safeTrucks = Array.isArray(trucks) ? trucks : [];
    const safeDrivers = Array.isArray(drivers) ? drivers : [];

    const handleAssign = async (e) => {
        e.preventDefault();
        if(!selectedTruck || !selectedDriver) {
            showErrorAlert("Debe seleccionar camión y conductor");
            return;
        }
        try {
            await startAssignDriverToTruck(selectedTruck, selectedDriver);
            showSuccess("Asignación realizada");
            setSelectedTruck("");
            setSelectedDriver("");
        } catch (error) {
            showErrorAlert(error.message);
        }
    }

    return (
        <div className="container__admin shadow-custom w-full max-w-6xl mt-8">
            <h2 className="text-lg md:text-2xl font-bold text-center text-customBlue mb-4">
                Asignación Manual
            </h2>
            <form onSubmit={handleAssign} className="flex flex-col md:flex-row gap-4 justify-center items-center p-4 border rounded">

                <select
                    className="p-2 border rounded"
                    value={selectedTruck}
                    onChange={(e) => setSelectedTruck(e.target.value)}
                >
                    <option value="">-- Seleccionar Camión --</option>
                    {/* USAMOS safeTrucks */}
                    {safeTrucks.map((t, idx) => (
                        <option key={t.trackingNumber || idx} value={t.trackingNumber}>
                            {t.trackingNumber} ({t.capacity}kg)
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border rounded"
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                >
                    <option value="">-- Seleccionar Conductor --</option>
                    {/* USAMOS safeDrivers */}
                    {safeDrivers.map((d, idx) => (
                        <option key={d.licenseNumber || idx} value={d.name}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                    Asignar
                </button>
            </form>
        </div>
    )
}