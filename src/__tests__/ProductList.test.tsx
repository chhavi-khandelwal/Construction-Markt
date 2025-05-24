import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import { vi, test, expect, beforeEach, afterEach } from 'vitest';
import productCatalog from './product-catalog.json';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(productCatalog),
      })
    )
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('lists all products', async () => {
  render(<App />);

  const searchInput = screen.getByPlaceholderText(/search products.../i);
  expect(searchInput).toBeInTheDocument();

  const productCards = await screen.findAllByRole('region', {
    name: /product/i,
  });

  expect(productCards.length).toBe(6);
});

test('expand each Product', async () => {
  render(<App />);

  const productCards = await screen.findAllByRole('region', {
    name: /product/i,
  });
  productCards.forEach((card) => {
    const { getByRole } = within(card);

    // Find the "Collapsed" button inside the card
    const toggleButton = getByRole('button', { name: /collapsed/i });
    expect(toggleButton).toBeInTheDocument();

    // Click to expand the card
    fireEvent.click(toggleButton);
    const addButton = screen.getByRole('button', { name: /add to cart/i });

    // Now the category text should be visible
    expect(addButton).toBeInTheDocument();
    const expandedButton = getByRole('button', { name: /expanded/i });
    expect(expandedButton).toBeInTheDocument();
    fireEvent.click(expandedButton);
  });
});
