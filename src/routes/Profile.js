import { authService } from "firebaseInstance";
import { useHistory } from "react-router-dom";

function Profile() {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
