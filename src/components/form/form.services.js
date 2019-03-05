const generateFee = () => {
    return parseFloat(Math.random() * (0.0002 - 0.0001) + 0.0001).toFixed(4);
}
exports.generateFee = generateFee;

const generateBalance = () => {
    return parseFloat(Math.random() * (30000 - 500) + 500).toFixed(4);
}
exports.generateBalance = generateBalance;

const substractFromBalance = (currentBalance, fee, amount) => {
    const result = parseFloat(parseFloat(currentBalance) - (parseFloat(fee) + parseFloat(amount)).toFixed(4));
    return result;
}
exports.substractFromBalance = substractFromBalance;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

exports.sleep = sleep;