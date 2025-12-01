import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAdmin } from "../../hooks/useAdmin"
import { showErrorAlert, showSuccess } from "./helpers";
import { useAuthStore } from "../../hooks";

export const DeleteAccountForm = () => {
  const {accounts} = useAdmin();
  const {startDeleteAccount} = useAuthStore();


  const handleDeleteAccount = async ( id ) => {
    try {
      await startDeleteAccount(id);
      showSuccess('Cuenta de administrador eliminada exitosamente');
    } catch (error) {
      showErrorAlert(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container__admin shadow-custom w-full max-w-6xl p-8">
        <h2 className="text-2xl font-bold text-center text-customBlue mb-6">
          Borrar Cuenta
        </h2>

        <div> {/** Table */}
            <div> {/** thead */}
                <div className="grid grid-cols-2 text-center border [&>p]:border [&>p]:text-customBlue text-lg font-semibold"> {/** tr */}
                    <p>Nombre</p>
                    <p>Acciones</p>
                </div>
            </div>

            <div> {/** tbody */}
                {accounts?.map((account) => (
                    <div key={account.id} className="grid grid-cols-2 text-center border [&>p]:border">
                        <p>{account.name}</p>
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={() => handleDeleteAccount(account.id)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 w-[36px] h-[36px] flex items-center justify-center"
                                title="Eliminar Cuenta"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}
