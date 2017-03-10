import Vue from 'vue';
import Preset from './../../models/Preset'
const {Store,} = require('yayson')();
const store = new Store();
import {filterByFilters} from './../../components/filters.js';
export default {
  device: {},
  devicevariations:null,
  firstTime:true,
  //gets
  getDataPreset(context,id){
    let params = {
      params: {
        include: 'devicevariations,devicevariations.companies,devicevariations.carriers,devicevariations.modifications,devicevariations.images'
      }
    };

  context.$http.get(process.env.URL_API + '/presets/'+id,params).then((response) => {
              context.id=id;
    let  event = store.sync(response.data);
        context.preset.name=event.name;
        this.devicevariations=event.devicevariations;
        for (let v of event.devicevariations){
          v.checks=true;
        }
        context.variations=event.devicevariations;
        context.checkvariation();
  },

  (response) => {
    context.error=response.status;
    context.showModal=true;

  });
},
checkDeviceVariations(price){

                  if(this.devicevariations!=null){
              for (let variation of this.devicevariations){

                  if(variation.id==price.id && variation.deviceId==price.deviceId){

                      price.check=true;

                  }

                    }

                        if(price.check==null){
                          price.check=false;
                        }
                            return price
                          }
                          else{
                            price.check=false;
                            return price
                          }

    },
//posts
addPreset(context,preset){
  let result = JSON.parse(localStorage.getItem("userProfile"));
  preset.companyId=result.companyId;
  let check = this.checkPreset(context,preset)
  if(check==true){
    let presetObj = new Preset('presets', null, preset.name, preset.companyId,);
    presetObj.deviceVariationsJson(preset.variations,presetObj);

    context.$http.post(process.env.URL_API + '/presets/', {data: presetObj.toJSON()}).then((response) => {

      context.$router.push({name: 'List Presets'});

    }, (response) => {
      context.message = "code error    " + response.status;
      context.showModal = true;
    });


  }
},
updatePreset(context,id,preset){
  let result = JSON.parse(localStorage.getItem("userProfile"));
  preset.companyId=result.companyId;

  let check = this.checkPreset(context,preset)

  if(check==true){
  let presetObj = new Preset('presets', id, preset.name, preset.companyId,);
  presetObj.deviceVariationsJson(preset.variations,presetObj);

  context.$http.patch(process.env.URL_API + '/presets/' + id, {data: presetObj.toJSON()}).then((response) => {

    context.$router.push({name: 'List Presets'});

  }, (response) => {
    context.message = "code error    " + response.status;
    context.showModal = true;
  });
}

},
checkPreset(context,preset){

    if(preset.name==null || preset.name==""){
        context.showModal = true;
      context.error="Error in field Name";
        return false;
    }
    if(preset.companyId==null || preset.companyId==""){
            context.showModal = true;
      context.error="You don´t have company"
        return false;
    }
    if(preset.variations==null || preset.variations.length==0){
        context.showModal = true;
          context.error="Yo don´t have selected any devicevariations"
              return false;
    }


        return true;




}


};
