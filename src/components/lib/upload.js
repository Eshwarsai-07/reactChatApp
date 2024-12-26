import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file, progressCallback) => {
  try {
    if (!file || !(file instanceof File)) {
      throw new Error("Invalid file provided for upload.");
    }

    const date = new Date().toISOString().replace(/[:.]/g, "-");
    const storageRef = ref(storage, `images/${date}-${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progressCallback) {
            progressCallback(progress);
          }
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error during upload:", error);
          reject(`Upload failed: ${error.message} (${error.code})`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(`Failed to get download URL: ${error.message}`);
            });
        }
      );
    });
  } catch (err) {
    console.error("Error in upload function:", err);
    throw err;
  }
};

export default upload;
