import {useTranslation} from 'react-i18next';

import {Box, Container, Skeleton, Typography} from '@mui/material';

import {ProductsTableProps} from './table';
import {ProductCard} from './product-card';

export const ProductsList = ({data, isLoading, doDeleteItem}: ProductsTableProps) => {
  const {t} = useTranslation(['common']);

  if (isLoading) {
    return (
      <Typography variant="body1">
        <Skeleton />
      </Typography>
    );
  }

  if (!data?.length) {
    return (
      <Typography variant="caption" fontSize="0.9rem">
        {t('common:noResults')}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{mt: 4}}>
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
        }}
      >
        {data.map(item => (
          <ProductCard key={item.productId} product={item} doDeleteItem={doDeleteItem} />
        ))}
      </Box>
    </Container>
  );
};
