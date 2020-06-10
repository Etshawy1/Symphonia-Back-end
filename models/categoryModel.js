const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, 'category name already exists'],
      required: [true, 'please provide a name for your category'],
      minlength: 2,
      maxlength: 255
    },
    id: {
      type: String,
      unique: [true, 'category name already exists']
    },
    icons: []
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* istanbul ignore next */
categorySchema.pre('save', function () {
  this.id = slugify(this.name, { lower: true });
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
