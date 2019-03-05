const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
exports.sleep = sleep;

const generateFee = () => {
    return parseFloat(Math.random() * (0.0002 - 0.0001) + 0.0001).toFixed(4);
}
exports.generateFee = generateFee;

const generateBalance = () => {
    return parseFloat(Math.random() * (30000 - 500) + 500).toFixed(4);
}
exports.generateBalance = generateBalance;

const validateBalance = (currentBalance, fee, amount) => {
    const result = (parseFloat(parseFloat(currentBalance) - (parseFloat(fee) + parseFloat(amount)).toFixed(4)) >= 0) ? true : false;
    return result;
}
exports.validateBalance = validateBalance;

const substractFromBalance = (currentBalance, fee, amount) => {
    const result = parseFloat(parseFloat(currentBalance) - (parseFloat(fee) + parseFloat(amount)).toFixed(4));
    return result;
}
exports.substractFromBalance = substractFromBalance;

const fakeRequest = () => {

    const randomRequestResult = Math.floor(Math.random() * 3)

    const results = [{
            isValid: true,
            errors: ['']
        },
        {
            isValid: false,
            errors: [
                'Direccion de la billetera invalida'
            ]
        },
        {
            isValid: false,
            errors: [
                'Error en la transacción'
            ]
        },
        {
            isValid: false,
            errors: [
                'Tiempo de respuesta excedido'
            ]
        }
    ]

    return results[randomRequestResult]
}
exports.fakeRequest = fakeRequest;