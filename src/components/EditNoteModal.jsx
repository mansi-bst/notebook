import Modal from "@mui/material/Modal";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useNoteState} from "../contextapi/NoteState";

function EditNotesModal({
  open,
  setOpen,
  etitle,
  edescription,
  etag,
  eisPrivate,
  noteId
}) {

  const {updateNote} = useNoteState()

  const [isPrivate, setIsPrivate] = useState(eisPrivate);
  const [tags, setTags] = useState(
    etag.map((elm) => ({ label: elm, value: elm })),
  );
  const [title, setTitle] = useState(etitle);
  const [description, setDescription] = useState(edescription);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);

  const updateHandler = (e)=>{
   e.preventDefault()
   let tag = tags.map((elm)=>elm.value)
   updateNote({title, description, tag, isPrivate}, noteId, setOpen)
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <div className="flex lg:w-1/2 md:w-2/3 w-full bg-transparent flex-col items-center border-none ">
        {" "}
        <form className="w-full max-lg:w-full mb-0 space-y-4 rounded-lg min-w-2/3 p-4 shadow-sm sm:p-6 lg:p-8 bg-gray-100" onSubmit={updateHandler}>
          <div>
            <label className="block text-sm font-medium" htmlFor="title">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
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
              onChange={(e)=>setDescription(e.target.value)}
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
              id="files"
              onChange={(e)=>setImage(e.target.files[0])}
              className="px-3 py-6 border-2 border-dashed rounded-md"
            />
          </fieldset>
          <div className="flex mt-5 justify-between  gap-5">
            <button
              className="block max-sm:w-32 rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium cursor-pointer text-white"
              onClick={() => setOpen(false)}
            >
              Discard
            </button>
            <button className="block max-sm:w-32 cursor-pointer rounded-lg bg-rose-900 px-5 py-3 text-sm font-medium text-white" 
            onClick={()=>updateHandler()}>
              Update Notes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditNotesModal;
