const WhatNext = (props) => {
    return (
        <section className="whatNext">
            <div className="nextPizza" onClick={() => {
                props.setCurrentPizza({...props.currentPizza, active: true})
            }}>Tak</div>
            <div className="goToSummary" onClick={() => {
                props.setStep(prevStep => prevStep + 1)
            }}><span>Nie</span><span>przejdz do podsumowania</span></div>
        </section>
     );
}

export default WhatNext;