import { memo } from 'react';
import { ICategory } from '../../types'
import { AccordionSummary, Typography, Accordion, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLORS } from '../../theme/colors';
import { DishComponent } from '../dish/dish.component';

interface IProps {
  category: ICategory;
}

export const CategoryItemComponent: React.FC<IProps> = memo(({ category }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container sx={{ flexDirection: 'column' }}>
          <Typography variant='h6' fontWeight={600}>{category.name}</Typography>
          <Typography sx={{ color: COLORS.GRAY }}>{category.description}</Typography>
        </Grid>
      </AccordionSummary>
    <AccordionDetails sx={{ px: 1, pb: 1 }}>
      <Grid container sx={{ flexDirection: 'column', gap: 1.5 }}>
        {category.dishes.map((dish) => <Grid key={dish.id} item><DishComponent dish={dish} /></Grid>)}
      </Grid>
    </AccordionDetails>
  </Accordion>
  )
})