import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import './App.css';

function App() {
  const content = useRoutes(router);

  return (
    <div className="app">
      {content}
    </div>
  );
}

export default App;
