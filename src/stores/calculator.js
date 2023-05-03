import { createEffect, createSignal, onCleanup } from 'solid-js';
import operate from '../functions/operate';

export default function Calculator() {
    const [currentNum, setCurrentNum] = createSignal(null);
    const [previousNum, setPreviousNum] = createSignal(null);
    const [operatorSelected, setOperatorSelected] = createSignal(null);
    const [displayText, setDisplayText] = createSignal('Results Here');

    createEffect(() => {
        operatorSelected
            ? setDisplayText(`${currentNum()} ${operatorSelected()}`)
            : setDisplayText(currentNum());
    });

    const clear = () => {
        setCurrentNum(null);
        setPreviousNum(null);
        setOperatorSelected(null);
        setDisplayText('Results Here');
    };

    const handleNumberPress = (num) => {
        if (currentNum() == null) setCurrentNum(num);
        else if (currentNum() !== null && operatorSelected() == null) {
            setCurrentNum(currentNum() * 10 + num);
        } else {
            setPreviousNum(currentNum());
            setCurrentNum(num);
        }
    };

    const handleOperatorPress = (operator) => {
        if (operatorSelected() == null) {
            if (currentNum() == null) return;
            if (operatorSelected() != null && previousNum() == null) setOperatorSelected(operator);
            else setCurrentNum(operate(operator, previousNum(), currentNum()));
        }
        setOperatorSelected(operator);
    };

    return {
        clear,
        handleNumberPress,
        handleOperatorPress,
    };
}
