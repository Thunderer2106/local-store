import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login,reset } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(isSuccess);
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/home");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const change = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex flex-row font-outfit">
        <div className="w-1/2">
          <img
            className="h-screen"
            src="/images/homeimage.png"
            alt="homeimage"
          ></img>
        </div>
        <div className="mx-auto my-auto items-center justify-center">
          <div className="w-96 text-zinc-800 text-2xl font-semibold leading-loose">
            Nice to see you again!
          </div>
          <div className="flex flex-col justify-center items-start gap-6 ">
            <div>
              <input
                type="email"
                className="bg-neutral-100 w-96 h-12 rounded-lg border border-neutral-300"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={change}
              ></input>
            </div>
            <div>
              <input
                type="password"
                className="bg-neutral-100 w-96 h-12 rounded-lg border border-neutral-300"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={change}
              ></input>
            </div>
          </div>
          <div
            onClick={onSubmit}
            className="w-96 h-12 my-4 bg-zinc-800 cursor-pointer rounded-lg justify-center items-center inline-flex"
          >
            <div
              className="w-16 h-7 text-center text-white text-lg  leading-normal"
              onClick={onSubmit}
            >
              Sign in
            </div>
          </div>
          <div className="w-96 h-px bg-neutral-300" />
          <div className="flex flex-row pt-2 text-lg justify-center">
            <div className="text-neutral-500  font-normal ">
              Dont have an Account?
            </div>
            <Link to="/register">
              <div className="text-right ml-3 text-orange-500 font-semibold  ">
                Register now
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='items-center justify-center flex h-screen'>
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
      </div> */}
    </>
  );
}

export default Login;
