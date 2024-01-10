import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query Query {
    users {
      name
      password
    }
  }
`;

export default function useUsers() {
  const { data, loading, error } = useQuery(GET_USER);
  const users = data?.users;

  return [users, loading, error];
}
