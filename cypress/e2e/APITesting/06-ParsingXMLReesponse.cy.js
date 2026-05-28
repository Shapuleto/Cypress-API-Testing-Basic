describe("API Testing with Cypress - Parsing XML.", () => {
  const xmlPayload =
    "<Pet><id>0</id><Category><id>0</id><name>Dog</name></Category><name>Jimy</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag><status>Available</status></tags></Pet>";

  before("Creating a Pet.", () => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/pet",
      body: xmlPayload,
      headers: {
        "Content-Type": "application/xml",
        accept: "application/xml",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.body, "text/xml");

      // Extract the generated dynamic ID
      const generatedId = xmlDoc.getElementsByTagName("id")[0].textContent;

      // Save it as a Cypress alias so it can be accessed across tests
      cy.wrap(generatedId).as("createdPetId");
    });
  });

  // Note: We use a standard function() block here so we can access "this.createdPetId"
  it("Should retrieve the created pet and verify the ID matches", function () {
    cy.request({
      method: "GET",
      url: `https://petstore.swagger.io/v2/pet/${this.createdPetId}`,
      headers: {
        accept: "application/xml",
      },
    }).then((response) => {
      // 1. Verify the GET request was successful
      expect(response.status).to.eq(200);

      // 2. Parse the fetched response XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.body, "text/xml");
      const fetchedPetId = xmlDoc.getElementsByTagName("id")[0].textContent;
      const fetchedPetName = xmlDoc.getElementsByTagName("name")[0].textContent;

      // 3. Assertions: Compare the fetched ID against the one we saved in the before hook
      expect(fetchedPetId).to.eq(this.createdPetId);

      // Secondary check to make sure it's the right pet record
      expect(fetchedPetName).to.eq("Jimy");

      cy.log(
        `Verified! Fetched Pet ID (${fetchedPetId}) matches Created Pet ID (${this.createdPetId})`,
      );
    });
  });
});
