import { useEffect, useState } from "react";
import { useForm, useOrdersStore } from "../../../hooks";
import { showErrorAlert, showSuccess } from "../helpers";

export const FormAddOrder = () => {
    
    // Traemos las órdenes del store para mostrarlas en el select
    const { startCreateOrder, startUpdateOrder, orders } = useOrdersStore();
    
    // Estado para controlar si estamos en modo edición o creación
    const [selectedOrderID, setSelectedOrderID] = useState(""); 

    const { 
        destination, 
        deliveryDate, 
        onInputChange, 
        isFormValid, 
        onResetForm,
        setFormState
    } = useForm({
        destination: '',
        deliveryDate: '',
    }, {
        destination: [(value) => value.trim() !== '', 'El destino es obligatorio'],
        deliveryDate: [(value) => value.trim() !== '', 'La fecha es obligatoria']
    });

    // EFECTO: Cuando cambias la selección en el dropdown
    useEffect(() => {
        if (selectedOrderID) {
            // Buscar la orden seleccionada en la lista
            const orderToEdit = orders.find(o => o.orderID === parseInt(selectedOrderID));
            if (orderToEdit) {
                setFormState({
                    destination: orderToEdit.destination || '',
                    deliveryDate: orderToEdit.deliveryDate ? String(orderToEdit.deliveryDate).split('T')[0] : ''
                });
            }
        } else {
            // Si seleccionas "Nueva Orden", limpiamos
            onResetForm();
        }
    }, [selectedOrderID, orders]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid) return showErrorAlert("Complete los campos obligatorios");

        try {
            if (selectedOrderID) {
                // ACTUALIZAR (Mantiene ID, solo cambia datos)
                await startUpdateOrder(selectedOrderID, { destination, deliveryDate });
                showSuccess(`Orden #${selectedOrderID} actualizada correctamente`);
                // Opcional: Limpiar selección tras guardar
                setSelectedOrderID(""); 
                onResetForm();
            } else {
                // CREAR NUEVA
                await startCreateOrder({ destination, deliveryDate });
                showSuccess("Nueva orden creada correctamente");
                onResetForm();
            }
        } catch (error) {
            showErrorAlert(error.message);
        }
    };
    
    return (
        <div className={`p-6 rounded-lg shadow-md mb-6 border ${selectedOrderID ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200'}`}>
            <h3 className="text-xl font-bold text-customBlue mb-4">
                {selectedOrderID ? `Actualizando Orden #${selectedOrderID}` : "Registrar / Completar Orden"}
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                
                {/* SELECTOR DE ORDEN (La clave para editar desde arriba) */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Seleccionar Orden</label>
                    <select
                        value={selectedOrderID}
                        onChange={(e) => setSelectedOrderID(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 font-semibold"
                    >
                        <option value="">+ Crear Nueva Orden</option>
                        <optgroup label="Órdenes Existentes">
                            {orders.map(order => (
                                <option key={order.orderID} value={order.orderID}>
                                    #{order.orderID} - {order.destination}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                {/* Input Destino */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Destino</label>
                    <input 
                        type="text" 
                        name="destination"
                        value={destination}
                        onChange={onInputChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Ej: Sucursal Centro"
                    />
                </div>

                {/* Input Fecha */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Fecha de Entrega</label>
                    <input 
                        type="date" 
                        name="deliveryDate"
                        value={deliveryDate}
                        onChange={onInputChange}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Botón Acción */}
                <div className="md:col-span-1">
                    <button 
                        type="submit"
                        className={`w-full py-2 px-4 rounded text-white font-bold transition-colors ${selectedOrderID ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {selectedOrderID ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
};