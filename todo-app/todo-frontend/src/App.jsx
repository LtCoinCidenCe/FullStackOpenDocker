import './App.css';
import TodoView from './Todos/TodoView'

function App() {
  return (
    <div className="App">
      <div>docker run -p 5173:5173 -it -v "$(pwd):/usr/src/app/" hello-front-dev</div>
      <div>This works weirdly with an interactive window of containerized vite.</div>
      <div>This is the vite version of Todos.</div>
      <div>Aha good tutorial to get this working from https://patrickdesjardins.com/blog/docker-vitejs-hot-reload</div>
      <TodoView />
    </div>
  );
}

export default App;
