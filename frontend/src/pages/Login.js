import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserDetails, loginUser } from "../endpoints";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const tokenInfo = await loginUser({ username, password });
      console.log(tokenInfo.access);
      login(tokenInfo.access);
      const userDetails = await fetchUserDetails({token: tokenInfo.access});
      setUser(userDetails);
      navigate('/')
    } catch (error) {
      setError('Login failed:', error)
    }
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div>
        <h1 className="text-5xl font-bold bg-black text-white p-4">Login</h1>
        <div className="flex justify-center m-8">
          <form onSubmit={handleLogin}>
              <div>
                  <label className="block font-medium text-gray-900 text-lg">Username</label>
                  <input
                      type="text"
                      value={username}
                      placeholder="ex: Ling"
                      onChange={(e) => setUsername(e.target.value)}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>
              <div>
                  <label className="block font-medium text-gray-900 text-lg">Password</label>
                  <input
                      type="password"
                      value={password}
                      placeholder="ex: Your password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                  />
              </div>
              <div className="flex justify-center">
                <Button type={'submit'} text={'Login'}/>
              </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <p className='text-center text-gray-500'>Don't have an account? <button onClick={handleRegister} className='hover:underline'>Register</button></p>
    </div>
);

}

export default Login;
