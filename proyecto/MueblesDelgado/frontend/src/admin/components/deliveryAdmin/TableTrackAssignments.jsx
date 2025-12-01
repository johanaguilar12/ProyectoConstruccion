export const TableTrackAssignments = ({ assignments = [] }) => {

    // BLINDAJE
    const safeAssignments = Array.isArray(assignments) ? assignments : [];

    return (
        <div className="container__admin shadow-custom w-full max-w-6xl mt-8">
            <h2 className="text-lg md:text-2xl font-bold text-center text-customBlue">
                Historial de Asignaciones
            </h2>
            <div className="w-full border mt-4">
                <div className="grid grid-cols-3 text-center border font-bold bg-gray-100 p-2">
                    <p>ID Asignación</p>
                    <p>Camión</p>
                    <p>Conductor</p>
                </div>

                {safeAssignments.length === 0 ? (
                    <p className="text-center p-4">Sin historial</p>
                ) : (
                    safeAssignments.map((assign, idx) => (
                        <div key={assign.assignmentId || idx} className="grid grid-cols-3 text-center border p-2">
                            <p>{assign.assignmentId}</p>
                            {/* Validamos que truck y driver existan antes de pedir sus datos */}
                            <p>{assign.truck ? assign.truck.trackingNumber : 'N/A'}</p>
                            <p>{assign.driver ? assign.driver.name : 'N/A'}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}