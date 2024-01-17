import { gql, useMutation } from "@apollo/client";

const delCart = gql`
  mutation DeleteCart($deleteCartId: Int!) {
    deleteCart(id: $deleteCartId) {
      id
    }
  }
`;

export default function useDelCart(id) {
  const [delCartitem, { loading, error }] = useMutation(delCart, {
    variables: {
      deleteCartId: parseInt(id),
    },
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: "CartItem" });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });
  console.log("🚀 ~ useDelCart ~ id:", id);
  //   const newMessage = data?.createOneMessage;

  return [delCartitem, loading, error];
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
