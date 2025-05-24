import { useEffect } from 'react';
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ProductCategory, useProductStore } from '../stores/productStore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Filters = () => {
  const {
    filterProducts,
    selectedCategories: categories,
    toggleCategory,
  } = useProductStore();

  useEffect(() => {
    filterProducts();
  }, [categories]);

  const renderFilters = () => (
    <div className="bg-white p-4 rounded md:shadow-md h-full flex md:flex-col">
      <Typography variant="h6" gutterBottom className="md:block hidden">
        Filter by Category
      </Typography>
      {Object.entries(ProductCategory).map(([_, category]) => (
        <FormControlLabel
          key={category}
          control={
            <Checkbox
              checked={categories.includes(category)}
              onChange={() => toggleCategory(category)}
              inputProps={{
                'aria-label': category,
                'aria-checked': categories.includes(category),
              }}
            />
          }
          label={category.charAt(0).toUpperCase() + category.slice(1)}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full md:w-60 md:mr-6 h-full">
      {/* Mobile filter toggle */}
      <div className="md:hidden z-30 bg-gray-100 md:p-2 md:border-b">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="filters"
          >
            <Typography component="span">Filter by category</Typography>
          </AccordionSummary>
          <AccordionDetails id="filters">{renderFilters()}</AccordionDetails>
        </Accordion>
      </div>

      {/* Desktop sticky sidebar */}
      <div className="hidden md:block h-full" id="desktop-filters">
        {renderFilters()}
      </div>
    </div>
  );
};

export default Filters;
