import { createEffect, createSignal } from 'solid-js';
import operate from '../functions/operate';
import concatenateNumber from '../functions/concatenateNumber';

export default function Calculator() {
    const [currentNum, setCurrentNum] = createSignal(null);
    const [previousNum, setPreviousNum] = createSignal(null);
    const [operatorSelected, setOperatorSelected] = createSignal(null);
    const [displayText, setDisplayText] = createSignal(0);
    const [newEntry, setNewEntry] = createSignal(true);

    createEffect(() => {
        if (currentNum() != null) setDisplayText(currentNum());
    });

    const clear = () => {
        setCurrentNum(null);
        setPreviousNum(null);
        setOperatorSelected(null);
        setDisplayText(0);
    };

    const handleNumberPress = (num) => {
        if (newEntry()) {
            setCurrentNum(num);
            setNewEntry(false);
        } else {
            if (!operatorSelected()) {
                setCurrentNum(concatenateNumber(currentNum(), num));
            } else {
                if (!previousNum()) {
                    setPreviousNum(currentNum());
                }
                setCurrentNum(concatenateNumber(currentNum(), num));
            }
        }
    };

    const handleOperatorPress = (operator) => {
        if (currentNum == null) return;
        switch (operator) {
            case 'decimal':
                handleDecimal(currentNum, setCurrentNum);
                break;
            case 'equals':
                handleEquals();
                break;
            case 'clear':
                clear();
                break;
            case 'backspace':
                handleBackspace();
                break;
            default:
                handleOperation(operator);
                break;
        }
    };

    function handleOperation(operator) {
        if (operator) {
            if (operatorSelected() && !previousNum()) {
                setOperatorSelected(operator);
            } else if (operatorSelected() && previousNum()) {
                setOperatorSelected(operator);
                setCurrentNum(operate(operatorSelected(), previousNum(), currentNum()));
                setPreviousNum(currentNum());
            } else {
                setPreviousNum(currentNum());
                setOperatorSelected(operator);
            }
            setNewEntry(true);
        }
    }

    function handleBackspace() {
        let currentNumString = Number.parseFloat(currentNum().toString().slice(0, -1));
        if (!currentNumString || newEntry()) setCurrentNum(0);
        else setCurrentNum(Number.parseFloat(currentNumString));
    }

    function handleDecimal() {
        if (currentNum() == null) {
            setCurrentNum('0.');
        } else if (!currentNum().toString().includes('.')) {
            setCurrentNum(currentNum() + '.');
        }
    }

    function handleEquals() {
        if (previousNum() !== null && currentNum() !== null && operatorSelected() !== null) {
            setCurrentNum(
                operate(
                    operatorSelected(),
                    Number.parseFloat(previousNum()),
                    Number.parseFloat(currentNum())
                )
            );
            setOperatorSelected(null);
            setPreviousNum(null);
            setNewEntry(true);
        }
    }

    return {
        clear,
        handleNumberPress,
        handleOperatorPress,
        displayText,
    };
}
