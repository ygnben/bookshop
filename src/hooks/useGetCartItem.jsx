import { gql, useQuery } from "@apollo/client";

const GET_CART = gql`
  query CartItems {
    cartItems {
      book {
        createdAt
        desc
        id
        img
        title
        updatedAt
      }
      id
    }
  }
`;

export default function useCart() {
  const { data, loading, error } = useQuery(GET_CART);
  const cart = data?.cartItems;
  console.log(cart);

  return [cart, loading, error];
}
