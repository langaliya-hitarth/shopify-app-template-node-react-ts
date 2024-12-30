import { useState } from 'react';
import { Card, Text, BlockStack, InlineStack, ButtonGroup, Button } from '@shopify/polaris';
import { useAppBridge } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

export function ProductsCard() {
  const shopify = useAppBridge();
  const { t } = useTranslation();
  const [isPopulating, setIsPopulating] = useState(false);
  const productsCount = 1;

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
  } = useQuery({
    queryKey: ['productCount'],
    queryFn: async () => {
      const response = await fetch('/api/products/count');
      return await response.json();
    },
    refetchOnWindowFocus: false,
  });

  const setPopulating = (flag: boolean) => {
    shopify.loading(flag);
    setIsPopulating(flag);
  };

  const handlePopulate = async () => {
    setPopulating(true);
    const response = await fetch('/api/products', { method: 'POST' });

    if (response.ok) {
      await refetchProductCount();

      shopify.toast.show(t('ProductsCard.productsCreatedToast', { count: productsCount }));
    } else {
      shopify.toast.show(t('ProductsCard.errorCreatingProductsToast'), {
        isError: true,
      });
    }

    setPopulating(false);
  };

  return (
    <Card roundedAbove='sm'>
      <BlockStack gap='500'>
        <BlockStack gap='200'>
          <Text as='h2' variant={'headingMd'}>
            {t('ProductsCard.title')}
          </Text>
          <Text as='p' variant='bodyMd'>
            {t('ProductsCard.description')}
          </Text>
        </BlockStack>
        <BlockStack gap='200'>
          <Text as='h4' variant={'headingSm'}>
            {t('ProductsCard.totalProductsHeading')}
          </Text>
          <Text variant='bodyMd' as='p' fontWeight='semibold'>
            {isLoadingCount ? '-' : data?.count}
          </Text>
        </BlockStack>
        <InlineStack align='end'>
          <ButtonGroup>
            <Button loading={isPopulating} onClick={handlePopulate}>
              {t('ProductsCard.populateProductsButton', {
                count: productsCount,
              })}
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
