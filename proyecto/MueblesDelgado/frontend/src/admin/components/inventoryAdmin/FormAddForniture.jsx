import { useState } from "react";
import { useForm } from "../../../hooks";
import { showErrorAlert } from "../helpers";

const initialFurnitureForm = {
    furnitureId: '',
    orderID: '',
    type: '',
    brand: '',
    color: '',
    dimension: '',
    quantity: '',
    buildTime: '',
};
  
const furnitureValidations = {
    furnitureId: [(value) => value.trim() !== '', 'El ID es obligatorio'],
    type: [(value) => value.trim() !== '', 'El tipo es obligatorio'],
    brand: [(value) => value.trim() !== '', 'La marca es obligatoria'],
    color: [(value) => value.trim() !== '', 'El color es obligatorio'],
    dimension: [(value) => value.trim() !== '', 'Las dimensiones son obligatorias'],
    quantity: [(value) => !isNaN(value) && Number(value) > 0, 'La cantidad debe ser un número válido'],
    buildTime: [(value) => value.trim() !== '', 'El tiempo es obligatorio'],
};

// Recibimos ordersAvailable
export const FormAddForniture = ({handleAddFurniture, setIsFurnitureFormOpen, ordersAvailable = [], ordersID, setOrdersID}) => {
    const {
        furnitureId, orderID, type, brand, color, dimension, quantity, buildTime,
        onInputChange: onFurnitureChange, isFormValid: isFurnitureValid, onResetForm: resetFurnitureForm,
    } = useForm(initialFurnitureForm, furnitureValidations);

    const [isAddingNewOrderID, setIsAddingNewOrderID] = useState(false);
    const [newOrderID, setNewOrderID] = useState('');

    const transformStringToDimension = ( dimensionString = '') => {
      const dimensionSplit = dimensionString.split(/[,|-]/);
      if (dimensionSplit.length !== 3) return { length: 0, height: 0, width: 0 };
      return { length: dimensionSplit[0], height: dimensionSplit[1], width: dimensionSplit[2] }
    }

    const newForniture = () => {
        const finalOrderID = isAddingNewOrderID ? parseInt(newOrderID) : parseInt(orderID);
        return { 
            furnitureId, type, brand, color, 
            dimension: transformStringToDimension(dimension), 
            quantity: Number(quantity), buildTime, 
            orderID: finalOrderID 
        };
    }

  const handleSendNewForniture = () => {
    if (!isFurnitureValid) {
      showErrorAlert('Por favor, completa todos los campos del mueble correctamente');
      return;
    }
    
    if (isAddingNewOrderID && !newOrderID) {
        showErrorAlert('Debe ingresar un ID para la nueva orden');
        return;
    }

    if (isAddingNewOrderID && !ordersID.includes(newOrderID)) {
        setOrdersID([...ordersID, newOrderID]);
    }

    handleAddFurniture(newForniture());
    resetFurnitureForm();
    setIsAddingNewOrderID(false);
    setNewOrderID('');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-xl mb-4 text-customBlue">Agregar Mueble</h3>
        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-3">
          
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-semibold mb-1 text-sm">ID Mueble</label>
            <input type="text" name="furnitureId" value={furnitureId} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block font-semibold mb-1 text-sm">ID Orden</label>
            {isAddingNewOrderID ? (
                <input type="text" value={newOrderID} onChange={(e) => setNewOrderID(e.target.value)} placeholder="Nuevo ID..." className="w-full px-3 py-2 border rounded-lg" />
            ) : (
              <select
                name="orderID"
                value={orderID}
                onChange={(e) => {
                    if (e.target.value === 'new') setIsAddingNewOrderID(true);
                    else onFurnitureChange(e);
                }}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Seleccionar...</option>
                
                {/* PASO 3: Mapeo correcto de ordersAvailable */}
                {Array.isArray(ordersAvailable) && ordersAvailable.map((order) => (
                    <option key={`db-${order.orderID}`} value={order.orderID}>
                        {order.orderID} - {order.destination || 'Sin destino'}
                    </option>
                ))}

                {ordersID.map((id) => (
                    <option key={`local-${id}`} value={id}>{id} (Nuevo)</option>
                ))}

                <option value="new" className="text-blue-600 font-bold">+ Crear nueva orden</option>
              </select>
          )}
          </div>

          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Tipo</label><input type="text" name="type" value={type} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Marca</label><input type="text" name="brand" value={brand} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Color</label><input type="text" name="color" value={color} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Dimensión</label><input type="text" name="dimension" placeholder="Largo,Alto,Ancho" value={dimension} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Cantidad</label><input type="number" name="quantity" value={quantity} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div className="col-span-2 sm:col-span-1"><label className="block font-semibold mb-1 text-sm">Tiempo (min)</label><input type="number" name="buildTime" value={buildTime} onChange={onFurnitureChange} className="w-full px-3 py-2 border rounded-lg" /></div>

          <div className="col-span-2 flex justify-end mt-4 gap-2">
            <button type="button" onClick={() => setIsFurnitureFormOpen(false)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">Cancelar</button>
            <button type="button" onClick={handleSendNewForniture} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
};