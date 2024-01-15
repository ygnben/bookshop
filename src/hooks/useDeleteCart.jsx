import { gql, useMutation } from "@apollo/client";

const delCart = gql`
  mutation DeleteCart($deleteCartId: Int!) {
    deleteCart(id: $deleteCartId) {
      id
    }
  }
`;

export default function useDelCart(id) {
  const [delCart, { loading, error }] = useMutation(delCart, {
    variables: {
      deleteCartId: id,
    },
  });

  //   const newMessage = data?.createOneMessage;

  return [delCart, loading, error];
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
