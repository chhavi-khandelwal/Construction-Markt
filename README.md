# Construction-markt REACT-VITE APP

Features:

- List products by fetching from catalog(JSON)
- Filters by category
- Each Proudct acts as accordion to allow choosing further options with validations
- Cart that uses a slider to display products added
- Input to search products via search string
- Mobile first design
- Accessible

# External libs used

- Material UI
- Zustand
- Tailwind

# Setup

```bash
cd construction-marketplace
npm install
npm run dev
```

# tests - unit tests

```bash
npm run test
```

# Assumptions

- All products in the .json file are available and must be listed.
- Product categories will be received via API call from BE to display in filters
- Cart does not show any amount/cost right now.

# Further Improvements

- Query params for filters and search query
- Tests testing components and functionality
- Extracting static strings for Internationalisation
- Add a restiction on max number of product cards open at a time for clear visibility and better performance.
