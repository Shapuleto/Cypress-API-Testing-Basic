describe("API Testing with Cypress - Posts Calls", () => {
  it("Approach 01 - Hardcoded json object.", () => {
    const requestBody = {
      tourist_name: "foo",
      tourist_email:
        "bar" + Math.random().toString(36).substr(2, 5) + "@example.com",
      tourist_location: "Paris",
    };

    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.tourist_name).to.equal(requestBody.tourist_name);
      expect(response.body.tourist_email).to.equal(requestBody.tourist_email);
      expect(response.body.tourist_location).to.equal(
        requestBody.tourist_location,
      );
    });
  });

  it.only("Approach 02 - Using Fixture File.", () => {
    cy.fixture("tourist").then((fixtureTouristData) => {
      const requestBody = fixtureTouristData;

      cy.request({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        body: requestBody,
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.tourist_name).to.equal(requestBody.tourist_name);
        expect(response.body.tourist_email).to.equal(requestBody.tourist_email);
        expect(response.body.tourist_location).to.equal(
          requestBody.tourist_location,
        );
        expect(response.body).has.property(
          "tourist_name",
          requestBody.tourist_name,
        );
        expect(response.body).to.have.property(
          "tourist_email",
          requestBody.tourist_email,
        );
      });
    });
  });
});
