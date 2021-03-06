import React, { Component } from "react";
// Map properties in component to PropTypes
import PropTypes from "prop-types";
// To redirect from an action
import { withRouter } from "react-router-dom";
// Connect redux to this component
import { connect } from "react-redux";
// Import Register action
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in, redirect to dashboard
    // Disable ability to go to login or register page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // Get errors from redux state, map it to props, when we receive new properties and errors is included, set it to this component's state
  componentWillReceiveProps(nextProps) {
    // Test for errors property
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Call registerUser in authActions
  // Dispatch to reducer
  // Fill user object
  // Mapped auth state to a property in this component
  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Call Register action
    // Actions brought in are stored in props
    // Use this.props.history to redirect from within registerUser action instead of from this component
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// PropTypes.type.whetherrequired
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// To get auth state in component
// Put auth state in a property called auth so we can access it with this.props.auth.statething
//
// Filter to select which props are required by this component
// Selected props become this component's properties
// Needs connect() because mapStateToProps doesn't know where to grab the props from
//
const mapStateToProps = state => ({
  auth: state.auth,
  // state.auth here comes from root reducer (reducers index.js) so this sets auth to authReducer
  // Setting auth as a prop in this component
  errors: state.errors // Accessed as this.props.errors
});

// connect() passes the location (the store) of the props selected by mapStateToProps
// Don't need to import reducers
// Map auth state (authReducer.js) to store.js
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
