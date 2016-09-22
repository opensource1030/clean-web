<template>
<div class="content-right" >
  <div id="devices">
<div class="header"></div>
<div class="expanded row">

     <div class="small-12 columns titles" >
      <h4>Manage Devices<h4>
        </div>
        <div class="small-12 columns" >
        <a class="button">Add device</a>
            </div>


  <div class="small-12 columns" >

      <table   class="responsive">
        <thead>
          <tr>
            <th >
          </th>
            <th ><select class="form-control" v-model="type" >
              <option value="" selected>Device Type</option>
              <option v-for="item in items"  :value="item.id" >{{item.type}}</option>

          </select></th>
            <th >
              <select class="form-control" v-model="manufactured" >
                <option value="" selected>Manufactured</option>
                <option v-for="item in items"  :value="item.id">{{item.manufactured}}</option>

            </select> </th>
            <th ><select class="form-control" v-model="price" >
              <option value="" selected>Price</option>
              <option v-for="item in items"  :value="item.id">{{item.price}}</option>

          </select></th>
            <th ><select class="form-control" v-model="os" >
              <option value="" selected>OS</option>
              <option v-for="item in items"  :value="item.id">{{item.os}}</option>

          </select></th>
            <th ><select class="form-control" v-model="carrier" >
              <option value="" selected>Carrier</option>
              <option v-for="item in items"  :value="item.id">{{item.carrier}}</option>

          </select></th>
            <th ><select class="form-control" v-model="capacity" >
              <option value="" selected>Capacity</option>
              <option v-for="item in items"  :value="item.id">{{item.capacity}}</option>

          </select></th>
            <th ><select class="form-control" v-model="style" >
              <option value="" selected>Style</option>
              <option v-for="item in items"  :value="item.id">{{item.style}}</option>

          </select></th>
          </tr>
        </thead>
        <tbody>
          <tr class="filter">
              <td><div></div></td>
            <td><div>{{type}}</div></td>
            <td ><div>{{manufactured}}</div></td>
            <td  ><div>{{price}}</div></td>
            <td  ><div>{{os}}</div></td>
            <td ><div>{{carrier}}</div></td>
            <td ><div>{{capacity}}</div></td>
            <td  ><div>{{style}}</div></td>
          </tr>
        </tbody>
        <tbody  v-for="item in items"  >
          <tr    :class="{ 'active': item.show,'desactive': item.show  }"   @click="setActive($index)" >
            <td> <a href="device?{{ item.id }}">manage</a></td>
            <td style="font-weight: bold;" >   {{item.name}}</td>
            <td >{{item.manufactured}}</td>
            <td  >{{item.price}}</td>
            <td  >{{item.os}}</td>
            <td >{{item.carrier}}</td>
            <td >{{item.capacity}}</td>
            <td  >{{item.style}}</td>
          </tr>
            <tr  >
              <td v-show="item.show" transition="item"  class="detail" colspan="8" >

                  <div class="details">
                    <div class="child"></div>
                  <div class="options child">
                    <ul>
                      Unlocked
                        <li>Space grey,64Gb</li>
                          <li>White,64Gb</li>
                            <li>Space Grey 128GB</li>
                              <li>Space Grey 128GB</li>
                              <li>Space Grey 128GB</li>
                    </ul>
                    <ul>
                      ATT
                        <li>Space grey,64Gb</li>
                          <li>White,64Gb</li>
                            <li>Space Grey 128GB</li>
                              <li>Space Grey 128GB</li>
                              <li>Space Grey 128GB</li>
                    </ul>
                  </div>
                  <div class="prices child">
                    <br>
                      <ul>
                      <li>399$</li>
                        <li>499$</li>
                          <li>599$</li>
                            <li>600$</li>
                            <li>999$</li>

                  </ul>
                  <br>
                    <ul>
                    <li>399$</li>
                      <li>499$</li>
                        <li>599$</li>
                          <li>600$</li>
                          <li>999$</li>

                </ul>
                </div>
                <div class="os child">
                <div class="image">
                  <img class="thumbnail" src="http://soncosasmias.com/wp-content/uploads/2015/11/iPhone-6-SonCosasMias.jpg" alt="Photo Iphone 6" width="100" height="00" />
                </div>

                    <div class="information">
                      Apple iPhone Model 6 Network Unlocked 16GB Colour Space Grey Network Technology GSM / EDGE / UMTS / HSPA+ / DC-HSDPA / LTE Band UMTS/HSPA+/DC-HSDPA 850/900/1900/2100 GSM/EDGE 850/900/1800/1900 Style Smartphone Operating System iOS Camera Resolution 8.0MP Battery Battery Capacity 1810 mAh Display Display Technology Retina HD Screen Size 4.7"
                    </div>
                      </div>
                    <div class="carrrier child">
                        <span style="font-weight: bold;">  Availability:</span><br>
                        <span>Provaider</span>
                      <ul>

                      <li>at</li>
                        <li>movistar</li>
                          <li>vodafone</li>

                  </ul>

                    </div>
                    <div class="capacity child">
                      <br>
                      <span>Provaider</span>
                      <ul>
                      <li>at</li>
                        <li>movistar</li>
                          <li>vodafone</li>

                  </ul>

                    </div>
                    <div class="style child">
                        <br>
                      <span>Provaider</span>
                      <ul>
                      <li>at</li>
                        <li>movistar</li>
                          <li>vodafone</li>

                  </ul>

                    </div>
                  </div>

              </td>

            </tr>

        </tbody>
      </table>

  </div>
</div>
</div>
</div>

</template>
<script>
import Vue from 'vue'
import VueAnimatedList from 'vue-animated-list'
Vue.use(VueAnimatedList)



export default {
    name: "Devices",

    created(){


    },


    ready(){







    },
    methods: {
      setActive: function(index) {


        this.active = index;

        if(this.items[this.active].show==true){
              this.items[this.active].show=false;


        }
        else{

              for (var i = 0; i < this.items.length ; i++) {
                  if(this.items[this.active]==this.items[i]){
                      this.items[this.active].show=true;


                      }else{
                            this.items[i].show=false;

                            }
                            }
        }



      }

    },
    computed: {
     activeItem: function(){
       return this.items[this.active];
     }
   },
    data() {



      return {



        active: 0,
          items:[
            {
              id:1,
              name:'iphone',
              type:'mobile',
              manufactured:'apple',
              price:'400',
              os:'ios',
              carrier:'atm',
              capacity:'16',
              style:'white',
              show:false,
              description:'holaaaaaaaaaaa'

            },
          {
            id:2,
            name:'galaxy',
            type:'tablet',
            manufactured:'samsung',
            price:'400',
            os:'android',
            carrier:'any',
            capacity:'32',
            style:'white',
            show:false,
            description:'adiossssss'

          }
        ]

      }
    }


}


</script>
