import { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../firebaseConfig";

export default function PostCreator() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div style={styles.container}>
      <h2 style={styles.title}>Create a Post</h2>

      {/* Image Input */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Preview */}
      {preview && (
        <img src={preview} alt="preview" style={styles.preview} />
      )}

      {/* Caption */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={styles.textarea}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Uploading..." : "Post"}
      </button>
    </div>
  );
}

// Inline styles for clean UI
const styles = {
  container: {
    padding: "20px",
    width: "400px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  preview: {
    width: "100%",
    marginTop: "10px",
    borderRadius: "10px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#6200ee",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
