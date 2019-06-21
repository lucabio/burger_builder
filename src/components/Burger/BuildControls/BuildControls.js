import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label : 'Salad',
        type : 'salad'
    },
    {
        label : 'Bacon',
        type : 'bacon'
    },
    {
        label : 'Cheese',
        type : 'cheese'
    },
    {
        label : 'Meat',
        type : 'meat'
    }
    
];


const buildControls = ( props ) =>(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.totalPrice.toFixed(2)} $</strong></p>
        {controls.map(crtl => (
            <BuildControl 
            key={crtl.label}
            label={crtl.label}
            added={()=>props.ingredientAdded(crtl.type)}
            removed={()=>props.ingredientRemoved(crtl.type)}
            disabled={props.disableInfo[crtl.type]}
            />
        ))}

        <button 
            disabled={!props.purchaseable} 
            className={classes.OrderButton}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;