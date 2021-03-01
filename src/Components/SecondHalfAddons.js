import React from 'react';
import {EditModeContext} from '../App'


const SecondHalfAddons = (props) => {

    let addons = React.useMemo(() => {
        return [...props.addonsArray]
    },[props.addonsArray])
    const editMode = React.useContext(EditModeContext)
    const currentPizza = props.currentPizza
    const setPickedAddons = props.setPickedAddons

     // obsługa trybu edycji

     const displayInEditMode = React.useCallback(() => {
        if(editMode){
        currentPizza.addons2.forEach(item => {
            addons.forEach(addon => {
                if(addon.name === item.name) {
                    addon.picked2 = true
                    return [...addons]
                }
            })
        })
    }}, [currentPizza, addons, editMode])

    const updateList = React.useMemo(() => {
        if(editMode) return setPickedAddons(addons.filter(addon => addon.picked2 === true))
    }, [editMode, setPickedAddons, addons])

    React.useMemo(() => {
        displayInEditMode()
    }, [displayInEditMode])

    React.useCallback(() => {
        updateList()
    }, [updateList])

    const displayPrice = (addon) => {

        if(currentPizza.size === 30) return addon.price30
        if(currentPizza.size === 40) return addon.price40
        if(currentPizza.size === 60) return addon.price60

        }

    const showMeats = addons.map(addon => {
        if(addon.type === "meat")
         return <p className="singleAddon" key={addon.name}><input type="checkbox" checked={addon.picked2} className="addonCheckbox" value={addon.name} onChange={(e) => {
            addon.picked2 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked2 === true))
        }}></input><label>{addon.name}, +{displayPrice(addon)/2}zł</label></p>
        return null
    })

    const showVegetables = addons.map(addon => {
        if(addon.type === "vegetable")
         return <p className="singleAddon" key={addon.name}><input type="checkbox" checked={addon.picked2} className="addonCheckbox" value={addon.name} onChange={(e) => {
            addon.picked2 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked2 === true))
        }}></input><label>{addon.name}, +{displayPrice(addon)/2}zł</label></p>
        return null
    })

    const showOthers = addons.map(addon => {
        if(addon.type === "others")
         return <p className="singleAddon" key={addon.name}><input type="checkbox" checked={addon.picked2} className="addonCheckbox" value={addon.name} onChange={(e) => {
            addon.picked2 = e.target.checked
            setPickedAddons(addons.filter(addon => addon.picked2 === true))
        }}></input><label>{addon.name}, +{displayPrice(addon)/2}zł</label></p>
        return null
    })

    return (
        <section className="choseAddons">
            <h3>Dodatki na drugiej połowie (max 4)</h3>
            <div className="meatAddons"><h2>Mięsa:</h2>{showMeats}</div>
            <div className="vegetableAddons"><h2>Warzywa:</h2>{showVegetables}</div>
            <div className="otherAddons"><h2>Pozostałe:</h2>{showOthers}</div>
            <p className="basePrompt">Bazą każdej pizzy jest sos pomidorowy i ser mozzarella</p>
        </section>

       );
    }

export default SecondHalfAddons;