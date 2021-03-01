import boxes from '../Images/boxes.png'

import React from 'react';

import {BasketContext, DispatchContext} from '../App'

const ConfirmOrder = (props) => {

    const basket = React.useContext(BasketContext)
    const dispatch = React.useContext(DispatchContext)

    // obsługa sosów

    const [tomatoLightSauces, setTomatoLightSauces] = React.useState(0)
    const [tomatoSpicySauces, setTomatoSpicySauces] = React.useState(0)
    const [garlickSauces, setGarlickSauces] = React.useState(0)
    const [midSauces, setMidSauces] = React.useState(0)
    const [olive, setOlive] = React.useState(0)
    const [allSauces, setAllSauces] = React.useState(0)

    const sumup = React.useMemo(() => {
        setAllSauces(tomatoLightSauces + tomatoSpicySauces + garlickSauces + midSauces + olive)
    }, [tomatoLightSauces, tomatoSpicySauces, garlickSauces, midSauces, olive])

    React.useCallback(() => {
        sumup()
    }, [sumup])

    // wyświetlanie danych w podsumowaniu

    const basketPrice = basket.reduce((price, item) => {return item.price + price}, 0)
    const showDeliveryMethod = () => (
        props.deliveryInfo.deliveryMethod === 'delivery' ? `Dostawa pod wskazany adres (+5zł)` : `Odbiór osobisty`
    )

    const handleEditData = () => {
        props.setStep(prevStep => prevStep - 1)
    }

    const displayDetails = (
    <div className="deliveryDetails">
        <i className="fas fa-pencil-alt" title="edytuj dane" onClick={handleEditData}></i>
        <p>Miasto: {props.deliveryInfo.city}</p>
        <p>Ulica: {props.deliveryInfo.street}</p>
        <p>Numer budynku: {props.deliveryInfo.buildingNumber}</p>
        <p>Numer lokalu: {props.deliveryInfo.localNumber}</p>
        <p>Telefon konatkowy: (+48){props.deliveryInfo.phoneNumber}</p>
    </div>
    )

    // obsługa złożenia zamówienia

    const handlePlaceOrder = () => {
        if(basket.length < 1) {
            window.alert('Nie możesz złożyć pustego zamówienia!')
            return props.setStep(1)
        }
        props.setCurrentPizza({
            active: false,
            size: '',
            slices: '',
            halfDifferent: false,
            addons: [],
            addons2: [],
            price: 0,
        })
        dispatch({type: 'order-placed'})
        props.setStep(prevStep => prevStep + 1)
    }

    // doliczanie kwoty za sosy

    const saucesPrice = (x = 0) => {
        if(allSauces > basket.length * 2) {
            return ((allSauces - (basket.length * 2)) * 1.5)
        }
        else return 0
    }

    return (
        <>
        <div className="placeOrder">
            <img src={boxes} alt="pizza" className="summaryBgcImg"></img>
            <div className="choseSauces">
                <h4>Przysługują Ci {basket.length * 2} darmowe sosy. Każdy dodatkowy dolicza 1.5zł do kwoty Twojego zamówienia!</h4>
                <ul className="sauces">
                    <li>
                        <span>Pomidorowy łagodny:</span>
                        <span>
                            <i className="fas fa-minus" onClick={() => {setTomatoLightSauces(prevValue => prevValue - 1)}}></i>
                            {tomatoLightSauces}
                            <i className="fas fa-plus" onClick={() => {setTomatoLightSauces(prevValue => prevValue + 1)}}></i>
                        </span>
                    </li>
                    <li>
                        <span>Pomidorowy ostry:</span>
                        <span>
                            <i className="fas fa-minus" onClick={() => {setTomatoSpicySauces(prevValue => prevValue - 1)}}></i>
                            {tomatoSpicySauces}
                            <i className="fas fa-plus" onClick={() => {setTomatoSpicySauces(prevValue => prevValue + 1)}}></i>
                        </span>
                    </li>
                    <li>
                        <span>Słodko-kwaśny:</span>
                        <span>
                            <i className="fas fa-minus" onClick={() => setMidSauces(prevValue => prevValue - 1)}></i>
                            {midSauces}
                            <i className="fas fa-plus" onClick={() => {setMidSauces(prevValue => prevValue + 1)}}></i>
                        </span>
                    </li>
                    <li>
                        <span>Czosnkowy:</span>
                        <span>
                            <i className="fas fa-minus" onClick={() => setGarlickSauces(prevValue => prevValue - 1)}></i>
                            {garlickSauces}
                            <i className="fas fa-plus" onClick={() => {setGarlickSauces(prevValue => prevValue + 1)}}></i>
                        </span>
                    </li>
                    <li>
                        <span>Oliwa:</span>
                        <span>
                            <i className="fas fa-minus" onClick={() => {setOlive(prevValue => prevValue - 1)}}></i>
                            {olive}
                            <i className="fas fa-plus" onClick={() => {setOlive(prevValue => prevValue + 1)}}></i>
                        </span>
                    </li>
                </ul>
            </div>
            <h1>Podsumowanie: </h1>
            <p>Twoje zamówienie składa się z {basket.length} produktów o łącznej kwocie {basketPrice}zł</p>
            <p>{showDeliveryMethod()}</p>
            {props.deliveryInfo.deliveryMethod === 'delivery' ? displayDetails : null}
            <p>Kwota do zapłaty to {props.deliveryInfo.deliveryMethod === 'delivery' ? basketPrice + saucesPrice() + 5 : basketPrice + saucesPrice()}zł</p>
            {props.deliveryInfo.deliveryMethod === 'delivery' ? <p>Metoda płatności: {props.deliveryInfo.payment}</p> : <p>Hasło odbioru to: {props.deliveryInfo.password}</p>}
            <button className="confirmBtn" onClick={handlePlaceOrder}>Złóż zamówienie</button>
        </div>
        </>
     );
}

export default ConfirmOrder;