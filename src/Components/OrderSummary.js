import delivery from '../Images/delivery.png'
import pickUp from '../Images/pickUp.png'

import React from 'react';

const OrderSummary = (props) => {

    const [telNumber, setTelNumber] = React.useState('')
    const [city, setCity] = React.useState('')
    const [street, setStreet] = React.useState('')
    const [buildingNumber, setBuildingNumber] = React.useState('')
    const [localNumber, setLocalNumber] = React.useState('')
    const [paymentMethod, setPaymentMethod] = React.useState('Gotówka')
    const [valiadtionTest, setValidationTest] = React.useState(false)
    const [password, setPassword] = React.useState('')

    // walidacja formularza z danymi do dostawy

    const validate = () => {
        if(telNumber.length === 9 && city.length > 2 && street.length > 2 && buildingNumber && paymentMethod) {setValidationTest(true)}
        else setValidationTest(false)
    }

    React.useEffect(() => {
       validate()
    }, )

    const confirmation = (method, password = '') => {
        props.setDeliveryInfo({
            phoneNumber: telNumber,
            city: city,
            street: street,
            buildingNumber: buildingNumber,
            localNumber: localNumber,
            payment: paymentMethod,
            deliveryMethod: method,
            password: password
        })
        props.setStep(prevStep => prevStep + 1)
    }

    return (
        <section className="orderSummary">
            <h2 className="deliveryInfo">Średni czas oczekiwania na zamówienie to 50 minut!</h2>
            <div className="delivery">
                <img src={delivery} alt="delivery-icon"></img>
                <p>Koszt dostawy: 5zł</p>
                <form>
                    <input type="number" placeholder="Twój numer telefonu" value={telNumber} onChange={(e) => {
                        setTelNumber(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Miasto" value={city} onChange={(e) => {
                        setCity(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Ulica" value={street} onChange={(e) => {
                        setStreet(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Numer budynku" value={buildingNumber} onChange={(e) => {
                        setBuildingNumber(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Numer lokalu" value={localNumber} onChange={(e) => {
                        setLocalNumber(e.target.value)
                    }}></input>
                    <select id="payment" value={paymentMethod} onChange={(e) => {
                        setPaymentMethod(e.target.value)
                    }}>
                        <option value="Gotówka">Gotówka</option>
                        <option value="Karta">Karta</option>
                    </select>
                    <button className="confirmBtn" onClick={(e) => {
                        e.preventDefault()
                        setTimeout(()=> {
                            if(valiadtionTest) {
                                confirmation('delivery')
                            }
                            else return window.alert('Twoje dane do odbioru są niepoprawne!')
                        })
                        }}>Potwierdź</button>
                </form>
            </div>
            <div className="noDelivery">
                <img src={pickUp} alt="noDelivery-icon"></img>
                <p><i className="fas fa-map-marker-alt"></i><span className="aboutINFO">Piłsudskiego 15, Pabianice 95-200</span></p>
                <input type="text" placeholder="Hasło odbioru" className="nameInput" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}></input>
                <button className="confirmBtn" onClick={() => {
                    if(password.length > 2) return confirmation('noDelivery', password)
                    else return window.alert('Hasło odbioru powinno mieć conajmniej 3 litery!')
                }}>Odbiorę osobiście</button>
            </div>
        </section>
     );
}

export default OrderSummary;