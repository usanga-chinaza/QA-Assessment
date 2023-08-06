class SignUpPage{
    getFirstNameField(){
        return cy.get("input[placeholder='First name']");
    }

    getLastNameField(){
        return cy.get("input[placeholder='Last name']");
    }

    getEmailField(){
        return cy.get("input[placeholder='Email Address']");
    }
    getPasswordField(){
        return cy.get("input[placeholder='Password']");
    }
    getConfirmPasswordField(){
        return cy.get("input[placeholder='Confirm Password']")
    }

    getSubmitBtn(){
        return cy.get("button[width='100%']");
    }

    getErrorMessage(){
        return cy.get('.sc-idiyUo');
     }
 
     getFieldErrorMessage(){
         return cy.get('.error-message');
     }

    getLoginBtn(){
        return cy.get('.alternative-account-button-text');
    }
}
export default SignUpPage;