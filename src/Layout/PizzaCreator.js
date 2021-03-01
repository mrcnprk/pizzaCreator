import React from 'react';
import HelloScreen from '../Components/HelloScreen'
import Size from '../Components/Size'
import Slices from '../Components/Slices'
import Halfs from '../Components/Halfs'
import Addons from '../Components/Addons'
import Summary from '../Components/Summary'
import SecondHalfAddons from '../Components/SecondHalfAddons'
import WhatNext from '../Components/WhatNext'
import OrderSummary from '../Components/OrderSummary';
import ConfirmOrder from '../Components/ConfirmOrder';
import ThanksForYourOrder from '../Components/ThanksForYourOrder'

import { CurrentPizzaContext, SetCurrentPizzaContext, EditModeContext} from '../App'

// dane

const stepTitles = [{
    step: 1,
    title: "Wybierz rozmiar pizzy klikając na nią",
},{
    step: 2,
    title: "Wybierz ilość kawałków"
},{
    step: 3,
    title: "Czy chcesz dwie różne połówki?"
},{
    step: 4,
    title: "Wybierz składniki"
},{
    step: 5,
    title: "Wybierz składniki"
},{
    step: 6,
    title: "Sprawdź czy wszystko się zgadza"
},{
    step: 7,
    title: "Czy chcesz skomponować następną pizze?"
},{
    step: 8,
    title: "Wybierz sposób dostawy"
},{
    step: 9,
    title: "Potwierdzenie zamówienia"
},{
    step: 10,
    title: "Twoje zamówienie jest realizowane"
},]

const addonsArray = [{
    type: "meat",
    name: "Kurczak",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Wołowina mielona",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Szynka",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Szynka dojrzewająca",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Salami",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Boczek",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Kiełbasa Chorizzo",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "meat",
    name: "Krewetki",
    price30: 3.5,
    price40: 4.5,
    price60: 5.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Brokuł",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Papryka słodka",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Jalapeno",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Cebula",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Pomidor",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Ogórek kiszony",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Pieczarki",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "vegetable",
    name: "Cebula prażona",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "others",
    name: "Oliwki zielone",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "others",
    name: "Oliwki czarne",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "others",
    name: "Ananas",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "others",
    name: "Rukola",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},{
    type: "others",
    name: "Dodatkowa mozzarella",
    price30: 2.5,
    price40: 3.5,
    price60: 4.5,
    picked1: false,
    picked2: false,
},]

const PizzaCreator = () => {

    const currentPizza = React.useContext(CurrentPizzaContext);
    const setCurrentPizza = React.useContext(SetCurrentPizzaContext);
    const editMode = React.useContext(EditModeContext);

    const [pickedAddons, setPickedAddons] = React.useState([])
    const [pickedAddons2, setPickedAddons2] = React.useState([])
    const [deliveryInfo, setDeliveryInfo] = React.useState({
        phoneNumber: '',
        city: '',
        street: '',
        buildingNumber: '',
        localNumber: '',
        paymet: ''
    })

    const [pizzaSize, setPizzaSize] = React.useState(30)

    // obsługa wyboru rozmiaru pizzy

    const handleResize = () => {
        setPizzaSize(prevSize => {
            if (prevSize === 60) return 30
            if (prevSize === 30) return prevSize + 10
            if (prevSize === 40) return prevSize + 20
        })}

    const [pizzaPrice, setPizzaPrice] = React.useState(26)

    React.useEffect(() => {
            setPizzaPrice(() => {
                if (pizzaSize === 30) return 26
                if (pizzaSize === 40) return 28
                if (pizzaSize === 60) return 30
            })
    }, [pizzaSize])

    // obliczanie ceny aktualnej pizzy

    let total30 = pickedAddons.reduce((price, addon) => {return addon.price30 + price}, 0)
    let total40 = pickedAddons.reduce((price, addon) => {return addon.price40 + price}, 0)
    let total60 = pickedAddons.reduce((price, addon) => {return addon.price60 + price}, 0)
    let total30h2 = pickedAddons2.reduce((price, addon) => {return addon.price30 + price}, 0)
    let total40h2 = pickedAddons2.reduce((price, addon) => {return addon.price40 + price}, 0)
    let total60h2 = pickedAddons2.reduce((price, addon) => {return addon.price60 + price}, 0)

    const setTotal = () => {
        if(currentPizza.size === 30) return total30
        if(currentPizza.size === 40) return total40
        if(currentPizza.size === 60) return total60
    }

    const setTotal2 = () => {
        if(currentPizza.size === 30) return total30h2
        if(currentPizza.size === 40) return total40h2
        if(currentPizza.size === 60) return total60h2
    }

    // wyświetlanie komponentów

    const displayComponent = () => {
        if(step === 0 && currentPizza.active) return setStep(1)
        if(step === 0) return <HelloScreen />
        if(step === 1 && !currentPizza.active) return setStep(0)
        if(step === 1) return <Size pizzaSize={pizzaSize} handleResize={handleResize} pizzaPrice={pizzaPrice}/>
        if(step === 2 && !currentPizza.active) return setStep(0)
        if(step === 2) return <Slices currentPizza={currentPizza} setCurrentPizza={setCurrentPizza}/>
        if(step === 3 && !currentPizza.active) return setStep(0)
        if(step === 3) return <Halfs currentPizza={currentPizza} setCurrentPizza={setCurrentPizza}/>
        if(step === 4 && !currentPizza.active) return setStep(0)
        if(step === 4) return <Addons addonsArray={addonsArray} setPickedAddons={setPickedAddons} pickedAddons={pickedAddons} currentPizza={currentPizza} />
        if(step === 5 && !currentPizza.active) return setStep(0)
        if(step === 5 && currentPizza.halfDifferent) return <SecondHalfAddons addonsArray={addonsArray} setPickedAddons={setPickedAddons2} currentPizza={currentPizza}/>
        if(step === 5 && currentPizza.halfDifferent === false) return setStep(6)
        if(step === 6 && !currentPizza.active) return setStep(0)
        if(step === 6) return <Summary currentPizza={currentPizza} setCurrentPizza={setCurrentPizza} setStep={setStep} addonsArray={addonsArray} pickedAddons={pickedAddons} setPickedAddons={setPickedAddons} pickedAddons2={pickedAddons2} setPickedAddons2={setPickedAddons2}/>
        if(step === 7 && currentPizza.active) return setStep(1)
        if(step === 7) return <WhatNext setStep={setStep} setCurrentPizza={setCurrentPizza} currentPizza={currentPizza}/>
        if(step === 8 && currentPizza.active) return setStep(1)
        if(step === 8) return <OrderSummary setDeliveryInfo={setDeliveryInfo} setStep={setStep}/>
        if(step === 9 && currentPizza.active) return setStep(1)
        if(step === 9) return <ConfirmOrder deliveryInfo={deliveryInfo} setStep={setStep} currentPizza={currentPizza} setCurrentPizza={setCurrentPizza}/>
        if(step === 10 && currentPizza.active) return setStep(1)
        if(step === 10) return <ThanksForYourOrder />
    }

    //  obsługa etapów

    const [step, setStep] = React.useState(0)

    const nextStep = () => {
        if (step === 0 || step === 7 || step === 8 || step === 9 || step === 10) return
        if (step === 1) {
            setCurrentPizza({
                ...currentPizza,
                size: pizzaSize,
                price: pizzaPrice
            })
        }
        if (step === 2 && !currentPizza.slices) return window.alert('musisz wybrać ilość kawałków')
        if (step === 4 && !currentPizza.halfDifferent) {
            if(pickedAddons.length <= 4) {
                setCurrentPizza({
                ...currentPizza,
                addons: pickedAddons,
                price: pizzaPrice + setTotal()
            })
        }
    }
        if (step === 4 && currentPizza.halfDifferent) {
            if(pickedAddons.length <= 4) {
                setCurrentPizza({
                ...currentPizza,
                addons: pickedAddons,
                price: pizzaPrice + (setTotal()/2)
            })
        }
            else return window.alert('wybrałeś za dużo składników')
        }
        if (step === 5 && currentPizza.halfDifferent) {
            setCurrentPizza({
                ...currentPizza,
                addons2: pickedAddons2,
                price: pizzaPrice + (setTotal()/2) + (setTotal2()/2)
            })
        }
        if  (step === 6 && editMode) return
        setStep(prevStep => prevStep + 1)
    }

    const prevStep = () => {
        if (step === 1 || step === 0 || step === 7 || step === 8 || step === 9 || step === 10) return
        if (step === 6 && !currentPizza.halfDifferent) return setStep(prevStep => prevStep -2)
        setStep(prevStep => prevStep - 1)

    }

    // wyświetlanie nagłówków

    const displayStepTitle = stepTitles.map(item => {
        return item.step === step ? item.title : null})

    return (
            <>
            <nav className="navigator">
                <i className="fas fa-chevron-left previousBtn" onClick={prevStep}></i>
                <h1 className="stepTitle">{displayStepTitle}</h1>
                <i className="fas fa-chevron-right nextBtn" onClick={nextStep}></i>
            </nav>
            <section className="Configurator">
            {displayComponent()}
            </section>
            </>
     );
}

export default PizzaCreator