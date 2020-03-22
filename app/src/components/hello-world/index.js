import React from "react";
import PropTypes from "prop-types";

const HelloWorld = ({ title }) => <div>{title}</div>;

HelloWorld.propTypes = {
  title: PropTypes.string
};

export default HelloWorld;
