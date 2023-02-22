const CURRENT_DATE = new Date();

const ageValidator = (_: any, v: any) => {
    if (!v) return Promise.resolve()
    return (new Date(v.format("YYYY-MM-DD")) <= new Date(`${CURRENT_DATE.getFullYear() - 16}-${CURRENT_DATE.getMonth() + 1}-${CURRENT_DATE.getDate() + 1
        }`)) ? Promise.resolve()
        : Promise.reject();
}

export default ageValidator;