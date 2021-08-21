import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser, initEdit } from '../redux/action-creators/users';
import { getUser } from '../redux/action-creators/users';
import { setAlert } from '../redux/action-creators/alert';
import { Loading, Alert } from './utils';
// import axios from 'axios';

const EditUser = ({
  setAlert,
  editUser,
  alertContent,
  history,
  editSuccess,
  match,
  isLoading,
  isGetting,
  initEdit,
  getUser,
  user,
  error,
  getError
}) => {
  const id = match.params.userId;
//   const stdSex = ['f', 'm', 'female', 'male'];

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeat: ''
  });

  // const getUserById = (id, setUserData) => {
  //   axios
  //     .get(`http://localhost:5000/api/users/${id}`)
  //     .then(res => {
  //       setUserData({
  //         ...userData,
  //         firstname: res.data.firstname,
  //         lastname: res.data.lastname,
  //         sex: res.data.sex,
  //         age: res.data.age
  //       });
  //     })
  //     .catch(err => setAlert(err));
  // };

  // const cbGetUserById = useCallback((id, getUserById, setUserData) => {
  //   getUserById(id, setUserData);
  // }, id);

  useEffect(() => {
    getUser(id, setUserData);
    // return () => {
    //   setUserData({ ...user });
    // };
    // getUserById(id, setUserData);
  }, []);

  const { firstname, lastname, email, phoneNumber, password, repeat } = userData;

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleEdit = e => {
    e.preventDefault();
    if (password !== repeat) {
      setAlert('Password does not match!');
    } else {
      editUser(
        { id, firstname, lastname, email, phoneNumber, password },
        history,
        initEdit
      ); // pass init and push into action-creator and let it exec
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  const disableEdit = (
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
    repeat,
    user
  ) => {
    return (
      !(
        firstname &&
        lastname &&
        email &&
        phoneNumber &&
        password &&
        repeat &&
        password === repeat &&
        /^[a-zA-Z]+$/.test(firstname) &&
        /^[a-zA-Z]+$/.test(lastname) &&
        /.+@.+\..+/.test(email) &&
        !isNaN(phoneNumber) &&
        Math.abs(parseInt(phoneNumber)).toString() === phoneNumber.toString()
      ) ||
      (user.firstname === firstname &&
        user.lastname === lastname &&
        user.email === email &&
        user.phoneNumber === phoneNumber)
    );
  };

  // in render it can do, but not recommand
  // if (editSuccess) {
  //   initEdit();
  //   history.push('/');
  // }

  return (
    <div>
      {//   editSuccess ? (
      //   <Redirect to='/' />
      // ) :
      isLoading || isGetting ? (
        <Loading />
      ) : (
        <div>
          <div className='create'>Edit User</div>
          <div className='container'>
            <form onSubmit={e => handleEdit(e)}>
              <small className='form-text text-muted'>
                Blank with * is reuiqred
              </small>
              <div className='form-group'>
                * First Name:{' '}
                <input
                  className='form-control'
                  name='firstname'
                  value={firstname}
                  onChange={e => handleChange(e)}
                  placeholder='firstname'
                />
                {!firstname && <Alert warning='empty' item='firstname' />}
                {firstname && !/^[a-zA-Z]+$/.test(firstname) && (
                  <Alert warning='invalid' item='firstname' />
                )}
              </div>
              <div className='form-group'>
                * Last Name:{' '}
                <input
                  className='form-control'
                  name='lastname'
                  value={lastname}
                  onChange={e => handleChange(e)}
                  placeholder='lastname'
                />
                {!lastname && <Alert warning='empty' item='lastname' />}
                {lastname && !/^[a-zA-Z]+$/.test(lastname) && (
                  <Alert warning='invalid' item='lastname' />
                )}
              </div>
              <div className='form-group'>
                * Email:{' '}
                <input
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={e => handleChange(e)}
                  placeholder='email'
                />
                {!email && <Alert warning='empty' item='email' />}
                    {email && !/.+@.+\..+/.test(email) && (
                        <Alert warning='invalid' item='email' />
                    )}
              </div>
              <div className='form-group'>
                * Phone Number:{' '}
                <input
                  className='form-control'
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={e => handleChange(e)}
                  placeholder='phoneNumber'
                />
                {!phoneNumber && <Alert warning='empty' item='phoneNumber' />}
                {phoneNumber &&
                  (isNaN(phoneNumber) ||
                    Math.abs(parseInt(phoneNumber)).toString() !== phoneNumber.toString()) && (
                    <Alert warning='invalid' item='phoneNumber' />
                  )}
                {/* test server ERROR here, block validation, let backend do */}
              </div>
              <div className='form-group'>
                * Password:{' '}
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={password}
                  onChange={e => handleChange(e)}
                  placeholder='password'
                />
                {!password && <Alert warning='empty' item='password' />}
              </div>
              <div className='form-group'>
                * Repeat:{' '}
                <input
                  className='form-control'
                  type='password'
                  name='repeat'
                  value={repeat}
                  onChange={e => handleChange(e)}
                  placeholder='repeat'
                />
                {!repeat && <Alert warning='empty' item='confirmed password' />}
                {repeat && password !== repeat && (
                  <Alert warning='match' item='password' />
                )}
              </div>
              {error && <Alert warning='server' item='edit' />}
              {getError && <Alert warning='server' item='get' />}
              <div className='btn-row'>
                <div className='btn-left'>
                  <button
                    className='btn btn-success'
                    // value='Submit'
                    type='submit'
                    disabled={
                      disableEdit(
                        firstname,
                        lastname,
                        email,
                        phoneNumber,
                        password,
                        repeat,
                        user
                      )
                      // !(
                      //   firstname &&
                      //   lastname &&
                      //   sex &&
                      //   age &&
                      //   password &&
                      //   repeat &&
                      //   password === repeat
                      // ) ||
                      // (user.firstname === firstname &&
                      //   user.lastname === lastname &&
                      //   user.sex === sex &&
                      //   user.age === age)
                    }
                  >
                    <i className='fas fa-arrow-down' /> Save Changes
                  </button>
                </div>
                <div className='btn-middle' />

                <div className='btn-right'>
                  <button className='btn btn-secondary' onClick={handleBack}>
                    <i className='fas fa-arrow-left' /> Back
                  </button>
                </div>
              </div>
            </form>
            <div className='alert-text'>{alertContent}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    alertContent: state.alert.alertContent,
    editSuccess: state.editUser.editSuccess,
    isLoading: state.editUser.isLoading,
    isGetting: state.getUser.isLoading,
    user: state.getUser.user,
    // use this user in file check whether the file be changed in the very bottom
    error: state.editUser.error,
    getError: state.getUser.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert)),
    editUser: (data, history) => dispatch(editUser(data, history)),
    initEdit: () => dispatch(initEdit()),
    getUser: (id, setUserData) => dispatch(getUser(id, setUserData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);