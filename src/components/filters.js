//
// filters.js
//
function filterBy(list, value) {
  return list.filter(function (item) {
    return item.indexOf(value) > -1;
  });
}

function filterByFilters(list, value) {
  return list.filter(function (item) {
    return item.type.indexOf(value) > -1;
  });
}

function filterByModifications(list, value) {
  if (list != null) {

    return list.filter(function (item) {
      return item.attributes.modType.indexOf(value) > -1;
    });
  }

  return;
}

function filterByModificationsd(list, value) {
  return list.filter(function (item) {
    return item.modType.indexOf(value) > -1;
  });
}

function filterByCarrier(list, value) {

  return list.filter(function (item) {
      return item.carrierId == value;
  });
}

function findBy(list, value) {
  return list.filter(function (item) {
          return item == value;

        });

}
function findByService(list,category,domain ) {
let item=list.filter(function (item) {
          return item.category == category && item.domain == domain;

        });
          return item[0];
}
function findByAddons(list,category,domain ) {
return list.filter(function (item) {
          return item.category == category && item.domain == domain;

        });

}

function findByCapacity(list, value) {
  return list.filter(function (item) {
          return item == value;

        });

}

function findByPrices(list, filter) {

  if (list.length > 0) {

console.log(filter.style,filter.capacity,filter.carrier,filter.company)
    if (filter.style == null && filter.capacity == null && filter.carrier == null && filter.company== null ) {

      return list;
    }

    return list.filter(function (item) {

              var mostrar = true;
              if (filter.capacity != null) {

                mostrar = mostrar && filter.capacity.id == item.capacity;

              }

              if (filter.style != null) {

                mostrar = mostrar && filter.style.id == item.style;

              }

              if (filter.carrier != null) {

                mostrar = mostrar && filter.carrier.id == item.carrierId;

              }

              if (filter.company != null) {

                mostrar = mostrar && filter.company.id == item.companyId;

              }

              return mostrar;

            });

  } else {
    return '';
  }
}

function reverse(value) {
  return value.split('').reverse().join('');
}

export {filterBy, reverse, findByPrices, findBy, filterByModifications, filterByModificationsd, filterByFilters, filterByCarrier,findByService,findByAddons};
