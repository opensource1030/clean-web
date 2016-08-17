import {router} from '../app'

// Check the user's auth status when the app
// loads to account for page refreshing
const api="http://clean.api";


export default {
  // User object will let us check authentication status
 user: {
   authenticated: false
 },
 // Send a request to the login URL and save the returned JWT
login(context, creds, redirect) {



  context.$http.get(api+'/doSSO/'+creds.email).then((response) => {
                console.log(response.data.data.redirectUrl);

        }, (response) => {
            //error
            if(response.data.error=="User Not Found, Register Required"){
                  router.go('register');
                    context.error=response.data.error
            }
            else{
              context.error=response.data.error
            }


        });

},

register(context,creds,redirect){






}


}
