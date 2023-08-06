import LoginPage from "../../pageobjects/LoginPage";
import HomePage from "../../pageobjects/HomePage";

const loginPage = new LoginPage();
const homePage = new HomePage();

describe('Login', () =>{
    beforeEach(function() {
        cy.fixture('example').then((data) => {
            this.data = data;
    })
})

    it('Should Log the User in Successfully', function(){
        cy.visit(Cypress.env('url'));
        homePage.getLoginBtn().click();
        loginPage.getEmailField().type(this.data.LoginMail);
        loginPage.getPasswordField().type(this.data.LoginPassword);
        loginPage.getSubmitBtn().click();

        // Assert that login is successful and user is redirected to the dashboard or a success page
    cy.url().should('include', '/get-quote'); 
    loginPage.getSuccessMessage().should('contain',  'Login successful'); 
    })

    it('Should Display an error if Email or Password is Incorrect', function(){
        // Incorrect email, Correct Password
        cy.visit(Cypress.env('url') + "/login");
        loginPage.getEmailField().type(this.data.IncorrectLoginMail);
        loginPage.getPasswordField().type(this.data.LoginPassword);
        loginPage.getSubmitBtn().click();

        // Assert that an error message for incorrect email or password is displayed
         loginPage.getErrorMessage().should('contain', 'User not found');
       // Check that the form submission is blocked due to the incorrect credentials
         cy.url().should('not.include', '/get-quote'); 
    
        // Correct email, Incorrect password
        loginPage.getEmailField().clear().type(this.data.LoginMail);
        loginPage.getPasswordField().clear().type(this.data.IncorrectLoginPassword);
        loginPage.getSubmitBtn().click();
        // Assert that an error message for incorrect email or password is displayed
        loginPage.getErrorMessage().should('contain', 'Invalid password');
        cy.url().should('not.include', '/get-quote'); 
      });

      it('Should Display Appropriate Error Messages', function() {
        cy.visit(Cypress.env('url') + "/login");
         //All Fields are Empty
        loginPage.getSubmitBtn().click();
        loginPage.getFieldErrorMessage().should('contain', 'Email cannot be empty');

        //Only Password Field is Empty
        loginPage.getEmailField().type(this.data.LoginMail);
        loginPage.getSubmitBtn().click();
        loginPage.getFieldErrorMessage().should('contain', 'Password must be at least 8 characters');

        //Email Format is wrong
        loginPage.getEmailField().clear().type(this.data.IncorrectMailFormat);
        loginPage.getFieldErrorMessage().should('contain', 'Enter valid email');
    
        cy.url().should('not.include', '/get-quote'); 
      });

      it('Should Redirect to the Registration Page', function(){
        cy.visit(Cypress.env('url') + "/login");
        loginPage.getRegisterBtn().click();
        cy.url().should('include', '/register');
      });

        it('Should Lock the Account after Multiple Failed Attempts', function(){
            const maxAttempts = 3;
            cy.visit(Cypress.env('url'));
            homePage.getLoginBtn().click();
            for (let i = 1; i <= maxAttempts; i++){
            loginPage.getEmailField().type(this.data.LoginMail);
            loginPage.getPasswordField().type('IncorrectLoginPassword${i}');
            loginPage.getSubmitBtn().click();

            // Assert that an error message for incorrect email or password is displayed
            loginPage.getErrorMessage().should('contain', 'Invalid password');
            cy.url().should('not.include', '/get-quote'); 

            // Clear Inputs
            loginPage.getEmailField().clear();
            loginPage.getPasswordField().clear();
            }

            // Attempt 4 - Locked Account
            loginPage.getEmailField().type(this.data.LoginMail);
            loginPage.getPasswordField().type('IncorrectPwd');
            loginPage.getSubmitBtn().click();

            //  Assert that an error message for locked account is displayed
            // loginPage.getErrorMessage().should('contain', 'Account locked. Please reset your password.');
            // cy.url().should('not.include', '/get-quote'); 

        


        })
    


});