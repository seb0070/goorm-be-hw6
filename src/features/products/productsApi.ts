import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mapToProduct, mapToProducts } from './mapToProduct'
import type { FakeStoreApiProduct, Product } from './types'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      transformResponse: (raw: FakeStoreApiProduct[]) => mapToProducts(raw),
    }),
    getProductById: builder.query<Product | null, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (raw: FakeStoreApiProduct) => mapToProduct(raw),
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi
