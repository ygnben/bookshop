import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($password: String!, $username: String!) {
    signUp(password: $password, username: $username) {
      username
      password
    }
  }
`;

export default function useSignUp() {
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  //   const newMessage = data?.createOneMessage;

  return [signUp, loading, error];
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
