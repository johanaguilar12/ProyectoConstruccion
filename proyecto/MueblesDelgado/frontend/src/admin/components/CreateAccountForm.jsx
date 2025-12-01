import { Link } from "react-router-dom";
import { showErrorAlert, showSuccess } from "../../auth/components";
import { useAuthStore, useForm } from "../../hooks";

const initialFormCreateAccount = {
  name: '',
  password: '',
}

const formValidationsCreateAccount = {
  name: [(value) => value.trim() !== '', 'El nombre es obligatorio'],
  password: [(value) => value.trim() !== '', 'La contraseña es obligatoria'],
}

export const CreateAccountForm = () => {
  const {name, password, onInputChange, onResetForm, isFormValid} = useForm(initialFormCreateAccount, formValidationsCreateAccount);
  const {startRegisterAccount} = useAuthStore();


  const onSubmitFormCreateAccount = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showErrorAlert("Todos los campos son obligatorios");
      return;
    }

    try {
      const newAccount = {
        name: name,
        password: password,
      };

      await startRegisterAccount(newAccount);

      onResetForm();

      showSuccess('Cuenta de administrador registrada exitosamente');
    } catch (error) {
      showErrorAlert(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container__admin shadow-custom w-full max-w-6xl p-8">
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
          Registrar Nueva Cuenta de Administrador
        </h2>
        <form onSubmit={onSubmitFormCreateAccount}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-baseclr font-semibold mb-2"
            >
              Nombre del Administrador
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-lineclr rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlueLight"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-baseclr font-semibold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-lineclr rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlueLight"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Registrar Cuenta
          </button>
        </form>
        <Link to={'/admin/panel'}>
          <button
            type="button"
            className="mt-5 w-full bg-btnyellow text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Volver al Panel de Administración
          </button>
        </Link>
      </div>
    </div>
  );
}
