import { DocumentData } from "firebase/firestore";
import { Logout } from "../../Components";
import { useOutletContext } from "react-router-dom";
const Profile: React.FC = () => {
  const userDetails: DocumentData = useOutletContext();
  // const [userDetails, setUserDetails] = useState<DocumentData>({});

  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     console.log(user);
  //     if (user) {
  //       const docRef = doc(db, "Users", user.uid);
  //       const userdoc = await getDoc(docRef);
  //       const userData = userdoc.data();
  //       if (userData) {
  //         console.log(typeof userData);

  //         setUserDetails(userData);
  //       }
  //     }
  //   });
  // };
  // useEffect(() => {
  //   fetchUserData();
  // }, [auth]);
  return (
    <div className="flex justify-center border p-2 rounded-md w-fit border-blue-200">
      {userDetails ? (
        <div className="">
          <div>{userDetails.userName}</div>
          <div>{userDetails.email}</div>
          <Logout />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Profile;
