import React , {Component}from 'react'
import {connect} from 'react-redux'


class LoaderSpinner extends Component {
  state = {  } 
  render() { 
    const {loading} = this.props
    if (!loading) return null
    return (
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    );
  }
}
 const mapStateToProps = (state) =>({loading: state.spinner.loading})
export default connect(mapStateToProps)(LoaderSpinner);