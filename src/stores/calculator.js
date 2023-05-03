import { createEffect, createSignal, onCleanup } from 'solid-js';
import operate from '../functions/operate';
import getOperatorSymbol from '../functions/getOperatorSymbol';

export default function Calculator() {
    const [currentNum, setCurrentNum] = createSignal(null);
    const [previousNum, setPreviousNum] = createSignal(null);
    const [operatorSelected, setOperatorSelected] = createSignal(null);
    const [displayText, setDisplayText] = createSignal(0);

    createEffect(() => {
        if (currentNum() != null) setDisplayText(currentNum());
    });

    const clear = () => {
        setCurrentNum(null);
        setPreviousNum(null);
        setOperatorSelected(null);
        setDisplayText(0);
        console.log('I ran!~');
    };

    const handleNumberPress = (num) => {
        if (currentNum() == null) setCurrentNum(num);
        else if (currentNum() !== null && operatorSelected() == null) {
            let newNum = currentNum() * 10 + Number.parseFloat(num);
            setCurrentNum(newNum);
        } else {
            setPreviousNum(currentNum());
            setCurrentNum(num);
            console.log(previousNum());
            console.log(currentNum());
        }
    };

    const handleOperatorPress = (operator) => {
        if (currentNum == null) return;
        switch (operator) {
            case 'decimal':
                if (currentNum() == null) {
                    setCurrentNum('0.');
                } else if (!currentNum().toString().includes('.')) {
                    setCurrentNum(currentNum() + '.');
                }
                break;
            case 'equals':
                if (
                    previousNum() !== null &&
                    currentNum() !== null &&
                    operatorSelected() !== null
                ) {
                    setCurrentNum(
                        operate(
                            operatorSelected(),
                            Number.parseFloat(previousNum()),
                            Number.parseFloat(currentNum())
                        )
                    );
                    setOperatorSelected(null);
                    setPreviousNum(null);
                }
                break;
            case 'clear':
                clear();
                break;
            case 'backspace':
                // Implement backspace functionality if needed
                break;
            default:
                if (operator) {
                    if (operatorSelected() && !previousNum()) setOperatorSelected(operator);
                    else if (operatorSelected() && previousNum()) {
                        setOperatorSelected(operator);
                        setCurrentNum(operate(operatorSelected(), previousNum(), currentNum()));
                        setPreviousNum(currentNum());
                    } else {
                        setPreviousNum(currentNum());
                        setOperatorSelected(operator);
                    }
                }
                break;
        }
    };

    return {
        clear,
        handleNumberPress,
        handleOperatorPress,
        displayText,
    };
}
