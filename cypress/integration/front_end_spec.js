/* eslint-disable no-undef */
// Testing that the URL brings us to the correct web page
describe("The Landing Page", () => {
  it("Successfully loads", () => {
    cy.visit("/");
  });
});

// Testing that clicking the button brings up the login page with login in the URL
describe("Login Page", () => {
  it('clicks the link "Continue with Google"', () => {
    cy.visit("/");

    cy.contains("Continue with Google").click();

    //Should be on a new URL which includes '/login'
    cy.url().should("include", "/login");
  });
});

// // Testing events page

// describe("Sign in successful", () => {
//   it("Gets, type and asserts", () => {
//     cy.visit("/");

//     cy.contains("Continue with Google").click();

//     cy.url().should("include", "/login");
//   });
// });
