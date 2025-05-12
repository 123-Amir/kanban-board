import Sidebar from './components/Sidebar';
import Board from './components/Board';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Board />
      </main>
    </div>
  );
}

