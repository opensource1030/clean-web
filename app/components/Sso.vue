<script>
import auth from './../api/auth';
export default {
    name: "Sso",
  ready: function() {
    var id = this.$route.params.id;
    auth.singleSignOn(this,id,'dashboard');

}
}



  </script>
