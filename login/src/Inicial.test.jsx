import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Inicial from './Inicial';

describe('Testes para o componente Inicial', () => {
    beforeEach(() => {
        // Limpe todos os itens armazenados no local antes de cada teste
        localStorage.clear();
    });

    test('verifica se o Header é renderizado', () => {
        render(<Inicial />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('verifica se o Container1 é renderizado inicialmente', () => {
        render(<Inicial />);
        expect(screen.getByText(/container1/i)).toBeInTheDocument();
    });

    test('verifica se o Container2 é renderizado após o botão do Container1 ser clicado', () => {
        render(<Inicial />);
        fireEvent.click(screen.getByText(/buttonTextContainer1/i));
        expect(screen.getByText(/container2/i)).toBeInTheDocument();
    });

    // Similarmente, você pode adicionar mais testes para os outros containers

    test('verifica se o Footer é renderizado', () => {
        render(<Inicial />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
});
