const mongo = require('./connection');

var models = {
    Recipe: null,
    User: null
};

models.Recipe = mongo.model('Recipe', {
    guid: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: false },
    category: { type: String, required: false },
    image: { type: String, required: false },
    video: { type: String, required: false },
    reviews: { type: Array, required: false },
    rating: { type: Number, required: false }
});
models.User = mongo.model('User', {
    guid: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = models;
