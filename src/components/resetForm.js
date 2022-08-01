import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import "../../public/styles/recoverForm/index.scss";

export default function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("t");
  return (
    <div className="App">
      <ResetForm token={token}></ResetForm>
    </div>
  );
}

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestSent: false,
      responseData: {
        isSuccess: undefined,
        message: undefined,
      },
    };
  }

  renderResultMessage = () => {
    return (
      <div className="result_message">
        {this.state.responseData.isSuccess ? (
          <CheckCircleIcon className="success_logo" sx={{ fontSize: 70 }} />
        ) : (
          <ErrorIcon className="error_logo" sx={{ fontSize: 70 }} />
        )}
        <h2>{this.state.responseData.message}</h2>
        {this.state.responseData.isSuccess ? null : (
          <button
            onClick={this.handleReturn}
            className="button btn-form"
            type="button"
          >
            Return
          </button>
        )}
      </div>
    );
  };

  renderForm = () => {
    return (
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/,
              "Password must contain special characters and numbers"
            )
            .min(3, "Password must greater than 3 characters")
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match!")
            .required("Required"),
        })}
        onSubmit={this.handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="form">
            <div
              className={
                formik.touched.password && formik.errors.password
                  ? "input_group errorInput"
                  : "input_group"
              }
            >
              <input
                id="password"
                type="password"
                placeholder="New password"
                className="input_field"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="helper_text">{formik.errors.password}</div>
              ) : null}
            </div>
            <div
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "input_group errorInput"
                  : "input_group"
              }
            >
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="input_field"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="helper_text">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            {!formik.isSubmitting ? (
              <button type="submit" className="button btn-form">
                Reset Password
              </button>
            ) : (
              <div class="loader"></div>
            )}
          </form>
        )}
      </Formik>
    );
  };

  handleReturn = () => {
    const state = {
      requestSent: false,
      responseData: {
        isSuccess: undefined,
        message: undefined,
      },
    };
    this.setState(state);
  };

  handleSubmit = async (values, { setSubmitting }) => {
    // In Token remove first "/"
    console.log(this.props.token);
    let token = this.props.token.slice(1);
    console.log(token);

    const { password, confirmPassword } = values;
    const url = `https://winners-c8-bn-be-staging.herokuapp.com/api/auth/resetPassword/${token}`;
    const data = JSON.stringify({
      newPassword: password,
      confirmPassword: confirmPassword,
    });
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const resultData = await result.json();
      const responseData = {
        isSuccess: resultData.success,
        message: resultData.message,
      };
      this.setState({ responseData, requestSent: true });
      setSubmitting(false);
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      this.setState({ responseData, requestSent: true });
      setSubmitting(false);
    }
  };

  render() {
    return (
      <div className="form-body">
        <div className="form-container">
          <h2 className="form-header">Reset your password</h2>
          {this.state.requestSent
            ? this.renderResultMessage()
            : this.renderForm()}
        </div>
      </div>
    );
  }
}
