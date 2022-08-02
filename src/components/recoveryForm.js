import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "../../public/styles/recoverForm/index.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

class RecoverForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      responseData: {
        isSuccess: undefined,
        message: undefined,
      },
    };
  }

  renderForm = () => {
    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Required"),
        })}
        onSubmit={this.handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="form">
            <div
              className={
                formik.touched.email && formik.errors.email
                  ? "input_group errorInput"
                  : "input_group"
              }
            >
              <input
                id="email"
                type="text"
                placeholder="Enter your email address"
                className="input_field"
                {...formik.getFieldProps("email")}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="helper_text">{formik.errors.email}</div>
              ) : null}
            </div>
            {!formik.isSubmitting ? (
              <button type="submit" className="button btn-form">
                Recover Password
              </button>
            ) : (
              <div class="loader"></div>
            )}
          </form>
        )}
      </Formik>
    );
  };

  renderResultMessage = () => {
    return (
      <div className="result_message">
        {this.state.responseData.isSuccess ? (
          <CheckCircleIcon className="success_logo" sx={{ fontSize: 70 }} />
        ) : (
          <div>
            <ErrorIcon
              className="error_logo"
              sx={{ fontSize: 70, color: "red" }}
            />
          </div>
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

  handleSubmit = async (values, { setSubmitting }) => {
    const url =
      "https://winners-c8-bn-be-staging.herokuapp.com/api/auth/requestPasswordReset";
    const email = values.email;
    const data = JSON.stringify({ email: email });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const resultData = await response.json();
      const responseData = {
        isSuccess: resultData.success,
        message: resultData.message,
      };

      this.setState({ responseData, emailSent: true });
      setSubmitting(false);
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      this.setState({ responseData, emailSent: true });
      setSubmitting(false);
    }
  };

  handleReturn = () => {
    const state = {
      emailSent: false,
      responseData: {
        isSuccess: undefined,
        message: undefined,
      },
    };
    this.setState(state);
  };

  render() {
    return (
      <div className="form-body">
        <div className="form-container">
          <h2 className="form-header">Forgot Password</h2>

          {this.state.emailSent
            ? this.renderResultMessage()
            : this.renderForm()}
        </div>
      </div>
    );
  }
}

export default RecoverForm;
