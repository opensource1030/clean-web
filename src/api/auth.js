import Vue from 'vue'

// Check the user's auth status when the app
// loads to account for page refreshing



export default {
  // User object will let us check authentication status
 user: {
   authenticated: false,

 },


 // Send a request to the login URL and save the returned JWT
login(context, creds, redirect) {
  if( creds.email=="" ||creds.email==null){
      context.error="Empty email";

  }
  else{

  context.$http.get(process.env.URL_API+'/doSSO/'+creds.email+'/?redirectToUrl='+process.env.URL+'/%23!/sso').then((response) => {

          window.location.href =response.data.data.redirectUrl;

        }, (response) => {


            if(response.data.error==="User Not Found, Register Required"){
                  //console.log(response.data.error);
                    context.error=response.data.error
                      context.$router.push({name: 'register'})

            }
            else if(response.data.error==="Invalid Email"){
              context.error=response.data.error;
            }

            else if(response.data.error=="User Found, Password Required"){
              //console.log(response.data.error);
              context.$router.push({name: 'loginLocal'})
              localStorage.removeItem("email");

              localStorage.setItem('email',creds.email);
            }
            else{
                context.error="Unexpected server error. Please contact the administrator."


            }


        });
      }
},

singleSignOn(context,creds,redirect){

  context.$http.post(process.env.URL_API+'/oauth/access_token',
                      {
                        grant_type: 'sso',
                        client_id:process.env.CLIENT_ID,
                        client_secret:process.env.CLIENT_SECRET,
                        uuid:creds

                        })
       .then((response) => {
              //   console.log(response.data);
                    localStorage.setItem('userId', response.data.user_id);
                    localStorage.setItem('token', response.data.access_token);
                    this.user.authenticated=true;


               //  Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

               setTimeout( ()=> {this.logout();},response.data.expires_in*1000);


                  context.$router.push({name: redirect})


      }, (response) => {

                context.error="Unexpected server error. Please contact the administrator.";

      });



},

register(context,creds,redirect){


},
loginLocal(context,creds,redirect){

  if( creds.password=="" ||creds.password==null){
      context.error="Password incorrect";

  }
  else{

  context.$http.post(process.env.URL_API+'/oauth/access_token',
                      {
                        grant_type: 'password',
                        client_id:process.env.CLIENT_ID,
                        client_secret:process.env.CLIENT_SECRET,
                        username:creds.email,
                        password:creds.password

                        })
       .then((response) => {
                    localStorage.setItem('userId', response.data.user_id);
                    localStorage.setItem('token', response.data.access_token);
                    this.user.authenticated=true;


                   setTimeout( ()=> {this.logout();},response.data.expires_in*1000);
                      context.$router.push({name: redirect})


      }, (response) => {
                  console.log(response);
              if(response.status==500){
              context.error="Unexpected server error. Please contact the administrator.";


              }

          else{
          context.error=response.data.errors.message;
        }



      });
    }

},
logout() {
    localStorage.removeItem('token')
    this.user.authenticated = false

    this.$router.push({name:'login'})
  },


checkAuth() {
    var jwt = localStorage.getItem('token')

    if(jwt) {
      this.user.authenticated = true

    }
    else {
      this.user.authenticated = false

    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    }

}
