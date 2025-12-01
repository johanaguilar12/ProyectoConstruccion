import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faPlus, faBell } from '@fortawesome/free-solid-svg-icons';



export const Admin = () => {

    const [currentDateTime, setCurrentDateTime] = useState('');
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            }) + ' ' + now.toLocaleTimeString('es-ES');

            setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return() => clearInterval(interval);
    }, []);


  // Aqui puede ir js

  return (

    <div className="flex flex-col justify-center items-center">
       <div className="w-full text-center py-4">
        <p className="text-lg font-semibold text-gray-700">
        {currentDateTime}
        </p>
      </div>
      <div className="container__admin shadow-custom w-full max-w-6xl">
        <h1 className="text-xS font-bold text-left text-customBlue mb-6"> Ordenes más proximas </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap 10">
            {[1, 2,3].map((order, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Orden #{index +1}</h2>
            <p className="text-gray-600">Destino: Altabrisa</p>
            <p className="text-gray-600">Fecha: 22 de Noviembre</p>
            </div>)
            )}
        </div>
        <div className="text-right mt-6">
            <Link to="orderassignment" className="text-sm text-customBlue hover:underline">
                    ver más
            </Link>
        </div>
      </div>
      <div className= "container__admin shadow-custom w-full max-w-6x1">
        <h1 className="text-xS font-bold text-left text-customBlue mb-6">Rutas del día</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap 10">
            {[1, 2,3].map((route, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Route #{index +1}</h2>
            <p className="text-gray-600">Destino: Altabrisa</p>
            <p className="text-gray-600">Origen: Almacen Carr. Mérida - Progreso</p>
            </div>)
            )}
        </div>
        <div className="text-right mt-6">
            <Link to="deliveryroutes" className="text-sm text-customBlue hover:underline">
                    ver más
            </Link>
        </div>
      </div>
    </div>
  )
}
