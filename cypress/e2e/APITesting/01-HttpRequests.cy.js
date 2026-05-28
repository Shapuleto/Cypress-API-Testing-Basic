describe("API Testing with Cypress", () => {
  it("Should make a GET request to the API and validate the response.", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1")
      .its("status")
      .should("equal", 200);
  });

  it("Should make a POST request to the API and validate the response.", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    })
      .its("status")
      .should("equal", 201);
  });

  it("Should make a PUT request to the API and validate the response.", () => {
    cy.request({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      body: {
        id: 1,
        title: "updated title",
        body: "updated body",
        userId: 1,
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("Should make a DELETE request to the API and validate the response.", () => {
    cy.request({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    })
      .its("status")
      .should("equal", 200);
  });
});
