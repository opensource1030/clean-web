///
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
    if (list) {
        return list.filter(function (item) {
            return item.modType.indexOf(value) > -1;
        });
    } else {
        return
    }
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

/*
 *  This function receives an array of services and returns the object of services.serviceitems that matches the category and domain.
 *  Note: If the serviceitem doesn't exist, the function returns an empty object.
 *
 *  @service: Is the Service Object.
 *  @category: Is the category of the serviceitem that we need to retrieve ('voice', 'data', 'messaging').
 *  @domain: Is the domain of the serviceitem that we need to retrieve('domestic', 'international').
 *
 *  @return: returns the item that we need to find or a void item with the default values.
 *
 */
function findServiceItem(service, category, domain) {
    for (let item of service.serviceitems) {
        if (item.category == category && item.domain == domain) {
            return item;
        }
    }

    let unitItem = '';

    if(category == 'voice'){
        unitItem = 'minutes';
    } else if (category == 'data') {
        unitItem = 'Gb';
    } else if (category == 'messaging') {
        unitItem = 'messages';
    } else {
        // Other future options.
    }

    return {
        serviceId : service.id,
        category : category,
        description: '',
        value: 0,
        unit: unitItem,
        cost: 0,
        domain: domain,
        type: 'service_items'
    };
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

/*
 *  This function receives a list and a sentence, the list is filled with the sentences that have not been insered yet.
 *  Then, we order the list.
 *  Example: this.getFilters(context.status, serv.status, 'string');
 *
 *  @list: Is the list of the filters.
 *  @value: Is the value that we need to insert into the list.
 *  @order: Is the order for the orderFilters function.
 *
 *  @return: returns an ordered list with the values.
 *
 */
function getFilters(list, value, order) {

    let aux = value;
    if(aux.length >= 50){
        aux = aux.substring(0, 50);
        aux = aux + '...';
    }

    if (list.length == 0) {
        list.push(aux)
    } else {
        let ok = true;
        for (let a of list) {
            if (a == aux) {
                ok = false;
            }
        }

        if (ok) {
            list.push(aux);
        }
    }
    return orderFilters(list, '', order, 'asc');
}

/*
 *  This function receives a list of objects and different options.
 *  Then, we order the list.
 *  Example: deleteRepeated(list, attributeFilter, attributeOrder, type, order);
 *
 *  @list: Is the list of the filters.
 *  @attributeFilter: Is the filter attribute. (Example: Id).
 *  @attributeOrder: Is the order attribute. (Example: another attribute like "name").
 *  @type: The type of the attributeOrder ('number' or 'string').
 *  @order: The order type ('asc' or 'desc').
 *
 *  @return: returns an ordered list with the objects.
 *
 */
function deleteRepeated(list, attributeFilter, attributeOrder, type, order) {
    let aux = [];
    for (let l of list) {
        if (aux.length == 0) {
            aux.push(l);
        } else {
            let ok = true;
            for (let a of aux) {
                if (l.hasOwnProperty(attributeFilter) && a.hasOwnProperty(attributeFilter)) {
                    if(a[attributeFilter] == l[attributeFilter]) {
                        ok = false;
                    }
                }
            }
            if (ok) {
                aux.push(l);
            }
        }
    }
    return orderFilters(aux, attributeOrder, type, order);
}

/*
 *
 *  @list: The Array of words, numbers of objects.
 *  @attribute: The attribute of the object (left '' if not): (presentation/'')
 *  @type: The type of information you will receive: (string/number)
 *  @orderby: The order selected to sort the array: (asc/desc)
 *
 *  Examples:
 *  1.- Array of words, order asc.
 *  context.arrayOfWords = context.orderFilters(context.arrayOfWords, '', 'string', 'asc');
 *
 *  2.- Array of numbers, order asc.
 *  context.arrayOfNumbers = context.orderFilters(context.arrayOfNumbers, '', 'number', 'asc');
 *
 *  3.- Array of objects, the attribute is a string 'name' , order asc.
 *  context.arrayOfObjectsS = context.orderFilters(context.arrayOfObjectsS, 'name', 'string', 'asc');
 *
 *  4.- Array of objects, the attribute is a number 'telephone' , order asc.
 *  context.arrayOfObjectsN = context.orderFilters(context.arrayOfObjectsN, 'telephone', 'number', 'asc');
 *
 *  5.- Array of words, order desc.
 *  context.arrayOfWords = context.orderFilters(context.arrayOfWords, '', 'string', 'desc');
 *
 *  6.- Array of numbers, order desc.
 *  context.arrayOfNumbers = context.orderFilters(context.arrayOfNumbers, '', 'number', 'desc');
 *
 *  7.- Array of objects, the attribute is a string 'name' , order desc.
 *  context.arrayOfObjectsS = context.orderFilters(context.arrayOfObjectsS, 'name', 'string', 'desc');
 *
 *  8.- Array of objects, the attribute is a number 'telephone' , order desc.
 *  context.arrayOfObjectsN = context.orderFilters(context.arrayOfObjectsN, 'telephone', 'number', 'desc');
 *
 */
function orderFilters(list, attribute, type, orderby) {
  let attributes = [];
  orderby = orderby.toLowerCase();
  return list.sort(function(valueA,valueB) {
    let attributeA = '';
    let attributeB = '';

    if(attribute == '') {
      attributeA = valueA;
      attributeB = valueB;
    } else {
      attributes = attribute.split(".");
      for (let a of attributes) {
        if(attributeA == '' && attributeB == '') {
          attributeA = valueA[a];
          attributeB = valueB[a];
        } else {
          attributeA = attributeA[a];
          attributeB = attributeB[a];
        }
      }
    }

    if (type == 'string') {
      let strA = attributeA.toLowerCase();
      let strB = attributeB.toLowerCase();

      if (orderby == 'asc') {
        // sort string ascending
        if (strA < strB) { return -1; }
        if (strA > strB) { return 1; }
        return 0 //default return value (no sorting)
      } else {
        // sort string ascending
        if (strA > strB) { return -1; }
        if (strA < strB) { return 1; }
        return 0 //default return value (no sorting)
      }

    } else if (type == 'number') {
      if (orderby == 'asc') {
        return attributeA - attributeB;
      } else {
        return attributeB - attributeA;
      }
    }
  });
}

export {filterBy, reverse, findByPrices, findBy, filterByModifications, filterByModificationsd, filterByFilters, filterByCarrier,findServiceItem,findByAddons, deleteRepeated, orderFilters, getFilters};
