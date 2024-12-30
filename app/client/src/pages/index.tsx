import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { ProductsCard } from '../components';

export default function HomePage() {
  return (
    <Page>
      <TitleBar title={import.meta.env.VITE_APP_NAME} />
      <Layout>
        <Layout.Section variant={'fullWidth'}>
          <ProductsCard></ProductsCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
