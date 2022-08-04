import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import recoverActions from "../redux/actions/recoverFormActions";
import "../../public/styles/recoverForm/index.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

class RecoverForm extends Component {
  constructor(props) {
    super(props);
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
              <div className="loader"></div>
            )}
          </form>
        )}
      </Formik>
    );
  };

  renderResultMessage = () => {
    return (
      <div className="result_message">
        {this.props.responseData.isSuccess ? (
          <CheckCircleIcon className="success_logo" sx={{ fontSize: 70 }} />
        ) : (
          <div>
            <ErrorIcon
              className="error_logo"
              sx={{ fontSize: 70, color: "red" }}
            />
          </div>
        )}

        <h2>{this.props.responseData.message}</h2>
        {this.props.responseData.isSuccess ? null : (
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

      this.props.SUBMIT({ responseData, emailSent: true });
      setSubmitting(false);
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      this.props.SUBMIT({ responseData, emailSent: true });
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
    this.props.RETURN(state);
  };

  render() {
    return (
      <div className="form-body">
        <div className="form-container">
          <h2 className="form-header">Forgot Password</h2>

          {this.props.emailSent
            ? this.renderResultMessage()
            : this.renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    emailSent: state.recover.emailSent,
    responseData: state.recover.responseData,
  };
};

const { submit: SUBMIT, return: RETURN } = recoverActions;

export default connect(mapStateToProps, { SUBMIT, RETURN })(RecoverForm);
