import Calculator from './stores/calculator';
import getOperatorSymbol from './functions/getOperatorSymbol';

export default function App() {
    const calculator = Calculator();
    return (
        <>
            <header class="title">
                <h1>🧮 Aba-Calc! 🧮</h1>
            </header>
            <div class="calc">
                <div class="calc__result">
                    <p class="calc__result-text">{calculator.displayText()}</p>
                </div>
                <div class="calc__body">
                    <div class="calc__nums">
                        {/* 
                         Loops over the numbers 1-9, separating every 3 numbers into
                         a separate array and returning the result as an array of arrays.
                         Ultimately creates 3 divs with the calss `calc__num-btns` that contain
                         3 number buttons each.
                        */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9]
                            .reduce((numGroup, num, index) => {
                                if (index % 3 === 0) {
                                    numGroup.push([]);
                                }
                                numGroup[numGroup.length - 1].push(
                                    <button
                                        data-value={num}
                                        onClick={() =>
                                            calculator.handleNumberPress(event.target.dataset.value)
                                        }>
                                        {num}
                                    </button>
                                );
                                return numGroup;
                            }, [])
                            .map((numGroup) => (
                                <div class="calc__nums-btns">{numGroup}</div>
                            ))}
                        <div class="calc__zero-btn">
                            <button data-value="0">0</button>
                        </div>
                    </div>

                    <div class="calc__operators">
                        {[
                            'backspace',
                            'clear',
                            'add',
                            'subtract',
                            'multiply',
                            'divide',
                            'equals',
                            'decimal',
                        ].map((operator) => {
                            return (
                                <button
                                    data-operator={operator}
                                    onClick={() =>
                                        calculator.handleOperatorPress(
                                            event.target.dataset.operator
                                        )
                                    }>
                                    {getOperatorSymbol(operator)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2023 fenndev. All rights reserved.</p>
            </footer>
        </>
    );
}
