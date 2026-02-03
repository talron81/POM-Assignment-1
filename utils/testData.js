const validUser = {
  username: 'standard_user',
  password: 'secret_sauce',
};

const invalidUser = {
  username: 'standard_user',
  password: 'wrong_password',
};

const checkoutInfo = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '12345',
};

const products =  [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Onesie'
];

module.exports = {
  validUser,
  invalidUser,
  checkoutInfo,
  products,
};
