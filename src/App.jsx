import { useCalculator } from './stores/calculator';

export default function App() {
    const calculator = useCalculator();
    return (
        <div class="container">
            <h1 class="title">🧮 Aba-Calc! 🧮</h1>
            <div class="calc-container">
                <div class="results-display">
                    <div class="results-text">Results Here</div>
                </div>
                <div class="calc-body">
                    <div class="num-body">
                        <div class="top-row">
                            <button id="7">7</button>
                            <button id="8">8</button>
                            <button id="9">9</button>
                        </div>
                        <div class="middle-row">
                            <button id="4">4</button>
                            <button id="5">5</button>
                            <button id="6">6</button>
                        </div>
                        <div class="bottom-row">
                            <button id="1">1</button>
                            <button id="2">2</button>
                            <button id="3">3</button>
                        </div>
                        <div class="zero-row">
                            <button id="0">0</button>
                        </div>
                    </div>
                    <div class="operator-container">
                        <button id="backspace">&#9003;</button>
                        <button onClick={calculator.clearCalc()}>C</button>
                        <button id="add">&plus;</button>
                        <button id="subtract">&minus;</button>
                        <button id="multiply">&times;</button>
                        <button id="divide">&divide;</button>
                        <button id="equals">&equals;</button>
                        <button id="decimal">.</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
