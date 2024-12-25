import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore";
import { auth ,db} from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import "./detail.css";

const Detail = () => {
  const {chatId , user ,isCurrentUserBlocked ,isReceiverBlocked , changeBlock} = 
  useChatStore();
  const {isCurrentUser} = useUserStore() ;

  const handleBlock =async () => {
    if(!user) return ;

    const userDocRef = doc(db ,"users" ,currentUser.id);

    try {
      await updateDoc(userDocRef,{
        blocked :isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar ||"src/public/avatar.png"} alt="" />
        <h2>{ user?.username }</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="src/public/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="src/public/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="src/public/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="src/public/arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="src/public/download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="src/public/download.png" alt="" className="icon" />
            </div>
            
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="src/public/arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ?" Oops!! You are blocked " : isReceiverBlocked ? "user blocked" :
          "Block user"
      }</button>
        <button className="logout" onClick={() => auth.signOut() }>Log Out</button>
      </div>
    </div>
  );
};

export default Detail;