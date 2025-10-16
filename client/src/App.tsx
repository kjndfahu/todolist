import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TodoBlock } from "./components/todo-block";

function App() {
  return (
    <Provider store={store}>
      <div className="flex items-center justify-center">
        <TodoBlock />
      </div>
    </Provider>
  );
}

export default App;
