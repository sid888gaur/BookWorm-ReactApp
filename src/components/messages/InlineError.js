import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) =>(
	<p style={{ color: "ae5356"}}>{text}</p>
);

InlineError.propTypes = {
	text: PropTypes.string.isRequired
};

export default InlineError