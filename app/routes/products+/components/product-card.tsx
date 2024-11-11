import {useTranslation} from 'react-i18next';
import {formatRelative} from 'date-fns';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';

import {AppButton} from '~/global/components/app-button';

import {ApiProduct} from '~/api-client/types';

export interface ProductCardProps {
  product: ApiProduct;
  doDeleteItem: (item: ApiProduct) => void;
}

export const ProductCard = ({product, doDeleteItem}: ProductCardProps) => {
  const {t} = useTranslation(['products', 'common']);

  return (
    <Card>
      <CardHeader
        title={product.title.en || product.title.ar}
        subheader={product.isActive ? 'Active' : 'Inactive'}
      />

      {product.image && (
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title.en || 'Product Image'}
        />
      )}

      <CardContent>
        <Typography variant="h6" color="text.primary">
          Price: ${Number(product.price).toLocaleString() || '---'}
          {product.priceSale && (
            <Typography variant="body2" color="textDisabled">
              {product?.priceSale ? '$' + Number(product.priceSale).toLocaleString() : '---'}
            </Typography>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatRelative(new Date(product.createdAt), new Date())}{' '}
        </Typography>
        {product.updatedAt && (
          <Typography variant="body2" color="text.secondary">
            {product.updatedAt && product.updatedAt !== product.createdAt
              ? formatRelative(new Date(product.updatedAt), new Date())
              : '---'}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <AppButton to={`/products/${product.productId}`} variant="contained">
          {t('common:edit')}
        </AppButton>
        <Button variant="text" onClick={() => doDeleteItem(product)}>
          <DeleteOutline />
        </Button>
      </CardActions>
    </Card>
  );
};
