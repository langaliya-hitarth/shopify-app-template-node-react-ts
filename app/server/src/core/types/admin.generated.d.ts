/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type ProductsCountQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ProductsCountQuery = { productsCount?: AdminTypes.Maybe<Pick<AdminTypes.Count, 'count'>> };

export type CreateProductAsynchronousMutationVariables = AdminTypes.Exact<{
  productSet: AdminTypes.ProductSetInput;
  synchronous: AdminTypes.Scalars['Boolean']['input'];
}>;


export type CreateProductAsynchronousMutation = { productSet?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id'>>, productSetOperation?: AdminTypes.Maybe<(
      Pick<AdminTypes.ProductSetOperation, 'id' | 'status'>
      & { userErrors: Array<Pick<AdminTypes.ProductSetUserError, 'code' | 'field' | 'message'>> }
    )>, userErrors: Array<Pick<AdminTypes.ProductSetUserError, 'code' | 'field' | 'message'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n  query productsCount {\n    productsCount {\n      count\n    }\n  }\n": {return: ProductsCountQuery, variables: ProductsCountQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation createProductAsynchronous($productSet: ProductSetInput!, $synchronous: Boolean!) {\n    productSet(synchronous: $synchronous, input: $productSet) {\n      product {\n        id\n      }\n      productSetOperation {\n        id\n        status\n        userErrors {\n          code\n          field\n          message\n        }\n      }\n      userErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n": {return: CreateProductAsynchronousMutation, variables: CreateProductAsynchronousMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
