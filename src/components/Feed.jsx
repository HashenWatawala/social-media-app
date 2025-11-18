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
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading PetShare Feed...</h2>
        <p>Fetching the latest posts from the database.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No Pets Shared Yet!</h2>
        <p>Be the first to create a post using the Post Creator above.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: '0 10px',
      display: 'grid',
      gap: '20px'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Latest PetShare Posts</h2>
      
      {posts.map(post => (
        <div 
          key={post.id} 
          style={{ 
            border: '1px solid #ddd', 
            borderRadius: '10px', 
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            backgroundColor: 'white'
          }}
        >
          {/* Post Image */}
          <div style={{ height: '400px', overflow: 'hidden' }}>
            <img 
              src={post.imageUrl} 
              alt={post.caption} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          
          <div style={{ padding: '15px' }}>
            {/* Caption */}
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: '0 0 10px 0' }}>
              {post.caption}
            </p>
            
            {/* Metadata */}
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <p style={{ margin: '0' }}>
                Posted by: **{post.authorEmail}**
              </p>
              <p style={{ margin: '5px 0 0 0' }}>
                On: {formatTimestamp(post.timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;