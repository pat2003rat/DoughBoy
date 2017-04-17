var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setupParse = require('./parse').setupParse;
var AdjustRecipeContainer = require('./components/AdjustRecipe.jsx').AdjustRecipeContainer;
var RecipeListContainer = require('./components/recipeListing.jsx').RecipeListContainer;
var RecipeDetailContainer = require('./components/recipeDetail.jsx').RecipeDetailContainer;
var RecipeAddEditContainer = require('./components/recipeForm.jsx').RecipeAddEditContainer;
var LoginSignUpContainer = require('./components/Login.jsx').LoginSignUpContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'recipes/add/': 'recipeAddEdit',
    'recipes/:id/edit/': 'recipeAddEdit',
    'recipes/:id/': 'recipeDetail',
    'recipes/': 'recipeList',
  },
  initialize: function(){
    setupParse('setup', 'slumber');
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginSignUpContainer, { router: this }),
      document.getElementById('app')
    );
  },
  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeListContainer),
      document.getElementById('app')
    );
  },
  recipeDetail: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeDetailContainer, { recipeId: recipeId }),
      document.getElementById('app')
    );
  },
  recipeAddEdit: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeAddEditContainer, { recipeId: recipeId }),
      document.getElementById('app')
    );
  }
});


var router = new AppRouter();

module.exports = {
  router: router
};
