export const DataFurnituresOrders = ({selectedOrder = [], setIsFurnituresOrderModalOpen}) => {

    // BLINDAJE: Aseguramos que sea una lista
    const safeFurnitures = Array.isArray(selectedOrder) ? selectedOrder : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-3/4 overflow-y-auto">
                <h3 className="font-bold text-xl mb-4">Muebles de la Orden</h3>
                <div>
                    <ul>
                        {safeFurnitures.length === 0 ? (
                            <p>No hay muebles en esta orden.</p>
                        ) : (
                            safeFurnitures.map((furniture, furnitureIndex) => (
                                <li key={`${furniture.type}-${furniture.brand}-${furnitureIndex}`} className="flex justify-between items-center border my-4 p-2">
                                    <div>
                                        <span>{`ID: ${furniture?.furnitureId}`}</span>
                                        <br />
                                        <span>{`Tipo: ${furniture.type}`}</span>
                                        <br />
                                        <span>{`Marca: ${furniture.brand}`}</span>
                                        <br />
                                        <span>{`Color: ${furniture.color}`}</span>
                                        <br />
                                        {furniture.dimension && (
                                            <span>{`Dim: ${furniture.dimension.length} x ${furniture.dimension.height} x ${furniture.dimension.width}`}</span>
                                        )}
                                        <br />
                                        <span>{`Cantidad: ${furniture.quantity}`}</span>
                                        <br />
                                        <span>{`Tiempo: ${furniture.buildTime} min`}</span>
                                    </div>
                                </li>
                            )))}
                    </ul>
                </div>
                <button
                    type="button"
                    onClick={() => setIsFurnituresOrderModalOpen(false)}
                    className="mt-4 bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}