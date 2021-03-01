const Size = (props) => {

    return (
            <div className="choseSize">
                <div className="displaySize">{props.pizzaSize}cm - {props.pizzaPrice}zł</div>
                <div className="pizza60"></div>
                <div className="pizza40"></div>
                <div className={`resizePizza size${props.pizzaSize}`} onClick={props.handleResize}></div>
            </div>
     );
}

export default Size;