import React from 'react';
import { useRealtimePosts } from '../hooks/useRealtimePosts';
import styles from '../styles/Feed.module.css';

const Feed = () => {
  const [posts, loading] = useRealtimePosts();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h2>Loading PetShare Feed...</h2>
        <p>Fetching the latest posts from the database.</p>
      </div>
    );
  }

  // EMPTY STATE
  if (posts.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>No Pets Shared Yet!</h2>
        <p>Be the first to create a post using the Post Creator above.</p>
      </div>
    );
  }

  // FEED
  return (
    <div className={styles.feedContainer}>
      <h2 className={styles.feedTitle}>Latest PetShare Posts</h2>

      <div className={styles.postsGrid}>
        {posts.map(post => (
          <div key={post.id} className={styles.postCard}>

            <div className={styles.postImageContainer}>
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className={styles.postImage}
              />
            </div>

            <div className={styles.postContent}>
              <p className={styles.postCaption}>{post.caption}</p>

              <div className={styles.postMetadata}>
                <p className={styles.postAuthor}>
                  Posted by: <strong>{post.authorEmail}</strong>
                </p>
                <p className={styles.postTimestamp}>
                  On: {formatTimestamp(post.timestamp)}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
