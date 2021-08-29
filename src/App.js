import './App.css';
import { useReducer } from 'react';
import { InventoryList, InventoryForm } from './components';
import { initialState, inventoryReducer, InventoryContext, InventoryDispatchContext } from './store';
function App() {
  const [state, dispatch] = useReducer(inventoryReducer, initialState)
  return (
    <InventoryContext.Provider value={state}>
      <InventoryDispatchContext.Provider value={dispatch}>
        <div className="container">
          <div className="container__form">
            <InventoryForm />
          </div>
          <div className="container__list">
            <InventoryList />
          </div>
        </div>
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
}

export default App;
