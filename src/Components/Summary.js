import React from 'react';

import pizzaWithAddons from '../Images/pizzaWithAddons.png'
import filledbox from '../Images/filledBox.png'

import {DispatchContext} from '../App'

const Summary = (props) => {

    const dispatch = React.useContext(DispatchContext)

    // dodawanie do koszyka

    const handleAddToBasket = () => {
        dispatch({type: 'add-to-basket', payload: {size: props.currentPizza.size, slices: props.currentPizza.slices, addons: props.currentPizza.addons, addons2: props.currentPizza.addons2, halfDifferent: props.currentPizza.halfDifferent, price: props.currentPizza.price}})
        props.setCurrentPizza({
            active: false,
            size: '',
            slices: '',
            halfDifferent: false,
            addons: [],
            addons2: [],
            price: 0,
        })
        props.setPickedAddons([])
        props.setPickedAddons2([])
        props.addonsArray.forEach(item => {
            item.picked1 = false
            item.picked2 = false
        })
        props.setStep(prevStep => prevStep + 1)
    }

    // wyświetlanie składników w koszyku

    const displayAddons =  props.currentPizza.addons.map(addon => { return addon.name })
    const displayAddons2 = props.currentPizza.addons2.map(addon => { return addon.name })


    return (
        <section className="pizzaSummary">
            <img src={pizzaWithAddons} alt="pizza" className="summaryImg"></img>
            <h3>Podsumowanie Twojej pizzy:</h3>
            <p>Rozmiar: {props.currentPizza.size}cm</p>
            <p>Pokroimy ją na {props.currentPizza.slices} kawałków</p>
            <p>
                <span>
                    {props.currentPizza.halfDifferent ? "Składniki na pierwszej połowie to: " : "składniki Twojej pizzy to: "}
                </span>
                {props.currentPizza.addons.length > 0 ? displayAddons.join(", ") : "podstawowa mozzarella" }
            </p>
            <p>
                <span>
                    {props.currentPizza.halfDifferent ? "Składniki na drugiej połowie to: " : null}
                </span>{ props.currentPizza.halfDifferent ? displayAddons2.join(", ") : null}
            </p>
            <p>Cena Twojej pizzy to: {props.currentPizza.price}zł</p>
            <button className="summaryBtn" onClick={handleAddToBasket}>
                <img src={filledbox} alt="addToBasketBtn"></img>
                <p>Zgadza się, zapakuj do pudełka!</p>
            </button>
            <p className="summaryPrompt">Jeśli chcesz coś zmienić w tej pizzy, możesz się cofnąć do dowolnego etapu używając strzałek na górze!</p>
        </section>
     );
}

export default Summary;