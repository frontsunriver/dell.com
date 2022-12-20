// Declare all global variables here, variable name starts with voc_


var voc_timestamp = voc_getRandomNumber();
var voc_endpoint="https://www.dell.com/koa/vocaas";
var voc_sc;
var vocaas = voc_getVocaasObject();

function voc_getVocaasObject(){
    if(window.vocaas){
        for (let key in vocaas) {
            let value = vocaas[key].isProcessed;
            if(value == true){
                vocaas[key].isProcessed = false;
            }
        }
        return vocaas;
    }
    else{
        return {};
    }
}

$(document).ready(function() {
	if(voc_endpoint.indexOf("PCF-END")>=0){
		voc_endpoint="http://localhost:7340";
	}
//	$.ajaxSetup({
//      xhrFields: {
//        withCredentials: true
//      }
//    });
	voc_getsurvey();
});

//Change number everytime before deployment related to css/js
function voc_getRandomNumber(){
    var date = new Date();
    var number =  "2" + date.getFullYear() + (date.getMonth()+1) + date.getDate();
    if(window.location.host!="www.dell.com"){
        number = number + date.getHours() + date.getMinutes() + date.getMilliseconds();
    }
    return number;
}

function voc_loadVocCss(_tab){
//    if(voc_cssfilecount==0){
//        $("#microsurvey").hide();
//    }
    var vocCssURL=document.createElement('link');
    vocCssURL.href = voc_endpoint+'/resources/css/voc_custom_style.min.css?=_'+voc_timestamp;
    vocCssURL.rel= 'stylesheet';
    vocCssURL.type='text/css';
    vocCssURL.onload = voc_enableMicrosurveyDiv(_tab);
    document.getElementsByTagName('head')[0].appendChild(vocCssURL);
}

var voc_cssfilecount=0;
function voc_enableMicrosurveyDiv(_tab){
    voc_cssfilecount++;
    if(voc_cssfilecount>=2){
        $("#microsurvey" + _tab).show();
    }
}

/*function initializeJsScript(){
    jQuery.voc_loadScript = function (url,cache, callback ) {
        $.ajax({
            url: url,
            dataType: 'script',
            cache: cache,
            success: callback,
            async: true
        });
    };
}*/

function voc_loadScript(url,cache, callback ) {
    $.ajax({
        url: url,
        dataType: 'script',
        cache: cache,
        success: callback,
        async: true,
        xhrFields: {
            withCredentials: true
        }
    });
}
function voc_resetMetadata(_tab) {
    vocaas["microsurvey" + _tab]["voc_creationDate"]="";
    vocaas["microsurvey" + _tab]["voc_guid"]="";
    vocaas["microsurvey" + _tab]["voc_surveyJson"]="";
    vocaas["microsurvey" + _tab]["voc_userChoice"]="";
    vocaas["microsurvey" + _tab]["voc_optselected"]=[];
}

function voc_floatingCSS(divId){
    if(vocaas[divId]["voc_surveyJson"][0].floatingSurvey){
        $("#" + divId).addClass("voc__floating");
        $("#" + divId).prepend('<div id="close-btn-div" class="voc__dds__icon--close-x voc__close-btn"></div>');
        $('#close-btn-div').click(function () {
            $("#" + divId).hide();
        })
    }
}
//async
function voc_getsurvey(divId, surveyJsonLocalData) {
    //voc_loadScript(voc_endpoint+"/resources/jsrender.min.js?=_"+voc_timestamp, true, function(){
    //    $("[id^='microsurvey']").last().attr("id").split("-")[1];
    var voc_tntrecipe = "";
    var language = $("script[src$='microsurvey']").attr("language");
    var pageName = $("script[src$='microsurvey']").attr("page-name");
    var skipAttr = $("script[src$='microsurvey']").attr("skip-attr");

    if(pageName || skipAttr){
        if($("#microsurvey-float").length==0){
            if(pageName && language)
                $('body').append('<div id="microsurvey-float" page-name='+pageName+' language='+language+'></div>');
            else if(pageName)
                $('body').append('<div id="microsurvey-float" page-name='+pageName+'></div>');
            else if(skipAttr)
                $('body').append('<div id="microsurvey-float" skip-attr='+skipAttr+'></div>');
        }
    }

    if($("[id^='microsurvey']").length==0)
    {
        console.log("MicroSurveyDiv not found");
        return;
    }
    var voc_divs = $("[id^='microsurvey']");
    if(divId){
        voc_divs = $("#" + divId);
    }
    for(var i=0; i< voc_divs.length;i++)
    {
        try{
            var tab = $(voc_divs[i]).attr("id").split("-")[1];
            var tempTab = "";
            if(tab){
               tempTab = "-" + tab;
            }
            const _tab = tempTab;
            var microsurvey_tab = $("#microsurvey" + _tab);
            if(vocaas["microsurvey" + _tab] && vocaas["microsurvey" + _tab]["isProcessed"]){
                console.log("Survey already loaded for microsurvey"+_tab);
                continue;
            }
    //      voc_resetMetadata(_tab);
            vocaas[$(voc_divs[i]).attr("id")] = {
                "voc_otherOptionId" : "",
                "voc_guid" : "",
                "voc_surveyJson" : "",
                "voc_userChoice" : "",
                "voc_pageinfo" : "",
                "voc_customAttribute" : {},
                "voc_optselected" : [],
                "voc_skipProductVariant" : "false",
                "voc_languageCode" : "",
                 "voc_creationDate" : "",
                 "voc_nonce" : "",
                 "istestresponse" : "",
                 "isProcessed": true
            }
            voc_getSC();

            voc_setNonceVal(_tab);

            if(microsurvey_tab.attr("page-name") && microsurvey_tab.attr("page-name")!=""){
                vocaas["microsurvey" + _tab]["voc_pageinfo"] = microsurvey_tab.attr("page-name");
//                console.log("voc_pageinfo ",vocaas["microsurvey" + _tab]["voc_pageinfo"]);
            }
            else{
                vocaas["microsurvey" + _tab]["voc_pageinfo"] = voc_getPageInfo(_tab);
                var voc_module = voc_getModule(_tab);
                var voc_tabInfo = voc_getTabInfo(_tab);
                voc_tntrecipe = voc_getTntRecipe(_tab);
                if(voc_module && vocaas["microsurvey" + _tab]["voc_pageinfo"]){
                    vocaas["microsurvey" + _tab]["voc_pageinfo"] =  vocaas["microsurvey" + _tab]["voc_pageinfo"]+"-"+voc_module;
                }
                if(voc_tabInfo && vocaas["microsurvey" + _tab]["voc_pageinfo"]){
                    vocaas["microsurvey" + _tab]["voc_pageinfo"] =  vocaas["microsurvey" + _tab]["voc_pageinfo"]+"-"+voc_tabInfo;
                }
                /*if(voc_tntrecipe && vocaas["microsurvey" + _tab]["voc_pageinfo"]){
                    vocaas["microsurvey" + _tab]["voc_pageinfo"] =  vocaas["microsurvey" + _tab]["voc_pageinfo"]+"|"+voc_tntrecipe;
                }*/

                var skiprc = microsurvey_tab.attr("skip-rc");
                if(skiprc && skiprc.toLowerCase()=="true"){
                    var rcid = voc_getRcId();
                    if(rcid!="" && rcid.toLowerCase().indexOf("rc") == 0){
                          vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"].replace("|"+rcid+"|","||");
                    }
                    //console.log(pageinfo);
                }

                vocaas["microsurvey" + _tab]["voc_skipProductVariant"] = microsurvey_tab.attr("skip-productvariant");
                if(vocaas["microsurvey" + _tab]["voc_skipProductVariant"] && vocaas["microsurvey" + _tab]["voc_skipProductVariant"].toLowerCase()=="true"){
                    var productVariant = voc_getProductVariant(_tab);
                    if(productVariant!=""){
                          vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"].replace("|"+productVariant,"|");
                    }
                }

                var voc_skipAttribute = microsurvey_tab.attr("skip-attr");
                if(voc_skipAttribute && voc_skipAttribute!=""){
                    vocaas["microsurvey" + _tab]["voc_pageinfo"] =  vocaas["microsurvey" + _tab]["voc_pageinfo"].toLowerCase();
                    var voc_skipAttributeList = voc_skipAttribute.split(",");
                    for(var j=0; j<voc_skipAttributeList.length; j++){
                        var attributeValue="";
                        attributeValue = voc_getAttributeValue(voc_skipAttributeList[j]).toLowerCase();
                        if(attributeValue && attributeValue!=""){
                          if(vocaas["microsurvey" + _tab]["voc_pageinfo"].indexOf((attributeValue+"|"))==0){
                                vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"].replace(attributeValue+"|","|");
                          }
                          else if(vocaas["microsurvey" + _tab]["voc_pageinfo"].indexOf((attributeValue+"|") )== -1) {
                                vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"].replace("|"+attributeValue,"|");
                          }
                          else{
                                vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"].replace("|"+attributeValue+"|","||");
                          }
                        }
                    }
                }
            }

            if(!vocaas["microsurvey" + _tab]["voc_pageinfo"]||vocaas["microsurvey" + _tab]["voc_pageinfo"] == "")
            {
                return;
            }

            vocaas["microsurvey" + _tab]["voc_languageCode"] = voc_getLanguageCode(_tab);
           if(tab){
               vocaas["microsurvey" + _tab]["voc_pageinfo"] = vocaas["microsurvey" + _tab]["voc_pageinfo"] + "|" + tab;
           }

           if(vocaas["microsurvey" + _tab]["voc_pageinfo"]){
               vocaas["microsurvey" + _tab]["voc_pageinfo"] =  vocaas["microsurvey" + _tab]["voc_pageinfo"].toLowerCase();
           }

            if(sessionStorage.getItem(voc_getSessionStorageKey(_tab))){
                console.log("Vocaas survey already submitted !!")
                return ;
            }
            console.log("Fetching survey for vocaas page-name : " + vocaas["microsurvey" + _tab]["voc_pageinfo"]);

            vocaas["microsurvey" + _tab]["voc_pageinfo"] = encodeURI(vocaas["microsurvey" + _tab]["voc_pageinfo"]);
            if(!surveyJsonLocalData){
                $.ajax({
                    url : voc_endpoint+"/widget/pagesurvey/" + vocaas["microsurvey" + _tab]["voc_pageinfo"] + "/" + vocaas["microsurvey" + _tab]["voc_languageCode"]
                    + "?country=" + voc_getCountry(_tab) + "&tntrecipe=" + voc_tntrecipe ,
                    xhrFields: {
                        withCredentials: true
                    },
                    headers : voc_getGlassBoxHeader(_tab)
                }).done(
                    function(surveyJsonData) {
                        if(surveyJsonData==null || surveyJsonData.length== 0){
                            console.log("No Survey mapped for this page");
                            microsurvey_tab.hide();
                        }
                        else if(!surveyJsonData[0]){
                            console.log("Error while fetching the survey : " + surveyJsonData.message);
                            microsurvey_tab.hide();
                        }
                        else{
                            voc_populateWidget(surveyJsonData,_tab)
                        }
                    }).fail(
                     function(msg) {
                        console.log("Error Occurred while fetching the survey : " + msg);
                        microsurvey_tab.hide();
                    })
            }
            else
            {
                voc_populateWidget(surveyJsonLocalData,_tab);
            }
            try{
                voc_setCustomAttributes();
            }catch(err){
//                console.log("voc_setCustomAttributes function not available"+err);
            }
        }catch(err)
        {
            console.log("Error Occurred while populating the survey : " + err);
        }
    }
}

//function voc_count_comment(val,_tab){
//    var len = val.value.length;
//    if (len >= 500){
//        $("#microsurvey"+ _tab).find('#charLimitReached' +_tab).html("The character limit has been reached.");
//    }
//    else{
//          $("#microsurvey"+ _tab).find('#charLimitReached' +_tab).html("");
////        $("#microsurvey"+ _tab).find('#charLeft' +_tab).html(500 - len);
//    }
//}

function voc_getGlassBoxHeader(_tab){
    var glassBoxHeader = {};
    var glassBoxHeaderValue = "";
//    if(voc_isGlassBoxEnabled(_tab)){
    glassBoxHeaderValue = "URL="+document.location.href;
    glassBoxHeaderValue = glassBoxHeaderValue + ";PageName=" + ( voc_sc && voc_sc.pagename ? voc_sc.pagename : "NA" );
    glassBoxHeaderValue = glassBoxHeaderValue + ";AppName=" + ( voc_sc && voc_sc.applicationname ? voc_sc.applicationname : "NA" );
    glassBoxHeaderValue = glassBoxHeaderValue + ";Module=" + ( voc_sc && voc_sc.module ? voc_sc.module : "NA" );
    glassBoxHeaderValue = glassBoxHeaderValue + ";Sindex=" + ( voc_sc && voc_sc.supportappindex ? voc_sc.supportappindex : "NA" );
    glassBoxHeader["GBXPageInfo"] = glassBoxHeaderValue;
//    }
    return glassBoxHeader;
}

function voc_setNonceVal(_tab){
    var scriptVal = $('script[src*="/en/js/microsurvey"]')[0];
    if(scriptVal && scriptVal.nonce){
        vocaas["microsurvey" + _tab]["voc_nonce"] = scriptVal.nonce;
    }
}

function voc_populateWidget(surveyJson,_tab){
        var microsurvey_tab = $("#microsurvey" + _tab);
        voc_loadVocCss(_tab);
        vocaas["microsurvey" + _tab]["voc_surveyJson"] = surveyJson;
        surveyJson[0].survey.options.sort(function(a, b){
            return a.displayOrder - b.displayOrder;
        });
        $.each(surveyJson[0].survey.options, function(i, option) {
            if(option.displayOrder=="999"){
                vocaas["microsurvey" + _tab]["voc_otherOptionId"] =  option.id;
            }
        });
        var templateName = surveyJson[0].template.templatePath;
//        var templateName = "datadrivenbinarytemplate";
        $.ajax({
            url : voc_endpoint+"/ui/template/"+templateName+"?=_"+voc_timestamp+"&tab="+_tab,
            dataType: 'text',
            xhrFields: {
                withCredentials: true
            },
            headers : voc_getGlassBoxHeader(_tab)
        })
        .done(
            function(template, textStatus, jqxhr) {
              microsurvey_tab.hide();
              // set nonce
              var divAppendContents = $('<div></div>').append(template);
              divAppendContents.find("style").attr("nonce",vocaas["microsurvey" + _tab]["voc_nonce"]);
              microsurvey_tab.html(divAppendContents.html());
              voc_loadScript(voc_endpoint+"/resources/template/js/"+templateName+"?=_"+voc_timestamp, true, function(){
                  if(templateName == "datadrivenopenfeedbacktemplate"){
                      voc_renderData_OF(surveyJson, _tab);
                      voc_setEvents_OF(_tab);
                  }
                  else if(templateName == "datadrivenbinarytemplate"){
                      voc_renderData_BT(surveyJson, _tab);
                      voc_setEvents_BT(_tab);
                  }
                  else if(templateName == "easeofusetemplate" || templateName=="easeofusetemplateaccessbility" || templateName=="easeofusetemplatecl" || templateName=="easeofusetemplatecl2"){
                    voc_renderData_EOU(surveyJson, _tab);
                    voc_setEvents_EOU(_tab);
                  }
                  else if(templateName == "11ratingtemplate" ){
                    voc_renderData_11RatingEOU(surveyJson, _tab);
                    voc_setEvents_11RatingEOU(_tab);
                  }
                  else if(templateName == "11ratingtemplateCSAT" ){
                    voc_renderData_11RatingEOU_CSAT(surveyJson, _tab);
                    voc_setEvents_11RatingEOU_CSAT(_tab);
                  }
                  voc_floatingCSS("microsurvey"+_tab);
                  voc_enableMicrosurveyDiv(_tab);
              });
              vocaas["microsurvey" + _tab]["isProcessed"] = false;
        });
}

function voc_getAttributeValue(voc_skipAttribute){
    var attributeValue = "";
    try{
        if(voc_sc && voc_sc[voc_skipAttribute])
            attributeValue= voc_sc[voc_skipAttribute];
    }catch(err)
    {
        attributeValue = "";
    }
    return attributeValue;
}

function voc_getDisplayOrder(_tab)
{
    for(var i=0; i<vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options.length; i++)
    {    if(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options[i].displayOrder == 999)
            return (999);
    }
}

function voc_getSC(){
    try{
        voc_sc = Dell.Metrics.sc;
   }
   catch(err)
   {
//       console.log(err);
   }
}

function voc_getPageInfo(_tab)
{
    var pageinfo;
    try{
         if(Dell.Metrics.sc.pagename)
         {
            pageinfo = Dell.Metrics.sc.pagename;
         }
    }
    catch(err)
    {
//        console.log("Pagename not found in sc");
    }
    if(!pageinfo||pageinfo == "" ){
       pageinfo = $("#microsurvey" + _tab).attr("page-info");
    }
//    console.log("Page name from sc/page-info : " + pageinfo );
    return pageinfo;
}

function voc_getSessionStorageKey(_tab)
{
    var microsurvey_tab = $("#microsurvey" + _tab);
    var pageinfo;
    var language = "";
    try{
         if(voc_sc &&  voc_sc.pagename ){
            pageinfo = voc_sc.pagename + "|" + (voc_sc.language ? voc_sc.language : "" ) + "|" + _tab ;
         }
         else{
            language = microsurvey_tab.attr("language");
            voc_lang = language && language!="" ? language : "";
            pageinfo = microsurvey_tab.attr("page-name") + "|" + voc_lang +  "|" + _tab;
         }
    }
    catch(err)
    {
//        console.log("Pagename not found in sc");
    }
//    console.log("Page name from sc/page-info : " + pageinfo );
    return pageinfo;
}

function voc_getModule(_tab)
{
    var voc_module;
    var temp_module = $("#microsurvey" + _tab).attr("module");
     if(temp_module && temp_module.toLowerCase()!="false" && temp_module.trim()!=""){
        try{
            if(temp_module.toLowerCase()!="true"){
                voc_module = temp_module;
            }
            else if(Dell.Metrics.sc.module && Dell.Metrics.sc.module!="")
            {
                voc_module = Dell.Metrics.sc.module;
            }
        }
        catch(err)
        {
//            console.log("Module not found in sc");
        }
      }
    return voc_module;
}

function voc_getTntRecipe(_tab){
    var voc_tntrecipe = "";
    try{
        if(Dell.Metrics.sc.tntrecipe && Dell.Metrics.sc.tntrecipe!="")
        {
            voc_tntrecipe = Dell.Metrics.sc.tntrecipe;
        }
    }
    catch(err){
//        console.log("TNT Recipe not found");
    }
    return voc_tntrecipe;
}

function voc_getTabInfo(_tab)
{
    var microsurveyTabinfo = $("#microsurvey" + _tab).attr("tab-info");
    var voc_tabInfo;
     if(microsurveyTabinfo && microsurveyTabinfo.trim()!="" ){
            voc_tabInfo = microsurveyTabinfo;
     }
    return voc_tabInfo;
}

function voc_getProductVariant(_tab)
{
    var voc_productvariant = "";
    try{
        if(voc_sc && voc_sc.productvariant)
            voc_productvariant= voc_sc.productvariant;
    }catch(err)
    {
        voc_productvariant = "";
    }
    return voc_productvariant;
}

function voc_setSessionStorage(_tab){
    if(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].showOnce){
        sessionStorage.setItem(voc_getSessionStorageKey(_tab),true);
    }
}

function  voc_postsurvey(_tab){
// TODO submit survey for both partial and full
// Capture Meta Data
    voc_getSC();
    voc_setSessionStorage(_tab);
    var pageLanguageCode = voc_getLanguageCode(_tab);
    var pageCountry = voc_getCountry(_tab);
    if(!vocaas["microsurvey" + _tab]["voc_guid"])
    {   vocaas["microsurvey" + _tab]["voc_guid"] = voc_getGUID();   }
    var sessionId = voc_getDellCMSessionId();
    var visitorId = voc_getVisitorId();
    var source = voc_getDeviceType();
    var browserType = voc_getBrowserType();
    var browserVersion = voc_getBrowserVersion();
    var invitedURL = window.location.href;
    var deviceVendor = voc_getDeviceVendor();
    var deviceModel = voc_getDeviceModel();
    var deviceOS = voc_getDeviceOs();
    var searchKeyword = voc_getSearchKeyword();
    var city = voc_getCity(_tab);
    var segment = voc_getSegment();
    var uid = "";
    var pid = "";
    var sid = "";
    var rcid= voc_getRcId();
    var accessgroupname= voc_getAccessGroupName();
    //voc_getCustomAttributes(); // enabled for Product Variant

    try{
    	uid = ClickTaleGetUID();
    }catch(err){
    	uid = "";
    }

    try{
    	pid = ClickTaleGetPID();
    }catch(err){
    	pid = "";
    }

    try{
    	sid = ClickTaleGetSID();
    }catch(err){
    	sid = "";
    }


// Capture Survey Response Data


// Post Response Data
    var data = {
       "appId" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].applicationId,
       "pageId" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].pageId,
       "surveyId" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.surveyId,
       "parentSurveyId" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.parentSurveyId,
       "surveyPageMappingId" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].mappingId,
       "userChoice" : vocaas["microsurvey" + _tab]["voc_userChoice"],
       "microFeedbackOptions" : vocaas["microsurvey" + _tab]["voc_optselected"],
       "comments" : $("#voc_comments"+ _tab).val(),
       "invitedURL" : invitedURL,
       "guid" : vocaas["microsurvey" + _tab]["voc_guid"],
       "visitorId" : visitorId,
       "browserType" : browserType,
       "browserVersion" : browserVersion,
       "city" : city,
       "country" : pageCountry,
       "languageCode" : pageLanguageCode,
       "mobileDeviceManufacturer" : deviceVendor,
       "mobileDeviceModel" : deviceModel,
       "os" : deviceOS,
       "localSubmissionTime": voc_getLocalDateTime(),
       "sessionKey" : sessionId,
       "source" : source,
       "searchKeyword" : searchKeyword,
       "userAgent" : navigator.userAgent,
       "segment" : segment,
       "creationDate" : vocaas["microsurvey" + _tab]["voc_creationDate"],
       "uid": uid,
       "sid": sid,
       "pid": pid,
       "glassBox": voc_isGlassBoxEnabled(_tab),
       "rc" : rcid,
       "customAttributes": voc_getCustomAttributes(_tab),
       "testResponse" : setTestResponse(_tab),
       "dellPageName": voc_getDellPageName(_tab),
       "maxRating" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].template.maxRating,
       "templatePath" : vocaas["microsurvey" + _tab]["voc_surveyJson"][0].template.templatePath,
       "accessGroupName" : accessgroupname
       }

   if(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].mappingId)
   {
        $.ajax({
            method : "POST",
            url : voc_endpoint+"/widget/feedback/submit",
            contentType : "application/json",
            dataType : 'json',
            data : JSON.stringify(data),
            xhrFields: {
                withCredentials: true
            },
            headers : voc_getGlassBoxHeader(_tab)
        }).done(function(msg) {
            vocaas["microsurvey" + _tab]["voc_creationDate"] = msg.creationDate;
        });
    }

//    console.log("Feedback Submitted!!!");
}

function voc_isGlassBoxEnabled(_tab){
    // to be replaced with actual logic
    var isGlassBox = false;
    try{
        if(_detector.isRecording() == true)
        {
            isGlassBox = _detector.isRecording();
            _detector.triggerCustomEvent("vocaas_guid",vocaas["microsurvey" + _tab]["voc_guid"]);
        }
        else
        {
            isGlassBox = false;
        }
    }catch(err)
    {
//         console.log("GlassBox is not recording");
         isGlassBox = false;
    }
    return isGlassBox;
}


//function voc_showThankYouMsg(flag,_tab){
//
//    $("#voc_survey_question"+_tab).addClass("voc_hide");
//    $("#voc_negativeQuestion"+_tab).addClass("voc_hide");
//    var voc_chatLink = voc_getChatLinkForSegment();
//    var voc_chatLinkDiv= document.getElementById("voc_chatURL"+_tab);
//    voc_chatLink=""; //Remove this line to enable ChatLink URL
//    if(voc_chatLink && voc_chatLinkDiv)
//    {
//        $("#voc_chatLink_href"+_tab).attr("href",voc_chatLink);
//        //Append segment to thank you messages as part of generating link. This is done to avoid CSS conflicts with thank you messages div
//        var el = $('#voc_chatURL'+_tab).clone();
//        $("#voc_positiveFeedbackMessage"+_tab).append(el);
//        el = $('#voc_chatURL'+_tab).clone();
//        $("#voc_negativeFeedbackMessage"+_tab).append(el);
//
//    }
//
//    if(flag){
//        $("#microsurvey"+ _tab).find("#voc_positiveFeedbackMessage_span" +_tab).html(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.positiveFeedbackMessage);
//        $("#voc_positiveFeedbackMessage"+_tab).removeClass("voc_hide");
//        $("#voc_positiveFeedbackMessage"+_tab)[0].focus();
//        $("#voc_positiveFeedbackMessage"+_tab).children('#voc_chatURL'+_tab).removeClass("voc_hide");
//    }
//    else{
//        $("#microsurvey"+ _tab).find("#voc_negativeFeedbackMessage_span" +_tab).html(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.negativeFeedbackMessage);
//        $("#voc_negativeFeedbackMessage"+_tab).removeClass("voc_hide");
//        $("#voc_negativeFeedbackMessage"+_tab)[0].focus();
//        $("#voc_negativeFeedbackMessage"+_tab).children('#voc_chatURL'+_tab).removeClass("voc_hide");
//    }
//    // $("#voc_positiveFeedbackMessage").click(function()
//	// {voc_reset_survey();});
//   // $("#voc_negativeFeedbackMessage").click(function()
//	// {voc_reset_survey();});
//}

function voc_getDellPageName(_tab){
    var voc_dell_page_name = "";
    try{
        if(voc_sc && voc_sc.pagename)
        {
            voc_dell_page_name = voc_sc.pagename;
        }
        else
        {
            voc_dell_page_name = decodeURI(vocaas["microsurvey" + _tab]["voc_pageinfo"]);
        }
    }
    catch(err)
    {
        voc_dell_page_name = vocaas["microsurvey" + _tab]["voc_pageinfo"];
    }
    return voc_dell_page_name;
}

function setTestResponse(_tab){
    var testResponseVal = false;
    try{
        if(vocaas["microsurvey" + _tab]["istestresponse"] == true)
        {
            testResponseVal = vocaas["microsurvey" + _tab]["istestresponse"];
        }
    }catch(err)
    {
         testResponseVal = false;
    }
    return testResponseVal;
}


function voc_getCustomAttributes(_tab){
    if(voc_sc && voc_sc.productvariant)
    {    vocaas["microsurvey" + _tab]["voc_customAttribute"]["PRODUCT_VARIANT"] = voc_sc.productvariant;  }
    if(voc_sc && voc_sc.productIdentifier)
    {    vocaas["microsurvey" + _tab]["voc_customAttribute"]["PRODUCT_IDENTIFIER"] = voc_sc.productIdentifier;  }
    if(voc_sc && voc_sc.isCPSolution)
    {    vocaas["microsurvey" + _tab]["voc_customAttribute"]["IS_CP_SOLUTION"] = voc_sc.isCPSolution;  }
    if(voc_sc && voc_sc.userrole)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["USER_ROLE"] = voc_sc.userrole;    }
    if(voc_sc && voc_sc.servicetag)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["SERVICE_TAG"] = voc_sc.servicetag;    }
    if(voc_sc && voc_sc.supportsystem)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["SUPPORT_SYSTEM"] = voc_sc.supportsystem;    }
    if(voc_sc && voc_sc.emcserialnum)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["EMC_SERIAL_NUM"] = voc_sc.emcserialnum;    }
    if(voc_sc && voc_sc.emcproducts)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["EMC_PRODUCTS"] = voc_sc.emcproducts;    }
    if(voc_sc && voc_sc.powerbidashboardname)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["POWERBI_DASHBOARD_NAME"] = voc_sc.powerbidashboardname;     }
    if(voc_sc && voc_sc.tntid )
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["TNT_ID"] = voc_sc.tntid ;     }
    if(voc_sc && voc_sc.tntrecipe )
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["TNT_RECIPE"] = voc_sc.tntrecipe ;     }
    if(voc_sc && voc_sc.convergence )
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["IS_CONVERGED"] = voc_sc.convergence ;     }
    if(voc_sc && voc_sc.supportorder )
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["ORDER_NUMBER"] = voc_sc.supportorder ;     }
    if(voc_sc && voc_sc.dpid )
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["ORDER_NUMBER"] = voc_sc.dpid ;     }

    // Capturing Attributes requested by Alice
    if(voc_sc && voc_sc.profile_id)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["PROFILE_ID"] = voc_sc.profile_id ;   }
    if(voc_sc && voc_sc.premier_roleid)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["PREMIER_ROLEID"] = voc_sc.premier_roleid ;   }
    if(voc_sc && voc_sc.premier_rolename)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["PREMIER_ROLENAME"] = voc_sc.premier_rolename ;   }
    if(voc_sc && voc_sc.premier_accessgroupid)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["PREMIER_ACCESSGROUPID"] = voc_sc.premier_accessgroupid ;   }
    if(voc_sc && voc_sc.application_name)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["APPLICATION_NAME"] = voc_sc.application_name ;   }
    if(voc_sc && voc_sc.b2bflag)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["B2BFLAG"] = voc_sc.b2bflag ;   }
    if(voc_sc && voc_sc.catalogcode)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["CATALOGCODE"] = voc_sc.catalogcode ;   }
    if(voc_sc && voc_sc.cms)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["CMS"] = voc_sc.cms ;   }
    if(voc_sc && voc_sc.isglobalportal)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["ISGLOBALPORTAL"] = voc_sc.isglobalportal ;   }
    if(voc_sc && voc_sc.salessegment)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["SALESSEGMENT"] = voc_sc.salessegment ;   }
    if(voc_sc && voc_sc.session_id)
    {   vocaas["microsurvey" + _tab]["voc_customAttribute"]["SESSION_ID"] = voc_sc.session_id ;   }
    voc_seteVar82(_tab);
    return (vocaas["microsurvey" + _tab]["voc_customAttribute"]);
}

function voc_seteVar82(_tab){
    try{
        if(s_dell && s_dell.eVar82){
            vocaas["microsurvey" + _tab]["voc_customAttribute"]["B2BPUNCHOUT"] = s_dell.eVar82;
        }
    }
    catch(err){
    }
}

function voc_getRcId()
{
    var voc_rcid = "";
    try{
        if(voc_sc && voc_sc.customerset)
            voc_rcid= voc_sc.customerset;
    }catch(err)
    {
//        console.log("RCID Not Found");
        voc_rcid = "";
    }
    return voc_rcid;
}

function voc_getAccessGroupName()
{
    var voc_accessgroupname  = "";
    try{
        if(voc_sc && voc_sc.accessgroupname)
            voc_accessgroupname = voc_sc.accessgroupname;
    }catch(err)
    {
//        console.log("RCID Not Found");
        voc_accessgroupname  = "";
    }
    return voc_accessgroupname ;
}

function voc_getChatLinkForSegment()
{
    var voc_chatLink = "";
    try{
        if(voc_sc && voc_sc.segment == "dhs")
            voc_chatLink = "https://channels.us.dell.com/netagent/cimlogin.aspx?questid=ECD0842F-ABAB-4AB0-858A-95EAB5ED8593&portid=9C39C2B5-F1B5-4B42-9928-10AE367360BB&ref=avachatfooter&NextITSessionID=bcc0e807-efcb-47a7-947b-cd4498862f19" ;
        else if(voc_sc && voc_sc.segment == "bsd"){
            voc_chatLink = " https://www.dell.com/en-us/cp/chat-live-with-product-expert";
        }
    }catch(err)
    {
//       console.log("Chat URL Not set");
       voc_chatLink = "";
    }
    return voc_chatLink;
}

function voc_getOptionIdWithDropdown(_tab){
    vocaas["microsurvey" + _tab]["voc_optselected"] = $("#voc_optselector" + _tab).val();
    if(!vocaas["microsurvey" + _tab]["voc_optselected"]){
        vocaas["microsurvey" + _tab]["voc_optselected"]=[];
    }else{
        vocaas["microsurvey" + _tab]["voc_optselected"]=[vocaas["microsurvey" + _tab]["voc_optselected"]];
    }
    return vocaas["microsurvey" + _tab]["voc_optselected"];
}

function voc_getOptionIdWithoutDropdown(_tab)
{
    for(var i=0; i<vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options.length; i++)
    {    if(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options[i].displayOrder == 999)
            {
                vocaas["microsurvey" + _tab]["voc_optselected"]
                =[vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options[i].id];
                return (vocaas["microsurvey" + _tab]["voc_optselected"]);
            }

    }
    vocaas["microsurvey" + _tab]["voc_optselected"]=[];
    return vocaas["microsurvey" + _tab]["voc_optselected"];
}


function voc_getOptionIdWithoutDropdownSat(_tab)
{
    for(var i=0; i<vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options.length; i++)
    {    if(vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options[i].displayOrder == 2999)
            {
                vocaas["microsurvey" + _tab]["voc_optselected"]
                =[vocaas["microsurvey" + _tab]["voc_surveyJson"][0].survey.options[i].id];
                return (vocaas["microsurvey" + _tab]["voc_optselected"]);
            }

    }
    vocaas["microsurvey" + _tab]["voc_optselected"]=[];
    return vocaas["microsurvey" + _tab]["voc_optselected"];
}

function voc_getLanguageCode(_tab){
    var microsurveyLanguage = $("#microsurvey" + _tab).attr("language");
    if (voc_sc && voc_sc.language){
        return voc_sc.language.substring(0, 2);
    }
    else if(microsurveyLanguage && microsurveyLanguage!=""){
        return microsurveyLanguage.substring(0, 2);
    }else{
        return "en";
    }
}

function voc_getCountry(_tab){
    var microsurveyCountry = $("#microsurvey" + _tab).attr("country");
    if (voc_sc && voc_sc.country)
        return voc_sc.country;
    else if(microsurveyCountry && microsurveyCountry!=""){
        return microsurveyCountry;
    }
    else
        return "";
}

function voc_getSearchKeyword(){
    var searchKeyword = "";
    try{
        if(vocaas.searchterm && vocaas.searchterm!=""){
            searchKeyword = vocaas.searchterm;
        }
        else if(s_dell)
            searchKeyword = s_dell.eVar36;
        if(!searchKeyword){
            if (voc_sc && voc_sc.searchTerm )
            {    searchKeyword = voc_sc.searchTerm;      }
            else
                searchKeyword = "";
        }
    }catch(err)
    {
       try{
           if(!searchKeyword){
           if (voc_sc && voc_sc.searchTerm )
               searchKeyword = voc_sc.searchTerm;
           else
               searchKeyword = "";
           }
       }
       catch(err){
            searchKeyword = "";
       }
    }
    return searchKeyword;
}

function voc_getBrowserType(){
    try{
        return $.ua.browser.name;
    }catch(err)
    {
        return "";
    }
}

function voc_getBrowserVersion(){
    try{
        return $.ua.browser.version;
    }catch(err)
    {
        return "";
    }
 }

function voc_getDeviceType(){

   try{
      if($.ua.device && $.ua.device.type){
              return "Mobile";
      }
   }catch(err)
   {
       return "Desktop";
   }
   return "Desktop";
}

function voc_getDeviceVendor(){
    try{
        return $.ua.device.vendor;
    }catch(err)
    {
        return "";
    }
}

function voc_getDeviceModel(){
   try{
       return $.ua.device.model;
   }catch(err)
   {
       return "";
   }
}

function voc_getDeviceOs(){
   try{
       return $.ua.os.name+"|"+$.ua.os.version;
   }catch(err)
   {
       return "";
   }
}

function voc_getDellCMSessionId(){
    var sessionId = voc_getCookie("DellCEMSession");
    if(sessionId)
        return sessionId;
    return "";
}

function voc_getVisitorId(){
    var visitorId = "";
    visitorId = voc_getVisitorIdFromCookie();
    try{
       if(!visitorId || visitorId==""){
           visitorId = s_dell.eVar71;
       }
    }
    catch(err){
        //console.log(err);
    }
    return visitorId;
}

function voc_getVisitorIdFromCookie(){
    try{
        var visitorIdCookie = voc_getCookie("AMCV_4DD80861515CAB990A490D45%40AdobeOrg");
        var indexOfKey = -1;
        var visitorId = "";
        if(visitorIdCookie){
            var visitorIdCookieArr = visitorIdCookie.split("|");
            indexOfKey = visitorIdCookieArr.indexOf("MCMID");
            if (indexOfKey > -1)
                visitorId = visitorIdCookieArr[indexOfKey + 1];
        }
        return visitorId;
    }catch(err){
        //console.log(err);
        return "";
    }
}

function voc_getCity(_tab){
    var city = "";
    try{
        var geoinfo = $("#microsurvey" + _tab).attr("geo-info");
        city = JSON.parse(geoinfo).city;
    }
    catch (err)
    {
//        console.log(err);
    }
    return city;
}

function voc_getSegment(){
    var segment="";
    try{
        segment = Dell.Metrics.sc.segment;
    }
    catch(err)
    {
        //console.log(err);
    }

    try{
        if(!segment || segment=="") {
             segment = s_dell.eVar32;
        }
    }
    catch(err)
    {
        //console.log(err);
    }

    if(!segment || segment =="") {
         var invitedURL = window.location.href;
         var token = "dpsalessegment";
         var tokenIndex = invitedURL.indexOf(token);
         if(tokenIndex != -1){
             var startIndex = tokenIndex + token.length + 1;
             var substr = invitedURL.substring(startIndex);
             if(substr) {
                 var endIndex = substr.indexOf("&");
                 if(endIndex == -1) {
                    endIndex = substr.length;
                 }
                 var keyValue = substr.substring(0, endIndex);
                 segment = keyValue.split("=")[1];
             }
         }
    }
    return segment;
}

function voc_dellmetricsfeed(value,vocGuid){
    try{
        dellmetrics_trackvalue("vocaas|"+value,"",vocGuid);
    }catch(err) {
//          console.log(err);
    }
}

Number.prototype.voc_padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function voc_getLocalDateTime(){
	var d = new Date,
    dformat = [d.getFullYear(),(d.getMonth()+1).voc_padLeft(),
               d.getDate().voc_padLeft()].join('-') +'T' +
              [d.getHours().voc_padLeft(),
               d.getMinutes().voc_padLeft(),
               d.getSeconds().voc_padLeft()].join(':')+"."+ d.getMilliseconds().voc_padLeft();
	return dformat;
}

function voc_getGUID()
{
    var GUID = (function() {
    function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() +
    S4()).toUpperCase();
    })();

    return GUID;
}



function voc_getCookie(n) {
    var t = document.cookie.match("(^|;) ?" + n + "=([^;]*)(;|$)");
    return t ? unescape(t[2]) : null;
}

function  voc_reset_survey(_tab){
      $("#voc_survey_question"+_tab).removeClass("voc_hide");
      $("#voc_negativeQuestion"+_tab).addClass("voc_hide");
      $("#voc_commentsdiv"+_tab).addClass("voc_hide");
      $("#voc_optselector"+_tab).val(0);
      $("#voc_comments"+_tab).val("");
      $("#voc_positiveFeedbackMessage"+_tab).addClass("voc_hide");;
      $("#voc_negativeFeedbackMessage"+_tab).addClass("voc_hide");
      vocaas["microsurvey" + _tab]["voc_guid"]=null;
      vocaas["microsurvey" + _tab]["voc_creationDate"]="";
      vocaas["microsurvey" + _tab]["voc_userChoice"]=null;
     // console.log("Survey Reset Done!!");
}

function voc_setHelpMsgAndUrl(helpMsg, helpUrl, _tab){
     $("#microsurvey"+ _tab).find("#voc_help_url_1_div"+_tab).append($('<a id="voc_help_url_1'+_tab+'" href="'+helpUrl+'" target="_blank">'+helpMsg+'</a>'));
     $("#microsurvey"+ _tab).find("#voc_help_url_2_div"+_tab).append($('<a id="voc_help_url_2'+_tab+'" href="'+helpUrl+'" target="_blank">'+helpMsg+'</a>'));
}

function voc_setParams(id){
    var tntid = "";
    if(voc_sc && voc_sc.tntid )
    {   tntid = voc_sc.tntid ;     }
    if(document.getElementById(id)){
        $("#"+id).attr("href", $("#"+id).attr("href")+"?MCMID="+voc_getVisitorId()+"&testid="+tntid);
    }
}
//function voc_destroyDiv(){
//    voc_reset_survey();
//    $("#microsurvey").remove(); //remove function to delete the div
//}
function voc_textareaCharCount(_tab){
    var characterCount = $("#voc_comments"+ _tab).val().length;
    current = $('#voc_char_count'+ _tab);
    current.text(characterCount);
}

function voc_hideSurvey(divId) {
  $("#" + divId).hide();
}

// JS for USER-AGENT
/* UAParser.js v0.7.31
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License
   https://github.com/faisalman/ua-parser-js/blob/main/dist/ua-parser.min.js
   */
(function(window,undefined){"use strict";var LIBVERSION="0.7.31",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded",UA_MAX_LENGTH=255;var AMAZON="Amazon",APPLE="Apple",ASUS="ASUS",BLACKBERRY="BlackBerry",BROWSER="Browser",CHROME="Chrome",EDGE="Edge",FIREFOX="Firefox",GOOGLE="Google",HUAWEI="Huawei",LG="LG",MICROSOFT="Microsoft",MOTOROLA="Motorola",OPERA="Opera",SAMSUNG="Samsung",SONY="Sony",XIAOMI="Xiaomi",ZEBRA="Zebra",FACEBOOK="Facebook";var extend=function(regexes,extensions){var mergedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){mergedRegexes[i]=extensions[i].concat(regexes[i])}else{mergedRegexes[i]=regexes[i]}}return mergedRegexes},enumerize=function(arr){var enums={};for(var i=0;i<arr.length;i++){enums[arr[i].toUpperCase()]=arr[i]}return enums},has=function(str1,str2){return typeof str1===STR_TYPE?lowerize(str2).indexOf(lowerize(str1))!==-1:false},lowerize=function(str){return str.toLowerCase()},majorize=function(version){return typeof version===STR_TYPE?version.replace(/[^\d\.]/g,EMPTY).split(".")[0]:undefined},trim=function(str,len){if(typeof str===STR_TYPE){str=str.replace(/^\s\s*/,EMPTY).replace(/\s\s*$/,EMPTY);return typeof len===UNDEF_TYPE?str:str.substring(0,UA_MAX_LENGTH)}};var rgxMapper=function(ua,arrays){var i=0,j,k,p,q,matches,match;while(i<arrays.length&&!matches){var regex=arrays[i],props=arrays[i+1];j=k=0;while(j<regex.length&&!matches){matches=regex[j++].exec(ua);if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length===2){if(typeof q[1]==FUNC_TYPE){this[q[0]]=q[1].call(this,match)}else{this[q[0]]=q[1]}}else if(q.length===3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){this[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{this[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length===4){this[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{this[q]=match?match:undefined}}}}i+=2}},strMapper=function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(has(map[i],str)){return i===UNKNOWN?undefined:i}}return str};var oldSafariMap={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},windowsVersionMap={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"};var regexes={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[VERSION,[NAME,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[VERSION,[NAME,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[NAME,VERSION],[/opios[\/ ]+([\w\.]+)/i],[VERSION,[NAME,OPERA+" Mini"]],[/\bopr\/([\w\.]+)/i],[VERSION,[NAME,OPERA]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,/(weibo)__([\d\.]+)/i],[NAME,VERSION],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[VERSION,[NAME,"UC"+BROWSER]],[/\bqbcore\/([\w\.]+)/i],[VERSION,[NAME,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[VERSION,[NAME,"WeChat"]],[/konqueror\/([\w\.]+)/i],[VERSION,[NAME,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[VERSION,[NAME,"IE"]],[/yabrowser\/([\w\.]+)/i],[VERSION,[NAME,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 Secure "+BROWSER],VERSION],[/\bfocus\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" Focus"]],[/\bopt\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[VERSION,[NAME,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[VERSION,[NAME,"Dolphin"]],[/coast\/([\w\.]+)/i],[VERSION,[NAME,OPERA+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI "+BROWSER]],[/fxios\/([-\w\.]+)/i],[VERSION,[NAME,FIREFOX]],[/\bqihu|(qi?ho?o?|360)browser/i],[[NAME,"360 "+BROWSER]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 "+BROWSER],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[NAME,VERSION],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i],[NAME],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[NAME,FACEBOOK],VERSION],[/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[NAME,VERSION],[/\bgsa\/([\w\.]+) .*safari\//i],[VERSION,[NAME,"GSA"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[VERSION,[NAME,CHROME+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[NAME,CHROME+" WebView"],VERSION],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[VERSION,[NAME,"Android "+BROWSER]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[NAME,VERSION],[/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w\.]+) .*(mobile ?safari|safari)/i],[VERSION,NAME],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,strMapper,oldSafariMap]],[/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[NAME,"Netscape"],VERSION],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[VERSION,[NAME,FIREFOX+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[NAME,VERSION]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[ARCHITECTURE,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[ARCHITECTURE,"armhf"]],[/windows (ce|mobile); ppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[ARCHITECTURE,/ower/,EMPTY,lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[ARCHITECTURE,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,TABLET]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[MODEL,[VENDOR,SAMSUNG],[TYPE,MOBILE]],[/\((ip(?:hone|od)[\w ]*);/i],[MODEL,[VENDOR,APPLE],[TYPE,MOBILE]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[MODEL,[VENDOR,APPLE],[TYPE,TABLET]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,TABLET]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i],[MODEL,[VENDOR,HUAWEI],[TYPE,MOBILE]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,MOBILE]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[MODEL,/_/g," "],[VENDOR,XIAOMI],[TYPE,TABLET]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[MODEL,[VENDOR,"OPPO"],[TYPE,MOBILE]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[MODEL,[VENDOR,"Vivo"],[TYPE,MOBILE]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[MODEL,[VENDOR,"Realme"],[TYPE,MOBILE]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[MODEL,[VENDOR,MOTOROLA],[TYPE,MOBILE]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[MODEL,[VENDOR,MOTOROLA],[TYPE,TABLET]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[MODEL,[VENDOR,LG],[TYPE,TABLET]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[MODEL,[VENDOR,LG],[TYPE,MOBILE]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[MODEL,/_/g," "],[VENDOR,"Nokia"],[TYPE,MOBILE]],[/(pixel c)\b/i],[MODEL,[VENDOR,GOOGLE],[TYPE,TABLET]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[MODEL,[VENDOR,GOOGLE],[TYPE,MOBILE]],[/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[MODEL,[VENDOR,SONY],[TYPE,MOBILE]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[MODEL,"Xperia Tablet"],[VENDOR,SONY],[TYPE,TABLET]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[MODEL,[VENDOR,"OnePlus"],[TYPE,MOBILE]],[/(alexa)webm/i,/(kf[a-z]{2}wi)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[MODEL,[VENDOR,AMAZON],[TYPE,TABLET]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[MODEL,/(.+)/g,"Fire Phone $1"],[VENDOR,AMAZON],[TYPE,MOBILE]],[/(playbook);[-\w\),; ]+(rim)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[MODEL,[VENDOR,BLACKBERRY],[TYPE,MOBILE]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[MODEL,[VENDOR,ASUS],[TYPE,TABLET]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[MODEL,[VENDOR,ASUS],[TYPE,MOBILE]],[/(nexus 9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[MODEL,[VENDOR,"Meizu"],[TYPE,MOBILE]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,MOBILE]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(surface duo)/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,TABLET]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[MODEL,[VENDOR,"Fairphone"],[TYPE,MOBILE]],[/(u304aa)/i],[MODEL,[VENDOR,"AT&T"],[TYPE,MOBILE]],[/\bsie-(\w*)/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/\b(rct\w+) b/i],[MODEL,[VENDOR,"RCA"],[TYPE,TABLET]],[/\b(venue[\d ]{2,7}) b/i],[MODEL,[VENDOR,"Dell"],[TYPE,TABLET]],[/\b(q(?:mv|ta)\w+) b/i],[MODEL,[VENDOR,"Verizon"],[TYPE,TABLET]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[MODEL,[VENDOR,"Barnes & Noble"],[TYPE,TABLET]],[/\b(tm\d{3}\w+) b/i],[MODEL,[VENDOR,"NuVision"],[TYPE,TABLET]],[/\b(k88) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,TABLET]],[/\b(nx\d{3}j) b/i],[MODEL,[VENDOR,"ZTE"],[TYPE,MOBILE]],[/\b(gen\d{3}) b.+49h/i],[MODEL,[VENDOR,"Swiss"],[TYPE,MOBILE]],[/\b(zur\d{3}) b/i],[MODEL,[VENDOR,"Swiss"],[TYPE,TABLET]],[/\b((zeki)?tb.*\b) b/i],[MODEL,[VENDOR,"Zeki"],[TYPE,TABLET]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[VENDOR,"Dragon Touch"],MODEL,[TYPE,TABLET]],[/\b(ns-?\w{0,9}) b/i],[MODEL,[VENDOR,"Insignia"],[TYPE,TABLET]],[/\b((nxa|next)-?\w{0,9}) b/i],[MODEL,[VENDOR,"NextBook"],[TYPE,TABLET]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[VENDOR,"Voice"],MODEL,[TYPE,MOBILE]],[/\b(lvtel\-)?(v1[12]) b/i],[[VENDOR,"LvTel"],MODEL,[TYPE,MOBILE]],[/\b(ph-1) /i],[MODEL,[VENDOR,"Essential"],[TYPE,MOBILE]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[MODEL,[VENDOR,"Envizen"],[TYPE,TABLET]],[/\b(trio[-\w\. ]+) b/i],[MODEL,[VENDOR,"MachSpeed"],[TYPE,TABLET]],[/\btu_(1491) b/i],[MODEL,[VENDOR,"Rotor"],[TYPE,TABLET]],[/(shield[\w ]+) b/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,TABLET]],[/(sprint) (\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,MICROSOFT],[TYPE,MOBILE]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,TABLET]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,MOBILE]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/droid.+; (shield) bui/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation [345portablevi]+)/i],[MODEL,[VENDOR,SONY],[TYPE,CONSOLE]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[MODEL,[VENDOR,MICROSOFT],[TYPE,CONSOLE]],[/smart-tv.+(samsung)/i],[VENDOR,[TYPE,SMARTTV]],[/hbbtv.+maple;(\d+)/i],[[MODEL,/^/,"SmartTV"],[VENDOR,SAMSUNG],[TYPE,SMARTTV]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[VENDOR,LG],[TYPE,SMARTTV]],[/(apple) ?tv/i],[VENDOR,[MODEL,APPLE+" TV"],[TYPE,SMARTTV]],[/crkey/i],[[MODEL,CHROME+"cast"],[VENDOR,GOOGLE],[TYPE,SMARTTV]],[/droid.+aft(\w)( bui|\))/i],[MODEL,[VENDOR,AMAZON],[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],[[VENDOR,trim],[MODEL,trim],[TYPE,SMARTTV]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[TYPE,SMARTTV]],[/((pebble))app/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/droid.+; (glass) \d/i],[MODEL,[VENDOR,GOOGLE],[TYPE,WEARABLE]],[/droid.+; (wt63?0{2,3})\)/i],[MODEL,[VENDOR,ZEBRA],[TYPE,WEARABLE]],[/(quest( 2)?)/i],[MODEL,[VENDOR,FACEBOOK],[TYPE,WEARABLE]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[VENDOR,[TYPE,EMBEDDED]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[MODEL,[TYPE,MOBILE]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[MODEL,[TYPE,TABLET]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[TYPE,TABLET]],[/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],[[TYPE,MOBILE]],[/(android[-\w\. ]{0,9});.+buil/i],[MODEL,[VENDOR,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[VERSION,[NAME,EDGE+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[VERSION,[NAME,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[VERSION,NAME]],os:[[/microsoft (windows) (vista|xp)/i],[NAME,VERSION],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[NAME,[VERSION,strMapper,windowsVersionMap]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,strMapper,windowsVersionMap]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i],[[VERSION,/_/g,"."],[NAME,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86)/i],[VERSION,NAME],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[NAME,VERSION],[/\(bb(10);/i],[VERSION,[NAME,BLACKBERRY]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[VERSION,[NAME,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[VERSION,[NAME,FIREFOX+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[VERSION,[NAME,"webOS"]],[/crkey\/([\d\.]+)/i],[VERSION,[NAME,CHROME+"cast"]],[/(cros) [\w]+ ([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[NAME,VERSION],[/(sunos) ?([\w\.\d]*)/i],[[NAME,"Solaris"],VERSION],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,/(unix) ?([\w\.]*)/i],[NAME,VERSION]]};var UAParser=function(ua,extensions){if(typeof ua===OBJ_TYPE){extensions=ua;ua=undefined}if(!(this instanceof UAParser)){return new UAParser(ua,extensions).getResult()}var _ua=ua||(typeof window!==UNDEF_TYPE&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);var _rgxmap=extensions?extend(regexes,extensions):regexes;this.getBrowser=function(){var _browser={};_browser[NAME]=undefined;_browser[VERSION]=undefined;rgxMapper.call(_browser,_ua,_rgxmap.browser);_browser.major=majorize(_browser.version);return _browser};this.getCPU=function(){var _cpu={};_cpu[ARCHITECTURE]=undefined;rgxMapper.call(_cpu,_ua,_rgxmap.cpu);return _cpu};this.getDevice=function(){var _device={};_device[VENDOR]=undefined;_device[MODEL]=undefined;_device[TYPE]=undefined;rgxMapper.call(_device,_ua,_rgxmap.device);return _device};this.getEngine=function(){var _engine={};_engine[NAME]=undefined;_engine[VERSION]=undefined;rgxMapper.call(_engine,_ua,_rgxmap.engine);return _engine};this.getOS=function(){var _os={};_os[NAME]=undefined;_os[VERSION]=undefined;rgxMapper.call(_os,_ua,_rgxmap.os);return _os};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return _ua};this.setUA=function(ua){_ua=typeof ua===STR_TYPE&&ua.length>UA_MAX_LENGTH?trim(ua,UA_MAX_LENGTH):ua;return this};this.setUA(_ua);return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER=enumerize([NAME,VERSION,MAJOR]);UAParser.CPU=enumerize([ARCHITECTURE]);UAParser.DEVICE=enumerize([MODEL,VENDOR,TYPE,CONSOLE,MOBILE,SMARTTV,TABLET,WEARABLE,EMBEDDED]);UAParser.ENGINE=UAParser.OS=enumerize([NAME,VERSION]);if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{if(typeof define===FUNC_TYPE&&define.amd){define(function(){return UAParser})}else if(typeof window!==UNDEF_TYPE){window.UAParser=UAParser}}var $=typeof window!==UNDEF_TYPE&&(window.jQuery||window.Zepto);if($&&!$.ua){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(ua){parser.setUA(ua);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}})(typeof window==="object"?window:this);