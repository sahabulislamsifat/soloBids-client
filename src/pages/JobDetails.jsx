import axios from "axios";
import { compareAsc, format } from "date-fns";
import { useContext, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [job, setJob] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSingleJob = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/job-update/${id}`
    );
    // console.log(data.deadline);
    setJob(data);
    // setStartDate(new Date(data.deadline));
  };

  const {
    job_title,
    deadline,
    category,
    description,
    min_price,
    max_price,
    buyer,
    _id,
  } = job || {};

  // Place A  Bid
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const price = Number(form.price.value);
    const email = user?.email;
    const comment = form.comment.value;
    const jobId = _id;
    // const deadline = startDate;

    // 0. Check bid permissions validation
    if (user?.email === buyer?.email)
      return toast.error("Action not permitted!");

    // 1. Deadline crossed validation
    if (compareAsc(new Date(), new Date(deadline)) === 1)
      return toast.error("Deadline Crossed, Bidding Forbidden!");

    // 2. Price within maximum price range validation
    if (price > max_price)
      return toast.error("Offer less or at least equal to maximum price!");

    // 3. offered deadline is within sellers deadline validation
    if (compareAsc(new Date(startDate), new Date(deadline)) === 1)
      return toast.error("Offer a date within deadline");

    const bidData = {
      job_title,
      price,
      email,
      comment,
      offer_deadline: startDate,
      jobId,
      category,
      status: "Pending",
      buyer: buyer?.email,
    };

    try {
      // make a post request
      await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`, bidData);
      form.reset();
      toast.success("Bid Placed Successful");
      navigate("/my-bids");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          {deadline && (
            <span className="text-sm font-light text-gray-800 ">
              {/* Deadline: 28/05/2024 */}
              Deadline: {format(new Date(deadline), "P")}
            </span>
          )}
          <span
            className={`px-4 py-1  text-xs ${
              category === "Web Development" && "text-blue-500 bg-blue-100/60"
            }
            ${
              category === "Graphics Design" && "text-green-500 bg-green-100/60"
            }
            ${
              category === "Digital Marketing" &&
              "text-purple-500 bg-purple-100/60"
            } uppercase rounded-full `}
          >
            {/* Web Development */}
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {/* Web Development */}
            {job_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">
            {/* Dramatically redefine bleeding-edge infrastructures after
            client-focused value. Intrinsicly seize user-centric partnerships
            through out-of-the-box architectures. Distinctively. */}
            {description}
          </p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {buyer?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {buyer?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img
                referrerPolicy="no-referrer"
                // src="https://i.ibb.co.com/qsfs2TW/Ix-I18-R8-Y-400x400.jpg"
                src={buyer?.photo}
                alt=""
              />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Offer Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded focus:outline-none focus:ring-0"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
