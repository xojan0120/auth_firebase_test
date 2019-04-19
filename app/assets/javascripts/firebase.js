// ----------------------------------------------------------------------------------------------------------------------------
// Firebase documents
// ----------------------------------------------------------------------------------------------------------------------------
// * Firebase Guide
//   https://firebase.google.com/docs/auth/web/google-signin?hl=ja
// * Manage Users
//   https://firebase.google.com/docs/auth/web/manage-users?hl=ja
// * Firebase Source
//   https://github.com/firebase/firebaseui-web
// * 認証プロバイダ向け
//   https://developers.google.com/identity/protocols/googlescopes?hl=ja

// ----------------------------------------------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------------------------------------------
const csrfTokenObj = () => {
  return { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content') };
}

const authorizationObj = (idToken) => {
  return { "Authorization": `Bearer ${idToken}` };
}

const railsLogin = (isNewUser, idToken) => {
  const url = isNewUser ? "/accounts" : "/login";
  const headers = Object.assign(csrfTokenObj(), authorizationObj(idToken));
  $.ajax({url: url, type: "POST", headers: headers})
    .done((data) => { console.log("Rails login!")      })
    .fail((data) => { console.log("Rails login failed!") });
}

const railsLogout = () => {
  $.ajax({url: "/logout", type: "DELETE", headers: csrfTokenObj()})
    .done((data) => { console.log("Rails logout!")      })
    .fail((data) => { console.log("Rails logout failed!") });
}

const railsUserDelete = () => {
  $.ajax({url: '/accounts', type: "DELETE", headers: csrfTokenObj()})
    .done((data) => { console.log("Rails user delete!")      })
    .fail((data) => { console.log("Rails user delete failed!") });
}

const firebaseLogin = () => {
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        authResult.user.getIdToken(true)
          .then((idToken) => { railsLogin(authResult.additionalUserInfo.isNewUser, idToken) })
          .catch((error)  => { console.log(`Firebase getIdToken failed!: ${error.message}`) });
        return false;
      },
      uiShown: () => { document.getElementById('loader').style.display = 'none' }
    },
    signInFlow: 'redirect',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      },
    ],
  };
  ui.start('#firebaseui-auth-container', uiConfig);
}

const firebaseLogout = () => {
  firebase.auth().signOut()
    .then(()       => { railsLogout() })
    .catch((error) => { console.log(`Firebase logout failed!: ${error.message}`) });
}

const firebaseUserDelete = () => {
  firebase.auth().currentUser.delete()
    .then(()       => { railsUserDelete() })
    .catch((error) => { console.log(`Firebase user delete failed!: ${error.message}`) });
}

// ----------------------------------------------------------------------------------------------------------------------------
// Functions for debug
// ----------------------------------------------------------------------------------------------------------------------------
const decodeJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
};

const checkIdToken = () => {
  firebase.auth().currentUser.getIdToken(true)
    .then((idToken) => { console.log(idToken) })
    .catch((error)  => { console.log(`Firebase getIdToken failed!: ${error.message}`) });
}

// ----------------------------------------------------------------------------------------------------------------------------
// Initialize Firebase
// ----------------------------------------------------------------------------------------------------------------------------
// reference => https://firebase.google.com/docs/web/setup?hl=ja
const config = {
  apiKey:            "<your-api-key>",
  authDomain:        "<your-auth-domain>"
};
firebase.initializeApp(config);
