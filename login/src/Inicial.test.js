import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Inicial from './Inicial';

describe('Inicial component', () => {
    test('renders Bem-vindo header', () => {
        render(
            <MemoryRouter>
                <Inicial />
            </MemoryRouter>
        );
        const headerElement = screen.getByText(/Bem-vindo/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('navigates to /cadastro when Cadastrar button is clicked', () => {
        let testLocation;
        render(
            <MemoryRouter initialEntries={['/']}>
                <Route path="*" render={({ location }) => (testLocation = location)} />
                <Inicial />
            </MemoryRouter>
        );

        const cadastroButton = screen.getByText(/Cadastrar/i);
        fireEvent.click(cadastroButton);

        expect(testLocation.pathname).toBe('/cadastro');
    });

    test('navigates to /login when Entrar button is clicked', () => {
        let testLocation;
        render(
            <MemoryRouter initialEntries={['/']}>
                <Route path="*" render={({ location }) => (testLocation = location)} />
                <Inicial />
            </MemoryRouter>
        );

        const loginButton = screen.getByText(/Entrar/i);
        fireEvent.click(loginButton);

        expect(testLocation.pathname).toBe('/login');
    });
});
