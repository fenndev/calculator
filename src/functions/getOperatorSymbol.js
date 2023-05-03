export default function getOperatorSymbol(operator) {
    switch (operator) {
        case 'backspace':
            return '\u2190'; // left arrow symbol
        case 'clear':
            return 'C';
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '\u00D7'; // multiplication symbol
        case 'divide':
            return '\u00F7'; // division symbol
        case 'equals':
            return '=';
        case 'decimal':
            return '.';
        default:
            return '';
    }
}
