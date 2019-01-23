const FixedValueController = require('../../controllers/fixed_values/controller');

let cityLocationInformation = {
    method: 'GET', 
    path: '/en/locations',
    handler: FixedValueController.cities.get,
    options:{
        cors: true
    }
};

let singleChoiceAttributeInformation = {
    method: 'GET', 
    path: '/en/attributes',
    handler: FixedValueController.choices.get,
    options:{
        cors: true
    }
};

module.exports = [
    cityLocationInformation,
    singleChoiceAttributeInformation
];