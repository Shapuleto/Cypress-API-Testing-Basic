describe("API Testing with Cypress - Parsing JSON Responses.", () => {
  it("Parsing Simple JSON Response", () => {
    cy.request({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    }).then((response) => {
      expect(response.status).to.eq(200);

      const books = response.body;

      expect(books).to.be.an("array");
      expect(books.length).to.be.greaterThan(0);
      expect(books[0].id).to.equal(1);
      expect(books[0].title).to.equal(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      );
      expect(books[0].price).to.equal(109.95);
      expect(books[0].rating.rate).to.equal(3.9);
    });
  });

  it.only("Parsing Complex JSON Response", () => {
    cy.request({
      method: "GET",
      url: "https://fakestoreapi.com/products",
      qs: { limit: 5 }, // Example of adding query parameters
    }).then((response) => {
      expect(response.status).to.eq(200);

      const books = response.body;
      let totalPrice = 0;

      books.forEach((book) => {
        expect(book).to.have.property("id");
        expect(book).to.have.property("title");
        expect(book).to.have.property("price");
        expect(book).to.have.property("rating");
        expect(book.rating).to.have.property("rate");
        expect(book.rating).to.have.property("count");
        totalPrice += book.price;
      });
      expect(totalPrice).to.equal(899.23); // Example of validating the total price of the first 5 books

      // expect(book[0].title).to.be.a("string").and.not.be.empty;
      // expect(book[0].price).to.be.a("number");
      // expect(book[0].rating.rate).to.be.a("number").and.be.within(0, 5);
      // expect(book[0].rating.count).to.be.a("number").and.be.greatherThan(0);
      // expect(book[0].rating).to.be.an("object").that.has.all.keys("rate", "count");
      // ...
    });
  });
});
