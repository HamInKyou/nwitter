import { authService, dbService } from "firebaseInstance";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nweet from "components/Nweet";

function Profile({ userObj }) {
  const [nweets, setNweets] = useState([]);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const nweetArr = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNweets(nweetArr);
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
