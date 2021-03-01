import React from 'react';
import {EditModeContext} from '../App'

const Addons = (props) => {

    let addons = React.useMemo(() => {
        return [...props.addonsArray]
    }, [props.addonsArray])
    const editMode = React.useContext(EditModeContext)
    const setPickedAddons = props.setPickedAddons

    // obsługa trybu edycji

    const displayInEditMode = React.useCallback(() => {
        if(editMode){
        props.currentPizza.addons.forEach(item => {
            addons.forEach(addon => {
                if(addon.name === item.name) {
                    addon.picked1 = true
                    return [...addons]
                }
            })
        })
    }},[editMode, addons, props.currentPizza.addons])

    const updateList = React.useMemo(() => {
        if(editMode) return setPickedAddons(addons.filter(addon => addon.picked1 === true))
    }, [setPickedAddons, addons, editMode])

    React.useMemo(() => {
        displayInEditMode()
    }, [displayInEditMode])

    React.useCallback(() => {
        updateList()
    }, [updateList])

    // wyświetlanie cen w zależności od wielkości pizzy

    const displayPrice = (addon) => {

    if(props.currentPizza.size === 30) return addon.price30
    if(props.currentPizza.size === 40) return addon.price40
    if(props.currentPizza.size === 60) return addon.price60

    }

    // wyświetlanie i grupowanie składników

    const showMeats = addons.map(addon => {
        if(addon.type === "meat")
        return <p className="singleAddon" key={addon.name}><input type="checkbox" checked={addon.picked1} className="addonCheckbox" value={addon.name} onChange={(e) => {
            addon.picked1 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked1 === true))
        }}></input><label>{addon.name}, +{props.currentPizza.halfDifferent ? displayPrice(addon)/2 : displayPrice(addon)}zł</label></p>
        return null
    })

    const showVegetables = addons.map(addon => {
        if(addon.type === "vegetable")
        return <p className="singleAddon" key={addon.name}><input type="checkbox" className="addonCheckbox" checked={addon.picked1} onChange={(e) => {
            addon.picked1 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked1 === true))
        }}></input><label>{addon.name}, +{props.currentPizza.halfDifferent ? displayPrice(addon)/2 : displayPrice(addon)}zł</label></p>
        return null
    })

    const showOthers = addons.map(addon => {
        if(addon.type === "others")
        return <p className="singleAddon" checked={addon.picked1} key={addon.name}><input type="checkbox" className="addonCheckbox" checked={addon.picked1} onChange={(e) => {
            addon.picked1 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked1 === true))
        }}></input><label>{addon.name}, +{props.currentPizza.halfDifferent ? displayPrice(addon)/2 : displayPrice(addon)}zł</label></p>
        return null
    })

    return (
        <section className="choseAddons">
            <h3>{props.currentPizza.halfDifferent ? "Dodatki na pierwszej połowie (max 4)" : "Wybierz maksymalnie 4 dodatki:"}</h3>
            <div className="meatAddons"><h2>Mięsa:</h2>{showMeats}</div>
            <div className="vegetableAddons"><h2>Warzywa:</h2>{showVegetables}</div>
            <div className="otherAddons"><h2>Pozostałe:</h2>{showOthers}</div>
            <p className="basePrompt">Bazą każdej pizzy jest sos pomidorowy i ser Mozzarella</p>
        </section>
     );
}

export default Addons