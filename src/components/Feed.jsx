import React from 'react';
import { useRealtimePosts } from '../hooks/useRealtimePosts';

const Feed = () => {
  const [posts, loading] = useRealtimePosts();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    // Firebase serverTimestamp() stores milliseconds since epoch.
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading PetShare Feed...</h2>
        <p>Fetching the latest posts from the database.</p>
        <style jsx>{`
          .loading-container {
            text-align: center;
            padding: 50px;
            font-family: 'Arial', sans-serif;
          }
          .loading-container h2 {
            color: #333;
            margin-bottom: 10px;
          }
          .loading-container p {
            color: #666;
          }
        `}</style>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="empty-container">
        <h2>No Pets Shared Yet!</h2>
        <p>Be the first to create a post using the Post Creator above.</p>
        <style jsx>{`
          .empty-container {
            text-align: center;
            padding: 50px;
            font-family: 'Arial', sans-serif;
          }
          .empty-container h2 {
            color: #333;
            margin-bottom: 10px;
          }
          .empty-container p {
            color: #666;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <h2 className="feed-title">Latest PetShare Posts</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            {/* Post Image */}
            <div className="post-image-container">
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="post-image"
              />
            </div>
            
            <div className="post-content">
              {/* Caption */}
              <p className="post-caption">{post.caption}</p>
              
              {/* Metadata */}
              <div className="post-metadata">
                <p className="post-author">Posted by: <strong>{post.authorEmail}</strong></p>
                <p className="post-timestamp">On: {formatTimestamp(post.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .feed-container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 0 20px;
          font-family: 'Arial', sans-serif;
        }
        .feed-title {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 2rem;
        }
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .post-card {
          border: 1px solid #ddd;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background-color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .post-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .post-image-container {
          height: 250px;
          overflow: hidden;
        }
        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .post-image:hover {
          transform: scale(1.05);
        }
        .post-content {
          padding: 20px;
        }
        .post-caption {
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0 0 15px 0;
          color: #333;
          line-height: 1.4;
        }
        .post-metadata {
          font-size: 0.9rem;
          color: #666;
        }
        .post-author {
          margin: 0 0 5px 0;
        }
        .post-timestamp {
          margin: 0;
        }
        @media (max-width: 768px) {
          .feed-container {
            padding: 0 10px;
          }
          .feed-title {
            font-size: 1.5rem;
          }
          .posts-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .post-image-container {
            height: 200px;
          }
          .post-content {
            padding: 15px;
          }
          .post-caption {
            font-size: 1.1rem;
          }
        }
        @media (max-width: 480px) {
          .post-image-container {
            height: 180px;
          }
          .post-content {
            padding: 10px;
          }
          .post-caption {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Feed;
