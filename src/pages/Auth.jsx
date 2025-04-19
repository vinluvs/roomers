
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_tenant: false,
    is_owner: false,
    tenant_data: {},
    owner_data: {},
  });

  const tenantFormRef = useRef();
  const ownerFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.is_tenant) {
      gsap.to(tenantFormRef.current, { height: 'auto', opacity: 1, duration: 0.5 });
    } else {
      gsap.to(tenantFormRef.current, { height: 0, opacity: 0, duration: 0.5 });
    }
    if (formData.is_owner) {
      gsap.to(ownerFormRef.current, { height: 'auto', opacity: 1, duration: 0.5 });
    } else {
      gsap.to(ownerFormRef.current, { height: 0, opacity: 0, duration: 0.5 });
    }
  }, [formData.is_tenant, formData.is_owner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('tenant_data.')) {
      setFormData({
        ...formData,
        tenant_data: { ...formData.tenant_data, [name.split('.')[1]]: value },
      });
    } else if (name.startsWith('owner_data.')) {
      setFormData({
        ...formData,
        owner_data: { ...formData.owner_data, [name.split('.')[1]]: value },
      });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup/', formData);
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="mt-20 min-h-screen flex items-center justify-center text-white ">
      <div class="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-[2px] shadow-md shadow-blue-300/50 ">

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-900 to-zinc-900 p-4 max-w-max space-y-4  "
      >
        <h2 className="text-2xl font-bold text-center">{isSignup ? 'Signup' : 'Login'} to Renters Vibe</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          onChange={handleChange}
        />

        {isSignup && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" name="is_tenant" onChange={handleChange} />
              <span className="ml-2">Register as Tenant</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="is_owner" onChange={handleChange} />
              <span className="ml-2">Register as Owner</span>
            </label>

            <div ref={tenantFormRef} className="overflow-hidden opacity-0 h-0 transition-all">
              <h3 className="text-lg mt-2 font-semibold">Tenant Info</h3>
              <input type="text" name="tenant_data.name" placeholder="Full Name" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.phone" placeholder="Phone" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.permanent_address" placeholder="Permanent Address" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.current_address" placeholder="Current Address" className="input" onChange={handleChange} />
              <input type="number" name="tenant_data.number_of_members" placeholder="Number of members" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.father_name" placeholder="Father Name" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.mother_name" placeholder="Mother Name" className="input" onChange={handleChange} />
              <input type="text" name="tenant_data.member_names" placeholder="Other Member Names" className="input" onChange={handleChange} />
            </div>

            <div ref={ownerFormRef} className="overflow-hidden opacity-0 h-0 transition-all">
              <h3 className="text-lg mt-2 font-semibold">Owner Info</h3>
              <input type="text" name="owner_data.name" placeholder="Owner Name" className="input" onChange={handleChange} />
              <input type="email" name="owner_data.email" placeholder="Owner Email" className="input" onChange={handleChange} />
              <input type="text" name="owner_data.phone" placeholder="Phone" className="input" onChange={handleChange} />
              <input type="text" name="owner_data.address" placeholder="Address" className="input" onChange={handleChange} />
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-xl">
          {isSignup ? 'Signup' : 'Login'}
        </button>
        <p className="text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-400 hover:text-emerald-500 font-semibold"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? 'Login' : 'Signup'}
          </button>
        </p>
      </form>
      </div>
    </div>
  );
}
