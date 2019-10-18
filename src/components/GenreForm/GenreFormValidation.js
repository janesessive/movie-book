export const validateField = (name, value)=> {
    const validateGenre=(value)=> {
        if (!value) return "required";
        if (value.length<2) return "too short"
        if (value.length>=20) return "too long"
        return "";
      }
    switch (name) {
        case 'genre':
            return validateGenre(value)
        default:
            return ''
    }
}