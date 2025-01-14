import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { updateProfile } from "../endpoints";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // State for form data with existing infos
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

    // Update the corresponding field in the form data
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
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <>
      <div className="flex justify-center m-8">
          <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-2xl">Edit Your Profile</h2>

          <label className="block font-medium text-gray-900 text-lg">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Phone:
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Street address:
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <label className="block font-medium text-gray-900 text-lg">
            Postal code:
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 border border-black"
            />
          </label>

          <Button text={'Update Profile'} type={'submit'}/>
        </form>
      </div>
    </>
  )
}

export default Profile;
