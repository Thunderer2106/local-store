import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { register,reset } from "../../features/auth/authSlice";




function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  const { name, email, phone, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        phone,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
          <div className="w-96 text-zinc-800 text-2xl leading-loose">
            Create an Account
          </div>
          <p className="text-neutral-500 text-xl  leading-normal pb-6">
            Hello there, Let’s start your journey with us.
          </p>
          <div className="flex flex-col justify-center items-start gap-6 ">
            <div>
              <input
                type="name"
                className="bg-neutral-100 w-96 h-12 rounded-lg border border-neutral-300"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={change}
              ></input>
            </div>
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
                type="phone"
                className="bg-neutral-100 w-96 h-12 rounded-lg border border-neutral-300"
                id="phone"
                name="phone"
                value={phone}
                placeholder="Enter your phone number"
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
            <div>
              <input
                type="password"
                className="bg-neutral-100 w-96 h-12 rounded-lg border border-neutral-300"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={change}
              ></input>
            </div>
          </div>
          <div
            onClick={onSubmit}
            className="w-96 h-12 my-4 bg-zinc-800 cursor-pointer rounded-lg justify-center items-center inline-flex"
          >
            <div
              className="w-16 h-7 text-center text-white text-base  leading-normal"
              onClick={onSubmit}
            >
              Sign in
            </div>
          </div>
          <div className="w-96 h-px bg-neutral-300" />
          <div className="flex flex-row pt-2  justify-center">
            <div className="text-neutral-500 text-sm font-normal font-['Outfit'] leading-none">
              Already have an Account?
            </div>
            <Link
              className="text-right ml-3 text-orange-500 text-sm font-semibold font-['Outfit'] leading-none"
              to="/"
            >
              Login now
            </Link>
          </div>
        </div>
      </div>
      {/* <div className='items-center justify-center flex h-screen'>
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
      </div> */}
    </>
  );
}

export default Register;
