const FixedValueController = require('../../controllers/fixed_values/controller');

let cityLocationInformation = {
    method: 'GET', 
    path: '/en/locations',
    handler: FixedValueController.cities.get
};

let singleChoiceAttributeInformation = {
    method: 'GET', 
    path: '/en/attributes',
    handler: FixedValueController.choices.get
};

module.exports = [
    cityLocationInformation,
    singleChoiceAttributeInformation
];