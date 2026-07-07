import { use, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { BASEURLS } from "../BaseUrls";
import { successEmitter } from "../Toastify.Emmiter";

const CreateNote = () => {
  const [isPrivate, setIsPrivate] = useState(true);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const tag = tags.map((elm) => elm.value);

    try {
      const res = await fetch(`${BASEURLS}/note/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          isPrivate,
          tag: tag,
          image,
        }),
      });
      const data = await res.json();

      if (data.success) {
        successEmitter(data.message);
        setTitle("");
        setDescription("");
        setTags([]);
        setIsPrivate(true);
      } else {
        errorEmitter(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex px-6 flex-col items-center pb-16 bg-gray-100">
      <div className="mx-auto pt-12 max-w-xl text-center">
        <h1 className="text-3xl capitalize font-bold sm:text-5xl">
          Create note with
          <strong className="font-bold text-rose-700 py-3 sm:block">
            - safe and secure
          </strong>
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 w-1/2 max-lg:w-full mb-0 space-y-6 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8 bg-white"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium" htmlFor="title">
            Title <span className="text-rose-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 text-sm focus:border-rose-500"
            placeholder="Enter notes title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium" htmlFor="description">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 text-sm focus:border-rose-500"
            placeholder="Enter notes description"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm mb-2 font-medium">Tags</label>
          <CreatableSelect
            isMulti
            value={tags}
            onChange={setTags}
            placeholder="Type and press Enter..."
          />
        </div>

        {/* Toggle Private/Public */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {isPrivate ? "Private Note 🔒" : "Public Note 🌍"}
          </span>

          <button
            type="button"
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
              isPrivate ? "bg-rose-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
                isPrivate ? "translate-x-7" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Attachment */}
        <fieldset className="w-full space-y-1">
          <label htmlFor="files" className="block text-sm font-medium">
            Attachments
          </label>
          <input
            type="file"
            name="files"
            onChange={(e) => setImage(e.target.files[0])}
            id="files"
            className="px-3 py-6 border-2 border-dashed rounded-md"
          />
        </fieldset>

        {/* Buttons */}
        <div className="flex mt-5 justify-between gap-5">
          <button
            type="button"
            className="block max-sm:w-32 rounded-lg bg-rose-900 hover:bg-rose-950 px-5 py-3 text-sm font-medium text-white text-center"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="block max-sm:w-32 rounded-lg bg-rose-600 hover:bg-rose-700 px-5 py-3 text-sm font-medium text-white"
          >
            Add Notes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
