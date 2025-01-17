import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { updateProfile } from "../endpoints";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user[0]?.username || "",
    first_name: user[0]?.first_name || "",
    last_name: user[0]?.last_name || "",
    email: user[0]?.email || "",
    phone_number: user[0]?.phone_number || "",
    street_address: user[0]?.street_address || "",
    city: user[0]?.city || "",
    country: user[0]?.country || "",
    postal_code: user[0]?.postal_code || "",
    state: user[0]?.state || "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('accessToken');

    if (token) {
      await updateProfile({token, formData})
      alert('Profile updated!')
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <>
      <div className="flex top: 0.2rem; m-8 border p-8">
          <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-2xl text-center">Edit Your Profile</h2>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28" >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28" >
              First Name
            </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
              />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28" >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              Phone
            </label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className='font-medium text-lg flex w-full m-2'>
            <label className="mx-8 w-28" >
              Street address
            </label>
              <input
                type="text"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                required
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
              />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className="font-medium text-lg flex w-full m-2">
            <label className="mx-8 w-28">
              Postal code
            </label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </div>

          <div className='flex justify-center'>
            <Button text={'Update Profile'} type={'submit'}/>
          </div>
        </form>
      </div>
    </>
  )
}

export default Profile;
