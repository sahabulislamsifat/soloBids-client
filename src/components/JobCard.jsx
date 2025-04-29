/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { format } from "date-fns";

const JobCard = ({ job }) => {
  const {
    job_title,
    category,
    description,
    deadline,
    min_price,
    max_price,
    bid_count,
    _id,
  } = job || {};

  // console.log(job);

  return (
    <Link
      to={`/job/${_id}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          {/* Deadline: 28/05/2024 */}
          Deadline: {format(new Date(deadline), "P")}
        </span>

        {/* Web Development */}
        <p
          className={`px-3 py-1  ${
            category === "Web Development" && "text-blue-500 bg-blue-100/60"
          }
         ${category === "Graphics Design" && "text-green-500 bg-green-100/60"}
        ${
          category === "Digital Marketing" && "text-purple-500 bg-purple-100/60"
        } text-xs  rounded-full`}
        >
          {/* Web Development */}
          {category}
        </p>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">
          {/* E-commerce Website Development */}
          {job_title}
        </h1>

        <p className="mt-2 text-sm text-gray-600 ">
          {/* Dramatically redefine bleeding-edge infrastructures after
          client-focused value. Intrinsicly seize user-centric partnerships
          through out-of-the-box architectures. Distinctively. */}
          {description.substring(0, 115)}....
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: ${min_price} - ${max_price}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Total Bids: {bid_count}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
