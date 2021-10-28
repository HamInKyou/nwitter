import { authService, dbService } from "firebaseInstance";
import { updateProfile } from "firebase/auth";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nweet from "components/Nweet";

function Profile({ userObj }) {
  const [nweets, setNweets] = useState([]);
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
