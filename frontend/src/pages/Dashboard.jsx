import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { logout } from '../features/auth/authSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }



   
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const logoutHandler = () => {
    dispatch(logout())
  };

  const chatHandler = () => {
    console.log("chat");
    navigate('/chat');

  };

  return (
    <>
      <h1 className='mt-[60px] text-center'>Welcome {user && user.name}</h1>
      <button onClick={logoutHandler}>Logout</button>
      <button onClick={chatHandler}>Chats</button>
    </>
  )
}

export default Dashboard
