import { useEffect } from "react";

export const TableRoutes = ({ routes = [] }) => {

    // BLINDAJE
    const safeRoutes = Array.isArray(routes) ? routes : [];

    return (
        <div className="container__admin shadow-custom w-full max-w-6xl mt-8">
            <h2 className="text-lg md:text-2xl font-bold text-center text-customBlue">
                Rutas Planificadas
            </h2>
            <div className="w-full border mt-4">
                <div className="grid grid-cols-4 text-center border font-bold bg-gray-100 p-2">
                    <p>Origen</p>
                    <p>Destinos</p>
                    <p>Distancia</p>
                    <p>Tiempo Est.</p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {safeRoutes.length === 0 ? (
                        <p className="text-center p-4">No hay rutas generadas</p>
                    ) : (
                        safeRoutes.map((route, index) => (
                            <div key={route.routeId || index} className="grid grid-cols-4 text-center border p-2 items-center">
                                <p>{route.originLocation}</p>
                                <p className="text-sm">
                                    {Array.isArray(route.destinations)
                                        ? route.destinations.join(", ")
                                        : route.destinations}
                                </p>
                                <p>{route.distance} km</p>
                                <p>{route.estimatedTime}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}