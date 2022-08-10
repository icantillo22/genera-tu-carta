import validateText from "./validateText";
import validateEmail from "./validateEmail";
import validatePhone from "./validatePhone";

const validateData = (object) => {        
  for (const key in object) {
    const data = object[key];

    if(data?.validate) {      
      switch (data.type) {
        case 'text': {
          const validation = validateText({value: data.value, fieldName: data.fieldName})

          if (validation.error) return validation;
          break
        }
      
        case 'email': {
          const validation = validateEmail({value: data.value, fieldName: data.fieldName})

          if (validation.error) return validation
          break;
        }

        case 'phone': {
          const validation = validatePhone({value: data.value, fieldName: data.fieldName})

          if (validation.error) return validation
          break;
        }
      }
    }

    if(data.validate == null) {
      return validateData(data);
    }
  }
}

export default validateData;