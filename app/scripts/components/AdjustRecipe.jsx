var React = require('react');
var $ = require('jquery');
var models = require('../models/Ingredients');


var AdjustForm = React.createClass({
  getInitialState: function(){
    return {
      quantity:  this.props.recipe.get('servings')
    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({quantity: nextProps.recipe.get('servings')});
  },
  handlequantity: function(e){
    this.setState({quantity: e.target.value});
    this.props.adjustQuantity(e.target.value);
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.adjustQuantity(this.state.quantity);
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="form-inline well">
        <div className="form-group">
          <h3 className="currentquantitycolor">Current Quantity: <input onChange={this.handlequantity} type="text" placeholder= {this.state.quantity} /></h3>
        </div>
      </form>
    )
  }
});

var IngredientList = React.createClass({
  render: function(){
    var factor = this.props.factor;
    var ingredientListItems = this.props.ingredients.map(function(ingredient){
      var adjustedAmount = ingredient.get('amount') * factor;
      var amount = parseInt(adjustedAmount) === adjustedAmount ? adjustedAmount : adjustedAmount.toFixed(2);

      return (
        <li key={ingredient.cid} className="list-group-item">
          <input type="checkbox" /> {amount} {ingredient.get('unit')} {ingredient.get('name')}
        </li>
      )
    });
    return(
      <ul className="list-group">
        {ingredientListItems}
      </ul>
    )
  }
});

var AdjustRecipeContainer = React.createClass({
  getInitialState: function(){
    return {
      factor: 1,
    };
  },
  adjustQuantity: function(newServings){
    var recipe= this.props.recipe;
    var newFactor = (newServings / recipe.get('servings')) || 1;

    this.setState({factor: newFactor});
  },

  render: function(){
    var ingredients = this.props.recipe.get('ingredients');
    return(
      <div className="container">
        <AdjustForm recipe={this.props.recipe} adjustQuantity={this.adjustQuantity}/>
        <p className="titleofingredients">Ingredients:</p>
        <IngredientList ingredients={ingredients} factor={this.state.factor}/>
      </div>
    )
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};
