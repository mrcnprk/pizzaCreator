import './App.css';

import Header from './Layout/Header'
import SideMenu from './Layout/SideMenu'
import PizzaCreator from './Layout/PizzaCreator'
import Footer from './Layout/Footer'

import React from 'react';

export const DispatchContext = React.createContext();
export const BasketContext = React.createContext();
export const CurrentPizzaContext = React.createContext();
export const SetCurrentPizzaContext = React.createContext();
export const DeletePromptContext = React.createContext();
export const SetDeletePromptContext = React.createContext();
export const EditModeContext = React.createContext();
export const SetEditModeContext = React.createContext();

function App() {

   // tryb edycji

   const [editMode, setEditMode] = React.useState(false)

  // aktualna pizza

  const [currentPizza, setCurrentPizza] = React.useState({
    active: false,
    size: '',
    slices: '',
    halfDifferent: false,
    addons: [],
    addons2: [],
    price: 0,
  })

  // obsługa koszyka ->

  const newItem = (size, slices, addons, addons2 , halfDifferent, price) => {
    if(halfDifferent) {
      return {
        id: Date.now(),
        size: size,
        slices: slices,
        halfDifferent: halfDifferent,
        addons: addons,
        addons2: addons2,
        price: price
      }
    }
    return {
      id: Date.now(),
      size: size,
      slices: slices,
      halfDifferent: halfDifferent,
      addons: addons,
      addons2: [],
      price: price,
    }
  }

  const reducer = (basket, action) => {
    switch(action.type) {
      case 'add-to-basket':
        setEditMode(false)
        return [...basket, newItem(action.payload.size, action.payload.slices, action.payload.addons, action.payload.addons2, action.payload.halfDifferent, action.payload.price)]
      case 'delete-from-basket':
        return basket.filter(item => item.id !== action.payload)
      case 'order-placed':
        return basket = []
      case 'edit-pizza':
        setEditMode(true)
        basket.forEach(item => {
          if (item.id === action.payload) {
            setCurrentPizza({
              active: true,
              id: item.id,
              size: item.sieze,
              slices: item.slices,
              halfDifferent: item.halfDifferent,
              addons: item.addons,
              addons2: item.addons2,
              price: item.price
            })
          }
        })
        return basket.filter(item => item.id !== action.payload)
        default: window.alert('błąd koszyka')
    }
  }

  const [basket, dispatch] = React.useReducer(reducer, [])

  // obłsuga usuwania obecnej pizzy ->

  const [isDeletePromptActive, setIsDeletePromptActive] = React.useState(false)
  const displayDeletePrompt = () => {
    setIsDeletePromptActive(prevState => !prevState)
  }

  return (
    <div className="App">
      <header className="pageHeader">
        <Header />
      </header>
      <main className='mainSection'>
        <CurrentPizzaContext.Provider value={currentPizza}>
          <SetCurrentPizzaContext.Provider value={setCurrentPizza}>
            <DispatchContext.Provider value={dispatch}>
              <BasketContext.Provider value={basket}>
                <DeletePromptContext.Provider value={isDeletePromptActive}>
                  <SetDeletePromptContext.Provider value={displayDeletePrompt}>
                    <EditModeContext.Provider value={editMode}>
                      <SetEditModeContext.Provider value={setEditMode}>
                        <aside className='sidePanel'>
                          <SideMenu/>
                          <Footer />
                        </aside>
                        <section className='appSection'>
                          <PizzaCreator/>
                        </section>
                      </SetEditModeContext.Provider>
                    </EditModeContext.Provider>
                  </SetDeletePromptContext.Provider>
                </DeletePromptContext.Provider>
              </BasketContext.Provider>
            </DispatchContext.Provider>
          </SetCurrentPizzaContext.Provider>
        </CurrentPizzaContext.Provider>
      </main>
    </div>
  );
}

export default App;