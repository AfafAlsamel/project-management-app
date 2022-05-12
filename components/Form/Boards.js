// import React from 'react'
// import {useCollection} from "react-firebase-hooks/firestore";
// import { db } from '../../firebase';
// import BoardShow from './BoardShow';

// const Boards = () => {
//     const[realtimeBoards] = useCollection(db.collection("Boards").orderBy("timestamp","desc"));
//   return (
//     <div>
//       {realtimeBoards.docs.map(board=>(
//           <BoardShow
//             key={board.id}
//             title={board.data().title}
//             select={board.data().select}
//           />
//       ))}
//     </div>
//   )
// }

// export default Boards
