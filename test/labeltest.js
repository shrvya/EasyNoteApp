/**
 *  Execution  : 1. default node  cmd> nodemon server.js
 * @description:tests label api
 * @file:label.js
 * @author:Shrivya Shetty
 * @version:1.0
 * @since:01-12-2021
 */
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
let labelId=""
const data={
    labelname:"testLabel"
}
const info={
    labelname:" "
}
const updatedata={
    labelname:"testLabelss"
}
const updateinfo={
    labelname:" "
}

    //Get
    describe("GET  all labels", () => {
        it("Given a valid request it should get all the labels from database", (done) => {
          chai
            .request(server)
            .get("/notelabels")
         
            .end((err, res) => {
              res.should.have.status(200);
            
              if (err) {
                return done(err);
              }
              done();
            });
        });
        
      
    });
    describe("Post all ", () => {
        it("Given a valid request it should  post label", (done) => {
          chai
            .request(server)
            .post("/notelabels")
            .send(data)
            .end((err, res) => {
              res.should.have.status(200);
              labelId=res.body._id;
              if (err) {
                return done(err);
              }
              done();
            });
        });
        it("Given a valid request it should NOT post label", (done) => {
            chai
              .request(server)
              .post("/notelabels")
           .send(info)
              .end((err, res) => {
                res.should.have.status(200);
              
                if (err) {
                  return done(err);
                }
                done();
              });
          });
      
    });
    describe("GET  all labels", () => {
        it("Given a valid request it should get all the labels from database", (done) => {
          chai
            .request(server)
            .get("/notelabels")
         
            .end((err, res) => {
              res.should.have.status(200);
            
              if (err) {
                return done(err);
              }
              done();
            });
        });
        
      
    });

    describe("DELETE ", () => {
        it("Given a valid request it should delete alabel", (done) => {
          chai
            .request(server)
            .delete(`/notelabels/${ labelId}`)
            
            .end((err, res) => {
              res.should.have.status(200);
            
              if (err) {
                return done(err);
              }
              done();
            });
        });
    
    })
    describe("UPDATE ", () => {
        it("Given a valid request it should update a label", (done) => {
          chai
            .request(server)
            .put(`/notelabels/${ labelId}`)
            .send(updatedata)
            .end((err, res) => {
              res.should.have.status(200);
              
              if (err) {
                return done(err);
              }
              done();
            });
        });

        it("Given a valid request it should not update a label", (done) => {
            chai
              .request(server)
              .put(`/notelabels/${ labelId}`)
              .send(updateinfo)
              .end((err, res) => {
                res.should.have.status(200);
                
                if (err) {
                  return done(err);
                }
                done();
              });
          });
    
    })