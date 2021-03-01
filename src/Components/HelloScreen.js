import logo from '../Images/logo.png'
import React from 'react';

const HelloScreen = () => {

    const basketPromptRef = React.useRef('')
    const navigationPromptRef = React.useRef('')
    const startPromptRef = React.useRef('')

    const [timeoutIndex, setTimeoutIndex] = React.useState(0)
    const [timeoutIndex2, setTimeoutIndex2] = React.useState(0)
    const [timeoutIndex3, setTimeoutIndex3] = React.useState(0)

    const hidePrompts = () => {
        basketPromptRef.current.classList.remove('basketPromptVisible')
        navigationPromptRef.current.classList.remove('navigationPromptVisible')
        startPromptRef.current.classList.remove('startPromptVisible')
        setArePromptsActive(false)
    }

    const activatePrompts = () => {
        basketPromptRef.current.classList.add('basketPromptVisible')
        setTimeoutIndex2(setTimeout(() => navigationPromptRef.current.classList.add('navigationPromptVisible'), 2000))
        setTimeoutIndex3(setTimeout(() => startPromptRef.current.classList.add('startPromptVisible'), 4000))
        setTimeoutIndex(setTimeout(hidePrompts, 8000))
    }

    const [arePromptsActive, setArePromptsActive] = React.useState(false)

    const handleShowPrompts = () => {
        if(arePromptsActive) return
        else {
            setArePromptsActive(true)
            activatePrompts()
        }
    }

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutIndex)
            clearTimeout(timeoutIndex2)
            clearTimeout(timeoutIndex3)
        }
    })


    return (
        <>
        <p className="basketPrompt" ref={basketPromptRef}><i className="fas fa-arrow-left"></i>Koszyk</p>
        <p className="navigationPrompt" ref={navigationPromptRef}><i className="fas fa-arrow-up"></i>Przechodzenie między etapami tworzenia pizzy<i className="fas fa-arrow-up"></i></p>
        <p className="startPrompt" ref={startPromptRef}><i className="fas fa-arrow-left"></i>Kliknij tutaj aby rozpocząć konfigurowanie swojej pizzy!</p>
        <div className="helloBox">
            <h1>Custom Pizza Store</h1>
            <img src={logo} alt="logo"></img>
            <p>Skorzystaj z naszego kreatora pizzy i stwórz swoją ulubioną pizze!</p>
            <button className="showPrompts" onClick={handleShowPrompts}>Wskazówka jak zacząć</button>
        </div>
        </>
     );
}

export default HelloScreen;