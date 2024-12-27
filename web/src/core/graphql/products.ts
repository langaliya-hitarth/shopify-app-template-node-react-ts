const productsCount = `#graphql
  query productsCount {
    productsCount {
      count
    }
  }
`;

const productCreate = `#graphql
  mutation createProducts($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product {
        id
        title
      }
      userErrors {
        message
        field
      }
    }
  }
`;

export { productsCount, productCreate };
