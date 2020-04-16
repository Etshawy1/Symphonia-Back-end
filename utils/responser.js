module.exports.getPaging = (
  items,
  modelName,
  req,
  limit = null,
  offset = null
) => {
  if (limit == null) {
    if (!req.query.limit) limit = 20;
    else limit = req.query.limit;
  }

  if (offset == null) {
    if (!req.query.offset) offset = 20;
    else offset = req.query.offset;
  }

  let linkSpec = getLinkSPec(req, limit, offset);
  return getPaging(
    items,
    modelName,
    linkSpec.limit,
    linkSpec.offset,
    linkSpec.next,
    linkSpec.previous,
    linkSpec.href
  );
};

// TODO: 1. modify teh get Paging to cancell the linkSpec function
// TODO: 1. modify the getPaging and handle next = null in case there is nothing left to explore
const getPaging = (
  items,
  modelName,
  limit = null,
  offset = null,
  next = null,
  previous = null,
  href = null
) => {
  if (items.length < limit) {
    next = null;
  }
  let page = {};
  page[modelName] = {
    total: items.length,
    items,
    limit,
    offset,
    next,
    previous,
    href
  };
  return page;
};

const getLinkSPec = (req, limit, offset) => {
  let LOCAL_HOST = `${req.protocol}://${req.get('host')}`;
  console.log(req.originalUrl);
  let originalUrl = req.originalUrl;
  if (originalUrl.includes('?')) {
    let index = originalUrl.indexOf('?');
    originalUrl = originalUrl.substring(0, index);
  }
  let href = LOCAL_HOST + originalUrl;
  let nnext = `${href}?offset=${offset + limit}&limit=${limit}`;
  let preOffset = offset - limit;
  if (preOffset < 0) {
    preOffset = 0;
  }
  let previous = `${href}?offset=${preOffset}&limit=${limit}`;
  if (preOffset == offset) {
    previous = null;
  }
  return {
    href,
    next: nnext,
    previous,
    limit,
    offset
  };
};
