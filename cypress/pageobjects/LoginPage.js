class LoginPage{
    getEmailField(){
        return cy.get("input[placeholder='you@email.com']");
    }

    getPasswordField(){
        return cy.get("input[placeholder='***************']");
    }

    getSubmitBtn(){
        return cy.get("button[width='100%']");
    }

    getSuccessMessage(){
        return cy.get('.sc-idiyUo');
    }

    getErrorMessage(){
       return cy.get('.sc-idiyUo');
    }

    getFieldErrorMessage(){
        return cy.get('.error-message');
    }

    getRegisterBtn(){
        return cy.get('.alternative-account-button-text');
    }
}
export default LoginPage;