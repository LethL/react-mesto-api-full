const mongoose = require('mongoose');
const { linkRegExp } = require('../middlewares/validation');

const CardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link);
      },
      message: 'Переданы некорректные данные при создании карточки.',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', CardSchema);
