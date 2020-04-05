supertest = require('supertest');
let server;
describe('api/v1/browse', () => {
    beforeEach(() => {
        server = require("../../"").server;
      });
      afterEach(async () => {
        server.close();
       // await Genre.remove({});
      });
    
    describe('Get /categories/{{category_id}}/playlists', () => {
        it("should return the categories palylists", () => {
            supertest.send()
        })
    })

});
