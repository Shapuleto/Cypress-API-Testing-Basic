describe("API Testing with Cypress - Query Params.", () => {
  const queryParams = { postId: 1 };

  it("Passing Query Parameters", () => {
    cy.request({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/comments",
      qs: queryParams,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.status).equal(200);
      expect(response.body).has.length(5);
      expect(response.body[4]).have.property("id", 5);
      expect(response.body[2]).has.property(
        "name",
        "odio adipisci rerum aut animi",
      );
    });
  });
});
