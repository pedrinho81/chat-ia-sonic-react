import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App';

describe('App', async () => {
  it('should render the Chat'), () => {
    render(<App />)

    expect(screen.getByText('Olá, eu sou o Chat Sonic.')).toBeInTheDocument
  };

  it('should sender message'), () => {
    const { getByPlaceholderText, getByRole } = render(<App />);
    expect(screen.getByPlaceholderText('Escreva sua mensagem aqui.'))

    const input = getByPlaceholderText('Escreva sua mensagem aqui.');
    const submitBtn = getByRole('button')
    expect(getByRole('button')).toHaveAttribute('class', 'cs-button cs-button--send'); 
    fireEvent.change(input, { target: { value: 'nova mensagem' } });
    fireEvent.click(submitBtn); 
    expect(screen.getByText("nova mensagem")).toBeInTheDocument
  }
})