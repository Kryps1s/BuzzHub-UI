import { render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../app/components/loginForm';

 const getTestProps = (testLoginCallback) => {
        return {
            login: testLoginCallback,
            loginErrorMessage: "test error message",
            loading: false
        }
    }

describe('LoginForm', () => {
    it('has login button', () => {

        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
    
        const {container } = render(<LoginForm {...testProps} />);
        const logIn = screen.getByText("Login")
        const loginButton = container.querySelector('#loginButton');
        expect(logIn).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('has username', () => {

        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
    
        render(<LoginForm {...testProps} />);
        const username = screen.getByText("Username")
        expect(username).toBeInTheDocument();
    });
    it('has password', () => {

        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
        render(<LoginForm {...testProps} />);
        const password = screen.getByText("Password")
        expect(password).toBeInTheDocument();
    });

    it('has error message', async() => {
        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
    
        render(<LoginForm {...testProps} />);
        console.log(screen.debug());
         // Use waitFor to wait for the element to appear in the DOM
         await waitFor(() => {
            const errorMessage = screen.getByText(testProps.loginErrorMessage)
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('does not show spinner when loading is false',async () => {
        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
    
        const {container } = render(<LoginForm {...testProps} />);
        await waitFor(() => {
            const elementWithId = container.querySelector('#loginLoader');
        expect(elementWithId).not.toBeInTheDocument();
        })
        
    });

    it('shows spinner when loading is true', async () => {
        const testLoginCallback = () => {
            console.log("testLoginCallback");
        }
        const testProps = getTestProps(testLoginCallback);
        testProps.loading = true;
        const {container } = render(<LoginForm {...testProps} />);
        await waitFor(() => {
        const elementWithId = container.querySelector('#loginLoader');
        expect(elementWithId).toBeInTheDocument();
        });
    });

    it('calls loginCallback when login button is clicked', async () => {
        const testLoginCallback = jest.fn();
        const testProps = getTestProps(testLoginCallback);
        const {container } = render(<LoginForm {...testProps} />);
        const loginButton = container.querySelector('#loginButton');
        loginButton.click();
        await waitFor(() => {
            expect(testLoginCallback).toHaveBeenCalledTimes(1);
        });
    });

    it('calls loginCallback with username and password when login button is clicked', async () => {
        const testLoginCallback = jest.fn();
        const testProps = getTestProps(testLoginCallback);
        const {container } = render(<LoginForm {...testProps} />);
        const loginButton = container.querySelector('#loginButton');
        loginButton.click();
        await waitFor(() => {
            expect(testLoginCallback).toHaveBeenCalledWith("","");
        });
    });

    it('disables login button when loading is true', async () => {
        const testLoginCallback = jest.fn();
        const testProps = getTestProps(testLoginCallback);
        testProps.loading = true;
        const {container } = render(<LoginForm {...testProps} />);
        const loginButton = container.querySelector('#loginButton');
        expect(loginButton).toBeDisabled();
    });
       
});