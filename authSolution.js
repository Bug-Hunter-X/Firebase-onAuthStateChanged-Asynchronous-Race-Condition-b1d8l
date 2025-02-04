// Solution using async/await
async function handleAuth() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Wait for user data to fully load
        const userData = await getUserData(user.uid);
        resolve({user, userData});
      } else {
        resolve(null);
      }
    }, reject);
  });
}
async function runApp() {
  const authResult = await handleAuth();
  if (authResult) {
    // Access user and userData safely
    console.log('Authenticated user:', authResult.user);
    console.log('User data:', authResult.userData);
  } else {
    console.log('User is not authenticated.');
  }
}
runApp();

//Helper function to fetch user data
async function getUserData(uid) {
  return await firebase.database().ref(`/users/${uid}`).once('value').then(snapshot => snapshot.val());
}