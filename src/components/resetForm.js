import React, { Component } from "react";
import { connect } from "react-redux";
import resetActions from "../redux/actions/resetFormActions";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import "../../public/styles/recoverForm/index.scss";

function App(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("t");

  return (
    <div className="App">
      <ResetForm token={token} redux={props}></ResetForm>
    </div>
  );
}

class ResetForm extends Component {
  constructor(props) {
    super(props);
  }

  renderResultMessage = () => {
    return (
      <div className="result_message">
        {this.props.redux.state.responseData.isSuccess ? (
          <CheckCircleIcon className="success_logo" sx={{ fontSize: 70 }} />
        ) : (
          <ErrorIcon className="error_logo" sx={{ fontSize: 70 }} />
        )}
        <h2>{this.props.redux.state.responseData.message}</h2>
        {this.props.redux.state.responseData.isSuccess ? null : (
          <button
            onClick={this.props.redux.RETURN()}
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
              <div className="loader"></div>
            )}
          </form>
        )}
      </Formik>
    );
  };

  handleSubmit = (values, { setSubmitting }) => {
    // In Token remove first "/"
    let token = this.props.token.slice(1);
    this.props.redux.SUBMIT(values, setSubmitting, token);
  };

  render() {
    return (
      <div className="form-body">
        <div className="form-container">
          <h2 className="form-header">Reset your password</h2>
          {this.props.redux.state.requestSent
            ? this.renderResultMessage()
            : this.renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: {
      requestSent: state.reset.requestSent,
      responseData: state.reset.responseData,
    },
  };
};

const { submit: SUBMIT, return: RETURN } = resetActions;
export default connect(mapStateToProps, { SUBMIT, RETURN })(App);
