import { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";

export default function PostCreator() {
  const { signOut } = useAuth();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      alert('Error signing out: ' + error.message);
    }
  };

  // Select image and show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload image to ImgBB
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("ImgBB upload failed");
    }

    return data.data.url;
  };

  // Save post to Firebase Realtime Database
  const savePostToDB = async (imageUrl) => {
    const postData = {
      imageUrl,
      caption,
      userId: auth.currentUser.uid,
      timestamp: Date.now(),
    };

    await push(ref(db, "posts"), postData);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!image) {
      alert("Please choose an image!");
      return;
    }
    if (!caption.trim()) {
      alert("Caption cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload image to ImgBB
      const imageUrl = await uploadToImgBB(image);

      // Step 2: Save post to Firebase DB
      await savePostToDB(imageUrl);

      // Reset form
      setCaption("");
      setImage(null);
      setPreview(null);

      alert("Post created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error while creating post.");
    }

    setLoading(false);
  };

  return (
    <div className="post-creator-container">
      <div className="post-creator-header">
        <h2 className="post-creator-title">Create a Post</h2>
        <button
          onClick={handleSignOut}
          className="sign-out-button"
        >
          Sign Out
        </button>
      </div>

      {/* Image Input */}
      <div className="image-input-container">
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
        <label htmlFor="image-input" className="image-input-label">
          Choose an Image
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div className="preview-container">
          <img src={preview} alt="preview" className="preview-image" />
        </div>
      )}

      {/* Caption */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="caption-textarea"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="submit-button"
      >
        {loading ? "Uploading..." : "Post"}
      </button>

      <style jsx>{`
        .post-creator-container {
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 15px;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }
        .post-creator-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .post-creator-title {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .sign-out-button {
          padding: 8px 16px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }
        .sign-out-button:hover {
          background-color: #c82333;
        }
        .image-input-container {
          margin-bottom: 20px;
        }
        .image-input {
          display: none;
        }
        .image-input-label {
          display: inline-block;
          padding: 10px 20px;
          background-color: #f0f0f0;
          color: #333;
          border: 2px dashed #ccc;
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        .image-input-label:hover {
          border-color: #6200ee;
          background-color: #f9f9f9;
        }
        .preview-container {
          margin-bottom: 20px;
        }
        .preview-image {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .caption-textarea {
          width: 100%;
          height: 100px;
          margin-bottom: 20px;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s ease;
        }
        .caption-textarea:focus {
          outline: none;
          border-color: #6200ee;
        }
        .submit-button {
          width: 100%;
          padding: 12px;
          background: #6200ee;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .submit-button:hover:not(:disabled) {
          background: #5000cc;
          transform: translateY(-2px);
        }
        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .post-creator-container {
            margin: 10px;
            padding: 15px;
          }
          .post-creator-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .post-creator-title {
            font-size: 1.3rem;
          }
          .sign-out-button {
            align-self: flex-end;
          }
          .image-input-label {
            padding: 8px 16px;
            font-size: 14px;
          }
          .caption-textarea {
            height: 80px;
          }
          .submit-button {
            padding: 10px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
