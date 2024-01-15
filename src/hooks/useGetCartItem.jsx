import { gql, useQuery } from "@apollo/client";

const GET_CART = gql`
  query CartItems {
    cartItems {
      book {
        catagory
        createdAt
        desc
        id
        img
        price
        title
        updatedAt
      }
    }
  }
`;

export default function useCart() {
  const { data, loading, error } = useQuery(GET_CART);
  const cart = data?.cartItems;
  console.log(cart);

  return [cart, loading, error];
}
