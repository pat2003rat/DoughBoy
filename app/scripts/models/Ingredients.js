var Backbone = require('backbone');
var $ = require('jquery');

var User = Backbone.Model.extend({
  defaults: {
    username: '',
    password: ''
  },

  idAttribute: 'objectId',
  urlRoot: 'https://tiny-parse-server.herokuapp.com/',
  parse: function(data){
    return data.results;
  },
  signIn: function(username, password){
    var loginUrl = 'https://tiny-parse-server.herokuapp.com/' + 'login?username=' + encodeURI(username) + '&password=' + encodeURI(password);

    $.ajax(loginUrl).then(function(response){
      localStorage.setItem('token', response.sessionToken);
      Backbone.history.navigate('recipes/', { trigger: true });
    });
  },
  signUp: function(){
    var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      localStorage.setItem('user', JSON.stringify(self.toJSON()));
    });
  },
});

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',

  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
});

var Ingredient = ParseModel.extend({
  defaults: {
    name: '',
    amount: '',
    units: '',
  },
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,
  url: 'https://tiny-parse-server.herokuapp.com/classes/PatricksRecipe',
});


var Recipe = ParseModel.extend({
  defaults: {
    ingredients: new IngredientCollection()
  },
  urlRoot: 'https://tiny-parse-server.herokuapp.com/classes/PatricksRecipe',

  save: function(key, val, options){
    this.set('ingredients', this.get('ingredients').toJSON());

    return ParseModel.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.ingredients = new IngredientCollection(data.ingredients);
    return data;
  }
});


var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://tiny-parse-server.herokuapp.com/classes/PatricksRecipe',

  parse: function(data){
    return data.results;
  }
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  User: User
};
