import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

/**
 * Custom hook to fetch and subscribe to real-time post updates from Firebase.
 * Posts are returned sorted by timestamp (newest first).
 * @returns {Array} [posts, loading]
 */
export const useRealtimePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to the 'posts' node in the Realtime Database
    const postsRef = ref(db, 'posts');

    // Set up the real-time listener (onValue)
    const unsubscribe = onValue(postsRef, (snapshot) => {
      setLoading(true); // Set loading true while processing new snapshot
      const data = snapshot.val();
      
      // Transform the Firebase object of objects into a sorted array of objects
      if (data) {
        const postsArray = Object.keys(data).map(key => ({
          id: key, // Use the Firebase key as the post ID
          ...data[key],
          // Ensure timestamp is a JS Date object for reliable sorting/formatting
          timestamp: data[key].timestamp
        }));

        // Sort posts by timestamp in descending order (newest first)
        postsArray.sort((a, b) => b.timestamp - a.timestamp);
        
        setPosts(postsArray);
      } else {
        setPosts([]);
      }
      
      setLoading(false);
    }, (error) => {
      console.error("Error fetching real-time posts:", error);
      // In a real app, you would handle this error state in the UI
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return [posts, loading];
};