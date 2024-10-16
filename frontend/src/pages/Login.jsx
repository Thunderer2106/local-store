import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

import { Link } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    console.log(isSuccess)
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/home')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='items-center justify-center flex h-screen'>
        <div className='w-screen'>
          <section className='text-center mb-4'>
            <p className='text-[24px] nun-font-700'>Login to your Account</p>
          </section>

          <section className='text-center'>
            <form onSubmit={onSubmit}>
              <div className=''>
                <input
                  type='email'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='password'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms]  rounded-lg w-[70%] md:w-[30%] px-4 py-2.5 my-[15px] outline-none'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>

              <div className='my-2'>
                <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl py-[10px] px-[20px]  rounded-full nun-font-600 '>
                  Login
                </button>
              </div>
            </form>

            <div className='text-[16px] mt-2 nun-font-500'>
              Don't have an account?
            </div>
            <Link to='/register' >
              <span className='text-[16px] hover:cursor-pointer nun-font-500  hover:scale-[1.05] duration-[300ms] ' >

                Register now

              </span>

            </Link>

          </section>
        </div>
      </div>
    </>
  )
}

export default Login
