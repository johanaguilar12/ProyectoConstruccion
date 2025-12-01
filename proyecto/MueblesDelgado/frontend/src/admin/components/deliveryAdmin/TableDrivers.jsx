import { faEdit, faMinusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const TableDrivers = ({ drivers = [] }) => {

    // Validación de seguridad
    const safeDrivers = Array.isArray(drivers) ? drivers : [];

    return (
        <div className="container__admin shadow-custom w-full max-w-6xl">
            <h2 className="text-lg md:text-2xl font-bold text-center text-customBlue">
                Conductores Disponibles
            </h2>
            <div>
                <div>
                    <div className="grid grid-cols-2 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold">
                        <p>Nombre</p>
                        <p>Licencia</p>
                    </div>
                </div>

                <div>
                    {/* CORRECCIÓN: Usamos safeDrivers */}
                    {safeDrivers.length === 0 ? (
                        <p className="text-center py-4 text-gray-500">No hay conductores registrados</p>
                    ) : (
                        safeDrivers.map((driver) => (
                            <div key={driver.licenseNumber || driver.id} className="grid grid-cols-2 text-center border [&>p]:border">
                                <p>{driver.name}</p>
                                <p>{driver.licenseNumber}</p>
                            </div>
                        )))}
                </div>
            </div>
        </div>
    )
}