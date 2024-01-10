import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($name: String!) {
    createOneUser(name: $name) {
      id
      name
    }
  }
`;

export default function useCreateOneUser() {
  const [createUserMutation, { loading, error }] = useMutation(SIGN_UP);
  const createUser = ({ name }, onCreateUserCompleted, onCreateUserError) => {
    createUserMutation({ variables: { name } })
      .then(({ data }) => onCreateUserCompleted(data.createOneUser))
      .catch((error) => onCreateUserError(error));
  };
  return [createUser, loading, error];
}
