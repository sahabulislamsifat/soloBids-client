import { format } from "date-fns";

// eslint-disable-next-line react/prop-types
const BidRequestTableRow = ({ bid, handleStatusSubmit }) => {
  const { job_title, offer_deadline, price, category, status, email, _id } =
    bid || {};

  return (
    <tr>
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* E-commerce Website Development */}
        {job_title}
      </td>
      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* instructors@programming-hero.com */}
        {email}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        {/* 28/05/2024 */}
        {format(new Date(offer_deadline), "P")}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
        ${price}
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-2">
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
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
            status === "Complete" && "bg-green-100/60 text-green-500"
          }
          ${status === "In Progress" && "bg-blue-100/60 text-blue-500"}
          ${status === "Pending" && "bg-yellow-100/60 text-yellow-500"}
          ${status === "Reject" && "bg-red-100/60 text-red-500"}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status === "Complete" && "bg-green-500"
            }
            ${status === "In Progress" && "bg-blue-500"}
            ${status === "Pending" && "bg-yellow-500"}
            ${status === "Reject" && "bg-red-500"} `}
          ></span>
          <h2 className="text-sm font-normal ">
            {/* Complete */}
            {status}
          </h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center gap-x-6">
          {/* Accept Button  */}
          <button
            disabled={status === "In Progress" || status === "Complete"}
            onClick={() => handleStatusSubmit(_id, status, "In Progress")}
            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          {/* Reject Button  */}
          <button
            disabled={status === "Reject" || status === "Complete"}
            onClick={() => handleStatusSubmit(_id, status, "Reject")}
            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BidRequestTableRow;
