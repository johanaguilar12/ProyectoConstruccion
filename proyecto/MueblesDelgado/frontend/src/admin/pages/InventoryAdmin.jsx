import { useEffect } from 'react'; 
import { useInventoryStore, useOrdersStore } from '../../hooks';
import { TablePackingList } from '../components/inventoryAdmin/TablePackingList';
import { AddPackingListForm } from '../components/inventoryAdmin/AddPackingListForm';

export const InventoryAdmin = () => {

    const { startGetPackingLists } = useInventoryStore();
    const { startGetOrders, orders} = useOrdersStore(); 

    console.log("ordenes", orders); 
    
    useEffect(() => {
        startGetPackingLists();
        startGetOrders();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-8">
            <h1 className="text-3xl font-bold text-customBlue">Administración de Inventario</h1>

            <div className="w-full max-w-6xl px-4">
                <AddPackingListForm ordersList={orders} />
            </div>

            <div className="w-full max-w-6xl px-4 mb-10">
                <TablePackingList />
            </div>
        </div>
    )
}