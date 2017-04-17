var React = require('react');
var Backbone = require('backbone');

var models = require('../models/Ingredients');

var IngredientForm = React.createClass({
  getInitialState: function(){
    return this.props.ingredient.toJSON();
  },
  componentWillReceiveProps: function(newProps){
    this.setState(newProps.ingredient.toJSON());
  },
  handleInputChange: function(e){
    var target = e.target;

    console.log(target);

    var newState={};
    newState[target.name] = target.value;
    this.setState(newState);

    this.props.ingredient.set(target.name, target.value);
  },
  removeIngredient: function(e){
    e.preventDefault();
    this.props.removeIngredient(this.props.ingredient);
  },
  render: function(){
    return (
      <div>
      <div className="form-group">
        <label className="amountofingredient" htmlFor="ingredient-amount"></label>
        <input onChange={this.handleInputChange} type="text" className="form-control" name="amount" id="amountofingredient" placeholder="Amount" value={this.state.amount}/>
      </div>
      <div className="form-group">
        <label className="unitofingredient" htmlFor="ingredient-units"></label>
        <input onChange={this.handleInputChange} type="text" className="form-control" name="unit" id="unitofingredient" placeholder="Units" value={this.state.unit}/>
      </div>
      <div className="form-group">
        <label className="nameofingredient" htmlFor="ingredient-name"></label>
        <input onChange={this.handleInputChange} type="text" className="form-control" name="name" id="nameofingredient" placeholder="Name" value={this.state.name}/>
      </div>
      <a> </a>
      <button onClick={this.removeIngredient} type="button" className="btn btn-danger">Remove Ingredient</button>
      </div>
    )
  }
});

var Form = React.createClass({
  getInitialState: function(){
    return this.props.recipe.toJSON();
  },
  componentWillReceiveProps: function(newProps){
    this.setState(newProps.recipe.toJSON());
  },
  handleInputChange: function(e){
    var target = e.target;

    var newState = {};
    newState[target.name]= target.value;
    this.props.recipe.set(target.name, target.value);
    this.setState(newState);
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveRecipe(this.state);
  },
  navBack: function(e){
    e.preventDefault();
    Backbone.history.navigate('recipes/', {trigger:true});
  },
  render: function(){
    var recipe = this.props.recipe;
    var self = this;
    var heading = recipe.isNew() ? 'Add' : 'Edit';
    var ingredientFormset = recipe.get('ingredients').map(function(ingredient){
      return (
        <IngredientForm key={ingredient.cid} ingredient={ingredient} removeIngredient={self.props.removeIngredient}/>
      )
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className ="text-center">{heading} Recipe</h1>
        <div className="form-group text-center">
          <label htmlFor = "recipeName">Recipe Name</label>
          <input onChange={this.handleInputChange} value={this.state.name} type="text" className="form-control" name="name" id="name" placeholder="Name" />
        </div>
        <div className="form-group text-center">
          <label htmlFor = "servings">Servings</label>
          <input onChange={this.handleInputChange} value={this.state.servings} type="text" className="form-control" name="servings" id="servings" placeholder="Servings" />
        </div>
        <div className = "col-xs-12 col-md-12 text-center" >
          <h2>Ingredients: </h2>
            <button type="button" onClick={this.props.addIngredient} className="btn btn-success">Add Ingredient</button>
            <button type="submit" className="btn btn-primary spacingbuttons">Save</button>
            <button onClick={this.navBack} type="button" className="btn btn-warning">Recipe Listing</button>
        </div>
        <div className="form-inline">
          {ingredientFormset}
        </div>
      </form>
    )
  }
});


var RecipeAddEditContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    this.getRecipe();
  },
  componentWillReceiveProps: function(){
    this.getRecipe();
  },
  getRecipe: function(){
    var recipe = this.state.recipe;
    var recipeId=this.props.recipeId;
    console.log(this.props.recipeId);
    if(!recipeId){
      return;
    }

    recipe.set('objectId', recipeId);
    recipe.fetch().then(() => {
      this.setState({recipe: recipe})
    });
  },
  addIngredient: function(){
    var recipe = this.state.recipe;
    var ingredients = recipe.get('ingredients');
    console.log(ingredients);
    ingredients.add([{}]);
    this.setState({recipe: recipe});
  },
  saveRecipe: function(newRecipe){
    var recipe = this.state.recipe;
    newRecipe.servings = parseInt(newRecipe.servings)
    recipe.set(newRecipe);
    recipe.save().then(() => {
      console.log( recipe);
      Backbone.history.navigate('recipes/' + recipe.get('objectId') + '/', {trigger: true});
    })
  },
  removeIngredient: function(ingredientToRemove){
    var ingredients= this.state.recipe.get('ingredients');
    ingredients.remove(ingredientToRemove);
    this.setState({recipe: this.state.recipe});
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12 text-center">
            <Form recipe={this.state.recipe} addIngredient={this.addIngredient} saveRecipe={this.saveRecipe} removeIngredient={this.removeIngredient}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  RecipeAddEditContainer: RecipeAddEditContainer
};
