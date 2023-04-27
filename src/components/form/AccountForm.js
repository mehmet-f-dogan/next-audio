import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AccountForm = ({ setVisible }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const router = useRouter();

  const [inputValues, setInputValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  // Signup-form visibility toggling
  const toggleIsSignupVisible = () => {
    setInputValues(initialValues);
    setIsSignupVisible((prevState) => !prevState);
  };

  const auth = () => {
    setSubmitting(true);
    toast.dismiss();
    signIn("credentials", {
      redirect: false,
      method: isSignupVisible ? "signup" : "login",
      username: inputValues.username,
      password: inputValues.password,
    })
      .then((data) => {
        if (!data.ok) {
          toast.error("Invalid Username/Password", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setVisible(false);
          router.push("/all-products");
        }
      })
      .catch((error) => {
        toast.error("Server Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <div className="backdrop">
        <div className="modal_centered">
          <form id="account_form">
            {/*===== Form-Header =====*/}
            <div className="form_head">
              <h2>{isSignupVisible ? "Signup" : "Login"}</h2>
              <p>
                {isSignupVisible
                  ? "Already have an account ?"
                  : "New to NextAudio ?"}
                &nbsp;&nbsp;
                <button type="button" onClick={toggleIsSignupVisible}>
                  {isSignupVisible ? "Login" : "Create an account"}
                </button>
              </p>
            </div>

            {/*===== Form-Body =====*/}
            <div className="form_body">
              <div className="input_box">
                <input
                  type="text"
                  name="username"
                  className="input_field"
                  value={inputValues.username || ""}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      username: e.target.value,
                    });
                  }}
                  required
                />
                <label className="input_label">Username</label>
              </div>

              <div className="input_box">
                <input
                  type="password"
                  name="password"
                  className="input_field"
                  value={inputValues.password || ""}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      password: e.target.value,
                    });
                  }}
                  required
                />
                <label className="input_label">Password</label>
              </div>

              <button
                type="submit"
                className="btn login_btn"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault();
                  auth();
                }}
              >
                {isSignupVisible ? "Signup" : "Login"}
              </button>
            </div>

            {/*===== Form-Close-Btn =====*/}
            <div
              className="close_btn"
              title="Close"
              onClick={() => setVisible(false)}
            >
              &times;
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountForm;
