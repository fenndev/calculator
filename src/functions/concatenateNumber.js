export default function concatenateNumber(current, newDigit) {
    if (!current.toString().includes('.')) return current * 10 + Number.parseFloat(newDigit);
    else return current + newDigit;
}
