const AJV = require("ajv");
const avj = new AJV();

describe("API Testing with Cypress - Validating JSON Schema.", () => {
  it("Schema Validation vs Response.", () => {
    cy.request({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    }).then((response) => {
      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Generated schema for Root",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            title: {
              type: "string",
            },
            price: {
              type: "number",
            },
            description: {
              type: "string",
            },
            category: {
              type: "string",
            },
            image: {
              type: "string",
            },
            rating: {
              type: "object",
              properties: {
                rate: {
                  type: "number",
                },
                count: {
                  type: "number",
                },
              },
              required: ["rate", "count"],
            },
          },
          required: [
            "id",
            "title",
            "price",
            "description",
            "category",
            "image",
            "rating",
          ],
        },
      }; // schéma ends

      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  });
});
