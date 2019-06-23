import React,{Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese : 0,
            meat : 0
        },
        totalPrice : 4,
        purchaseable : false,
        purchasing : false
    }

    updatePurchaseState (ingredients) {
        // const ingredients ={
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({purchaseable:sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    addIngredientHandler = (type) => {
        const oldCount          = this.state.ingredients[type];
        const updatedCount      = oldCount + 1;
        const updateIngredients = {...this.state.ingredients}
        
        updateIngredients[type]  = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice,ingredients:updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount          = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount      = oldCount - 1;
        const updateIngredients = {...this.state.ingredients}
        
        updateIngredients[type]  = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;

        this.setState({totalPrice:newPrice,ingredients:updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        alert('Continue!');
    }

    render (){
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        //{salad:true,meat:false...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    totalPrice={this.state.totalPrice} 
                    disableInfo={disableInfo} 
                    purchaseable={this.state.purchaseable}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;