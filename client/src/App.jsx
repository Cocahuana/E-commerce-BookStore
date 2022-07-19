import { useState } from 'react';
import './App.css';
import { Button } from '@chakra-ui/react';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</Button>
			<p>
				Edit <code>src/App.jsx</code> and save to test HMR
			</p>

			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}

export default App;
