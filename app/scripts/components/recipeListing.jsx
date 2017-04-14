var React = require('react');
var Backbone = require('backbone');

var models = require('../models/Ingredients');

var ListItem = React.createClass({

  render: function(){
    var recipe = this.props.recipe;
    console.log(recipe);
    return (
      <div>
        <br></br>
        <a href={'#recipes/' + recipe.get('objectId') + '/'} className="list-group-item">{recipe.get("name")}</a>
        <button type='button' className='btn btn-danger' onClick={()=>this.props.handleDelete(recipe)}> Delete Recipe </button>
      </div>
    )
  }
});

var List = React.createClass({
  render: function(){
    var self = this;
    var recipeList = this.props.recipes.map(function(recipe){
      return <ListItem key={recipe.cid} recipe={recipe} handleDelete={self.props.handleDelete}/>
    });
    return(
      <div className='col-xs-12 col-md-12'>
        <h1 className='recipetitles text-center'>Recipes</h1>
        <h2 className= "recipetitlesdescription text-center"><p>Click the Recipe to Edit/Review </p></h2>
        <div className="list-group text-center recipeListing">
          {recipeList}
        </div>
      </div>
    )
  }
});


var RecipeListContainer = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: new models.RecipeCollection()
    };
  },
  componentWillMount: function(){
    var recipeCollection = this.state.recipeCollection;
    recipeCollection.fetch().then(()=> {
      this.setState({recipeCollection: recipeCollection});
      console.log(recipeCollection)
    });
  },
  addIngredient: function(e){
    e.preventDefault();
    Backbone.history.navigate('recipes/add/', {trigger:true});
  },
  handleDelete(recipe) {
    recipe.destroy();
    var recipeCollection = this.state.recipeCollection;
    recipeCollection.remove(recipe);
    this.setState({ recipeCollection });
  },
  render: function(){
    return(
       <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12">
          <List recipes={this.state.recipeCollection} handleDelete={this.handleDelete}/>
          <div className ="col-xs-12 col-md-12 text-center">
            <button onClick={this.addIngredient} type="button" className="btn btn-info text-center">Add a Recipe</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  RecipeListContainer: RecipeListContainer
}
