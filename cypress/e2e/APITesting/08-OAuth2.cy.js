describe("API Testing with Cypress - Authentications.", () => {
  before("Get OAuth2 Token", () => {
    cy.request({
      method: "POST",
      url: "https://github.com/login/oauth/access_token",
      qs: {
        client_id: "Ov23liwRT5cr02FdPbgt",
        client_secret: "577f0f4c7de310f52e78de8c2493e5793216dc92",
        code: "68a7370f35917cb35d8a", // ⚠️ Warning: This works exactly ONCE.
      },
      headers: { accept: "application/json" },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("Token response status:", response.status);
      cy.log("Token response body:", JSON.stringify(response.body));

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("access_token");

      const token = response.body.access_token;
      cy.wrap(token).as("accessToken");
    });
  });

  it("OAuth2 Request - Should Fetch User Repositories.", function () {
    cy.log("Current Active Token:", this.accessToken);
    expect(this.accessToken, "access token").to.be.a("string").and.not.be.empty;

    cy.request({
      method: "GET",
      url: "https://api.github.com/user/repos",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "User-Agent": "CypressTestRunner",
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("GitHub repos response status:", response.status);
      cy.log("GitHub repos response body:", JSON.stringify(response.body));
      expect(response.status, "GitHub user repos request").to.eq(200);
    });
  });
});
