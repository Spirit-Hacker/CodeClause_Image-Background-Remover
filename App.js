import { useState } from "react";
import "./App.css";

function App() {

  const [image, setImage] = useState(null);
  const [bgremove, setBgremove] = useState(null);

  // console.log(image);

  const changeBgHandler = () => {
    const apiKey = "kWa69XjFUxjTrbQXcaCW2uN4";
    const url = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", "auto");

    fetch(url, {
      method:'POST',
      headers:{
        'X-Api-Key':apiKey
      },
      body:formData
    }).then((res) => res.blob()).then((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => setBgremove(reader.result);
      reader.readAsDataURL(blob)
    }).catch((error) => console.error(error))
  }

  return(
    <div className="flex justify-center py-10 bg-richblack-800 text-white w-[100vw] h-[100vh]">
      <div className="flex flex-col mb-10 w-[70%] translate-x-52 h-[100%]">

        <h1 className="text-4xl font-semibold">Remove Backgroung Image</h1>

        <div className="flex h-[100%] mt-14 gap-7">

          <div className="my-4 flex flex-col">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="input-file" id="input-id"></input>
            <label htmlFor="input-id" className="">Upload File</label>

            <button className="px-4 py-2 rounded-md border cursor-pointer mt-5"
                  onClick={changeBgHandler}
            >
              Remove Background
            </button>
          </div>

          <div>
            {
              bgremove && (
                <img src={bgremove} alt="Remove Background"
                  className="w-[50%]"
                />
              )
            }
          </div>

        </div>

      </div>
    </div>
  )
}

export default App;
