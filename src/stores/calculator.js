import { createEffect, createSignal, onCleanup } from 'solid-js';

export function useCalculator() {
    const [displayText, setDisplayText] = createSignal('Results Here');
    const [currentNum, setCurrentNum] = createSignal(0);
    const [storedNum, setStoredNum] = createSignal(null);
    const [operatorSelected, setOperatorSelected] = createSignal(null);
    // TODO: Rename isNewNumber variables
    const [isNewNumber, setIsNewNumber] = createSignal(true);

    // Clear Calculator function
    function clearCalc() {
        setDisplayText('Results Here');
        setCurrentNum(0);
        setStoredNum(null);
        setOperatorSelected(null);
        setIsNewNumber(true);
    }

    /* This function checks whether the number clicked is the first number button that has been pressed, and if so,
    sets it as the current number and changes `setIsNewNumber` to false.
    If not, it sets the current num to equal 10x the previous number + the new number, effectively concatenating it.
    */
    function handleNumberClick(num) {
        if (isNewNumber()) {
            setCurrentNum(num);
            setIsNewNumber(false);
        } else {
            setCurrentNum((prev) => prev * 10 + num);
        }
        setDisplayText(currentNum());
    }

    function handleOperatorClick(operator) {
        if (isNewNumber()) return;
        if (storedNum() === null) {
            setStoredNum(currentNum());
        } else if (operatorSelected()) {
            const result = operate(operatorSelected(), storedNum(), currentNum());
            setStoredNum(result);
            setDisplayText(result);
        }

        if (operator === 'clear') {
            clearCalc();
        } else {
            setOperatorSelected(operator);
            setIsNewNumber(true);
        }
    }

    function performCalculation() {
        if (!storedNum1() && !storedNum2()) return;

        if (storedNum1()) {
            if (storedNum2()) {
                const result = operate(operatorSelected(), +storedNum1(), +storedNum2());
                if (result === null) {
                    alert("Can't divide by zero! What were you thinking?!");
                    clearCalc();
                    return;
                }
                setStoredNum1(result.toString());
                setDisplayText(result.toString());
                setCurrentNum('');
                setStoredNum2('');
                setOperatorSelected('');
            } else if (currentNum()) {
                setStoredNum2(currentNum());
                const result = operate(operatorSelected(), +storedNum1(), +storedNum2());
                if (result === null) {
                    alert("Can't divide by zero! What were you thinking?!");
                    clearCalc();
                    return;
                }
                setStoredNum1(result.toString());
                setDisplayText(result.toString());
                setCurrentNum('');
                setStoredNum2('');
                setOperatorSelected('');
            } else {
                return;
            }
        }
    }

    // ... All your other functions here ...

    return {
        displayText,
        currentNum,
        storedNum,
        operatorSelected,
        clearCalc,
        handleNumberClick,
        handleOperatorClick,
    };
}
