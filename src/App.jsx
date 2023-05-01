import { useCalculator } from './stores/calculator';

export default function App() {
    const calculator = useCalculator();
    return (
        <>
            <header class="title">
                <h1>🧮 Aba-Calc! 🧮</h1>
            </header>
            <div class="calc">
                <div class="calc__result">
                    <p class="calc__result-text">Results Here</p>
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
                                    <button key={num} data-value={num}>
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
                        <button data-operator="backspace">&#9003;</button>
                        <button data-operator="clear" onClick={calculator.clearCalc()}>
                            C
                        </button>
                        <button data-operator="add">&plus;</button>
                        <button data-operator="subtract">&minus;</button>
                        <button data-operator="multiply">&times;</button>
                        <button data-operator="divide">&divide;</button>
                        <button data-operator="equals">&equals;</button>
                        <button data-operator="decimal">.</button>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2023 fenndev. All rights reserved.</p>
            </footer>
        </>
    );
}
