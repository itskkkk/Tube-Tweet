import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { emptyVideosState, getVideo, updateView } from "../store/slices/videoSlice";
import { Comments, LikesComponent, LoginPopup, VideoPlayer, UserProfile } from "../components/index";
import { formatTimestamp } from "../utils/formatFigures";
import { 
    createPlaylist, 
    addVideoToPlaylist, 
    getCurrentPlaylists,
    removeVideoFromPlaylist,
} from '../store/slices/playlistSlice'
import { toast } from "react-toastify";

function VideoDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const loginPopupDialog = useRef();
  const playerRef = useRef(null);

  const { status: authStatus } = useSelector(({ auth }) => auth);
  const { loading, status, data: video } = useSelector(({ video }) => video);

  const {
    loading: playlistLoading,
    status: playlistStatus,
    data: playlists,
  } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (!videoId) return;
    dispatch(getVideo(videoId));
    dispatch(updateView(videoId));
    return () => dispatch(emptyVideosState());
  }, [videoId, navigate]);

  function handlePlaylistVideo(playlistId, status) {
    if (!playlistId && !status) return;

    if (status) dispatch(addVideoToPlaylist({ playlistId, videoId }));
    else dispatch(removeVideoFromPlaylist({ playlistId, videoId }));
  }

  function handleCreateNewPlaylist(eventObj) {
    eventObj.preventDefault();
    const name = eventObj.target.name.value;

    if (!name.trim()) return toast.error("Please enter the playlist name");

    dispatch(createPlaylist({ data: { name } })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(addVideoToPlaylist({ playlistId: res.payload?._id, videoId }));
      }
    });
  }

  function handleSavePlaylist() {
    if (authStatus) {
      dispatch(getCurrentPlaylists(videoId));
    } else {
      loginPopupDialog.current?.open();
    }
  }

  if (loading)
    return (
      <section className="w-full pb-[70px] sm:pb-0">
        {/* sm:ml-[70px] */}
        <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
          <div className="col-span-12 w-full">
            {/* video */}
            <div className="relative mb-4 w-full pt-[56%]">
              <div className="absolute inset-0">
                <div className="size-full bg-slate-100/10 rounded animate-pulse"></div>
              </div>
            </div>

            {/* video, Playlist, Like and owner data */}
            <div
              className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
              role="button"
              tabIndex="0"
            >
              <div className="flex flex-wrap gap-y-2">
                {/* video metadata */}
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                  <h1 className=" w-full h-9 text-transparent bg-slate-100/10 rounded animate-pulse"></h1>
                  <h1 className=" w-1/2 h-5 mt-3 text-transparent bg-slate-100/10 rounded animate-pulse"></h1>
                </div>
                {/* Like and playlist component */}
                <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                  <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                    <div className="relative block">
                      <div className="peer flex w-32 h-10 items-center gap-x-2 px-4 py-1.5 text-transparent bg-slate-100/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* owner metadata */}
              <UserProfile />
              <hr className="my-4 border-white" />
            </div>

            {/* comments */}
            <Comments videoId={video?._id} ownerAvatar={video?.owner?.avatar} />
          </div>

          {/* side video suggegtions */}
          <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
            <div className="w-full gap-x-2 border pr-2 md:flex">
              <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                <div className="w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <div className="bg-slate-100/10 rounded animate-pulse h-full w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                <div className="h-12 w-12 shrink-0 md:hidden">
                  <div className="bg-slate-100/10 animate-pulse h-full w-full rounded-full"></div>
                </div>
                <div className="w-full pt-1 md:pt-0">
                  <h6 className="mb-1 mt-2 text-sm w-full h-5 rounded font-semibold bg-slate-100/10 animate-pulse text-transparent"></h6>
                  <p className="mb-0.5 mt-2 w-2/3 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                  <p className="mb-0.5 mt-2 w-1/2 rounded h-4 text-sm bg-slate-100/10 animate-pulse text-transparent"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  if (!status || !video)
    return (
      <div className="flex w-full h-screen flex-col gap-y-4 px-16 py-4 rounded bg-slate-100/10 animate-pulse"></div>
    );

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: video?.videoFile,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return video && !loading ? (
    <section className="w-full pb-[70px] sm:pb-0">
      {/* sm:ml-[70px] */}
      <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
        <div className="col-span-12 w-full">
          {/* video */}
          <div className="relative mb-4 w-full pt-[56%] overflow-hidden">
            <div className="absolute inset-0">
              <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
            </div>
          </div>

          {/* video, Playlist, Like and owner data */}
          <div
            className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
            role="button"
            tabIndex="0"
          >
            <div className="flex flex-wrap gap-y-2">
              {/* video metadata */}
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <h1 className="text-lg font-bold">{video?.title}</h1>
                <p className="flex text-sm text-gray-200">
                  {video?.views} Views · {formatTimestamp(video?.createdAt)}
                </p>
              </div>
              {/* Like and playlist component */}
              <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                  {/* Likes*/}
                  <LikesComponent
                    videoId={video._id}
                    isLiked={video.isLiked}
                    totalLikes={video.totalLikes}
                    isDisLiked={video.isDisLiked}
                    totalDisLikes={video.totalDisLikes}
                  />
                  {/* Playlist */}
                  <div className="relative block">
                    <LoginPopup
                      ref={loginPopupDialog}
                      message="Sign in to Save video in Playlist..."
                    />
                    {/* Save to Playlist Button */}
                    <button
                      onClick={handleSavePlaylist}
                      className="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black"
                    >
                      <span className="inline-block w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          ></path>
                        </svg>
                      </span>
                      Save
                    </button>
                    {/* save to playlist popup */}
                    {/* OPTIMIZEME: FIX glitch and improve user experience */}
                    {authStatus && (
                      <div className="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                        <h3 className="mb-4 text-center text-lg font-semibold">Save to playlist</h3>
                        <ul className="mb-4">
                          {playlistLoading && (
                            <li className="mb-2 last:mb-0">
                              <label
                                className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                htmlFor="Collections-checkbox"
                              >
                                Please Wait...
                              </label>
                            </li>
                          )}
                          {playlists?.length > 0 &&
                            playlists?.map((item) => (
                              <li key={item._id} className="mb-2 last:mb-0">
                                <label
                                  className="group/label inline-flex cursor-pointer items-center gap-x-3"
                                  htmlFor={"Collections-checkbox" + item._id}
                                >
                                  <input
                                    type="checkbox"
                                    className="peer hidden"
                                    id={"Collections-checkbox" + item._id}
                                    defaultChecked={item.isVideoPresent}
                                    onChange={(e) =>
                                      handlePlaylistVideo(item._id, e.target.checked)
                                    }
                                  />
                                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="3"
                                      stroke="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                      ></path>
                                    </svg>
                                  </span>
                                  {item.name}
                                </label>
                              </li>
                            ))}
                        </ul>

                        {/* Create new playlist */}
                        <form onSubmit={handleCreateNewPlaylist} className="flex flex-col">
                          <label
                            htmlFor="playlist-name"
                            className="mb-1 inline-block cursor-pointer"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="playlist-name"
                            placeholder="Enter playlist name"
                            required
                            className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                          />
                          <button
                            type="submit"
                            className="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black"
                          >
                            Create new playlist
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* owner metadata */}
            <UserProfile userId={video?.owner?.username} />
            <hr className="my-4 border-white" />
            {/* description */}
            <div className="h-5 overflow-hidden group-focus:h-auto">
              <p className="text-sm">{video?.description}</p>
            </div>
          </div>

          <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
            <h6 className="font-semibold">Comments...</h6>
          </button>

          {/* comments */}
          {!loading && <Comments videoId={videoId} ownerAvatar={video?.owner?.avatar} />}
        </div>

        {/* side video suggegtions */}
        <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="JavaScript Fundamentals: Variables and Data Types"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  20:45
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  JavaScript Fundamentals: Variables and Data Types
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Code Master</p>
                <p className="flex text-sm text-gray-200">10.3k Views · 44 minutes ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Getting Started with Express.js"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  22:18
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">Getting Started with Express.js</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Express Learner</p>
                <p className="flex text-sm text-gray-200">11.k Views · 5 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Building a RESTful API with Node.js and Express"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  24:33
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Building a RESTful API with Node.js and Express
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">API Builder</p>
                <p className="flex text-sm text-gray-200">14.5k Views · 7 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Introduction to React Native"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  19:58
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">Introduction to React Native</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">React Native Dev</p>
                <p className="flex text-sm text-gray-200">10.9k Views · 8 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Creating Custom Hooks in React"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  16:37
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">Creating Custom Hooks in React</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Hook Master</p>
                <p className="flex text-sm text-gray-200">9.3k Views · 9 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Building Scalable Web Applications with Django"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  32:18
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Building Scalable Web Applications with Django
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Django Master</p>
                <p className="flex text-sm text-gray-200">18.9M Views · 12 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Creating Interactive UIs with React and D3"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  29:30
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Creating Interactive UIs with React and D3
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">ReactD3</p>
                <p className="flex text-sm text-gray-200">20.1k Views · 14 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Node.js Authentication with Passport.js"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  26:58
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Node.js Authentication with Passport.js
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Passport Pro</p>
                <p className="flex text-sm text-gray-200">21.2k Views · 15 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Data Visualization with Tableau"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  32:14
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">Data Visualization with Tableau</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Tableau Master</p>
                <p className="flex text-sm text-gray-200">24.5k Views · 18 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Building Real-Time Applications with Socket.IO"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  27:37
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Building Real-Time Applications with Socket.IO
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">Socket.IO Expert</p>
                <p className="flex text-sm text-gray-200">25.6k Views · 19 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Advanced CSS: Animations and Transitions"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  31:55
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">
                  Advanced CSS: Animations and Transitions
                </h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">CSS Animations</p>
                <p className="flex text-sm text-gray-200">28.9k Views · 22 hours ago</p>
              </div>
            </div>
          </div>
          <div className="w-full gap-x-2 border pr-2 md:flex">
            <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
              <div className="w-full pt-[56%]">
                <div className="absolute inset-0">
                  <img
                    src="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Advanced React Patterns"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  30:25
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
              <div className="h-12 w-12 shrink-0 md:hidden">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full pt-1 md:pt-0">
                <h6 className="mb-1 text-sm font-semibold">Advanced React Patterns</h6>
                <p className="mb-0.5 mt-2 text-sm text-gray-200">React Patterns</p>
                <p className="flex text-sm text-gray-200">30.1k Views · 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    // something wrong
    <div className="flex w-full h-screen flex-col gap-y-4 px-16 py-4 rounded bg-slate-100/10 animate-pulse"></div>
  );
}

export default VideoDetail;
                    