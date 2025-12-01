



export const onlyNumbersOnKeyDown = (event) => {
    const regexNumber = /[0-9]/;
    const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'
    ];

    if (!regexNumber.test(event.key) && !allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
};


export const onlyLettersOnKeyDown = (e) => {
    const letterRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!letterRegex.test(e.key)) {
      e.preventDefault();
    }
};

