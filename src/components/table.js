import React from 'react';

const Table = ({
  queryCur,
  sortType,
  users,
  actAttr,
  activePage,
  maxRowsPerPage,
  activeUser,
  handleDelete,
  handleEdit,
  handleSort
}) => {
  const displayUser = (
    queryCur,
    sortType,
    users,
    actAttr,
    activePage,
    maxRowsPerPage
  ) => {
    return activeUser(queryCur, sortType, users, actAttr).slice(
      (activePage - 1) * maxRowsPerPage,
      activePage * maxRowsPerPage
    );
  };

  const showOrder = attr => {
    return (
      actAttr === attr &&
      (sortType === 1 ? (
        <i className='fas fa-arrow-up sort' />
      ) : (
        sortType === 2 && <i className='fas fa-arrow-down sort' />
      ))
    );
  };

  return (
    <div>
      <table className='table table-sm'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
            <th scope='col' id='firstname' onClick={e => handleSort(e)}>
              First Name {showOrder('firstname')}
            </th>
            <th scope='col' id='lastname' onClick={e => handleSort(e)}>
              Last Name {showOrder('lastname')}
            </th>
            <th scope='col' id='email' onClick={e => handleSort(e)}>
              Email {showOrder('email')}
            </th>
            <th scope='col' id='phoneNumber' onClick={e => handleSort(e)}>
              Phone Number {showOrder('phoneNumber')}
            </th>
          </tr>
        </thead>

        <tbody>
          {displayUser(
            queryCur,
            sortType,
            users,
            actAttr,
            activePage,
            maxRowsPerPage
          ).map(user => {
            return (
              <tr className='user' key={user._id}>
                <td>
                  <button
                    className='btn btn-outline-primary btn-sm'
                    onClick={e => handleEdit(user._id)}
                  >
                    <i className='fas fa-pen' /> Edit
                  </button>
                </td>
                <td>
                  <button
                    className='btn btn-outline-danger btn-sm'
                    onClick={e => handleDelete(user._id)}
                  >
                    <i className='fas fa-trash' /> Delete
                  </button>
                </td>
                <td>
                  <div className='table-data'>{user.firstname}</div>
                </td>
                <td>
                  <div className='table-data'>{user.lastname}</div>
                </td>
                <td>
                  <div className='table-data'>{user.email}</div>
                </td>
                <td>
                  <div className='table-data'>{user.phoneNumber}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div>{users.length}</div> */}
    </div>
  );
};

export default Table;