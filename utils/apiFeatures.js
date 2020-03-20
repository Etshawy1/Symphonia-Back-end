class APIFeatures {
  constructor (query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter () {
    const queryObj = {
      ...this.queryString
    }; /* this assignment becauese javascript make any object by reference where assignment with just the equal operatour */
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    /* A regular expression that filter specifce strings
        the '\b' to filter with this exact word without any other string around it
        'g' the g flag if we have these strings more than one time */
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort () {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields () {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // this to exclude a field from a query
    }

    return this;
  }

  paginate () {
    const page = this.queryString.page * 1 || 1; // the page number
    const limit = this.queryString.limit * 1 || 100; // the number of result in each page
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
