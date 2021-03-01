const slicesAmount = [6, 8, 12]

const Slices = (props) => {

    const displayOptions = slicesAmount.map(option => {
        return <div className={props.currentPizza.slices === option ? "sliceOption picked" : "sliceOption"} key={option} onClick={() => {
            props.setCurrentPizza({...props.currentPizza, slices: option })
        }}>{option}</div>
    })

    return (
                <section className="choseSlices">
                    {displayOptions}
                    <p className="slicesAndHalfsPrompt">Wybór nie wpływa na cenę!</p>
                </section>
     );
}

export default Slices;