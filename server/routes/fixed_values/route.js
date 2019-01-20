let cities                  = require('./cities.json');
let singleChoiceAttributes  = require('./single_choice_attributes.json');

let cityLocationInformation = {
    method: 'GET', 
    path: '/en/locations',
    handler: function (request, h) {
        return (cities);
    }
};

let singleChoiceAttributeInformation = {
    method: 'GET', 
    path: '/en/attributes',
    handler: function (request, h) {
        return (singleChoiceAttributes);
    }
};

module.exports = [
    cityLocationInformation,
    singleChoiceAttributeInformation
];