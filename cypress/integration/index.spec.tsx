/// <reference types="cypress" />

describe("Testing index search page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should can search an product and find just elements with pass key", () => {
    cy.get("[data-cy=search-input]").type("Kit");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=product").should("have.length.greaterThan", 0);
  });

  it("Should not render any product when passed key does not exists", () => {
    cy.get("[data-cy=search-input]").type("aaaaasfnosnafaaa");
    cy.get("[data-cy=submit]").click();
    cy.get("[data-cy=product").should("not.exist");
  });

  it("Should show suggestions when a value was type", () => {
    cy.get("[data-cy=search-input]").type("camiseta");
    cy.get("[data-cy=suggestion]").should("have.length.greaterThan", 0);
  });

  it("Should change type value when a suggestion was clicked", () => {
    cy.get("[data-cy=search-input]").type("camiseta");

    cy.get("[data-cy=suggestion]").first().click();
    cy.get("[data-cy=search-input]").should("not.have.value", "camiseta");
  });
});
