const UploadBuilder = require('../../../utils/uploader').UploadBuilder;

describe('UploadBuilder', () => {
  let uploadBuilder = new UploadBuilder();
  // this means to name the file in icon field with name in the req.body
  uploadBuilder.addfileField('icon', 'name', '', 1);
  //uploadBuilder.addfileField('icon_md', 'name', '_md', 1);
  uploadBuilder.addTypeFilter('image/jpeg');
  uploadBuilder.addTypeFilter('image/png');
  /*uploadBuilder.setPath(
    path.resolve(__dirname, '..') + '/assets/images/categories'
  );*/

  it('get Field Types Should return a map of fields required.', () => {
    let map = uploadBuilder.getFieldsMap();
    expect(map.get('icon')).toMatchObject({
      saveByReqName: 'name',
      maxCount: 1,
      prefix: ''
    });
  });
  it('getTypeFilters should return the types to filter', () => {
    let expected = ['image/jpeg', 'image/png'];
    expect(uploadBuilder.getTypeFilters()).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
