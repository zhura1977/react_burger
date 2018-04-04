import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
}


class BurgerBuilder extends Component
{
    
    state = {
        ingredients:
        {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseable = (ingredients) => {
        const itemsCount = Object.values(ingredients).reduce((a,b) => a+b, 0);
        this.setState({purchaseable: itemsCount > 0});
    }

    addIngredientHadler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;

        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});

        this.updatePurchaseable(updatedIngredients);
    
    }

    removeIngredientHadler = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        const oldCount = updatedIngredients[type];
        const updatedCount = oldCount > 0 ? oldCount - 1 : 0;

        if(updatedCount < 0){return;}

        updatedIngredients[type] = updatedCount;
        
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];

        const newPrice = (oldPrice > priceAddition && oldPrice > 4 ) ? oldPrice - priceAddition : oldPrice;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseable(updatedIngredients);

    }


    render()
    {
        const disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo)
        {
            disabledInfo[key] =  disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                  <Burger ingredients={this.state.ingredients}/>
                  <BuildControls 
                    ingredientAdded={this.addIngredientHadler} 
                    ingredietRemoved={this.removeIngredientHadler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable} 
                  />
                 
            </Aux>
        );
    }
}

export default BurgerBuilder;