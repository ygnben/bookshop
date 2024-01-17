import { gql, useMutation, useQuery } from "@apollo/client";

const GET_LIKE = gql`
  query Query {
    likeItems {
      userId
      id
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

export default function useLikeItem() {
  const { data, loading, error } = useQuery(GET_LIKE);

  //   const newMessage = data?.createOneMessage;

  return [data, loading, error];
}
