import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary] is updated')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKeys,index) =>{
            return <li key={index}>
                    <span style={{textTransform:'capitalize'}}>{igKeys}</span> : {this.props.ingredients[igKeys]}
                </li>;
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients :</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.totalPrice.toFixed(2)} $</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }    
}

export default OrderSummary;