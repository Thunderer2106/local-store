import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  })

  const { name, email, phone, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        phone,
        email,
        password,
      }

      dispatch(register(userData))

    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='items-center justify-center flex h-screen'>
        <div className='w-screen'>
          <section className='text-center mb-4'>
            <p className='text-[24px] nun-font-700'>Register</p>
          </section>
          <section className='text-center'>
            <form onSubmit={onSubmit}>
              <div className=''>
                <input
                  type='text'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='email'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='phone'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='phone'
                  name='phone'
                  value={phone}
                  placeholder='Enter your phone number'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='password'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
              <div className=''>
                <input
                  type='password'
                  className='border border-gray-300 focus:border-gray-900 duration-[300ms] rounded-lg w-[30%] px-4 py-2.5 mb-[15px] outline-none'
                  id='password2'
                  name='password2'
                  value={password2}
                  placeholder='Confirm password'
                  onChange={onChange}
                />
              </div>
              <div className='my-2'>
                <button className=' bg-black hover:scale-[1.01] duration-[300ms] text-white drop-shadow-2xl w-[10%] bg p-[10px] rounded-full nun-font-600 '>
                  Register
                </button>
              </div>
              <div className='text-[16px] nun-font-500'>
                Already have an account?
              </div>
              <Link className='text-[16px] hover:cursor-pointer nun-font-500' to='/' >
                Login</Link>
            </form>
          </section>
        </div>
      </div>
    </>
  )
}

export default Register
