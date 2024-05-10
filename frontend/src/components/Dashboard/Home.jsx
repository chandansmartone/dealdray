import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import "./style.css";
import NavBar from "./Navbar";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const NewEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState(""); // Updated state for designation
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [course, setCourse] = useState([]); // Updated state for course as an array of selected courses
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const createEmployeeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const employeeData = {
        name,
        email,
        designation,
        mobileNo,
        gender,
        course,
        image,
      };
      const token = 'Bearer ' + localStorage.getItem('accessToken');

      axios.defaults.headers['authorization'] = token;

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/employee`, employeeData);

      setLoading(false);
      toast.success("Employee created successfully");
      navigate("/employee-list");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("Failed to create employee. Please try again.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <NavBar />
      <div className="newEmployeeContainer newEmployee">
        <form
          className="createEmployeeForm newEmployee"
          encType="multipart/form-data"
          onSubmit={createEmployeeSubmitHandler}
        >
          <h1 style={{ margin: 0, padding: 0 }}>Create Employee</h1>

          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Mobile Number"
              required
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>

            <div>
            Gender:
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              checked={gender === "Other"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>


          <div>
            Course:
         
              <input
                type="checkbox"
                value="MCA"
                checked={course.includes("MCA")}
                onChange={(e) =>
                  setCourse((prevCourses) =>
                    e.target.checked
                      ? [...prevCourses, e.target.value]
                      : prevCourses.filter((course) => course !== "MCA")
                  )
                }
              />
              <label>
              MCA
            </label>
            
              <input
                type="checkbox"
                value="MBA"
                checked={course.includes("MBA")}
                onChange={(e) =>
                  setCourse((prevCourses) =>
                    e.target.checked
                      ? [...prevCourses, e.target.value]
                      : prevCourses.filter((course) => course !== "MBA")
                  )
                }
              />
              <label>
              MBA
            </label>
           
              <input
                type="checkbox"
                value="BE"
                checked={course.includes("BE")}
                onChange={(e) =>
                  setCourse((prevCourses) =>
                    e.target.checked
                      ? [...prevCourses, e.target.value]
                      : prevCourses.filter((course) => course !== "BE")
                  )
                }
              />
               <label>
              BE
            </label>
          </div>

          <div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button id="createEmployeeBtn" type="submit" disabled={loading}>
            {loading && <ButtonLoader />} Create
          </button>
        </form>
      </div>
    </>
  );
};

export default NewEmployee;
