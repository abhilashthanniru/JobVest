import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCkdyuGEzr3-y9WxqV_wXaALvtr347C00",
  authDomain: "login-b5800.firebaseapp.com",
  projectId: "login-b5800",
  storageBucket: "login-b5800.appspot.com",
  messagingSenderId: "982956338931",
  appId: "1:982956338931:web:bcb4efa32cdbff00749186",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const formTitle = document.getElementById("formTitle");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const toggleSignIn = document.getElementById("toggleSignIn");
const toggleSignUp = document.getElementById("toggleSignUp");

toggleSignIn.addEventListener("click", () => {
  signupForm.style.display = "none";
  signinForm.style.display = "block";
  formTitle.textContent = "Sign In";
});

toggleSignUp.addEventListener("click", () => {
  signinForm.style.display = "none";
  signupForm.style.display = "block";
  formTitle.textContent = "Sign Up";
});


document.getElementById("signupButton").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (password.length < 6) {
    alert("❌ Password must be at least 6 characters long.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("✅ Account created successfully! Pleasse login");
      signupForm.style.display="none";
      signinForm.style.display="block";
      reset.style.display="none";
      formTitle.textContent="Sign In";
      document.getElementById("signupEmail").value = "";
      document.getElementById("signupPassword").value = "";
    })
    .catch((error) => {
      alert(`❌ something went wrong with credintials`);
    });
});


document.getElementById("signinButton").addEventListener("click", (event) => {
  event.preventDefault();

  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Logged in successfully!");
      reset.style.display="block"
      document.getElementById("signinEmail").value = "";
      document.getElementById("signinPassword").value = ""
      location.assign("./homepage.html")
    })
    .catch((error) => {
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            alert("❌ No user found or incorrect password. Please try again.");
          } else {
            alert("⚠️ Login failed. Please check your credentials and try again.");
          }
    });
});


const reset=document.getElementById("reset");
reset.addEventListener("click",(e)=>{
  e.preventDefault()
  const email = document.getElementById("signinEmail").value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("email sent");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})

let guest=document.getElementById("guestmode");
 guest.addEventListener("click",()=>{
  location.assign("./homepage.html")
  alert('your viewing direct website' )
 })

