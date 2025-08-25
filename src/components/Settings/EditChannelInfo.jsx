import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLink, deleteLink, updateLink, updateProfile } from "../../store/slices/authSlice";

function EditChannelInfo({ userData }) {
  const defaultValues = {
    username: userData?.username || "",
    description: userData?.description || "",
  };
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultValues);

  function handleLink(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let linkId = event.target;
    console.log("linkId: ", linkId);
    console.log("formData: ", formData);

    if (linkId) dispatch(updateLink({ linkId, formData }));
    else dispatch(addLink({ formData }));
  }
  function handleDeleteLink(event) {
    let linkId = event.target.dataset.linkId;
    dispatch(deleteLink(linkId));
  }

  const handleSaveChange = (event) => {
    event.preventDefault();

    let formData = {}; //= { username: data?.username, description: data?.description };
    if (defaultValues.username !== data.username) formData.username = data?.username;
    if (defaultValues.description !== data.description) formData.description = data?.description;

    dispatch(updateProfile(formData)).then((res) => {
      if (res.type != "auth/updateProfile/rejected") {
        setData(res.payload);
      }
    });
  };

  const handleCancle = () => setData(defaultValues);

  return (
    <div className="flex flex-wrap justify-center gap-y-4 mt-4">
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Channel Info</h5>
        <p className="text-gray-300">Update your Channel details here.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSaveChange} className="rounded-lg border">
          <div className="flex flex-wrap gap-y-4 p-4">
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="username">
                Username
              </label>
              <div className="flex rounded-lg border">
                <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">
                  playtube.com/
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent px-2 py-1.5"
                  id="username"
                  name="username"
                  placeholder="@username"
                  onChange={(e) => setData((pre) => ({ ...pre, username: e.target.value }))}
                  value={data?.username}
                />
              </div>
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="desc">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                rows="4"
                id="desc"
                name="description"
                defaultValue={data?.description}
                onChange={(e) => setData((pre) => ({ ...pre, description: e.target.value }))}
                placeholder="Channel Description"
              ></textarea>
              <p className="mt-0.5 text-sm text-gray-300">275 characters left</p>
            </div>

            {/* links */}
          </div>
          <hr className="border border-gray-300" />
          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              disabled={data == defaultValues}
              onClick={() => handleCancle()}
              className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={data == defaultValues}
              className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black disabled:cursor-not-allowed"
            >
              Save changes
            </button>
          </div>
        </form>                                                    
      </div>
    </div>
  );
}

export default EditChannelInfo;