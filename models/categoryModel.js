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
    icons: [String]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

categorySchema.virtual('href').get(function() {
  const href = `url/${slugify(this.name, { lower: true })}`;
  return href;
});

const category = mongoose.model('Category', categorySchema);
exports.category = category;
