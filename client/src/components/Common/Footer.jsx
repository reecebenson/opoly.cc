import React from 'react';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

const Footer = () => (
  <Message>
    Opoly, <a href='//reece.biz' rel="noopener noreferrer" target='_blank'>rbDev</a> &copy;
    {+new Date().getFullYear()} <br />
    <small><Link to='/terms'>Terms and Conditions</Link></small>
  </Message>
);

export default Footer;
