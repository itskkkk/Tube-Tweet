import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutChannel } from "../../store/slices/userSlice";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatFigures";

const AboutChannel = ({ owner = false }) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  // let channelId = useSelector((state) => state.user.userData?._id);
  // let currentUserId = useSelector((state) => state.auth.userData?._id);
  const aboutChannel = useSelector((state) => state.user.userData?.about);

  // console.log("username from params:", username);
  // console.log("aboutChannel data:", aboutChannel);
  // console.log("full userData:", useSelector((state) => state.user.userData));

  useEffect(() => {
    if(username) {
      dispatch(getAboutChannel(username))
    }
  }, [username, dispatch]);

  if (!aboutChannel) {
    return (
      <div className=" text-white px-6 py-4 mt-3 rounded-lg shadow-lg text-transparent w-full h-full bg-slate-100/10 animate-pulse">
        <div className="flex items-center mb-2">
          <h2 className="text-3xl w-56 h-10 bg-slate-100/10 animate-pulse rounded-lg"></h2>
        </div>

        <div className="mb-4">
          <h2 className=" w-1/2 h-6 bg-slate-100/10 animate-pulse rounded-lg"></h2>
        </div>

        {/* Channel Details */}
        <div className="mb-6">
          <div className=" w-40 h-9 mb-3 bg-slate-100/10 animate-pulse rounded-lg"></div>
          <div className="ml-1 mb-[6px] flex">
            <div className="font-bold inline-block h-6 w-6 mr-2 bg-slate-100/10 animate-pulse rounded-full"></div>
            <div className=" w-48 h-6 bg-slate-100/10 animate-pulse rounded-lg"></div>
          </div>
          <div className="ml-1 mb-[6px] flex">
            <div className="font-bold inline-block h-6 w-6 mr-2 bg-slate-100/10 animate-pulse rounded-full"></div>
            <div className=" w-48 h-6 bg-slate-100/10 animate-pulse rounded-lg"></div>
          </div>
          <div className="ml-1 mb-[6px] flex">
            <div className="font-bold inline-block h-6 w-6 mr-2 bg-slate-100/10 animate-pulse rounded-full"></div>
            <div className=" w-48 h-6 bg-slate-100/10 animate-pulse rounded-lg"></div>
          </div>
          <div className="ml-1 mb-[6px] flex">
            <div className="font-bold inline-block h-6 w-6 mr-2 bg-slate-100/10 animate-pulse rounded-full"></div>
            <div className=" w-48 h-6 bg-slate-100/10 animate-pulse rounded-lg"></div>
          </div>
          <div className="ml-1 mb-[6px] flex">
            <div className="font-bold inline-block h-6 w-6 mr-2 bg-slate-100/10 animate-pulse rounded-full"></div>
            <div className=" w-48 h-6 bg-slate-100/10 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-white px-8 py-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-semibold">@{aboutChannel.username}</h2>
      </div>

      <div className="mb-4">
        <p className="ml-1">{aboutChannel.description}</p>
      </div>

      {/* Channel Details */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3">Channel Details</h3>
        <p className="ml-1 mb-[6px]">
          <span className="font-bold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </span>{" "}
          <a
            href={`mailto:${aboutChannel.email}`}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            {aboutChannel.email}
          </a>
        </p>
        <p className="ml-1 mb-[6px]">
          <span className="font-bold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </span>{" "}
          <a
            href={`/user/${aboutChannel.username}`}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            {`https/playtube/user/${aboutChannel.username}`}
          </a>
        </p>
        <p className="ml-1 mb-[6px]">
          <span className="font-semibold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </span>{" "}
          <span>
            <span className="font-semibold">{aboutChannel.totalVideos}</span> Videos
          </span>
        </p>
        <p className="ml-1 mb-[6px]">
          <span className="font-semibold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="lucide lucide-eye"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>{" "}
          <span>
            <span className="font-semibold">{aboutChannel.totalViews}</span> Views
          </span>
        </p>
        <p className="ml-1 mb-[8px]">
          <span className="font-semibold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </span>{" "}
          <span>
            <span className="font-semibold">{aboutChannel.totalTweets}</span> Tweets
          </span>
        </p>
        <p className="ml-1 mb-[6px]">
          <span className="font-bold inline-block h-4 w-6 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </span>{" "}
          <span>
            Joined on <span className="font-semibold">{formatDate(aboutChannel.createdAt)}</span>
          </span>
        </p>
      </div> 
    </div>
  );
};

export default AboutChannel;