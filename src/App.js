import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Calendar } from './features/calendar/Calendar';
// import { Counter } from './extras/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        <Calendar />
      </header>
    </div>
  );
}

export default App;
