import { gql, useMutation } from "@apollo/client";

const addToLike = gql`
  mutation AddLike($bookId: Int!) {
    addLike(bookId: $bookId) {
      id
    }
  }
`;

const GET_LIKE = gql`
  {
    likeItems {
      userId
      id
      book {
        createdAt
        desc
        id
        img
        title
        updatedAt
      }
    }
  }
`;

export default function useLike() {
  const [addLike, { loading, error }] = useMutation(addToLike, {
    refetchQueries: [{ query: GET_LIKE }],
  });

  //   const newMessage = data?.createOneMessage;

  // function MyComponent() {
  //   const [createBook, { data }] = useMutation(CREATE_BOOK, {
  //     refetchQueries: [{ query: GET_BOOKS }],
  //   });

  return [addLike, loading, error];
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
