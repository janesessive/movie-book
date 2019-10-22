export const validateField = (name, value)=> {
    const validateTitle=(value)=> {
        if (!value) return "required";
        if (value.length<2) return "too short"
        if (value.length>=60) return "too long"
        return "";
      }

      const validateYear=(value)=> {
        if (!value) return "required";
        const year = parseFloat(value);
        if (!year || isNaN(year)) return "invalid format";
        if (year<1900||year>2070) return "out of range";
        return "";
      }

      
    switch (name) {
        case 'title':
            return validateTitle(value)
        case 'year':
            return validateYear(value)
        default:
            return ''
    }
}