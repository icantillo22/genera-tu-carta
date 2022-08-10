const validateEmail = ({value, fieldName}) => {
  const output = {
    error: false,
    type: '',
    message: '',
    fieldName,
  }

  // eslint-disable-next-line no-useless-escape
  const validFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);

  if (value.length <= 0) {
    output.error = true
    output.type = 'empty'
    output.message = `El campo "${fieldName}" no puede estar vacio 🤨`
  }

  if(!validFormat) {
    output.error = true
    output.type = 'format-error'
    output.message = `El campo "${fieldName}" no cumple con el formato válido 😅, aquí un ejemplo: ejemplo@generatucarta.com 😎`
  }

  return output
}

export default validateEmail;