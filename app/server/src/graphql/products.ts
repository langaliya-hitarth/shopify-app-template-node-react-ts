const productsCount = `#graphql
  query productsCount {
    productsCount {
      count
    }
  }
`;

const productCreate = `#graphql
  mutation createProductAsynchronous($productSet: ProductSetInput!, $synchronous: Boolean!) {
    productSet(synchronous: $synchronous, input: $productSet) {
      product {
        id
      }
      productSetOperation {
        id
        status
        userErrors {
          code
          field
          message
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export { productsCount, productCreate };
