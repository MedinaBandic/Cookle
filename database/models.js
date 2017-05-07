var mongo = require('./connection');

var models = {
  Recipe: null,
  User: null
};

models.Recipe = mongo.model('Recipe', { guid: String, title: String, user: String, description: String, ingridients: String, reviews: Array });
models.User = mongo.model('User', { guid: String, email: String, password: String, username: String, phone: String });

module.exports = models;
