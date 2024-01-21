import { gql, useMutation, useQuery } from "@apollo/client";

// const GET_LIKE = gql`
//   {
//     likeItems {
//       userId
//       id
//       book {
//         createdAt
//         desc
//         id
//         img
//         title
//         updatedAt
//       }
//     }
//   }
// `;

const GET_LIKE = gql`
  query LikeItems {
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

export default function useLikeItem() {
  const { data, loading, error } = useQuery(GET_LIKE);

  //   const newMessage = data?.createOneMessage;

  return [data, loading, error];
}
