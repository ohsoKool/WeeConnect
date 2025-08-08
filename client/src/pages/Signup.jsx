import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userName", form.userName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("mobile", form.mobile);
      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}weeConnect/api/user/register/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Signup successful");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data); // Log full backend error
      alert(
        error.response?.data?.message ||
          JSON.stringify(error.response?.data) ||
          "Error during signup"
      );
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        name="userName"
        placeholder="Enter your Name"
        value={form.userName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Enter your mobile number"
        value={form.mobile}
        onChange={handleChange}
        required
      />
      <div className="file-row">
        <label htmlFor="avatar" className="file-btn">
          Choose File
        </label>

        <input
          id="avatar"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }} // hide native input
        />

        <span className="file-name">
          {form.avatar ? form.avatar.name : "No file chosen"}
        </span>
      </div>

      <button id="btn-submit-form" type="submit">
        Sign up
      </button>
    </form>
  );
};
