const validateText = ({value, fieldName}) => {
  const output = {
    error: false,
    type: '',
    message: '',
    fieldName,
  }

  if (value.length <= 0) {
    output.error = true
    output.type = 'empty'
    output.message = `El campo "${fieldName}" no puede estar vacio 🤨`
  }

  return output
}

export default validateText;