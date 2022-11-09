describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Leo Alho",
      username: "lele",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Log in to application");
  });
  it("Login form is shown", function () {
    cy.contains("Password");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("lele");
      cy.get("input:last").type("salainen");
      cy.contains("login").click();
      cy.contains("Leo Alho logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("lele");
      cy.get("input:last").type("salainen2");
      cy.contains("login").click();
      cy.contains("Log in to application");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "lele",
        password: "salainen",
      }).then((response) => {
        window.localStorage.setItem(
          "loggedUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("new post").click();
      cy.get("#title").type("React testing for dummies");
      cy.get("#author").type("Leo Alho");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.contains("React testing for dummies Leo Alho");
    });
    it("A blog post can be liked", function () {
      cy.contains("new post").click();
      cy.get("#title").type("React testing for dummies");
      cy.get("#author").type("Leo Alho");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("Updated likes");
    });
    it("A blog post can be removed", function () {
      cy.contains("new post").click();
      cy.get("#title").type("React testing for dummies");
      cy.get("#author").type("Leo Alho");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.contains("View").click();
      cy.contains("Remove").click();
      cy.contains("removed React testing for dummies");
    });
    it.only("Blog posts are ordered by likes", function () {
      cy.contains("new post").click();
      cy.get("#title").type("React testing for dummies");
      cy.get("#author").type("Leo Alho");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.wait(1000);
      cy.get("#title").type("part2");
      cy.get("#author").type("Leo Alho");
      cy.get("#url").type("google.com");
      cy.get("#create-button").click();
      cy.wait(1000);
      cy.get("button:contains(View)").eq(1).click();
      cy.contains("Like").click();
      cy.wait(1000);
      cy.get(".blog").eq(0).should("contain", "React");
    });
  });
});
