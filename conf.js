// Сделать объект название - ключ
var biddersList = ["criteo", "adriver", "hpmd", "buzzoola", "myTarget", "facebook", "betweenDigital", "aio", "getintent", "tinkoff", "videonow", "rtbhouse", "relap", "pladform", "alfasense", "adfox", "mgid", "hybrid"].sort();
//те, которым требуются размеры
var requreSizes = ["adriver", "betweenDigital", "facebook", "pladform"];

// Begin of BiddersMap section

var biddersMap = {
    biddersMapUse: biddersList,
    campaignIdUsed: {},
    inputTimeout: null,
    remove: function(elem) {
        var bidder = elem.parentNode.getElementsByClassName("bidderName")[0].value;
        if (bidder == "adfox") {
          var account = elem.parentNode.querySelector(".bidderAccount").value;
          delete biddersMap.campaignIdUsed["adfox_" + account];
        } else {
          if (!biddersMap.biddersMapUse.includes(bidder)) {
            biddersMap.biddersMapUse.push(bidder);
          }
          delete biddersMap.campaignIdUsed[bidder];
        }
        if (elem.parentNode.getElementsByTagName("input")[0].classList.contains("err") && document.getElementById("mainError").style.visibility == "visible") {
            document.getElementById("mainError").style.visibility = "hidden";
            document.getElementById("addBiddersMapUiElement").disabled = false;
        }
        // if (elem.parentNode.querySelector(".bidderAccount").style.display == "inline-block") {
        //   var account = elem.parentNode.querySelector(".bidderAccount").value;
        //   main.removeFromArray(biddersMap.accountsUsed, "adfox_" + account);
        // }
    },
    updateAdfoxAccountData: {
      timeout: null
    },
    updateAdfoxAccount: function(elem) {
      //biddersMap.updateAdfoxAccountData.timeout
      // var accountsInUse =
      var campaign = elem.parentNode.querySelector(".bidderId").value;
      var adfoxAccount = elem.value;
      clearTimeout(biddersMap.updateAdfoxAccountData.timeout);
      biddersMap.updateAdfoxAccountData.timeout = setTimeout(function() {
          if (Object.keys(biddersMap.campaignIdUsed).indexOf("adfox_" + adfoxAccount) == -1) {
              // biddersMap.campaignIdUsed.renameProp("x", "adfox_" + adfoxAccount);
              if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) > -1 && biddersMap.campaignIdUsed.x != undefined) {
                if (Object.keys(biddersMap.campaignIdUsed).indexOf("adfox_" + adfoxAccount) == -1) {
                  console.log(biddersMap.campaignIdUsed["adfox_" + adfoxAccount]);
                  biddersMap.campaignIdUsed["adfox_" + adfoxAccount] = biddersMap.campaignIdUsed.x;
                  delete biddersMap.campaignIdUsed.x;
                } else {
                  elem.classList.add("err");
                  document.getElementById("mainError").innerHTML = "Такой аккаунт уже используется в конфиге";
                  document.getElementById("mainError").style.visibility = "visible";
                  setTimeout(function() {
                      document.getElementById("mainError").style.visibility = "hidden";
                  }, 5000);
                }
              } else if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) > -1 && biddersMap.campaignIdUsed.x == undefined) {
                if (Object.keys(biddersMap.campaignIdUsed).indexOf("adfox_" + adfoxAccount) == -1) {
                  var accountKey = main.getKeyByValue(biddersMap.campaignIdUsed, campaign);
                  biddersMap.campaignIdUsed["adfox_" + adfoxAccount] = campaign;
                  delete biddersMap.campaignIdUsed[accountKey];
                } else {
                  elem.classList.add("err");
                  document.getElementById("mainError").innerHTML = "Такой аккаунт уже используется в конфиге";
                  document.getElementById("mainError").style.visibility = "visible";
                  setTimeout(function() {
                      document.getElementById("mainError").style.visibility = "hidden";
                  }, 5000);
                }
              }
          } else {
              elem.classList.add("err");
              document.getElementById("mainError").innerHTML = "Такой аккаунт уже используется в конфиге";
              document.getElementById("mainError").style.visibility = "visible";
              setTimeout(function() {
                  document.getElementById("mainError").style.visibility = "hidden";
              }, 5000);
          }
    }, 500)
      elem.classList.remove('err');
    },
    updateBiddersMapUse: function(elem) {
        elem.parentNode.parentNode.querySelector(".bidderName").disabled = true;
        var campaign_value = elem.parentNode.querySelector(".bidderId");
        var campaign = Number(elem.value).toString();
        var bidder = elem.parentNode.parentNode.querySelector(".bidderName").value;
        if (bidder == "adfox_imho-banners" || bidder == "adfox_adsmart" || bidder == "adfox") {
        var bidderAccountInput = elem.parentNode.parentNode.querySelector(".bidderAccount");
          if (bidder == "adfox_imho-banners" || bidder == "adfox_adsmart") {
            //Действия для IMHO и ADSMART
            switch(bidder) {
              case "adfox_imho-banners":
                bidderAccountInput.value = "imho-banners";
                bidderAccountInput.disabled = true;
                //owner_id=233605
                if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) == -1) {
                  if (campaign_value.classList.contains("err")) {
                    campaign_value.classList.remove("err");
                  }
                  if (document.getElementById("mainError").style.visibility == "visible") {
                    document.getElementById("mainError").style.visibility = "hidden"
                  }
                  biddersMap.campaignIdUsed["adfox_imho-banners"] = campaign_value.value;
                  main.removeFromArray(biddersMap.biddersMapUse, "adfox_imho-banners");
                } else {
                  campaign_value.classList.add("err");
                  document.getElementById("mainError").innerHTML = "ID кампаний должны быть уникальными и в них не должно быть пробелов.";
                  document.getElementById("mainError").style.visibility = "visible";
                }
                break;
              case "adfox_adsmart":
                bidderAccountInput.value = "adsmart";
                bidderAccountInput.disabled = true;
                //owner_id=1435
                if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) == -1) {
                  if (campaign_value.classList.contains("err")) {
                    campaign_value.classList.remove("err");
                  }
                  if (document.getElementById("mainError").style.visibility == "visible") {
                    document.getElementById("mainError").style.visibility = "hidden"
                  }
                  biddersMap.campaignIdUsed["adfox_adsmart"] = campaign_value.value;
                  main.removeFromArray(biddersMap.biddersMapUse, "adfox_adsmart");
                } else {
                  campaign_value.classList.add("err");
                  document.getElementById("mainError").innerHTML = "ID кампаний должны быть уникальными и в них не должно быть пробелов.";
                  document.getElementById("mainError").style.visibility = "visible";
                }
                break;
            }
          } else {
            //Действия для простого ADFOX
            if (bidderAccountInput.value == "") {
              bidderAccountInput.classList.add("err");
            }
            if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) > -1) {
              campaign_value.classList.add("err");
              campaign_value.focus();
              document.getElementById("mainError").innerHTML = "ID кампаний должны быть уникальными и в них не должно быть пробелов.";
              document.getElementById("mainError").style.visibility = "visible";
              setTimeout(function(){
                document.getElementById("mainError").style.visibility = "hidden";
              }, 4000);
            } else {
              if (campaign_value.classList.contains("err")) {
                campaign_value.classList.remove("err");
              }
              if (bidderAccountInput.value == "") {
                biddersMap.campaignIdUsed["x"] = campaign;
              } else {
                biddersMap.campaignIdUsed["adfox_" + bidderAccountInput.value] = campaign;
              }
            }
            // if (biddersMap.campaignIdUsed["adfox_" + bidderAccountInput.value] == undefined) {
            //   biddersMap.campaignIdUsed["adfox_" + bidderAccountInput.value] = campaign_value.value;
            // }
          }
        } else {
          if (elem.value != "") {
              if (isNaN(campaign)) {
                  document.getElementById("addBiddersMapUiElement").disabled = true;
                  campaign_value.classList.add("err");
                  campaign_value.focus();
                  document.getElementById("mainError").innerHTML = "В ID кампании должны быть только цифры";
                  document.getElementById("mainError").style.visibility = "visible";
                  delete biddersMap.campaignIdUsed[bidder];
              } else {
                  main.removeFromArray(biddersMap.biddersMapUse, bidder);
                  if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) == -1) {
                      biddersMap.campaignIdUsed[bidder] = campaign;
                      if (document.getElementById("generateError").style.visibility == "visible") {
                          document.getElementById("generateError").style.visibility = "hidden";
                      }
                      if (document.getElementById("addBiddersMapUiElement").disabled == true) {
                          document.getElementById("addBiddersMapUiElement").disabled = false;
                      }
                      if (document.getElementsByClassName("err").length > 0) {
                          document.getElementsByClassName("err")[0].classList.remove("err");
                      }
                      if (document.getElementById("mainError").style.visibility == "visible") {
                          document.getElementById("mainError").style.visibility = "hidden";
                      }
                  } else if (Object.values(biddersMap.campaignIdUsed).indexOf(campaign) != -1) {
                      document.getElementById("addBiddersMapUiElement").disabled = true;
                      // var campaign_value = elem.parentNode.querySelector(".bidderId");
                      campaign_value.classList.add("err");
                      campaign_value.focus();
                      document.getElementById("mainError").innerHTML = "ID кампаний должны быть уникальными и в них не должно быть пробелов.";
                      document.getElementById("mainError").style.visibility = "visible";
                      delete biddersMap.campaignIdUsed[bidder];
                  }
              }
          }
        }
    },
    addAccountName: function(elem) {
      var bidder = elem.parentNode.parentNode.querySelector(".bidderName").value;
      if (bidder.search("adfox") > -1) {
        elem.parentNode.parentNode.querySelector(".bidderAccount").style.display = "inline-block";
      }
    },
    addUi: function(bidName, campaignId) {
        if (bidName !== undefined && campaignId !== undefined) {
          var bid_map = document.getElementById("biddersMap").childNodes[3];
            map_element = document.createElement("DIV");
            map_element.classList.add("bidder_map");
            map_element_inner = '<select class="bidderName"></select>' +
                '<div class="tooltip">' +
                '<input class="bidderId" type="text" placeholder="ID кампании" onfocus="validate.addPreviousValue(this.value);" oninput="validate.removeBiddersMapError(this);">' +
                '<span class="tooltiptext">ID кампании биддера из интерфейса ADFOX (уникальный для каждого покупателя)</span>' +
                '<span class="error notUnique">ID кампании должен быть уникальным</span>' +
                '<span class="error">Должно быть заполнено</span>' +
                '<span class="typeError">Должны быть цифры</span>' +
                '</div>' +
                '<input class="bidderAccount" style="display: none; margin-left: 10px;" placeholder="owner_name" onkeyup=biddersMap.updateAdfoxAccount(this);>' +
                '<div class="delete" onclick="biddersMap.remove(this);this.parentNode.remove();"></div>';
            map_element.innerHTML = map_element_inner;
            var x = map_element.getElementsByClassName("bidderName")[0];
            var option = document.createElement("option");
            option.text = bidName;
            x.add(option);
            bid_map.insertAdjacentElement("beforeEnd", map_element);
            option.disabled = true;
            document.querySelectorAll(".bidderId")[document.querySelectorAll(".bidderId").length - 1].value = campaignId;
        } else {
          if (this.biddersMapUse.length > 0) {
            var bid_map = document.getElementById("biddersMap").childNodes[3];
            map_element = document.createElement("DIV");
            map_element.classList.add("bidder_map");
            map_element_inner = '<select class="bidderName"></select>' +
                '<div class="tooltip">' +
                '<input class="bidderId" type="text" placeholder="ID кампании" onfocus="window.biddersMap.addAccountName(this);" oninput="biddersMap.updateBiddersMapUse(this);" onkeypress="checkSpace(event)">' +
                '<span class="tooltiptext">ID кампании биддера из интерфейса ADFOX (уникальный для каждого покупателя)</span>' +
                '<span class="error notUnique">ID кампании должен быть уникальным</span>' +
                '<span class="error">Должно быть заполнено</span>' +
                '<span class="typeError">Должны быть цифры</span>' +
                '</div>' +
                '<input class="bidderAccount" style="display: none; margin-left: 10px;" placeholder="owner_name" onkeyup=biddersMap.updateAdfoxAccount(this);>' +
                '<div class="delete" onclick="biddersMap.remove(this);this.parentNode.remove();"></div>';
            map_element.innerHTML = map_element_inner;
            var x = map_element.getElementsByClassName("bidderName")[0];
            for (var i = 0; i < this.biddersMapUse.length; i++) {
                var option = document.createElement("option");
                option.text = this.biddersMapUse[i];
                x.add(option, x[i]);
            }
            bid_map.insertAdjacentElement("beforeEnd", map_element);
        } else if (this.biddersMapUse.length == 0) {
            var errElem = document.getElementById("timeoutError");
            errElem.innerHTML = "Больше нет доступных биддеров для добавления";
            errElem.style.visibility = "visible";
            setTimeout(function() {
                errElem.style.visibility = "hidden";
            }, 2000);
        }      }
    },
    addBiddersMapUiElement: function(elem) {
        // biddersMap.addUi();
        if (document.getElementsByClassName("bidderName").length == 0) {
            biddersMap.addUi();
        } else if (document.getElementsByClassName("bidderName").length > 0) {
            if (document.getElementsByClassName("bidderId")[document.getElementsByClassName("bidderId").length - 1].value == "") {
                document.getElementById("mainError").innerHTML = "Заполните все ID кампаний";
                document.getElementById("mainError").style.visibility = "visible";
            } else {
                biddersMap.addUi();
                document.getElementById("mainError").style.visibility = "hidden";
            }
        }
    }
};

// End of BiddersMap section

// Start AdUnits section
var AdUnits = {
    adUnitsUsed: [],
    count: 0,
    ownerIdUsed: [],
    inputTimeout: null,
    bidderElementTimeout: null,
    sizesTimeout: null,
    bidderState: [],
    addSizes: function(elem) {
        var bidder = elem.parentNode.parentNode.getElementsByClassName("bidder")[0].value;
        var sizes = elem.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("tooltip")[1].getElementsByClassName("sizes")[0];
        if (requreSizes.includes(bidder)) {
            sizes.style.display = "block";
        }
    },
    updateUnitsUsed: function(elem) {
        if (elem.value != "") {
            var index = main.getPreviousSiblings(elem.parentNode.parentNode.parentNode).length;
            if (main.search(AdUnits.adUnitsUsed, elem.value, "code") == undefined) {
                AdUnits.adUnitsUsed[index].code = elem.value;
                // AdUnits.adUnitsUsed[index].bids = [];
                if (elem.parentNode.parentNode.parentNode.getElementsByTagName("button")[0].disabled == true) {
                    elem.parentNode.parentNode.parentNode.getElementsByTagName("button")[0].disabled = false;
                    document.getElementById("adUnitError").style.visibility = "hidden";
                }
                if (document.getElementById("sameContainer").style.visibility == "visible") {
                    document.getElementById("sameContainer").style.visibility = "hidden";
                    for (var i = 0; i < generateButtons.length; i += 1) {
                        generateButtons[i].disabled = false;
                    }
                }
            } else {
                elem.parentNode.parentNode.parentNode.getElementsByTagName("button")[0].disabled = true;
                document.getElementById("sameContainer").innerHTML = "ID контейнеров должны быть уникальными";
                document.getElementById("sameContainer").style.visibility = "visible";
                for (var i = 0; i < generateButtons.length; i += 1) {
                    generateButtons[i].disabled = true;
                }
            }
        }
    },
    addUi: function(elem, containerId) {
        if (containerId !== undefined) {
          var ad_units = document.getElementById("adUnitsInner");
          units_element = document.createElement("P");
          units_element_inner = '<div class="units_row" id="' + containerId + '">' +
              '<div class="delete adUnitDelete" onclick="AdUnits.removeUnit(this);this.parentNode.parentNode.remove();" id="adUnitsCloseButton"></div>' +
              '<div id="adUnitError">ERROR</div>' +
              '<p style="font-size: 15px;">ID контейнера ADFOX:</p>' +
              '<div class="tooltip">' +
              '<input class="code" placeholder="container ID" onfocus="validate.addPreviousCodeValue(this);" oninput="validate.removeCodeError(this);" value=' + containerId + '>' +
              '<span class="tooltiptext adUnitsTooltip">ID контейнера кода вставки ADFOX (уникальный)</span>' +
              '<span class="error adUnitsTooltip">Введите ID контейнера</span>' +
              '<div id="similarCodeError" style="visibility: hidden;">Сначала добавьте биддеров в Bidders Map</div>' +
              '</div>' +
              '<div style="display: inline-block;"><label for="inPage" style="padding-left:10px;font-size:14px;">InPage: </label><input type="checkbox" class="inPage" name="inPage" onclick="codeTypeAction(this)"></div>' +
              '<div class="tooltip">' +
              '<span class="tooltiptext sizesTooltip">Укажите размеры в формате:<br>[Ш,В]<br>или<br>[Ш,В],[Ш,В]</span>' +
              '<input class="sizes" placeholder="[240,400]" style="display: none;" onkeyup="AdUnits.updateSizes(this)">' +
              '<span class="error required">Размеры обязательны для блока с AdRiver или betweenDigital</span>' +
              '</div> ' +
              '  <br> <div class="units_bidder"> ' +
              '</div> ' +
              '<p style="font-size: 15px; padding:5px 0 0 10px;">Биддеры и их placement id:</p>' +
              '<button class="default" id="addBidder" onclick="AdUnits.addBidder(this);">Добавить покупателя</button>' +
              '</div>';
          units_element.innerHTML = units_element_inner;
          ad_units.insertAdjacentElement("beforeEnd", units_element);
        } else {
          AdUnits.adUnitsUsed.push({});
          var ad_units = document.getElementById("adUnitsInner");
          units_element = document.createElement("P");
          units_element_inner = '<div class="units_row">' +
              '<div class="delete adUnitDelete" onclick="AdUnits.removeUnit(this);this.parentNode.parentNode.remove();" id="adUnitsCloseButton"></div>' +
              '<div id="adUnitError">ERROR</div>' +
              '<p style="font-size: 15px;">ID контейнера ADFOX:</p>' +
              '<div class="tooltip">' +
              '<input class="code" placeholder="container ID" oninput="AdUnits.updateUnitsUsed(this);">' +
              '<span class="tooltiptext adUnitsTooltip">ID контейнера кода вставки ADFOX (уникальный)</span>' +
              '<span class="error adUnitsTooltip">Введите ID контейнера</span>' +
              '</div>' +
              '<div style="display: inline-block;"><label for="inPage" style="padding-left:10px;font-size:14px;">InPage: </label><input type="checkbox" class="inPage" name="inPage" onclick="codeTypeAction(this)"></div>' +
              '<div class="tooltip">' +
              '<span class="tooltiptext sizesTooltip">Укажите размеры в формате:<br>[Ш,В]<br>или<br>[[Ш,В],[Ш,В]]</span>' +
              '<input class="sizes" placeholder="[240,400]" style="display: none;" onkeyup="AdUnits.updateSizes(this)">' +
              '<span class="error required">Размеры обязательны для блока с AdRiver или betweenDigital</span>' +
              '</div> ' +
              '  <br> <div class="units_bidder"> ' +
              '</div> ' +
              '<p style="font-size: 15px; padding:5px 0 0 10px;">Биддеры и их placement id:</p>' +
              '<button class="default" id="addBidder" onclick="AdUnits.addBidder(this);">Добавить покупателя</button>' +
              '</div>';
          units_element.innerHTML = units_element_inner;
          ad_units.insertAdjacentElement("beforeEnd", units_element);
        }
    },
    removeUnit: function(elem) {
        // var id = elem.parentNode.id;
        // AdUnits.adUnitsUsed.splice(id - 1, 1);
        var index = main.getPreviousSiblings(elem.parentNode.parentNode).length;
        AdUnits.adUnitsUsed.splice(index, 1);
        if (document.getElementById("sameContainer").style.visibility == "visible") {
            document.getElementById("sameContainer").style.visibility = "hidden";
        }
    },
    addAdUnitsUiElement: function(elem) {
        if (document.getElementById("fillAdUnits").style.visibility == "visible") {
            document.getElementById("fillAdUnits").style.visibility = "hidden"
        }
        if (document.getElementsByClassName("bidder_map").length === 0) {
            document.getElementById("mainError").innerHTML = "Сначала добавьте биддеров в Bidders Map";
            document.getElementById("mainError").style.visibility = "visible";
            setTimeout(function() {
                document.getElementById("mainError").style.visibility = "hidden";
            }, 2000);
        } else {
            AdUnits.addUi(elem);
        }
    },
    updateSizes: function(elem) {
        if (document.getElementById("sizesError").style.visibility == "visible") {
            document.getElementById("sizesError").style.visibility = "hidden";
        }
        var index = main.getPreviousSiblings(elem.parentNode.parentNode.parentNode).length;
        if (/\[(.*\S.*)\]/.test(elem.value)) {
            // AdUnits.adUnitsUsed[index].sizes = JSON.parse("[" + elem.value + "]");
            AdUnits.adUnitsUsed[index].sizes = "[" + elem.value + "]";
            elem.parentNode.parentNode.getElementsByTagName("button")[0].disabled = false;
            var generateButtons = document.getElementsByClassName("generate");
            for (var i = 0; i < generateButtons.length; i += 1) {
                generateButtons[i].disabled = false;
            }
            if (document.getElementById("sizesError").style.visibility == "visible") {
                document.getElementById("sizesError").style.visibility = "hidden";
            }
        } else {
            document.getElementById("sizesError").innerHTML = "Должен быть не пустой массив. Например: [240,400]";
            document.getElementById("sizesError").style.visibility = "visible";
        }
    },
    updateBidderElement: function(elem) {
        elem.parentNode.parentNode.getElementsByClassName("bidder")[0].disabled = true;
        var index = main.getPreviousSiblings(elem.parentNode.parentNode.parentNode.parentNode.parentNode).length;
        var bidder = elem.parentNode.parentNode.getElementsByClassName("bidder")[0].value;
        var id = elem.value;
        var found;
        if (AdUnits.adUnitsUsed != []) {
          var found = AdUnits.adUnitsUsed.find(function(code) {
              return code.bids.some(function(bid) {
                  return bid.bidder === bidder && bid.params.placementId === id;
              });
          });
        }
        if (found == undefined) {
            var bidderExists = main.search(AdUnits.adUnitsUsed[index].bids, bidder, "bidder");
            if (bidderExists != undefined) {
                if (document.getElementById("adUnitError").style.visibility == "visible") {
                    document.getElementById("adUnitError").style.visibility = "hidden";
                    for (var i = 0; i < generateButtons.length; i += 1) {
                        generateButtons[i].disabled = false;
                    }
                }
                var position = AdUnits.adUnitsUsed[index].bids.indexOf(bidderExists);
                if (main.alphanumeric.test(id) && !(bidder.search("adfox") > -1)) {
                    if (document.getElementById("wrongLetters").style.visibility == "visible") {
                        document.getElementById("wrongLetters").style.visibility = "hidden";
                    }
                    for (var i = 0; i < generateButtons.length; i += 1) {
                        generateButtons[i].disabled = false;
                    }
                    AdUnits.adUnitsUsed[index].bids[position].params.placementId = id;
                } else if (bidder.search("adfox") > -1) {
                  if (document.getElementById("wrongLetters").style.visibility == "visible") {
                      document.getElementById("wrongLetters").style.visibility = "hidden";
                  }
                  for (var i = 0; i < generateButtons.length; i += 1) {
                      generateButtons[i].disabled = false;
                  }
                } else {
                    document.getElementById("wrongLetters").innerHTML = "Неподдерживаемые символы в placementId " + bidder;
                    document.getElementById("wrongLetters").style.visibility = "visible";
                    for (var i = 0; i < generateButtons.length; i += 1) {
                        generateButtons[i].disabled = true;
                    }
                }

            } else {
                if (requreSizes.includes(bidder)) {
                    var sizes = elem.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("sizes")[0].value;
                    if (sizes == "") {
                        AdUnits.adUnitsUsed[index].bids.push({
                            bidder: bidder,
                            params: {
                                placementId: id
                            }
                        });
                        elem.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("button")[0].disabled = true;
                        document.getElementById("sizesError").innerHTML = "Заполните размеры в поле Размеры (добавилось справа от 'ID контейнера ADFOX')";
                        document.getElementById("sizesError").style.visibility = "visible";
                        for (var i = 0; i < generateButtons.length; i += 1) {
                            generateButtons[i].disabled = true;
                        }
                    } else {
                        if (main.alphanumeric.test(id)) {
                            if (document.getElementById("wrongLetters").style.visibility == "visible") {
                                document.getElementById("wrongLetters").style.visibility = "hidden";
                            }
                            for (var i = 0; i < generateButtons.length; i += 1) {
                                generateButtons[i].disabled = false;
                            }
                            AdUnits.adUnitsUsed[index].sizes = "[" + sizes + "]";
                            AdUnits.adUnitsUsed[index].bids.push({
                                bidder: bidder,
                                params: {
                                    placementId: id
                                }
                            });
                        } else {
                            document.getElementById("wrongLetters").innerHTML = "Неподдерживаемые символы в placementId " + bidder;
                            document.getElementById("wrongLetters").style.visibility = "visible";
                            for (var i = 0; i < generateButtons.length; i += 1) {
                                generateButtons[i].disabled = true;
                            }
                        }
                    }
                } else if (bidder.search("adfox") > -1) {
                    // Поле с кодом адфокс
                    //Тут мы его будем парсить
                    //тут пушить в bids
                    if (id.includes("Ya.adfoxCode") || id.includes("params")) {
                      if (elem.classList.contains("err")) {
                        elem.classList.remove('err');
                      }
                      // if (id.includes("<!--AdFox START-->")) {
                      //   console.log("code with comments");
                      // }
                      // console.log(elem.parentNode.parentNode.querySelector(".bidder").value);
                      // if (elem.parentNode.parentNode.querySelector(".bidder").value != "adfox_" + extractedAccount) {
                      //   document.getElementById("accountError").style.visibility = "visible";
                      //   setTimeout(function(){
                      //     document.getElementById("accountError").style.visibility = "hidden";
                      //   }, 5000);
                      // }
                      // var adfoxParams = eval(id.slice(id.indexOf("params"), id.indexOf("});")).replace(":", "="));
                      // eval("var tmpParams = " + id.slice(id.indexOf("{"), id.lastIndexOf("}")) + "}");
                      // var adfoxParams = tmpParams;
                      var rx_owner = new RegExp('(ownerId:|"ownerId":)([^,]+)');
                      var rx_params = new RegExp('(params:|"params":)([^}]+})');
                      var owner_id = id.match(rx_owner)[2].trim();
                      eval("var tmpParams = " + id.match(rx_params)[2].trim());
                      var adfoxParams = tmpParams;
                      AdUnits.adUnitsUsed.forEach(function(bid) {
                        bid.bids.forEach(function(elem) {
                          if (main.compareObjects(elem.params, adfoxParams)) {
                            document.getElementById("similarCode").style.visibility = "visible";
                            setTimeout(function() {
                              document.getElementById("similarCode").style.visibility = "hidden";
                            }, 5000);
                          }
                        });
                      });
                      AdUnits.ownerIdUsed.push(owner_id);
                      AdUnits.adUnitsUsed[index].bids.push({
                        bidder: bidder,
                        params: adfoxParams
                      });
                      if (elem.classList.contains("err")) {
                        elem.classList.remove("err");
                      }

                    } else {
                      document.getElementById("adfoxParamsError").innerHTML = "Должен быть код вставки ADFOX";
                      document.getElementById("adfoxParamsError").style.visibility = "visible";
                      setTimeout(function(){
                        document.getElementById("adfoxParamsError").style.visibility = "hidden";
                      }, 3000);
                      elem.classList.add('err');
                    }

                } else {
                    // if (document.getElementById("adUnitError").style.visibility == "visible") {
                    //   document.getElementById("adUnitError").style.visibility = "hidden";
                    // }
                    // AdUnits.bidderState.push({});
                    // AdUnits.bidderState[index - 1][bidder] = id;
                    if (main.alphanumeric.test(id)) {
                        if (document.getElementById("wrongLetters").style.visibility == "visible") {
                            document.getElementById("wrongLetters").style.visibility = "hidden";
                        }
                        for (var i = 0; i < generateButtons.length; i += 1) {
                            generateButtons[i].disabled = false;
                        }
                        AdUnits.adUnitsUsed[index].bids.push({
                            bidder: bidder,
                            params: {
                                placementId: id
                            }
                        });
                    } else {
                        document.getElementById("wrongLetters").innerHTML = "Неподдерживаемые символы в placementId " + bidder;
                        document.getElementById("wrongLetters").style.visibility = "visible";
                        for (var i = 0; i < generateButtons.length; i += 1) {
                            generateButtons[i].disabled = true;
                        }
                    }

                }
            }
        } else {
            document.getElementById("adUnitError").innerHTML = bidder + " уже использует такой placementId";
            document.getElementById("adUnitError").style.visibility = "visible";
            for (var i = 0; i < generateButtons.length; i += 1) {
                generateButtons[i].disabled = true;
            }
        }
        elem.parentNode.parentNode.getElementsByClassName("bidder")[0] = true;
    },
    addBidder: function(elem, bidder, placementId, biddersArray, isRed) {
        if (bidder !== undefined && placementId !== undefined) {
          var bidder_element = document.createElement("P");
          bidder_element_inner = '<div class="bidder_row"> <select class="bidder" onchange="console.log(this.classList.remove(\'err\'))"></select>' +
              '<div class = "tooltip placementIdTooltip">' +
              '<span class="error tooltiptext">Placement ID получите на стороне биддера</span>' +
              '<input value = ' + placementId + ' class="placementId" placeholder="Placement ID" onfocus="validate.previousPlacementId = this.value;" oninput="validate.checkplacementId(this);">' +
              '<textarea class="bidder adfoxCode" style="display: none;" oninput="validate.checkplacementId(this);"></textarea>' +
              '</div>' +
              '<div class="delete placementDelete" onclick="AdUnits.removeBidder(this);this.parentNode.remove();"></div>';
          bidder_element.innerHTML = bidder_element_inner;
          // Выбираем в bidder_element select чтобывставить в выпадашку оставшихся биддеров
          var x = bidder_element.getElementsByClassName('bidder')[0];
          if (isRed == true) {
            x.classList.add('err');
          }
          var option = document.createElement("option");
          option.text = bidder;
          x.add(option);
          for (var i = 0; i < biddersArray.length; i++) {
            var option = document.createElement("option");
            option.text = biddersArray[i];
            x.add(option, x[i]);
          }
          elem.insertAdjacentElement('beforeEnd', bidder_element);
        } else {
          if (generateButtons[0].disabled && generateButtons[1].disabled) {
              for (var i = 0; i < generateButtons.length; i += 1) {
                  generateButtons[i].disabled = false;
              }
          }
          var index = main.getPreviousSiblings(elem.parentNode.parentNode).length;
          if (elem.parentNode.getElementsByClassName("bidder_row").length < Object.keys(biddersMap.campaignIdUsed).length) {
              // ID контейнера ADFOX
              if (elem.parentNode.querySelector(".inPage").checked) {
                AdUnits.adUnitsUsed[index].codeType = "inpage";
              }
              var code = elem.parentNode.getElementsByClassName("tooltip")[0].getElementsByClassName("code")[0];
              if (code.value != "") {
                  var bidder_element = document.createElement("P");
                  bidder_element_inner = '<div class="bidder_row"> <select class="bidder" onchange="AdUnits.changeBidder(this)"></select>' +
                      '<div class = "tooltip placementIdTooltip">' +
                      '<span class="error tooltiptext">Placement ID получите на стороне биддера</span>' +
                      '<input class="placementId" placeholder="Placement ID" onfocus="AdUnits.addSizes(this);" oninput="AdUnits.updateBidderElement(this);">' +
                      '<textarea class="bidder adfoxCode" style="display: none;" oninput="AdUnits.updateBidderElement(this);"></textarea>' +
                      '</div>' +
                      '<div class="delete placementDelete" onclick="AdUnits.removeBidder(this);this.parentNode.remove();"></div>';
                  bidder_element.innerHTML = bidder_element_inner;
                  // Выбираем в bidder_element select чтобывставить в выпадашку оставшихся биддеров
                  var x = bidder_element.getElementsByClassName('bidder')[0];
                  // if (window.DATAFROMCHECK) {
                  //   AdUnits.adUnitsUsed = window.YaHeaderBiddingSettings.adUnits;
                  // }
                  for (var i = 0; i < Object.keys(biddersMap.campaignIdUsed).length; i++) {
                      var option = document.createElement("option");
                      option.text = Object.keys(biddersMap.campaignIdUsed)[i];
                      if (AdUnits.adUnitsUsed[index].bids == undefined) {
                          AdUnits.adUnitsUsed[index].bids = [];
                      }
                      if (typeof(main.search(AdUnits.adUnitsUsed[index].bids, Object.keys(biddersMap.campaignIdUsed)[i], 'bidder')) == "undefined") {
                          if (option.value != "x") {
                            x.add(option, x[i]);
                          }
                      }
                  }
                  main.onAppend(elem.parentNode, function(added) {
                      var bidder = added[0].querySelector(".bidder").value;
                      //"adfox_adsmart".search("adfox")
                      if (bidder.search("adfox") > -1) {
                        elem.parentNode.querySelectorAll(".bidder_row")[elem.parentNode.querySelectorAll(".bidder_row").length - 1].querySelector(".error.tooltiptext").classList.add("marginForAdfCode")
                        elem.parentNode.querySelectorAll(".bidder_row")[elem.parentNode.querySelectorAll(".bidder_row").length - 1].querySelector(".placementId").style.display = "none";
                        elem.parentNode.querySelectorAll(".bidder_row")[elem.parentNode.querySelectorAll(".bidder_row").length - 1].querySelector(".adfoxCode").style.display = "inline-block";
                      }
                  });
                  // console.log(elem.parentNode);
                  elem.parentNode.insertAdjacentElement('beforeEnd', bidder_element);

                  // console.log(elem.parentNode.querySelectorAll(".bidder_row")[elem.parentNode.querySelectorAll(".bidder_row").length - 1]);

              } else {
                  document.getElementById("adUnitError").innerHTML = "Заполните containerId";
                  document.getElementById("adUnitError").style.visibility = "visible";
                  setTimeout(function() {
                      document.getElementById("adUnitError").style.visibility = "hidden";
                  }, 1500);
              }
          } else {
              var errElem = document.getElementById("timeoutError");
              errElem.innerHTML = "В каждом adUnit биддер может быть использован только по одному разу.";
              errElem.style.visibility = "visible";
              setTimeout(function() {
                  errElem.style.visibility = "hidden";
              }, 2300);
          }
        }
    },
    changeBidder: function(elem) {
      var bidder = elem.value;
      var input = elem.parentNode.querySelector(".placementId");
      var textarea = elem.parentNode.querySelector(".bidder.adfoxCode");
      if (bidder.includes("adfox") && textarea.style.display == "none") {
        textarea.style.display = "inline-block";
        input.style.display = "none";
      } else if (bidder.includes("adfox") && textarea.style.display == "inline-block") {
        textarea.style.display = "inline-block";
        input.style.display = "none";
      } else {
        textarea.style.display = "none";
        input.style.display = "inline-block";
      }
    },
    removeBidder: function(elem) {
        var id = elem.parentNode.querySelector(".bidder.adfoxCode").value;
        if (elem.parentNode.querySelector(".bidder.adfoxCode").style.display == "inline-block" && id != "") {
          eval("var tmpParams = " + id.slice(id.indexOf("{"), id.lastIndexOf("}")) + "}");
          var adfoxParams = tmpParams;
          AdUnits.ownerIdUsed.splice(AdUnits.ownerIdUsed.indexOf(adfoxParams.ownerId), 1);
        }
        var bidder = elem.parentNode.querySelector(".bidder").value;
        // var index = elem.parentNode.parentNode.parentNode.id;
        var index = main.getPreviousSiblings(elem.parentNode.parentNode.parentNode.parentNode).length;
        var bidder = elem.parentNode.getElementsByClassName("bidder")[0].value;
        var arrIndex = AdUnits.adUnitsUsed[index].bids.indexOf(main.search(AdUnits.adUnitsUsed[index].bids, bidder, 'bidder'))
        AdUnits.adUnitsUsed[index].bids.splice(arrIndex, 1);
        if (requreSizes.includes(bidder)) {
            elem.parentNode.parentNode.parentNode.getElementsByClassName("sizes")[0].value = "";
            elem.parentNode.parentNode.parentNode.getElementsByClassName("sizes")[0].style.display = "none";
            delete AdUnits.adUnitsUsed[index].sizes;
            if (elem.parentNode.parentNode.parentNode.querySelector("#addBidder").disabled == true) {
                elem.parentNode.parentNode.parentNode.querySelector("#addBidder").disabled = false;
            }
            if (document.getElementById("sizesError").style.visibility == "visible") {
                document.getElementById("sizesError").style.visibility = "hidden";
            }
        }
    }
}
// End AdUnits section

// Begin timeout section

var timeoutInput = {
    timeout: "500",
    checkTimeout: function(elem) {
        var error = document.getElementById("timeoutError");
        if (isNaN(elem.value)) {
            error.innerHTML = "Должны быть цифры";
            elem.classList.add("err");
            elem.focus();
            error.style.visibility = "visible";
        } else if (elem.value.length > 4 || elem.value > 3000) {
            error.innerHTML = "Timeout не должен привышать 3000мс";
            elem.classList.add("err");
            elem.focus();
            error.style.visibility = "visible";
        } else {
            if (error.style.visibility == "visible") {
                error.style.visibility = "hidden";
            }
            if (elem.classList.contains("err")) {
                elem.classList.remove("err");
            }
            if (elem.value == "") {
                this.timeout = "500";
            } else {
                this.timeout = elem.value.trim();
            }
        }
    }
};

//End of timeout section
// Start checker
var validate = {
    check: function() {
      document.querySelector(".check").disabled = true;
      var regexp = /(var|const).*adfoxBiddersMap[^]+var userTimeout.*;/g;
      var width = document.querySelector("#browserWidth").value;
      if (width !== "") {
        window.innerWidth  = parseInt(width);
        // window.document.documentElement.clientWidth = parseInt(width);
        // window.document.body.clientWidth = parseInt(width);
      }
      try {
        var input = eval(regexp.exec(document.querySelector("#input_textarea").value + "window.YaHeaderBiddingSettings = {biddersMap: adfoxBiddersMap,adUnits: adUnits,timeout: userTimeout};").input);
      } catch (err) {
        // alert("Синтаксическая ошибка в конфиге" + err);
        document.querySelector("#modal-1-title").innerHTML = "Синтаксическая ошибка в конфиге";
        document.querySelector("#modal-1-content").innerHTML = "<code>" + err + "</code>";
        MicroModal.show('modal-1');
        document.querySelector(".check").disabled = false;
        return;
      }
      // eval(input);
      for (var key in input.biddersMap) {
        if (window.YaHeaderBiddingSettings.biddersMap.hasOwnProperty(key)) {
          biddersMap.addUi(key, input.biddersMap[key]);
        }
        main.removeFromArray(biddersMap.biddersMapUse, key);
      }
      for (var i = 0; i < input.adUnits.length; i++) {
        // console.log(input.adUnits[i]);
        AdUnits.addUi("123", input.adUnits[i].code);
        if (window.YaHeaderBiddingSettings.adUnits[i].sizes !== undefined) {
          document.querySelectorAll(".units_row")[i].querySelector(".sizes").style.display = "block";
          document.querySelectorAll(".units_row")[i].querySelector(".sizes").value = "[" + input.adUnits[i].sizes + "]";
        }
        if (window.YaHeaderBiddingSettings.adUnits[i].codeType === "inpage") {
          document.querySelectorAll(".units_row")[i].querySelector(".inPage").checked = true;
          document.querySelectorAll(".units_row")[i].querySelector(".inPage").parentNode.style.display = "inline-block";
        }

      }
      //similar bids
      //example: AdUnits.addBidder(document.querySelectorAll(".units_row")[0], "mark", "31337", [1,2,3], true);
      var bidsUsed;
      var bidsCanBeUsed = [];
      for (var i = 0; i < document.querySelectorAll(".bidderName").length; i++) {
        bidsCanBeUsed.push(document.querySelectorAll(".bidderName")[i].value);
      }
      //end similar bids
      window.YaHeaderBiddingSettings.adUnits.forEach(function(item, i, arr){
        bidsUsed = [];
        item.bids.forEach(function(item, b, arr){
             var row = document.querySelectorAll(".units_row")[i];
             if (item.bidder.includes("adfox")) {
               if (bidsUsed.includes(item.bidder)) {
                 main.removeFromArray(bidsCanBeUsed, item.bidder);
                 AdUnits.addBidder(row, item.bidder, JSON.stringify(item.params), bidsCanBeUsed, true);
                 bidsCanBeUsed.push(item.bidder);
               } else {
                 main.removeFromArray(bidsCanBeUsed, item.bidder);
                 AdUnits.addBidder(row, item.bidder, JSON.stringify(item.params), bidsCanBeUsed);
                 bidsCanBeUsed.push(item.bidder);
               }
             } else {
               if (bidsUsed.includes(item.bidder)) {
                 main.removeFromArray(bidsCanBeUsed, item.bidder);
                 AdUnits.addBidder(row, item.bidder, item.params.zoneid || item.params.placementId || item.params.siteid, bidsCanBeUsed, true);
                 bidsCanBeUsed.push(item.bidder);
               } else {
                 main.removeFromArray(bidsCanBeUsed, item.bidder);
                AdUnits.addBidder(row, item.bidder, item.params.zoneid || item.params.placementId || item.params.siteid, bidsCanBeUsed);
                bidsCanBeUsed.push(item.bidder);
               }
             }
             bidsUsed.push(item.bidder);
	      });
      });
      document.querySelector("#userTimeout").value = window.YaHeaderBiddingSettings.timeout;
      //checks
      // --campaign_id
      var bidderIds = document.querySelectorAll(".bidderId");
      var ids = [];
      for (var i = 0; i < bidderIds.length; i++) {
        ids.push(bidderIds[i].value);
      }
      var duplicates = main.findDuplicatesArr(ids);
      var inputs = document.querySelectorAll("input.bidderId");
      for (var i = 0; i < inputs.length; i++) {
        duplicates.forEach(function(elem, b){
          if (inputs[i].value == elem) {
            inputs[i].classList.add("err");

          }
        });
      }
      // --campaign_id
      //---container_id
      var cantainers = document.querySelectorAll("input.code");
      var containerIds = [];
      for (var i = 0; i < cantainers.length; i++) {
        containerIds.push(cantainers[i].value);
      }
      var containerDuplicates = main.findDuplicatesArr(containerIds);
      var codeInputs = document.querySelectorAll("input.code");
      for (var i = 0; i < codeInputs.length; i++) {
        containerDuplicates.forEach(function(elem, b){
          if (codeInputs[i].value == elem) {
            codeInputs[i].classList.add("err");
          }
        });
      }
      //---container_id
      //----placementId
      var placements = document.querySelectorAll("input.placementId");
      var placementIds = [];
      for (var i = 0; i < placements.length; i++) {
        placementIds.push(placements[i].value);
      }
      var placementDuplicates = main.findDuplicatesArr(placementIds);
      var placementInputs = document.querySelectorAll("input.placementId");
      for (var i = 0; i < placementInputs.length; i++) {
        placementDuplicates.forEach(function(elem, b){
          // Если объект, значит это params ADFOX
          if (placementInputs[i].value == elem && typeof JSON.parse(placementInputs[i].value) !== "object") {
            placementInputs[i].classList.add("err");
          }
        });
      }
      //----placementId
      //checks-end
      window.DATAFROMCHECK = true;
      biddersMap.campaignIdUsed = window.YaHeaderBiddingSettings.biddersMap;
      AdUnits.adUnitsUsed = window.YaHeaderBiddingSettings.adUnits;
      var generateButtons = document.getElementsByClassName("generate");
      for (var i = 0; i < generateButtons.length; i += 1) {
          generateButtons[i].disabled = false;
      }
      for (var i = 0; i < document.querySelectorAll(".validateWarn").length; i++){
        document.querySelectorAll(".validateWarn")[i].style.display = "block";
      }
    },
    loadFromUrl: function(){
      var url = document.querySelector("#configUrl").value;
      if (url != "" && url.includes("http")) {
        document.querySelector(".waitSpinner").style.display = "block";
        var regexp = /(var|const).*adfoxBiddersMap[^]+var userTimeout.*;/g;
        var newURL = new URL(url);
        var hostname = newURL.hostname;
        var start = new Date().getTime();
        var latency;
        // fetch('https://cors.io/?' + url)
        fetch('https://smilearts.ru/test/proxy.php?url=' + url)
        // .then(function(response) {
        // if (!response.ok) {
        //     throw Error(response.statusText);
        // }
        // return response;
        // })
        .then(function(response) {
            document.querySelector(".waitSpinner").style.display = "none";
            var now = new Date().getTime();
            latency = (now - start)/1000;
            console.log("HB config was loaded in " + latency + " sec.");
            ym(50256261, 'reachGoal', 'fetch_success', {
              domain: hostname,
              timing: latency
            });
            return response.text();
          })
          .then(function(html) {
            // console.log(html);
            var prHtml = html;
            var config = regexp.exec(prHtml)[0];
            document.querySelector("#input_textarea").value = config + "\n\nwindow.YaHeaderBiddingSettings = {\nbiddersMap: adfoxBiddersMap,\nadUnits: adUnits,\ntimeout: userTimeout\n};";
            var hblog = new Image().src = "https://smilearts.ru/test/hblog.php?action=success&uid=" + main.getYmUid() + "&domain='" + url + "'&latency=" + latency + "&status=success";
          })
          .catch(function(err) {
            document.querySelector(".waitSpinner").style.display = "none";
            console.log('Failed: ', err);
            ym(50256261, 'reachGoal', 'fetch_error');
            // var hblog = new Image().src = "https://smilearts.ru/test/hblog.php?action=success&uid=" + main.getYmUid() + "&domain='" + url + "'&latency=" + latency + "&status=error";
            // alert("Ошибка загрузки конфига");
            document.querySelector("#modal-1-title").innerHTML = "Ошибка обработки конфига";
            document.querySelector("#modal-1-content").innerHTML = "В теле страницы конфиг не обнаружен" + "<br>" + "<code>" + err + "</code>";
            MicroModal.show('modal-1');

          });
      } else {
        // alert("Введите корректный URL c указанием протокола");
        document.querySelector("#modal-1-title").innerHTML = "Ошибка загрузки конфига";
        document.querySelector("#modal-1-content").innerHTML = "Введите корректный URL с протоколом";
        MicroModal.show('modal-1');
      }
    },
    removeBiddersMapError: function(elem){
      // if (elem.classList.contains("err")) {
      //   elem.classList.remove("err");
      // }
      var bidmap = {};
      if (elem.value != validate.previousValue) {
        elem.classList.remove("err");
      }
      for (var i = 0; i < document.querySelectorAll(".bidder_map").length; i++) {
        bidmap[document.querySelectorAll(".bidder_map")[i].querySelector(".bidderName").value] = document.querySelectorAll(".bidder_map")[i].querySelector(".bidderId").value;
      }
      if (main.getAllIndexes(Object.values(bidmap), validate.previousValue).length <= 1) {
        main.getInputsByValue(validate.previousValue)[0].classList.remove("err");
      }

    },
    previousValue: 0,
    addPreviousValue: function(val){
      validate.previousValue = val;
    },
    previousPlacementId: 0,
    checkplacementId: function(elem){
      elem.classList.remove("err");
      main.getInputsByValue(validate.previousPlacementId)[0].classList.remove("err");
    },
    previousCodeValue: 0,
    addPreviousCodeValue: function(elem){
      validate.previousCodeValue = elem.value;
    },
    removeCodeError: function(elem){
      elem.classList.remove("err");
      main.getInputsByValue(validate.previousCodeValue)[0].classList.remove("err");
    }
};
// End checker
var main = {
    getYmUid: function() {
      var match = document.cookie.match('(?:^|;)\\s*_ym_uid=([^;]*)');
      return (match) ? decodeURIComponent(match[1]) : false;
    },
    getInputsByValue: function(value) {
      var allInputs = document.getElementsByTagName("input");
      var results = [];
      for(var x=0;x<allInputs.length;x++)
        if(allInputs[x].value == value)
            results.push(allInputs[x]);
      return results;
    },
    getAllIndexes: function(arr, val) {
      var indexes = [], i;
      for(i = 0; i < arr.length; i++)
      if (arr[i] === val)
      indexes.push(i);
      return indexes;
    },
    findDuplicatesArr: function(arra1){
      var object = {};
        var result = [];

        arra1.forEach(function (item) {
          if(!object[item])
              object[item] = 0;
            object[item] += 1;
        })

        for (var prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }

        return result;
    },
    onAppend: function(elem, f) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                if (m.addedNodes.length) {
                    f(m.addedNodes)
                }
            })
        })
        observer.observe(elem, {childList: true})
    },
    // isObjValueExist: function(obj, val) {
    //   Object.keys(obj).forEach(function(key){
    //   	if (obj[key] == val) {
    //       return true;
    //     }
    //   });
    // },
    getKeyByValue: function(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    },
    isAccountInUse: function(acc) {
      var inputs = document.querySelectorAll(".bidderAccount");
    	var accounts = [];
    	inputs.forEach(function(item){
    		accounts.push(item.value);
    	});
    	if (accounts.includes(acc)) {
    		return true;
    	} else {
    		return false;
    	}
    },
    compareObjects: function (obj1, obj2) {
	//Loop through properties in object 1
        	for (var p in obj1) {
        		//Check property exists on both objects
        		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

        		switch (typeof (obj1[p])) {
        			//Deep compare objects
        			case 'object':
        				if (!Object.compare(obj1[p], obj2[p])) return false;
        				break;
        			//Compare function code
        			case 'function':
        				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        				break;
        			//Compare values
        			default:
        				if (obj1[p] != obj2[p]) return false;
        		}
        	}

        	//Check object 2 for any extra properties
        	for (var p in obj2) {
        		if (typeof (obj1[p]) == 'undefined') return false;
        	}
        	return true;
        },
    objCount: function(obj) {
        var count = 0;
        for (k in obj)
            if (obj.hasOwnProperty(k)) count++;
        return count;
    },
    getPreviousSiblings: function(el, filter) {
        var siblings = [];
        while (el = el.previousSibling) {
            if (!filter || filter(el)) siblings.push(el);
        }
        return siblings;
    },
    removeFromArray: function(arr) {
        var what, a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    },
    search: function(array, key, prop) {
        prop = (typeof prop === 'undefined') ? 'name' : prop;
        for (var i = 0; i < array.length; i++) {
            if (array[i][prop] === key) {
                return array[i];
            }
        }
    },
    showSuccess: function() {
        document.getElementById("timeoutError").innerHTML = "Код скопирован в буфер обмена";
        document.getElementById("timeoutError").style.backgroundColor = "green";
        document.getElementById("timeoutError").style.visibility = "visible";
        setTimeout(function() {
            document.getElementById("timeoutError").style.visibility = "hidden";
        }, 1500)
    },
    alphanumeric: /.*/,
    numbers: /^[0-9]{0,}$/,
    highlightCode: function() {
        if (document.getElementsByClassName("CodeMirror").length > 0) {
            document.getElementsByClassName("CodeMirror")[0].remove();
        }
        var mixedMode = {
            name: "htmlmixed"
        };
        var editor = CodeMirror.fromTextArea(document.getElementById("result_textarea"), {
            mode: mixedMode,
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: true
        });
    },
    createBiddersMap: function() {
        if ("x" in biddersMap.campaignIdUsed) {
          delete biddersMap.campaignIdUsed.x;
        }
        return 'var adfoxBiddersMap = ' + JSON.stringify(biddersMap.campaignIdUsed, null, 4) + ';';
    },
    make: function() {
        var tail = 'var userTimeout = ' + timeoutInput.timeout + ';' + '\n' +
            'window.YaHeaderBiddingSettings = {' + '\n' +
            '    biddersMap: adfoxBiddersMap,' + '\n' +
            '    adUnits: adUnits,' + '\n' +
            '    timeout: userTimeout' + '\n' +
            '};' + '\n' + '</script>';
        var loader = '<script src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"' + as + '><\/script>';
        if (document.getElementById("as").checked) {
            var loader = '<script async src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"><\/script>';
        } else {
            var loader = '<script src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"><\/script>';
        }
        document.getElementById('result_textarea').value = '<script async src="https://yastatic.net/pcode/adfox/header-bidding.js"><\/script>' + '\n' + '<script>' + '\n';
        document.getElementById('result_textarea').value += main.createBiddersMap();
        document.getElementById('result_textarea').value += '\n' + 'var adUnits = ' + JSON.stringify(AdUnits.adUnitsUsed, null, 4) + ';' + '\n' + tail;
        document.getElementById('result_textarea').value += '\n' + loader;
        main.highlightCode();
    },
    makeInstall: function() {
      // Если перегенерируем
        if (window.DATAFROMCHECK) {
          // console.log("aftercheck logic");
          var bidmap = {};
          var units = [];
          var bidMapNodes = document.querySelectorAll(".bidder_map");
          var tempunit;
          var timeout = document.getElementById("userTimeout").value;
          for (var i = 0; i < bidMapNodes.length; i++) {
            if (bidMapNodes[i].querySelector(".bidderName").value == "adfox") {
              if (!document.querySelectorAll(".bidder_map")[i].querySelector(".bidderId").classList.contains("err") && !document.querySelectorAll(".bidder_map")[i].querySelector(".bidderAccount").classList.contains("err")) {
                  bidmap[bidMapNodes[i].querySelector(".bidderName").value + "_" + bidMapNodes[i].querySelector(".bidderAccount").value] = bidMapNodes[i].querySelector(".bidderId").value;
              } else {
                console.log("thrown away because of error");
              }
            } else {
                bidmap[bidMapNodes[i].querySelector(".bidderName").value] = bidMapNodes[i].querySelector(".bidderId").value;
            }
          }
          var unitNodes = document.querySelector("#adUnitsInner").children;
          for (var i = 0; i < unitNodes.length; i++) {
            tempunit = {
              code: unitNodes[i].querySelector(".code").value,
              bids:[]
            };
            if (unitNodes[i].querySelector(".sizes") !== null && unitNodes[i].querySelector(".sizes").value !== "") {
              tempunit.sizes = JSON.parse("[" + unitNodes[i].querySelector(".sizes").value + "]");
            }
            if (unitNodes[i].querySelector(".inPage").checked) {
              tempunit.codeType = "inpage";
            }
            var bidderRows = unitNodes[i].querySelectorAll(".bidder_row");
            for (var z = 0; z < bidderRows.length; z++) {
              if (bidderRows[z].querySelector(".bidder").value.includes("adfox")) {
                // console.log(bidderRows[z].querySelector(".bidder.adfoxCode").value);
                if (bidderRows[z].querySelector(".bidder.adfoxCode").style.display == "inline-block") {
                  var rx_params = new RegExp('(params:|"params":)([^}]+})');
                  eval("var tmpParams = " + bidderRows[z].querySelector(".bidder.adfoxCode").value.match(rx_params)[2].trim());
                  var adfoxParams = tmpParams;
                } else {
                  var adfoxParams = JSON.parse(bidderRows[z].querySelector(".placementId").value);
                }
                var tempBid = {
                  bidder: bidderRows[z].querySelector(".bidder").value,
                  params: adfoxParams
                };
              } else {
                var tempBid = {
                  bidder: bidderRows[z].querySelector(".bidder").value,
                  params: {placementId: bidderRows[z].querySelector(".placementId").value}
                };
              }
              tempunit.bids.push(tempBid);
            }
            units.push(tempunit);
          }
          // console.log(bidmap);
          // document.getElementById("result_textarea").value += "var adfoxBiddersMap =  " + JSON.stringify(bidmap); + "\n";
          // document.getElementById("result_textarea").value += "var adUnits = " + JSON.stringify(units); + "\n";
          // ---------
          var tail = 'var userTimeout = ' + timeout + ';' + '\n' +
              'window.YaHeaderBiddingSettings = {' + '\n' +
              '    biddersMap: adfoxBiddersMap,' + '\n' +
              '    adUnits: adUnits,' + '\n' +
              '    timeout: userTimeout' + '\n' +
              '};' + '\n' + '</script>';
          var loader = '<script src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"' + as + '><\/script>';
          if (document.getElementById("as").checked) {
              var loader = '<script async src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"><\/script>';
          } else {
              var loader = '<script src="https://yastatic.net/pcode/adfox/loader.js" crossorigin="anonymous"><\/script>';
          }
          document.getElementById('result_textarea').value = '<script async src="https://yastatic.net/pcode/adfox/header-bidding.js"><\/script>' + '\n' + '<script>' + '\n';
          document.getElementById('result_textarea').value += "\n" + "var adfoxBiddersMap =  " + JSON.stringify(bidmap, null, 4) + ";" + "\n";
          document.getElementById('result_textarea').value += "\n" + "var adUnits = " + JSON.stringify(units, null, 4) + ";" + "\n" + tail;
          document.getElementById('result_textarea').value += "\n" + loader;
          main.highlightCode();
          //----------------
        } else {
          var bidders = [];
          var check = true;
          var emptyPlacementErrors = "";
          AdUnits.adUnitsUsed.forEach(function(element) {
              if (Object.keys(element).length === 0 && element.constructor === Object) {
                  document.getElementById("emptyBidder").innerHTML = "Заполните все поля";
                  document.getElementById("emptyBidder").style.visibility = "visible";
                  check = false;
              }

          });
          if (check) {
              if (document.getElementById("emptyBidder").style.visibility == "visible") {
                  document.getElementById("emptyBidder").style.visibility = "hidden";
              }
              AdUnits.adUnitsUsed.forEach(function(element) {
                  element.bids.forEach(function(item) {
                      if (bidders.indexOf(item.bidder) == -1) {
                          if (!(item.bidder in biddersMap.campaignIdUsed)) {
                              bidders.push(item.bidder);
                          }
                      }
                  });
              });

              AdUnits.adUnitsUsed.forEach(function(unit) {
                  if (unit.bids.length == 0) {
                      emptyPlacementErrors += "Заполните placementId для контейнера " + unit.code + "<br>";
                  }
              });

              if (bidders.length == 0) {
                  if (Object.keys(biddersMap.campaignIdUsed).length === 0 && biddersMap.campaignIdUsed.constructor === Object) {
                      document.getElementById("generateError").innerHTML = "Заполните Bidders Map";
                      document.getElementById("generateError").style.visibility = "visible";
                  } else if (AdUnits.adUnitsUsed.length == 0) {
                      document.getElementById("fillAdUnits").innerHTML = "Заполните Ad Units";
                      document.getElementById("fillAdUnits").style.visibility = "visible";
                  } else if (emptyPlacementErrors != "") {
                      document.getElementById("emptyPlacement").innerHTML = emptyPlacementErrors;
                      document.getElementById("emptyPlacement").style.visibility = "visible";
                      setTimeout(function() {
                          document.getElementById("emptyPlacement").style.visibility = "hidden";
                      }, 2000);
                  } else {
                      AdUnits.adUnitsUsed.forEach(function(element) {
                          if (element.sizes != undefined && typeof element.sizes == "string") {
                              var size = element.sizes;
                              element.sizes = JSON.parse(size);
                          }
                      });
                      main.make();
                  }
              } else {
                  document.getElementById("generateError").innerHTML = "В Bidders Map не добавлены ID кампаний для " + JSON.stringify(bidders).slice(2, -2);;
                  document.getElementById("generateError").style.visibility = "visible";
              }
          }



      }
        }
};

function checkSpace(event)
{
   if(event.which == 32)
   {
      event.preventDefault();
      return false;
   }
}

function codeTypeAction(elem) {
  if (!window.DATAFROMCHECK) {
    var index = main.getPreviousSiblings(elem.parentNode.parentNode.parentNode).length;
    if (elem.checked) {
      // console.log("check");
      AdUnits.adUnitsUsed[index].codeType = "inpage";
    } else {
      // console.log("uncheck");
      delete AdUnits.adUnitsUsed[index].codeType;
    }
  }
}
