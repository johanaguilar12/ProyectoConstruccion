import { useState } from 'react';
import { useForm, useInventoryStore, useOrdersStore } from "../../../hooks";
import { isValidDate, showErrorAlert } from "../helpers";
import { FormAddForniture } from './FormAddForniture';

const initialFormPackingList = {
  folio: '',
  arrivalDate: '',
};

const formValidationsPackingList = {
  folio: [(value) => value.trim() !== '', 'El folio es obligatorio'],
  arrivalDate: [(value) => value.trim() !== '', 'La fecha es obligatoria'],
};

// Recibimos ordersList
export const AddPackingListForm = ({ ordersList = [] }) => {
  const [furnitureList, setFurnitureList] = useState([]);
  const [ordersID, setOrdersID] = useState([]);
  const [isFurnitureFormOpen, setIsFurnitureFormOpen] = useState(false);
  const {startAddPackingList} = useInventoryStore();
  const {setPackingListOrderID} = useOrdersStore();

  const { folio, arrivalDate, onInputChange, isFormValid, onResetForm} = useForm(initialFormPackingList, formValidationsPackingList);

  const handleAddFurniture = (newFurniture = {}) => {
    setFurnitureList((prevList) => [...prevList, newFurniture]);
    setIsFurnitureFormOpen(false);
  };

  const handleRemoveFurniture = (index) => {
    setFurnitureList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const extractUniqueOrderIDs = (furnitureList) => {
    const orderIDs = furnitureList.map(furniture => furniture.orderID);
    const uniqueOrderIDs = [...new Set(orderIDs)];
    return uniqueOrderIDs;
  };

  const onSubmitFormPackingList = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showErrorAlert('Todos los campos son obligatorios');
      return;
    }

    if (!isValidDate(arrivalDate)) {
      showErrorAlert('Ingrese una fecha válida');
      return;
    }

    if (furnitureList.length === 0) {
      showErrorAlert('Debe agregar al menos un mueble al PackingList');
      return;
    }

    try {
      const newPackingList = {
        folio,
        products: furnitureList,
        arrivalDate,
      }

      await startAddPackingList(newPackingList);

      const uniqueOrderIDs = extractUniqueOrderIDs(furnitureList);
      setPackingListOrderID(uniqueOrderIDs);

      setFurnitureList([]);
      setOrdersID([]);
      onResetForm();
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <div className="container__admin shadow-custom w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
        Agregar PackingList
      </h2>
      <form onSubmit={onSubmitFormPackingList}>
        <div className="mb-4">
          <label className="block text-baseclr font-semibold mb-2">Folio</label>
          <input type="text" name="folio" id="folio" value={folio} onChange={onInputChange} className="w-full px-4 py-2 border border-lineclr rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-baseclr font-semibold mb-2">Fecha de LLegada</label>
          <input type="date" name="arrivalDate" id="arrivalDate" value={arrivalDate} onChange={onInputChange} className="w-full px-4 py-2 border border-lineclr rounded-lg" />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Muebles</h3>
          <button type="button" onClick={() => setIsFurnitureFormOpen(true)} className="mb-2 bg-btnyellow text-white font-bold py-1 px-3 rounded-lg hover:bg-yellow-600">
            Agregar Mueble
          </button>
          <ul className="list-disc pl-5">
            {furnitureList.map((furniture, index) => (
              <li key={index} className="flex justify-between items-center border my-3">
                <div>
                    <span>{`ID: ${furniture.furnitureId}`}</span><br/>
                    <span>{`ID Order: ${furniture.orderID}`}</span><br/>
                    <span>{`Tipo: ${furniture.type}`}</span>
                </div>
                <button type="button" onClick={() => handleRemoveFurniture(index)} className="text-red-500 font-bold">Eliminar</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">
          Registrar PackingList
        </button>
      </form>

      {isFurnitureFormOpen && (
        <FormAddForniture 
            handleAddFurniture={handleAddFurniture} 
            setIsFurnitureFormOpen={setIsFurnitureFormOpen} 
            // PASO 2: Pasamos la lista 'ordersList' como 'ordersAvailable'
            ordersAvailable={ordersList} 
            ordersID={ordersID} 
            setOrdersID={setOrdersID}
        />
      )}
    </div>
  );
};