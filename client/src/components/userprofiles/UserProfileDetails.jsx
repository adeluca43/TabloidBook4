import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../managers/userProfileManager";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
} from "../../managers/subscriptionManager";

export default function UserProfileDetails({ loggedInUser }) {
  const [userProfile, setUserProfile] = useState();
  const [subs, setSubs] = useState([]);
  const [allSubs, setAllSubs] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    getProfile(id).then(setUserProfile);
  }, [id]);

useEffect(() => {
  getAllSubscriptions().then(res => {
    setAllSubs(res);
    setSubs(res.filter(s => s.authorId == id));
  });
}, [id]);


  const handleSub = () => {
    const isSub = allSubs.find(
      (sub) => sub.subscriberId == loggedInUser.id && sub.authorId == id
    );
    if (isSub) {
      deleteSubscription(isSub.id).then(() => {
        getAllSubscriptions().then((res) => {
          setAllSubs(res);
          setSubs(res.filter((s) => s.authorId == id));
        });
      });
    } else {
      const subInfo = {
        SubscriberId: loggedInUser.id,
        AuthorId: parseInt(id),
      };

      createSubscription(subInfo).then(() => {
        getAllSubscriptions().then((res) => {
          setAllSubs(res);
          setSubs(res.filter((s) => s.authorId == id));
        });
      });
    }
  };
  if (!userProfile) {
    return null;
  }
  return (
    <>
      <img src={userProfile.imageLocation} alt={userProfile.firstName} />
      <h3>{userProfile.fullName}</h3>
      <p>Username: {userProfile.userName}</p>
      <button onClick={handleSub}>Sub</button>
      <p>Sub. Count: {subs.length}</p>
    </>
  );
}
