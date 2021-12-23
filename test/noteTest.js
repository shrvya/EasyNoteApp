/**
 *  Execution  : 1. default node  cmd> nodemon server.js
 * @description:tests note apis
 * @file:noteTest.js
 * @author:Shrivya Shetty
 * @version:1.0
 * @since:01-12-2021
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
let token = " ";
let noteId = " ";
const note={
    title:"Notetesting",
    content:"testing rest api"
}
const info={
    title:" N",
    content:" "
}
describe("testing notes", () => {
    
    let data = {
      email: "fundoapptest@gmail.com",
      password: "Fundo458^&*",
    };
    beforeEach((done) => {
      chai
        .request(server)
        .post("/users/login")
        .send(data)
        .end((err, res) => {
          token = res.body.message.token;
          res.body.should.have.status(200);
          if (err) {
            return done(err);
          }
          done();
        });
    });

    //Get
    describe("GET  all notes", () => {
        it("Given a valid request it should get all the notes from database", (done) => {
          chai
            .request(server)
            .get("/notes")
            .auth(token, {type: 'bearer'})
            .end((err, res) => {
              res.should.have.status(200);
            
              if (err) {
                return done(err);
              }
              done();
            });
        });
        it("create a new note", (done) => {
          chai
            .request(server)
            .post("/notes")
            .send(note)
            .auth(token, {type: 'bearer'})
            
            .end((err, res) => {
                noteId = res.body.message._id;
                res.should.have.status(200);
              
              if (err) {
                return done(err);
              }
              done();
            });
        });
      });
      it("should not create a new note", (done) => {
        chai
          .request(server)
          .post("/notes")
          .send(info)
          .auth(token, {type: 'bearer'})
          .end((err, res) => {
              res.should.have.status(400);
            
            if (err) {
              return done(err);
            }
            done();
          });
      });
      it("Given a valid request it should get all the notes from database", (done) => {
        chai
          .request(server)
          .get(`/notes/${noteId}`)
          .auth(token, {type: 'bearer'})
          .end((err, res) => {
            res.should.have.status(200);
          
            if (err) {
              return done(err);
            }
            done();
          });
      });
      it("Given a  noteId it should delete a note from database", (done) => {
        chai
          .request(server)
          .delete(`/notes/:${noteId}`)
          .auth(token, {type: 'bearer'})
          .end((err, res) => {
            res.should.have.status(200);
           
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
    

