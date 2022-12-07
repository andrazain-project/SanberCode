const request = require("supertest")("https://restful-booker.herokuapp.com");
const expect = require("chai").expect;

describe("Restful booker API Test", function(){

    //test
    var token;
    var bookingId;

    it("Get Token Successfully", async function(){
        const response = await request
        .post("/auth")
        .send({
            "username" : "admin",
            "password" : "password123"
        });

        expect(response.status).to.be.eql(200);
        expect(response.body.token).not.to.be.null;
        token = response.body.token;
    });

    it("Get Token Without Username", async function(){
        const response = await request
        .post("/auth")
        .send({
            "username" : "",
            "password" : "password123"
        });

        expect(response.status).to.be.eql(200);
        expect(response.body.reason).to.be.eql("Bad credentials");
    });

    it("Get Token Without Password", async function(){
        const response = await request
        .post("/auth")
        .send({
            "username" : "admin",
            "password" : ""
        });

        expect(response.status).to.be.eql(200);
        expect(response.body.reason).to.be.eql("Bad credentials");
    });

    it("Create Booking Successfully", async function(){
        const response = await request
        .post("/booking")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
            "firstname" : "Joy",
            "lastname" : "Jordison",
            "totalprice" : 555,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Lunch"
        });

        expect(response.status).to.be.eql(200);
        expect(response.body.bookingid).not.to.be.null;
        bookingId = response.body.bookingid;
    });

    it("Get Booking ID Successfully", async function(){
        const response = await request
        .get("/booking/" + bookingId)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
    
        expect(response.status).to.be.eql(200);
    });

    it("Update Booking Successfully", async function(){
        const response = await request
        .put("/booking/" + bookingId)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Cookie", "token=" + token)
        .send({
            "firstname" : "Sanber",
            "lastname" : "Code",
            "totalprice" : 111555,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        })

        expect(response.status).to.be.eql(200);
        expect(response.body.firstname).to.be.eql("Sanber");
        expect(response.body.lastname).to.be.eql("Code");
        expect(response.body.additionalneeds).to.be.eql("Breakfast");
    });

    it("Update Booking Wihtout BookingID", async function(){
        const response = await request
        .put("/booking/")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Cookie", "token=" + token)
        .send({
            "firstname" : "Sanber",
            "lastname" : "Code",
            "totalprice" : 111555,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        })

        expect(response.status).to.be.eql(404);
    });

    it("Delete Booking Successfully", async function(){
        const response = await request
        .delete("/booking/" + bookingId)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Cookie", "token=" + token)

        expect(response.status).to.be.eql(201);
    });

    it("Should be show 404 for deleted BookingId", async function(){
        const response = await request
        .get("/booking/" + bookingId)
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Cookie", "token=" + token)

        expect(response.status).to.be.eql(404);
    });

})
