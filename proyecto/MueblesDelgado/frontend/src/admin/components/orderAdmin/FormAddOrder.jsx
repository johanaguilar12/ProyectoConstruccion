import { useEffect, useState } from "react";
import { useForm, useOrdersStore } from "../../../hooks";
import { showErrorAlert, showSuccess } from "../helpers";

const formInitialState = {
    destination: '',
    deliveryDate: '',
};

const formValidations = {
    destination: [(value) => value.trim() !== '', 'El destino es obligatorio'],
    deliveryDate: [(value) => value.trim() !== '', 'La fecha es obligatoria']
};

export const FormAddOrder = () => {
    
    const { startUpdateOrder, orders } = useOrdersStore(); 
    const [selectedOrderID, setSelectedOrderID] = useState(""); 

    const { 
        destination, 
        deliveryDate, 
        onInputChange, 
        isFormValid, 
        onResetForm,
        setFormState
    } = useForm(formInitialState, formValidations);

    
    useEffect(() => {
        if (selectedOrderID) {
            const orderToEdit = orders.find(o => o.orderID === parseInt(selectedOrderID));
            if (orderToEdit) {
                setFormState({
                    destination: orderToEdit.destination || '',
                    deliveryDate: orderToEdit.deliveryDate ? String(orderToEdit.deliveryDate).split('T')[0] : ''
                });
            }
        } else {
            onResetForm();
        }
        
    }, [selectedOrderID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return showErrorAlert("Complete los campos obligatorios");

        try {
            if (!selectedOrderID) {
                return showErrorAlert("Debe seleccionar una orden para actualizar");
            }

            await startUpdateOrder(selectedOrderID, { destination, deliveryDate });
            showSuccess(`Orden #${selectedOrderID} actualizada`);

        } catch (error) {
            showErrorAlert(error.message);
        }
    };
    
    return (
        <div className={`p-6 rounded-lg shadow-md mb-6 border bg-yellow-50 border-yellow-300`}>
            <h3 className="text-xl font-bold text-customBlue mb-4">
                {selectedOrderID ? `Actualizando Orden #${selectedOrderID}` : "Selecciona una Orden"}
            </h3>
            
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={handleSubmit}>
                
                {/* Selector de Orden */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Seleccionar Orden</label>
                    <select
                        value={selectedOrderID}
                        onChange={(e) => setSelectedOrderID(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 font-semibold"
                    >
                        <option value="">-- Seleccionar Orden --</option>

                        <optgroup label="Órdenes Existentes">
                            {orders.map(order => (
                                <option key={order.orderID} value={order.orderID}>
                                    #{order.orderID} - {order.destination || "Sin destino"}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>

                {/* Destino */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Destino</label>
                    <input 
                        type="text" 
                        name="destination"
                        value={destination}
                        onChange={onInputChange}
                        disabled={!selectedOrderID}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* Fecha */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-bold mb-1 text-gray-700">Fecha de Entrega</label>
                    <input 
                        type="date" 
                        name="deliveryDate"
                        value={deliveryDate}
                        onChange={onInputChange}
                        disabled={!selectedOrderID}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* Botón */}
                <div className="md:col-span-1">
                    <button 
                        type="submit"
                        disabled={!selectedOrderID}
                        className={`w-full py-2 px-4 rounded text-white font-bold transition-colors bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
};
