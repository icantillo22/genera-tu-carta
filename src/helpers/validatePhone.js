const validatePhone = ({value, fieldName}) => {
  const output = {
    error: false,
    type: '',
    message: '',
    fieldName,
  }

  const validFormat = /^([0-9])+$/.test(value);

  if (value.length <= 0) {
    output.error = true
    output.type = 'empty'
    output.message = `El campo "${fieldName}" no puede estar vacio 🤨`
  }

  if(!validFormat) {
    output.error = true
    output.type = 'format-error'
    output.message = `El campo "${fieldName}" no cumple con el formato válido 😅, aquí un ejemplo: 3123456789 😎`
  }

  return output
}

export default validatePhone; 