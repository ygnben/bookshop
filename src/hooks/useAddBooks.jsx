import { gql, useMutation } from "@apollo/client";

const addToCart = gql`
  mutation Mutation($bookId: Int!, $qty: Int!) {
    addToCart(bookId: $bookId, qty: $qty) {
      book {
        id
        title
      }
    }
  }
`;

export default function useAddCart() {
  const [addCart, { loading, error }] = useMutation(addToCart);

  //   const newMessage = data?.createOneMessage;

  return [addCart, loading, error];
}

// import { gql, useMutation } from "@apollo/client";

// const CREATE_ONE_MESSAGE = gql`
//   mutation CreateOneMessage($body: String!, $userId: Int!) {
//     createOneMessage(body: $body, userId: $userId) {
//       id
//       body
//       createdAt
//     }
//   }
// `;

// export default function useCreateOneMessage() {
//   const [createMessage, { data, loading, error }] =
//     useMutation(CREATE_ONE_MESSAGE);
//   const newMessage = data?.createOneMessage;

//   return [createMessage, newMessage, loading, error];
// }
