var React = require('react');
var Backbone = require('backbone');

var models = require('../models/Ingredients');
var AdjustRecipeContainer = require('./AdjustRecipe.jsx').AdjustRecipeContainer;

var RecipeHeading = React.createClass({
  editIngredient: function(){
    Backbone.history.navigate('#recipes/' + this.props.recipe.get('objectId') + '/edit/', {trigger:true});
  },
  render: function(){
    return (
      <div>
        <h1 className="col-xs-12 col-md-12 recipetitle text-center">{this.props.recipe.get('name')}</h1>
        <br></br>
        <button onClick={this.editIngredient} type="button" className="btn btn-info text-center"> Edit Recipe</button>
      </div>
    )
  }
});
var RecipeDetailContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    }
  },
  componentWillMount: function(){
    var recipe = this.state.recipe;
    var recipeId = this.props.recipeId;

    if(!recipeId){
      return;
    }

    recipe.set('objectId', recipeId);
    recipe.fetch().then(() => {
      this.setState({recipe:recipe})
    });
  },

  render: function(){
    return(
      <div>
        <RecipeHeading recipe={this.state.recipe}/>
        <AdjustRecipeContainer recipe={this.state.recipe}/>
      </div>
    )
  }
});

module.exports = {
  RecipeDetailContainer: RecipeDetailContainer
}
