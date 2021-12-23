/**
 *  Execution  : 1. default node  cmd> nodemon server.js
 * @description:tests user credentials
 * @file:getprofile.js
 * @author:Shrivya Shetty
 * @version:1.0
 * @since:01-12-2021
 */
var chai = require('chai');

const chaiHttp = require("chai-http");
const server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
  //now let's login the user before we run any tests
  
  describe("login being tested", () => {
    it("positive test case ", (done) => {
      let userCredentials = {
        email: "fundoapptest@gmail.com",
        password: "Fundo458^&*",
      };
      chai
        .request(server)
        .post("/users/login")
        .send(userCredentials)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.be.a("object");
         
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Negative test case", (done) => {
      let userCredentials = {
        email: "fundoapptest@gmail.com",
        password: "Fundo4",
      };
      chai
        .request(server)
        .post("/users/login")
        .send(userCredentials)
        .end((err, res) => {
          res.body.should.have.status(500);
          res.body.should.have.property("message").eql("password mismatch");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  
// Registration
let userid;
describe('/POST user registration', () => {
  it('it should  register a new user', (done) => {
     let data = {
    firstname: "Shifali",
    lastname: "Shety",
    age:20,
    email: "shifalishetty@gmail.com",
    password: "Shif@2017",
  };
    chai.request(server)
        .post('/users')
        .send(data)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              userid=res.body._id
          done();
        });
  });

  it('it should  not register a new user', (done) => {
    let data = {
   firstname: " ",
   lastname: "Shety",
   age:20,
   email: "shifalshetty@gmail.com",
   password: "Shif@2017",
 };
   chai.request(server)
       .post('/users')
       .send(data)
       .end((err, res) => {
             res.should.have.status(422);
             res.body.should.be.a('object');
             
         done();
       });
 });
});
