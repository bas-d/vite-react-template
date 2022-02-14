import { useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="center font-mono">
            <header className="bg-zinc-700 min-h-screen flex flex-col items-center justify-center text-white">
                <Logo height="40em" width="40em" className="animate-spin-slow" />
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((count) => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <p>
                    Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a className="underline" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                    {' | '}
                    <a
                        className="underline"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
}

export default App;
