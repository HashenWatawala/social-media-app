import { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/PostCreator.module.css"; // <<--- CSS MODULE IMPORT

export default function PostCreator() {
  const { signOut } = useAuth();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      alert("Error signing out: " + error.message);
    }
  };

  // Image selection
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

  // Save post to Firebase
  const savePostToDB = async (imageUrl) => {
    const postData = {
      imageUrl,
      caption,
      userId: auth.currentUser.uid,
      timestamp: Date.now(),
    };

    await push(ref(db, "posts"), postData);
  };

  // Submit post
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
      const imageUrl = await uploadToImgBB(image);
      await savePostToDB(imageUrl);

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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Create a Post</h2>

          <button onClick={handleSignOut} className={styles.signOutButton}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Image Input */}
      <div className={styles.imageInputContainer}>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.imageInput}
        />

        <label htmlFor="image-input" className={styles.imageInputLabel}>
          Choose an Image
        </label>
      </div>

      {/* Preview Image */}
      {preview && (
        <div className={styles.previewContainer}>
          <img src={preview} alt="preview" className={styles.previewImage} />
        </div>
      )}

      {/* Caption */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className={styles.captionTextarea}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? "Uploading..." : "Post"}
      </button>
    </div>
  );
}
