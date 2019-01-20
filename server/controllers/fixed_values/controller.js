let cities                  = require('../../data/cities.json');
let singleChoiceAttributes  = require('../../data/single_choice_attributes.json');


module.exports.cities = {
    get: (request, h) => {
        return cities;
    }
}

module.exports.choices = {
    get: (request, h) => {
        return singleChoiceAttributes;
    }
}