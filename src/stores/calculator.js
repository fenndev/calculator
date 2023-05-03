import { createEffect, createSignal, onCleanup } from 'solid-js';
import operate from '../functions/operate';
import getOperatorSymbol from '../functions/getOperatorSymbol';
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
                let currentNumString = Number.parseFloat(currentNum().toString().slice(0, -1));
                if (!currentNumString) setCurrentNum(0);
                else setCurrentNum(Number.parseFloat(currentNumString));
                break;
            default:
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
