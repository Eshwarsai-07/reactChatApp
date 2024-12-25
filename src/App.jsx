import Chat from "./components/chat/Chat"
import List from "./components/list/List"
import Detail from "./components/detail/Detail"
import Login from "./components/login/login"
import Notification from "./components/notification/notification"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./components/lib/firebase"
import { useUserStore } from "./components/lib/userStore"
import { useChatStore } from "./components/lib/chatStore"


const App = () => {

  const {currentUser , isLoading , fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()


  useEffect(() => {
    const unSub = onAuthStateChanged(auth ,(user) => {
      fetchUserInfo(user?.uid);
    })

    return () => {
      unSub();
    };
  },[fetchUserInfo]);

  console.log(currentUser)

  if(isLoading){
    return <div
    className="loading"
    >Loading...</div>
  }

  return (
    <div className='container'>
      {
        currentUser ? (
      <>
       <List/>
      { chatId && <Chat/>}
      { chatId && <Detail/>}
      </>
        ) : (
        <Login/>
      )}
      <Notification/>
    </div>
  )
}

export default App