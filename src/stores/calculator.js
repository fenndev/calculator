import { createEffect, createSignal, onCleanup } from 'solid-js';
import operate from '../functions/operate';
import getOperatorSymbol from '../functions/getOperatorSymbol';

export default function Calculator() {
    const [currentNum, setCurrentNum] = createSignal(null);
    const [previousNum, setPreviousNum] = createSignal(null);
    const [operatorSelected, setOperatorSelected] = createSignal(null);
    const [displayText, setDisplayText] = createSignal(0);

    createEffect(() => {
        if (currentNum() !== null && operatorSelected() !== null) {
            setDisplayText(`${currentNum()} ${getOperatorSymbol(operatorSelected())}`);
        } else {
            setDisplayText(currentNum() ?? 0);
        }
    });

    const clear = () => {
        setCurrentNum(null);
        setPreviousNum(null);
        setOperatorSelected(null);
        setDisplayText(0);
    };

    const handleNumberPress = (num) => {
        if (currentNum() == null) setCurrentNum(num);
        else if (currentNum() !== null && operatorSelected() == null) {
            let newNum = currentNum() * 10 + Number.parseFloat(num);
            setCurrentNum(newNum);
        } else {
            setPreviousNum(currentNum());
            setCurrentNum(num);
            setOperatorSelected(null);
        }
    };

    const handleOperatorPress = (operator) => {
        if (operatorSelected() == null) {
            if (currentNum() == null) return;
            if (operatorSelected() != null && previousNum() == null) setOperatorSelected(operator);
            else {
                setCurrentNum(operate(operator, previousNum(), currentNum()));
                setOperatorSelected(operator);
            }
        }
    };

    return {
        clear,
        handleNumberPress,
        handleOperatorPress,
        displayText,
    };
}
