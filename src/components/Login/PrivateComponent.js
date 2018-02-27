// import React from 'react'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'

// // import PropTypes from 'prop-types'

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//       this.isAuthenticated = true
//       setTimeout(cb, 100) // fake async
//     },
//     signout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 100) // fake async
//     }
//   }

//   function PrivateRoute ({component: Component, authed, ...rest}) {
//     return (
//       <Route
//         {...rest}
//         render={(props) => authed === true
//           ? <Component {...props} />
//           : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//       />
//     )
//   }


// //   const AuthButton = withRouter(({ history }) => (
// //     fakeAuth.isAuthenticated ? (
// //       <p>
// //         Welcome! <button onClick={() => {
// //           fakeAuth.signout(() => history.push('/'))
// //         }}>Sign out</button>
// //       </p>
// //     ) : (
// //       <p>You are not logged in.</p>
// //     )
// //   ))
  
// //   PrivateRoute.propTypes = {
// //     isAuthenticated: PropTypes.bool.isRequired,
// //   }
  
// //   function mapStateToProps(state) {
// //     return {
// //       isAuthenticated: state.user.isAuthenticated,
// //     };
// //   }


  
//   export default PrivateRoute
  
