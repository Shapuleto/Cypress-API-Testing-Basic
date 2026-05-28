describe("API Testing with Cypress - Headers and Authentication.", () => {
  before("Setup Authentication Token", () => {
    cy.request({
      method: "POST",
      // 1. Updated to the new domain
      url: "https://simple-books-api.click/api-clients",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        clientName: "Test",
        clientEmail: `test_user_${Math.random().toString(36).substring(2)}@gmail.com`,
      },
    }).then((response) => {
      // 2. Save token as a Cypress alias instead of a global variable
      const token = response.body.accessToken;
      cy.wrap(token).as("authToken"); // 3. Use "cy.wrap" to create an alias for the token, which can be accessed in subsequent tests using "this.authToken"
    });
  });

  before("Creating an Order with Authentication Token", function () {
    // 4. Use a standard function to access the alias with "this"
    cy.request({
      method: "POST",
      url: "https://simple-books-api.click/orders",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + this.authToken,
      },
      body: {
        bookId: 1,
        customerName: "abcxyz",
      },
    }).then((response) => {
      // We can now access the token using "this.authToken" in this block and any subsequent blocks
      expect(response.status).to.eq(201);
      expect(response.body.created).to.be.true;
    });
  });

  it("Fetching All Orders.", function () {
    cy.request({
      method: "GET",
      url: "https://simple-books-api.click/orders",
      headers: {
        Authorization: "Bearer " + this.authToken,
      },
      cookies: {
        // If the API uses cookies for session management, include them here
        cookieName: "cookieValue",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body).has.length(1);
    });
  });
});
