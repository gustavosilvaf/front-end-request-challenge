/// <reference types="cypress" />

describe("Testing index search page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should can search an product and find just elements with pass key", () => {
    cy.get("[data-cy=search-input]").type("Kit");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=product").should("have.length", 4);
  });

  it("Should not render any product when passed key does not exists", () => {
    cy.get("[data-cy=search-input]").type("aaaaaaa");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=product").should("not.exist");
  });

  it("Should not render any product when passed key does not exists", () => {
    cy.get("[data-cy=search-input]").type("camiseta{rightArrow}");
    cy.get("[data-cy=search-input]").should("have.value", "camiseta feminina");
  });
});
