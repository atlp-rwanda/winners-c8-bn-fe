import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as recoverActions from '../redux/actions/recoverFormActions';
import '../../public/styles/recoverForm/index.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

class RecoverForm extends Component {
  constructor(props) {
    super(props);
  }

  renderForm = () => {
    return (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required('Required'),
        })}
        onSubmit={this.props.SUBMIT}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="form">
            <div
              className={
                formik.touched.email && formik.errors.email
                  ? 'input_group errorInput'
                  : 'input_group'
              }
            >
              <input
                id="email"
                type="text"
                placeholder="Enter your email address"
                className="input_field"
                {...formik.getFieldProps('email')}
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
          <CheckCircleIcon className="success_logo" sx={{ fontSize: 30 }} />
        ) : (
          <div>
            <ErrorIcon
              className="error_logo"
              sx={{ fontSize: 30, color: 'red' }}
            />
          </div>
        )}

        <h2>{this.props.responseData.message}</h2>
        {this.props.responseData.isSuccess ? null : (
          <button
            onClick={this.props.RETURN()}
            className="button btn-form"
            type="button"
          >
            Return
          </button>
        )}
      </div>
    );
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

const { recoverEmail: SUBMIT, recoverReturn: RETURN } = recoverActions;

export default connect(mapStateToProps, { SUBMIT, RETURN })(RecoverForm);
