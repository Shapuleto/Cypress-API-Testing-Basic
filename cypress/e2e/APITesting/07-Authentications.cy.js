describe("API Testing with Cypress - Authentications.", () => {
  it("Basic Postman Echo.", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/basic-auth",
      auth: {
        user: "postman",
        pass: "password",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
      expect(response.body.authenticated).to.be.true;
    });
  });

  it("Digest Postman Echo.", () => {
    cy.request({
      method: "GET",
      url: "https://postman-echo.com/basic-auth",
      auth: {
        username: "postman",
        password: "password",
        method: "digest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.authenticated).to.eq(true);
      expect(response.body.authenticated).to.be.true;
    });
  });

  it("Bearer Token Git Hub.", () => {
    const token = "abc"; // Replace with your actual token

    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("API Key Open Weather.", () => {
    cy.request({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast/daily",
      qs: {
        q: "Chihuahua",
        appid: "fe9c5cddb7e01d747b4611c3fc9eaf2c",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
