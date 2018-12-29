import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
  render() {
    const { post, auth } = this.props;
    // this.props.auth from mapStateToProps
    // this.props.post passed in from PostFeed component

    return <div>hi</div>;
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth // If current user owns post, able to delete
});

export default connect(mapStateToProps)(PostItem);
