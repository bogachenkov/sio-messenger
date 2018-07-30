import React from 'react';

const Editable = ({onChange, html}) => {
  return (
    <div
      className="Editable"
      contentEditable
      onInput={onChange}
      dangerouslySetInnerHTML={{__html: html}}
      ></div>
  );
};

export default Editable;