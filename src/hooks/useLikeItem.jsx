import { gql, useMutation, useQuery } from "@apollo/client";

const GET_LIKE = gql`
  {
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
  const { data, loading, error, refetch } = useQuery(GET_LIKE);

  //   const newMessage = data?.createOneMessage;

  return [data, loading, error, refetch];
}
