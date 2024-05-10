import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonLoader from "../Loader/ButtonLoader";
import "./UpdatempStyle.css";
import NavBar from "./Navbar";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  // eslint-disable-next-line
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    designation: "",
    mobileNo: "",
    gender: "Male",
    course: [],
    image: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employee/${employeeId}`);
        const { data } = response.data;

        setInitialData(data);
        setName(data.name);
        setEmail(data.email);
        setDesignation(data.designation);
        setMobileNo(data.mobileNo);
        setGender(data.gender);
        setCourse(data.course);
        setImage(data.image);
        console.log(data.image.split("base64,")[1]);
        
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Failed to fetch employee data.");
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const updateEmployeeSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedEmployeeData = {
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

      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/employee/${employeeId}`, updatedEmployeeData);

      setLoading(false);
      toast.success("Employee updated successfully");
      navigate("/employee-list");
    } catch (error) {
      setLoading(false);
      setError("Failed to update employee. Please try again.");
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
      <div className="updateEmployeeContainer updateEmployee">
        <form
          className="updateEmployeeForm updateEmployee"
          encType="multipart/form-data"
          onSubmit={updateEmployeeSubmitHandler}
        >
          <h1 style={{ margin: 0, padding: 0 }}>Update Employee</h1>

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
              required
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
            <label htmlFor="mca">
              <input
                type="checkbox"
                id="mca"
                name="course"
                value="MCA"
                checked={course.includes("MCA")}
                onChange={(e) =>
                  setCourse((prevCourse) =>
                    e.target.checked
                      ? [...prevCourse, e.target.value]
                      : prevCourse.filter((c) => c !== e.target.value)
                  )
                }
              />
              MCA
            </label>
            <label htmlFor="mba">
              <input
                type="checkbox"
                id="mba"
                name="course"
                value="MBA"
                checked={course.includes("MBA")}
                onChange={(e) =>
                  setCourse((prevCourse) =>
                    e.target.checked
                      ? [...prevCourse, e.target.value]
                      : prevCourse.filter((c) => c !== e.target.value)
                  )
                }
              />
              MBA
            </label>
            <label htmlFor="be">
              <input
                type="checkbox"
                id="be"
                name="course"
                value="BE"
                checked={course.includes("BE")}
                onChange={(e) =>
                  setCourse((prevCourse) =>
                    e.target.checked
                      ? [...prevCourse, e.target.value]
                      : prevCourse.filter((c) => c !== e.target.value)
                  )
                }
              />
              BE
            </label>
          </div>
          <div>
          <label htmlFor=""> Image:  </label>
          <img src={image} alt="" width={60}height={60} />
          </div>
          <div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button id="updateEmployeeBtn" type="submit" disabled={loading}>
            {loading && <ButtonLoader />} Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
