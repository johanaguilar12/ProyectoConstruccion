import Swal from "sweetalert2";


export const showErrorAlert = ( message = '' ) => {
    Swal.fire({
        title: 'Error',
        text: message,
        icon:'error',
        timer: 1500,
        showConfirmButton: false,
    });
}

export const showSuccess = ( message = '' ) => {
    Swal.fire({
        title: 'Éxito!',
        text: message,
        icon:'success',
        timer: 1500,
        showConfirmButton: false,
    });
}