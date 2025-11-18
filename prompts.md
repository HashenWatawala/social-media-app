1. Generate client/src/firebaseConfig.js using Firebase Web SDK v9 (modular). Read config from environment variables (REACT_APP_...). Initialize app and export auth, db, and a helper serverTs() for timestamps.

2. Generate AuthContext.jsx using React Context that uses onAuthStateChanged (Firebase v9) and exports useAuth() hook. Also create SignUp.jsx and SignIn.jsx components using email/password. Include basic validation and error handling and redirect on success.

3. Generate PostCreator.jsx that allows an authenticated user to choose an image and caption. On submit: upload the image via /upload Cloud Function (POST multipart/form-data), receive imageUrl, then write a post to db under /posts/{pushId} with fields: imageUrl, caption, authorId, authorEmail, timestamp (server timestamp). Use Firebase v9 modular DB functions.

4. Create useRealtimePosts.js hook which subscribes to /posts ordered by timestamp (desc) using onValue or onChildAdded, returns [posts, loading]. Also create Feed.jsx that shows image, caption, authorEmail, and formatted date.