import React from 'react';
const SingleUser = (props) => {
    const {id,name,email} = props.userInfo;
  return (
    <div className='border border 2 my-5 rounded rounded-3 bg-dark text-white pt-3'>
        <p>{id}</p>
        <p>{name}</p>
        <p>{email}</p>
    </div>
  )
}

export default SingleUser