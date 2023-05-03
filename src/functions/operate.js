export default function operate(operator, firstNum, secondNum) {
    let result;
    switch (operator.toLowerCase()) {
        case 'add':
            result = firstNum + secondNum;
            break;
        case 'subtract':
            result = firstNum - secondNum;
            break;
        case 'multiply':
            result = firstNum * secondNum;
            break;
        case 'divide':
            result = secondNum === 0 ? null : firstNum / secondNum;
            break;
        default:
            result = NaN;
            break;
    }
    return result;
}
