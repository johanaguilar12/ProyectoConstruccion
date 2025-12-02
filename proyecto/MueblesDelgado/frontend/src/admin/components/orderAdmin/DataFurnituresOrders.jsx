export const DataFurnituresOrders = ({selectedOrder = [], setIsFurnituresOrderModalOpen}) => {
  
  // BLINDAJE: Validación extra
  const safeList = Array.isArray(selectedOrder) ? selectedOrder : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-3/4 overflow-y-auto">
            <h3 className="font-bold text-xl mb-4 text-customBlue">Muebles de la Orden</h3>
            <div>
                {safeList.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">Esta orden no tiene muebles asignados aún.</p>
                ) : (
                    <ul>
                        {safeList.map((furniture, index) => (
                            <li key={furniture.furnitureId || index} className="border-b border-gray-200 py-2">
                                <p><strong>ID:</strong> {furniture.furnitureId}</p>
                                <p><strong>Tipo:</strong> {furniture.type}</p>
                                <p><strong>Marca:</strong> {furniture.brand}</p>
                                <p><strong>Color:</strong> {furniture.color}</p>
                                {furniture.dimension && (
                                    <p><strong>Dimensión:</strong> {furniture.dimension.length}x{furniture.dimension.height}x{furniture.dimension.width}</p>
                                )}
                                <p><strong>Tiempo Montaje:</strong> {furniture.buildTime} min</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsFurnituresOrderModalOpen(false)}
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    </div>
  )
}