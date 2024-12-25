import "./userInfo.css"
import {useUserStore} from "../../../components/lib/userStore"

const Userinfo = () => {

  const {currentUser } = useUserStore()

  return (
    <div className='userInfo'>
        <div className="user">
            <img src={  currentUser.avatar ||"src/public/avatar.png"} alt="" />
            <h2>{currentUser .username}</h2>
             <div className="icons">
             <img src="src/public/more.png" alt="" />
            <img src="src/public/video.png" alt="" />
             <img src="src/public/edit.png" alt="" />
             </div>
        </div> 
    </div>
  )
}

export default Userinfo