require('mongoose-type-email');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const contact = new Schema({
    name: {
      first: {
        type: String,
        required: [true, 'First Name is required']
      },
      last: {
        type: String,
        required: false
      }
    },
    email: { type: mongooseClient.SchemaTypes.Email, required: [ true, 'Email is  required' ] },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      validate: {
        validator: function(v) {
          return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(v);
        },
        message: '{VALUE} is not a valid international phone number'
      }
    },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('contact');
  } catch (e) {
    return mongooseClient.model('contact', contact);
  }
};
