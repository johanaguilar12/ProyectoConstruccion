import { useDriversStore, useForm } from "../../hooks"
import { showErrorAlert } from "../../auth/components";
import { onlyLettersOnKeyDown, onlyNumbersOnKeyDown, showSuccess } from "./helpers";
import { Link } from "react-router-dom";

const initialFormRegisterDriver = {
  driverName: '',
  driverLicense: '',
}

const formValidationsRegisterDriver = {
  driverName: [(value) => value.trim() !== '', 'El nombre del conductor es obligatorio'],
  driverLicense: [(value) => value.trim() !== '', 'La licencia del conductor es obligatoria'],
}

export const RegisterDriverForm = () => {
  const {driverName, driverLicense, onInputChange, onResetForm, isFormValid} = useForm(initialFormRegisterDriver, formValidationsRegisterDriver);
  const {startRegisterTruckDriver} = useDriversStore();


  const onSubmitFormDriverRegister = async ( e ) => {
    e.preventDefault();

    if (!isFormValid) {
      showErrorAlert("Todos los campos son obligatorios");
      return;
    }

    try {

      const truckDriver = {
        name: driverName,
        licenseNumber: parseInt(driverLicense),
      }

      await startRegisterTruckDriver(truckDriver);
      onResetForm();

      showSuccess('Conductor Registrado Exitosamente');
    } catch (error) {
      showErrorAlert(error.message);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-custom w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
          Registrar Conductor
        </h2>
        <form onSubmit={onSubmitFormDriverRegister}>
          <div className="mb-4">
            <label
              htmlFor="driverName"
              className="block text-baseclr font-semibold mb-2"
            >
              Nombre del Conductor
            </label>
            <input
              type="text"
              name="driverName"
              id="driverName"
              value={driverName}
              onChange={onInputChange}
              onKeyDown={onlyLettersOnKeyDown}
              className="w-full px-4 py-2 border border-lineclr rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlueLight"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="driverLicense"
              className="block text-baseclr font-semibold mb-2"
            >
              Número de Licencia
            </label>
            <input
              type="number"
              name="driverLicense"
              id="driverLicense"
              value={driverLicense}
              onChange={onInputChange}
              onKeyDown={onlyNumbersOnKeyDown}
              className="w-full px-4 py-2 border border-lineclr rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlueLight"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Registrar Conductor
          </button>
        </form>
        <Link to={'/admin/panel/deliveryadmin'}>
          <button
            type="button"
            className="mt-5 w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Asignarle Un Camión
          </button>
        </Link>
      </div>
    </div>
  );
}
