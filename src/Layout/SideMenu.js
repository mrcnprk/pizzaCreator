import emptyBox from '../Images/emptyBox.png'
import filledBox from '../Images/filledBox.png'
import pizzaSize from '../Images/pizzaSize.png'
import pizzaWithAddons from '../Images/pizzaWithAddons.png'

import React from 'react';

import {CurrentPizzaContext, BasketContext, SetCurrentPizzaContext, DispatchContext, DeletePromptContext, SetDeletePromptContext, SetEditModeContext} from '../App'

const SideMenu = () => {

    const currentPizza = React.useContext(CurrentPizzaContext)
    const setCurrentPizza = React.useContext(SetCurrentPizzaContext)
    const basket = React.useContext(BasketContext)
    const dispatch = React.useContext(DispatchContext)
    const isDeletePromptActive = React.useContext(DeletePromptContext)
    const setDeletePrompt = React.useContext(SetDeletePromptContext)
    const setEditMode = React.useContext(SetEditModeContext)

    // koszyk

    const [isBasketActive, setIsBasketActive] = React.useState(true)
    const openBasket = () => {
        setIsBasketActive(prev => !prev)
    }

    const handleDelete = (id) => {
        dispatch({type: 'delete-from-basket', payload: id})
        setCurrentPizza({active: false,
            size: '',
            slices: '',
            halfDifferent: false,
            addons: [],
            addons2: [],
            price: 0,
        })
    }

    const handleEdit2 = (id) => {
        dispatch({type: 'edit-pizza', payload: id})
    }

    const openEdit = (id) => {
        if(currentPizza.active) return window.alert("Aby edytować stworzoną pizze najpierw musisz zakończyć tworzenie obecnej pizzy!")
        else if (!currentPizza.active) return handleEdit2(id)
    }

    const displayBasketItems = basket.map(item => (
        <div key={item.id} className="itemInBasket">
            <img src={pizzaWithAddons} alt="currentItem"></img>
            <section className="itemInBasketInfo">
                <p>Rozmiar: {item.size}cm</p>
                <p>Kawałki: {item.slices}</p>
                <p>Pół na pół: {item.halfDifferent ? "Tak" : "Nie"}</p>
                <p>Dodatki: {item.addons.length > 0 ? item.addons.map(addon => addon.name).join(', ') : "podstawowa mozzarella"}</p>
                <p>{item.addons2.length > 0 ? "Dodatki na drugiej połowie: " : null}<span>{item.addons2.length > 0 ? item.addons2.map(addon => addon.name).join(', ') : null}</span></p>
                <p>Cena: {item.price}zł</p>
            </section>
            <div className="itemOptions">
            <i className="fas fa-times" onClick={() => handleDelete(item.id)} title="Usuń tą pizze"></i>
            <i className="fas fa-pencil-alt" onClick={() => openEdit(item.id)} title="Edytuj tą pizze"></i>
            </div>
        </div>
        ))


    const basketSummary = () => (
                <div className="basketTopBar">
                    <img src={basket.length ? filledBox : emptyBox} alt='emptybasket'></img>
                    <p className="basketTitle">
                        <span>
                            {basket.length ? `Twoje pudełko:` : `Twoje pudełko jest puste`}
                        </span>
                        <span>
                            {basket.length ? `Pizze: ${basket.length}szt. - ${basket.reduce((price, item) => item.price + price, 0)}zł` : null }
                        </span>
                    </p>
                    {basket.length ? <button className="basketBtn" onClick={openBasket}><i className={!isBasketActive ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i></button> : null }
                </div>
    )

    // obsługa aktualnej pizzy

    const handleStart = () => {
        setCurrentPizza({...currentPizza, active: true})
        }

    const prompt = () => (
            <div className="currentPizzaDelete">
                <p>Czy chcesz porzucić aktualnie tworzoną pizze?</p>
                <button onClick={handleDeleteCurrentPizza}>Tak</button>
                <button onClick={setDeletePrompt}>Nie</button>
            </div>
        )

    const handleDeleteCurrentPizza = () => {
        setCurrentPizza({
            active: false,
            size: '',
            slices: '',
            halfDifferent: false,
            addons: [],
            addons2: [],
            price: 0,
        })
        setDeletePrompt()
        setEditMode(false)
    }


    const currentPizzaBox = () => {
        if(currentPizza.active) {
            return (
            <div className="currentPizza">
                <i className="fas fa-times" onClick={setDeletePrompt} title="Usuń tą pizze"></i>
                <img src={!currentPizza.addons.length > 0 ? pizzaSize : pizzaWithAddons} alt="currentItem" className="currentPizzaImg"></img>
                <section className='currentSummary'>
                    <h3>Aktualna Pizza:</h3>
                    <p>Rozmiar: {currentPizza.size}cm</p>
                    <p>Kawałki: {currentPizza.slices}</p>
                    <p>Pół na pół: {currentPizza.halfDifferent ? "Tak" : "Nie"}</p>
                    <p>Dodatki: { currentPizza.addons.length > 0 ? currentPizza.addons.map(addon => addon.name).join(', ') : null }</p>
                    {currentPizza.addons2.length > 0 ? <p>Dodatki na drugiej połowie: {displaySecondAddons()}</p> : null}
                    <p>Cena: {currentPizza.price}zł</p>
                </section>
            </div>
            )}
            else return (
                <div className="createCurrentPizza" onClick={handleStart}>
                    <img src={pizzaSize} alt="pizzaIMG" className="currentPizzaImg"></img>
                    <p>Stwórz nową pizze!</p>
                </div>
            )
    }

    const displaySecondAddons = () => {
        if(currentPizza.addons2 === []) return null
        else if (currentPizza.addons2 !== []) return currentPizza.addons2.map(addon => addon.name).join(', ')
    }

    return (
        <section className="sidePanelFeatures">
            <div className={isBasketActive ? "basket opened" : "basket"}>
                {basketSummary()}
                {displayBasketItems}
            </div>
            {isDeletePromptActive ? prompt() : currentPizzaBox()}
        </section>
     );
}

export default SideMenu;