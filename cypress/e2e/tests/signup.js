/// <reference types = "Cypress" />
import SignUpPage from "../../pageobjects/SignUpPage";
const signupPage = new SignUpPage();

describe('Sign Up', function(){
    beforeEach(function() {
        cy.fixture('example').then((data) => {
            this.data = data;
    })
})

    it('Should Successfully Register the User', function(){
        cy.visit(Cypress.env('url') + "/register");
        signupPage.getFirstNameField().type(this.data.FirstName);
        signupPage.getLastNameField().type(this.data.LastName);
        signupPage.getEmailField().type(this.data.EmailAddress);
        signupPage.getPasswordField().type(this.data.Password);
        signupPage.getConfirmPasswordField().type(this.data.ConfirmPassword);
        signupPage.getSubmitBtn().click();
        
         // Assert that registration is successful and user is no longer on the registration page
        //  cy.url().should('not.include', '/register'); 
         
         
    


    });

    // it('Should display a message from the server response', function(){
    //     cy.visit(Cypress.env('url') + "/register");
    //     signupPage.getFirstNameField().type(this.data.FirstName);
    //     signupPage.getLastNameField().type(this.data.LastName);
    //     signupPage.getEmailField().type(this.data.EmailAddress);
    //     signupPage.getPasswordField().type(this.data.Password);
    //     signupPage.getConfirmPasswordField().type(this.data.ConfirmPassword);
    //     signupPage.getSubmitBtn();

        
    // // Intercept the server response for the bad request scenario
    // cy.intercept('POST', 'https://microinsurance-dev.pluginsure.co/api/v1/user/signUp', function (
    //   req
    // ) {
    //   req.reply({
    //     statusCode: 400,
    //     body: {
    //       error: {
    //         status: '09',
    //         message:
    //           'The phone number can start with an optional "+" sign followed by either "234" (Nigeria\'s country code) or nothing.\n      Matches exactly ten (10) digits. These digits represent the remaining part of the phone number.',
    //       },
    //     },
    //   });
    // }).as('badRequestError');

    // // Wait for the server response and extract the error message from the response
    // cy.wait('@badRequestError', { timeout: 10000 }).then(function (interception) {
    //   const errorMessage = interception.response.body.error.message;
    //   // Display the error message in the Cypress test output
    //   cy.log(`Server Error Message: ${errorMessage}`);
    //     // Assert that the error message matches the expected error message related to the phone number
    //     expect(errorMessage).to.contain(
    //       'The phone number can start with an optional "+" sign'
    //     );
    //   });
    // // Make sure the URL does not change to the dashboard, indicating the form submission was blocked due to the error
    // cy.url().should('not.include', '/get-quote');
    // })

    it('Should Display Appropriate Error Messages', function() {
        cy.visit(Cypress.env('url') + "/register");
         //All Fields are Empty
        signupPage.getSubmitBtn().click();
        signupPage.getFieldErrorMessage().should('contain', 'Field cannot be empty');

        //Email Format is wrong
        signupPage.getFirstNameField().type(this.data.FirstName);
        signupPage.getLastNameField().type(this.data.LastName);
        signupPage.getEmailField().type(this.data.IncorrectMailFormat);
        signupPage.getFieldErrorMessage().should('contain', 'Enter valid email');

        //Password Format
        signupPage.getFirstNameField().clear().type(this.data.FirstName);
        signupPage.getLastNameField().clear().type(this.data.LastName);
        signupPage.getEmailField().clear().type(this.data.EmailAddress);
        signupPage.getConfirmPasswordField().clear();
        signupPage.getPasswordField().clear().type(this.data.WPassword);
        signupPage.getFieldErrorMessage().should('contain', 'Password must be atleast 8 character with at least one alphabet, one uppercase, one special character')


        //Password Fields Mismatch
        signupPage.getFirstNameField().clear().type(this.data.FirstName);
        signupPage.getLastNameField().clear().type(this.data.LastName);
        signupPage.getEmailField().clear().type(this.data.EmailAddress);
        signupPage.getPasswordField().clear().type(this.data.Password);
        signupPage.getConfirmPasswordField().clear().type(this.data.CPassword);
        signupPage.getSubmitBtn().click();
        signupPage.getFieldErrorMessage().should('contain', 'Confirm password must be the same as password');
    
      });

    it('Should Redirect to the Login Page', function(){
        cy.visit(Cypress.env('url') + "/register");
        signupPage.getLoginBtn().click();
        cy.url().should('include', '/login');
      })
})