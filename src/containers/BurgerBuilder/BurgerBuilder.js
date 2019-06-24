import React,{Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import requestInstance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients : null,
        totalPrice : 4,
        purchaseable : false,
        purchasing : false,
        loading: false,
        error : false
    }

    componentDidMount = () => {
        requestInstance.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients : res.data});
            })
            .catch(error =>{
                console.log(error);
                this.setState({error:true});
            })
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
        this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Luca',
                surname : 'Marrico',
                address : {
                    city : 'Dubai',
                    zipCode : 'xxxxxx',
                    address : 'Dana Road - Reef Residence'
                },
                email : 'test@test.com',
                deliveryMethod : 'fastest',
                paymentMethod : 'Cash on Delivery'
            }
        }
        requestInstance.post('/orders',order)
            .then(response => {
                //console.log(response);
                this.setState({loading:false,purchasing:false});
            })
            .catch(error => {
                //console.log(error);
                this.setState({loading:false,purchasing:false});
            })
        //alert('Continue!');
    }

    render (){
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error? <p style={{textAlign:"center"}}>Ingredients can't be loaded</p> :<Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
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

            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ></OrderSummary>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />        
        }
        //{salad:true,meat:false...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder,requestInstance);