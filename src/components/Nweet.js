import { dbService } from "firebaseInstance";
import { doc, deleteDoc } from "firebase/firestore";

function Nweet({ nweetObj, isOwner }) {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
    }
  };

  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
}

export default Nweet;
