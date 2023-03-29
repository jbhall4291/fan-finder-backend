require("dotenv").config();
const app = require("../app");
const request = require("supertest");

const mongoose = require("mongoose");
const { seed } = require("../db/seed");

// beforeEach?
//  -> reseed database with supertest
beforeEach(async () => {
  await seed();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("appTests", () => {
  describe("app", () => {
    test("GET: 404 /api/non-existant-route", () => {
      return request(app)
        .get("/api/non-existant-route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
  });

  describe("/api/users", () => {
    test("POST: 201, can post a new well formed user profile to the database", () => {
      const test_user = {
        displayName: "Waluigi",
        avatarURL: "https://en.meming.world/images/en/5/50/Waluigi.jpg",
      };

      return request(app)
        .post("/api/users")
        .send(test_user)
        .expect(201)
        .then(({ body }) => {
          const user = body.user;

          expect(user).toHaveProperty("displayName", expect.any(String));
          expect(user).toHaveProperty("avatarUrl", expect.any(String));
        });
    });

    test("GET: 200, can get users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const users = body.users;
          expect(Array.isArray(users)).toBe(true);
          users.forEach((user) => {
            expect(user).toHaveProperty("displayName", expect.any(String));
            expect(user).toHaveProperty("avatarUrl", expect.any(String));
            expect(user).toHaveProperty("_id", expect.any(String));
          });
        });
    });
    test("GET: 200, can get users by username", () => {
      return request(app)
        .get("/api/users/BlueShoes")
        .expect(200)
        .then(({ body }) => {
          const user = body.user;
          expect(user.displayName).toBe("BlueShoes");
          expect(user.avatarUrl).toBe(
            "https://cdn.shopify.com/s/files/1/0046/9139/4658/products/Winsford_394517_BlackPolish_015edd64-5036-41cd-a28d-b1d18a5d9d07_580x.png?v=1575357572"
          );
        });
    });
  });

  describe("/api/comments", () => {
    test("GET: 200, can retrieve comments from comments collection", () => {
      return request(app)
        .get("/api/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          comments.forEach((comment) => {
            expect(comment).toHaveProperty("gig_id", expect.any(String));
            expect(comment).toHaveProperty("user", expect.any(String));
            expect(comment).toHaveProperty("text", expect.any(String));
            expect(comment).toHaveProperty("created_at");
          });
        });
    });
  });
  describe("/api/gigs/:gig_id", () => {
    test("GET: 200, can retrieve all comments for a specified gig", () => {
      return request(app)
        .get("/api/gigs/Z4qgVMyxjZtnPgJSycnMZda/comments")
        .expect(200)
        .then(({ body }) => {
          const comments = body.comments;
          comments.forEach((comment) => {
            expect(comment.gig_id).toBe("Z4qgVMyxjZtnPgJSycnMZda");
            expect(comment).toHaveProperty("user", expect.any(String));
            expect(comment).toHaveProperty("text", expect.any(String));
            expect(comment).toHaveProperty("created_at");
          });
        });
    });

    test.only("POST: 201, can post a comment to a specified gig", () => {
      const test_comment = {
        user: "kate",
        text: "hi",
        gig_id: "Z4qgVMyxjZtnPgJSycnMZda",
        created_at: new Date("2023-03-29")
    }

      return request(app)
        .post('/api/gigs/Z4qgVMyxjZtnPgJSycnMZda/comments')
        .send(test_comment)
        .expect(201)
        .then(({body}) => {
          const comment = body.comment;
          console.log(comment)
          expect(comment).toHaveProperty('user', expect.any(String))
          expect(comment).toHaveProperty('text', expect.any(String))
          expect(comment).toHaveProperty('gig_id', expect.any(String))
          expect(comment).toHaveProperty('created_at', expect.any(Date))
        })
    })


    test("GET: 200, can retrieve an array of fans going to the same gig by id", () => {
      return request(app)
        .get("/api/gigs/Z4qgVMyxjZtnPgJSycnMZda/fans")
        .expect(200)
        .then(({ body }) => {
          const fans = body.fans;
          fans.forEach((fan) => {
            expect(fan).toHaveProperty("displayName", expect.any(String));
            expect(fan).toHaveProperty("avatarUrl", expect.any(String));
          });
        });
    });
  });

  describe("/api/users/:user_id/gigs", () => {
    test("PATCH: 201, can update the gigs user is going to", () => {
      const test_gig = {
        gig_id: "Z4qgVMyxjZtnPgJSycnMZda",
      };

      return request(app)
        .patch("/api/users/BlueShoes/gigs")
        .send(test_gig)
        .expect(201)
        .then(({body}) => {
          const gigs = body.gigs;
          console.log(gigs);
          expect(Array.isArray(gigs)).toBe(true);
          expect(gigs.includes("Z4qgVMyxjZtnPgJSycnMZda")).toBe(true);
        });
    });

    test("GET: 200 can get gigs a user is going to", () => {
      return request(app)
        .get("/api/users/BlueShoes/gigs")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          const gigs = body.gigs;
          console.log(Object.prototype.toString.call(gigs), "!!!!!!!!!!!!!");
          console.log(gigs);
          expect(Array.isArray(gigs)).toBe(true);
          if (gigs.length > 0) {
            gigs.forEach((gig) => {
              expect(gig).toHaveProperty("gig_id", expect.any(String));
            });
          }
        });
    });
  });
});
