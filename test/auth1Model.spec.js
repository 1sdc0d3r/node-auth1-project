const db = require("../data/auth1-config");
const users = require("../data/auth1-model");

describe("UsersModel", () => {
  beforeEach(async () => {
    await db("Users").truncate();
  });
  describe('insert', () => {
    it('should insert users into db', () => {
      let userNumber
      userNumber = await db('Users');
      expect(userNumber).toHaveLength(0);
    //   await users.insert({user: "Fred", password: "pass"});
    //   expect(userNumber).toHaveLength(1);
    });
    it('should insert provided user into db', () => {
      let user = await users.insert({user: "Colten", password: "mission"});
      expect (user.user).toBe("Colten");
      expect (user.password).toBe("Mission");
      
    })
    
    
  })
  
});
