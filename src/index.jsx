import { createRoot } from 'react-dom/client';

import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bunde './index.scss'
import './index.scss';

// Main component
const App = () => {
    return <MainView />;
};


// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells react to render your app in the root DOM element
root.render(<App />);
