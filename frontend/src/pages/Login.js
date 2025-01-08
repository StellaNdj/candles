import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchUserDetails, loginUser } from "../endpoints";
import { useNavigate } from "react-router-dom";

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
      login(tokenInfo.access);
      const userDetails = await fetchUserDetails({token: tokenInfo.access});
      setUser(userDetails);
      navigate('/')
    } catch (error) {
      setError('Login failed:', error)
    }
  }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label className="block text-sm/6 font-medium text-gray-900">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                />
            </div>
            <div>
                <label className="block text-sm/6 font-medium text-gray-900">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
                />
            </div>
            <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
);

}

export default Login;
