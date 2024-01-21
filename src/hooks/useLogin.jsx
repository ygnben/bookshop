import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
    }
  }
`;

export default function useLogin() {
  const [Login, { data, loading, error }] = useMutation(LOGIN);
  const token = data?.token;
  // console.log("error", error);
  // , {
  //   variables: { name: "test", password: "test" },
  // }
  return [Login, token, loading, error];
}
