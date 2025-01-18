import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { register, fetchUserDetails } from "../endpoints";
import { AuthContext } from "../contexts/AuthContext";


const Register = () => {
  const {login, setUser} = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register(registerForm);

      if (token) {
        // Automatically log the user in
        login(token.access);
        const userDetails = await fetchUserDetails({ token: token.access });
        setUser(userDetails);
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log('Registration failed')
    }
  }

  return(
    <div>
        <h1 className="text-5xl font-bold bg-black text-white p-4">Register</h1>
        <div className="flex justify-center m-8">
          <form onSubmit={handleRegister}>
              <div>
                  <label className="block font-medium text-gray-900 text-lg">Username</label>
                  <input
                      type="text"
                      name='username'
                      value={registerForm.username}
                      placeholder="ex: Ling"
                      onChange={handleFormChange}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>
              <div>
                  <label className="block font-medium text-gray-900 text-lg">First name</label>
                  <input
                      type="text"
                      name='first_name'
                      value={registerForm.first_name}
                      placeholder="ex: Lingling"
                      onChange={handleFormChange}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>

              <div>
                  <label className="block font-medium text-gray-900 text-lg">Last name</label>
                  <input
                      type="text"
                      name='last_name'
                      value={registerForm.last_name}
                      placeholder="ex: Kwong"
                      onChange={handleFormChange}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>

              <div>
                  <label className="block font-medium text-gray-900 text-lg">Email</label>
                  <input
                      type="email"
                      name='email'
                      value={registerForm.email}
                      placeholder="ex: ling@cls.com"
                      onChange={handleFormChange}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>

              <div>
                  <label className="block font-medium text-gray-900 text-lg">Password</label>
                  <input
                      type="password"
                      name='password'
                      value={registerForm.password}
                      placeholder="ex: Your password"
                      onChange={handleFormChange}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>
              <div className="flex justify-center">
                <Button type={'submit'} text={'Register'}/>
              </div>
          </form>
        </div>
        <p className='text-center text-gray-500'>Already have an account? <button onClick={handleLogin} className='hover:underline'>Log in</button></p>
    </div>
  )
}

export default Register;
