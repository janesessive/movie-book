export const validateField = (name, value)=> {
    const validateFirstName=(value)=> {
        if (!value) return "required";
        if (value.length<=2) return "too short"
        if (value.length>=20) return "too long"
        return "";
      }

      const validateLastName=(value)=> {
        if (!value) return "required";
        if (value.length<=2) return "too short"
        if (value.length>=20) return "too long"
        return "";
      }
    switch (name) {
        case 'firstName':
            return validateFirstName(value)
        case 'lastName':
            return validateLastName(value)
        default:
            return ''
    }
}