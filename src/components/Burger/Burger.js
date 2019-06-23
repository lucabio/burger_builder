import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) =>{
    //Trasform each key of an Object as an array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            }); //[,]
        })
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[]);
    console.log(transformedIngredients);
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Start to add ingredients to your burger!</p>
    }

    return (
        <div className={classes.Burger}>

            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;