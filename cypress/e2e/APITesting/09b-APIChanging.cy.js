describe("API Testing with Cypress - API Changing.", () => {
  const auth_token =
    "Bearer 5d279385d9a107dec233c03e8b939bac0a7a797094bc56dc8257e1e18dd3b0d7";

  it("Create, Update, Delete User - GoRest API.", () => {
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: { Authorization: auth_token },
      body: {
        name: "John Doe",
        email: `test_user_${Math.random().toString(5).substring(2)}@gmail.com`,
        gender: "Male",
        status: "active",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      const userId = response.body.id;

      cy.request({
        method: "PUT",
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        headers: { Authorization: auth_token },
        body: {
          name: "John KFC",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq("John KFC");

        cy.request({
          method: "DELETE",
          url: `https://gorest.co.in/public/v2/users/${userId}`,
          headers: { Authorization: auth_token },
        }).then((response) => {
          expect(response.status).to.eq(204);
        });
      });
    });
  });
});
