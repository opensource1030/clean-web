import Vue from 'vue';
import user from './../models/User';
var {
  Store,
} = require('yayson')();
var store = new Store();

// Check the user's auth status when the app
// loads to account for page refreshing

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false,
    id:null,
    firstName:'',
    lastName:'',
    email:'',
    alternateEmail:'',
    supervisorEmail:''
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    if (creds.email == '' || creds.email == null) {
      context.error = 'Empty email';
    } else {

      context.$http.get(process.env.URL_API + '/doSSO/' + creds.email + '?redirectToUrl=' + process.env.URL + '/sso').then((response) => {
        localStorage.setItem('email', creds.email);
        window.location.href = response.data.data.redirectUrl;
      }, (response) => {
        if (response.data.error === 'User Not Found, Register Required') {
          context.error = response.data.error;
          localStorage.removeItem('email');
          localStorage.setItem('email', creds.email);
          context.$router.push({name: 'register'});
        } else if (response.data.error === 'Invalid Email') {
          context.error = response.data.error;
        } else if (response.data.error == 'User Found, Password Required') {
          localStorage.removeItem('email');
          localStorage.setItem('email', creds.email);
          context.$router.push({name: 'loginlocal'});
        } else if (response.data.error == 'Company Not Found') {
          context.error = response.data.error + '. ' + response.data.message;
        } else if (response.data.error == 'User not Active') {
          context.error = response.data.error + '. ' + response.data.message;
        } else{
          context.error = 'Unexpected server error. Please contact the administrator.';
        }
      });
    }
  },

  singleSignOn(context, creds, redirect) {

    context.$http.post(process.env.URL_API + '/oauth/token',
      {
        grant_type: 'sso',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        uuid: creds,

      })
      .then((response) => {
        //   console.log(response.data);

        localStorage.setItem('userId', response.body.user_id);

        localStorage.setItem('token', response.body.access_token);
        this.user.authenticated = true;
        this.userData(context,redirect);


        setTimeout(()=> {
          this.logout();
        }, response.data.expires_in * 1000);



      }, (response) => {

        context.error = 'Unexpected server error. Please contact the administrator.';

      });

  },
  register(context, creds) {
    context.error = '';
    context.message = '';
    context.clickAgain = false;

    if (creds.firstName == '') {
      context.error = 'The First Name must not be empty, please, fill it properly.';
    }
    if (creds.lastName == '') {
      context.error = 'The Last Name must not be empty, please, fill it properly.';
    }

    context.error = this.checkIfThePasswordIsStrongEnough(creds.password1, creds.password2);

    if (context.error == '') {
      let pack = this.getTheModel('users', 0, '', '', creds.email, '', creds.password1, '', '', '', '', creds.firstName, creds.lastName, '',
       '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '');

      context.$http.post(process.env.URL_API + '/users', {"data": pack.toJSON(), 'url': process.env.URL}).then((response) => {
        event = store.sync(response.data);
        context.message = 'Your user has been created correctly, please, check your email to validate it.';
        context.allowChanges = false;
      }, (response) => {
        if (response.status == 409) {
          context.error = response.body.errors.users;
        } else {
          context.error = 'Unexpected error. Please, try again later.';
        }
        context.clickAgain = true;
      });
    } else {
      context.clickAgain = true;
    }
  },

  loginLocal(context, creds, redirect) {

    if (creds.password == '' || creds.password == null) {
      context.error = 'Password incorrect';

    } else {

      context.$http.post(process.env.URL_API + '/oauth/token',
        {
          grant_type: 'password',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          username: creds.email,
          password: creds.password,

        })
        .then((response) => {

          localStorage.setItem('userId', response.body.user_id);

          localStorage.setItem('token', response.body.access_token);
          this.userData(context,redirect);


          setTimeout(()=> {
            this.logout();
          }, response.data.expires_in * 1000);


        }, (response) => {
          if (response.status == 500) {
            context.error = 'Unexpected server error.';
            context.error = context.error + ' Please contact the administrator.';

          } else {
            context.error = response.body.message;
          }

        });
    }

  },
  resetPasswordEmail(context, creds) {
      let params = {params:{
        'url': process.env.URL
      }};
      context.errorShow = false;
      context.messageShow = false;
      context.error = '';
      context.clickAgain = false;

      if (creds.email != '') {
        context.$http.get(process.env.URL_API + '/resetPassword/' + creds.email, params).then((response) => {
          if (response.data.message == 'email sent') {
            context.messageShow = true;
          }
        }, (response) => {
          if (response.data.message == 'not valid email') {
            context.error = 'The email retrieved is not valid, please, try again with another one.';
          }
          if (response.data.message == 'company not found') {
            context.error = 'The email retrieved has not any Company associated, please, try again with another one.';
          }
          if (response.data.message == 'user not found') {
            context.error = 'The email retrieved has not any User associated, please, try again with another one.';
          }
          if (response.data.message == 'company has sso') {
            context.error = 'The user has Single Sign On associated, please, use the login page.';
          }
          if (response.status == 500) {
            context.error = 'Server error, please, try again later.';
          }
          if (context.error == '') {
            context.error = 'Unexpected error, please, try again later.';
          }
          context.errorShow = true;
        });
      } else {
        context.error = 'The email field must not be null, please, enter a valid email.';
        context.errorShow = true;
      }
      context.clickAgain = true;
  },
  resetPasswords(context, creds) {

    context.errorShow = false;
    context.messageShow = false;
    context.clickAgain = false;

    context.error = this.checkIfThePasswordIsStrongEnough(creds.password1, creds.password2);

    if (context.error == '') {

      let params = {
        params:{
          password1: creds.password1,
          password2: creds.password2,
        }
      };

      context.$http.get(process.env.URL_API + '/resetPassword/' + context.credentials.identification + '/' + context.credentials.code, params).then((response) => {
        if(response.body.message == 'password changed') {
          context.$router.push({name: 'login'});
        }
      }, (response) => {
        if(response.data.message == 'different identifications') {
          context.error = 'The link has been expired, please, return to the forgot password and retrieve another one.';
          context.errorShow = true;
        }
        if(response.data.message == 'different codes') {
          context.error = 'The link has been expired, please, return to the forgot password and retrieve another one.';
          context.errorShow = true;
        }
        if (response.data.message == 'user not found') {
          context.error = 'The credentials has not any user associated, please, return to the forgot password and retrieve another one.';
          context.errorShow = true;
        }
        if (response.data.message == 'different passwords') {
          context.error = 'The password fields must be equal and not empty, please, try again.';
          context.errorShow = true;
        }
        if (response.status == 500) {
          context.error = 'Unexpected error, please, try again later.';
          context.errorShow = true;
        }
      });
    } else {
      context.errorShow = true;
    }
    context.clickAgain = true;
  },
  logout() {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },
  checkAuth() {
    var jwt = localStorage.getItem('token');

    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },
  userData(context,redirect){

    context.$http.get(process.env.URL_API + '/users/me' ,{
         headers: this.getAuthHeader(),
         include:'udlvalues'

    }).then((response) => {

          let  event = store.sync(response.data);
     localStorage.setItem('userProfile', JSON.stringify(event));
       this.user.authenticated = true;

         context.$router.push({name: redirect});

    }, (response) => {});



  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
  },
  checkIfThePasswordIsStrongEnough(password1, password2) {
    if (password1 == '' || password2 == '') {
      return 'The Passwords must not be empty, please, fill it properly.';
    }
    if (password1 !=  password2) {
      return 'The Passwords must be equals, please, fill it properly.';
    }

    if(password1.length < 6) {
      return 'Password must contain at least six characters!';
    }

    let re = /[0-9]/;
    if(!re.test(password1)) {
      return 'Password must contain at least one number (0-9)!';
    }

    re = /[a-z]/;
    if(!re.test(password1)) {
      return 'Password must contain at least one lowercase letter (a-z)!';
    }

    re = /[A-Z]/;
    if(!re.test(password1)) {
      return 'Password must contain at least one uppercase letter (A-Z)!';
    }

    return '';
  },
};
