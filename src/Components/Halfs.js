const Halfs = (props) => {
    return (
        <section className="halfOrWhole">
            <div className={props.currentPizza.halfDifferent ? "halfOption picked" : "halfOption"} onClick={() => {
            props.setCurrentPizza({...props.currentPizza, halfDifferent: true })
        }}>Tak</div>
            <div className={props.currentPizza.halfDifferent ? "wholeOption" : "wholeOption picked"} onClick={() => {
            props.setCurrentPizza({...props.currentPizza, halfDifferent: false, addons2: [] })
        }}>Nie</div>
        <p className="slicesAndHalfsPrompt">Wybór nie wpływa na cenę!</p>
        </section>
     );
}

export default Halfs;