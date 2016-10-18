//
// filters.js
//
function filterBy(list, value) {
  return list.filter(function(item) {
    return item.indexOf(value) > -1;
  });
}
function filterByFilters(list, value) {
  return list.filter(function(item) {
    return item.type.indexOf(value) > -1;
  });
}

function filterByModifications(list, value) {
  return list.filter(function(item) {
    return item.attributes.modType.indexOf(value) > -1;
  });
}
function filterByModificationsd(list, value) {
  return list.filter(function(item) {
    return item.modType.indexOf(value) > -1;
  });
}

function findBy(list,value){
      return list.filter(function(item){
              return  item==value;

      })

}
function findByCapacity(list,value){
      return list.filter(function(item){
              return  item==value;

      })

}

function findByPrices(list, filter) {

        if(list.length>0){

          if(filter.style=="" && filter.capacity=="" && filter.carrier=="" && filter.company==""){

            return list;
          }



    return  list.filter(function(item) {
                var mostrar=true;
                if(filter.capacity!=""){

                      mostrar=mostrar && filter.capacity==item.capacity.attributes.value;

                }

                if(filter.style!=""){

                      mostrar=mostrar && filter.style==item.style.attributes.value;

                }

                if(filter.carrier!=""){

                      mostrar=mostrar && filter.carrier==item.carrier.attributes.presentation;

                }
                if(filter.company!=""){

                      mostrar=mostrar && filter.company==item.company.attributes.name;

                }

                return mostrar

          });

}

else{
  return ''
}
}


function reverse(value) {
  return value.split('').reverse().join('');
}

export {filterBy, reverse, findByPrices,findBy,filterByModifications,filterByModificationsd,filterByFilters}
