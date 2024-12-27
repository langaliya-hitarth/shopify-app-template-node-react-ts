/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ProductsCountQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ProductsCountQuery = { productsCount?: AdminTypes.Maybe<Pick<AdminTypes.Count, 'count'>> };

export type CreateProductsMutationVariables = AdminTypes.Exact<{
  product: AdminTypes.ProductCreateInput;
}>;


export type CreateProductsMutation = { productCreate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id' | 'title'>>, userErrors: Array<Pick<AdminTypes.UserError, 'message' | 'field'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n  query productsCount {\n    productsCount {\n      count\n    }\n  }\n": {return: ProductsCountQuery, variables: ProductsCountQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation createProducts($product: ProductCreateInput!) {\n    productCreate(product: $product) {\n      product {\n        id\n        title\n      }\n      userErrors {\n        message\n        field\n      }\n    }\n  }\n": {return: CreateProductsMutation, variables: CreateProductsMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
