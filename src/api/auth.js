import Vue from 'vue';
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
        console.log(response.data);
        localStorage.setItem('email', creds.email);
        window.location.href = response.data.data.redirectUrl;
      }, (response) => {

        if (response.data.error === 'User Not Found, Register Required') {
          console.log(response.data.error);
          context.error = response.data.error;
          localStorage.removeItem('email');
          localStorage.setItem('email', creds.email);
          context.$router.push({name: 'register'});
        } else if (response.data.error === 'Invalid Email') {
          console.log(response.data.error);
          context.error = response.data.error;
        } else if (response.data.error == 'User Found, Password Required') {
          console.log(response.data.error);
          localStorage.removeItem('email');
          localStorage.setItem('email', creds.email);
          context.$router.push({name: 'loginlocal'});
        } else if (response.data.error == 'Company Not Found') {
          console.log(response.data);
          context.error = response.data.error + '. ' + response.data.message;
        } else {
          console.log(response.data.error);
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
        this.userData(context, redirect, redirect);

        setTimeout(()=> {
          this.logout();
        }, response.data.expires_in * 1000);

        

      }, (response) => {

        context.error = 'Unexpected server error. Please contact the administrator.';

      });

  },

  register(context, creds, redirect) {

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
          this.userData(context, redirect, response);

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

  userData(context, redirect, response) {
    context.$http.get(process.env.URL_API + '/users/me' ,{
     headers: this.getAuthHeader(response.body.access_token),
     include:'udlvalues'
    }).then((res) => {
      let event = store.sync(res.data);
      localStorage.setItem('userProfile', JSON.stringify(event));
      localStorage.setItem('userId', response.body.user_id);
      localStorage.setItem('token', response.body.access_token);
      this.user.authenticated = true;
      context.$router.push({name: redirect});
    }, (res) => {});
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader(token) {
    return {
      Authorization: 'Bearer ' + token,
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
  },

};
