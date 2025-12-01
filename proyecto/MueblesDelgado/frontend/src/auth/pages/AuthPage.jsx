import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore, useForm } from "../../hooks";
import { handleKeyPress, showErrorAlert, validateUser } from "../components";


const initialFormSingUp = {
  userSignIn: "",
  passwordSignIn: "",
}

const formValidations = {
  userSignIn: [(value) => value.trim() !== '', 'El usuario es obligatorio'],
  passwordSignIn: [(value) => value.trim() !== '', 'La contraseña es obligatoria'],
}

export const AuthPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const {
    userSignIn,
    passwordSignIn,
    onInputChange,
    onResetForm,
    isFormValid,
  } = useForm(initialFormSingUp, formValidations);

  useEffect(() => {
    if (errorMessage !== undefined) {
      showErrorAlert(errorMessage);
    }
  }, [errorMessage])

  const onSubmitFormSignIn = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showErrorAlert('Todos los campos son obligatorios');
      return;
    };

    const validations = [
      { valid: validateUser(userSignIn), message: 'Ingrese un usuario válido, solo letras y números' },
    ]

    for (const { valid, message } of validations) {
      if (!valid) {
        showErrorAlert(message);
        return;
      }
    }

    startLogin({ username: userSignIn, password: passwordSignIn });
    onResetForm();
  };

  const toggleVisibilityPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };

return (
    <div className="w-full min-h-screen bg-customBlueLight flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-custom max-w-md w-full">
        <form onSubmit={onSubmitFormSignIn} className="form-login py-4 px-6 sm:py-6 sm:px-12">
          <h1 className="title text-center">Inicio de sesión</h1>
          <div className="input-field--login">
            <i className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <FontAwesomeIcon icon={faUser} />
            </i>
            <input 
              type="text" 
              placeholder="Usuario" 
              name="userSignIn" 
              id="userSignIn" 
              value={userSignIn} 
              onChange={onInputChange}
              onKeyDown={handleKeyPress}
              autoComplete="username"
              className="w-full pl-12 pr-4 py-2 rounded-full customInput"
            />
          </div>

        <div className="input-field--login">
          <i className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon className="custom__icon" icon={faLock} />
          </i>
          <input 
            type={visibilityPassword ? 'text' : 'password'} 
            placeholder="Contraseña" 
            name="passwordSignIn" 
            id="passwordSignIn" 
            value={passwordSignIn}
            onChange={onInputChange}
            autoComplete="current-password"
            className="w-full pl-12 pr-4 py-2 rounded-full customInput"
          />
          <i className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <span onClick={toggleVisibilityPassword} className="cursor-pointer p-3" role="button">
              {visibilityPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </span>
          </i>
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="btn__login solid w-full py-2 mt-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        </form>
      </div>
    </div>
  )
}
