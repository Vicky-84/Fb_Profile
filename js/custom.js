$(document).ready(function(){
    
    $(".main").hide();
    
    $('body').css({"background":"url('img/facebook.png') no-repeat center center fixed"});
    $('body').css('background-size', 'cover');
    
    
    var myFacebookToken = 'EAACEdEose0cBAG5s5YsjKrPvlP8pDscZArcNYtEFqpAm2Hy13DrhFKBNiV59DkuMhzywST8S86gtfdYRZC8tpt5lYChT1zJGZAFoeLKIYpqFz1qlxsTFZC4ZCaDMvkcGY7uqRzOyWLdEMrp1S0RqJUJPj4oCa7HsoXCOmywwrcJr5cq5E74ai6sZBQo9q7GrwZD';

    function getFacebookInfo(){

        $.ajax('https://graph.facebook.com/me?fields=id,name,first_name,last_name,birthday,quotes,hometown,location,languages,gender,education,work,relationship_status,family,email,cover,posts.limit(6){story,message,picture,full_picture,type,source}&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    $("#myEmail").text(response.email);
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/' + response.id + '">https://facebook.com/' + response.id + '</a>');
                    $("#myHomeTown").text(response.hometown.name);
                    $("#myCurrentTown").text(response.location.name);
                    $("#myName").html(response.name);
                    $("#myFirstName").html(response.first_name);
                    $("#myLastName").html(response.last_name);
                    $("#myBirthday").html(response.birthday);
                    $("#myGender").html(response.gender);
                    $("#myAbout").html(response.quotes);
                    $("#myRelation").html(response.relationship_status);
                    $("#intro").css('background-image', 'url(' + response.cover.source + ')');
                    
                    var languages = response.languages;
                    if(languages!=null){
                    var myLanguage = $.map(languages, function(index) {
                    return index.name;
                    });
                    $("#myLanguage").text(myLanguage);
                    }
                    
                     var work = response.work;
                     if(work!=null){    
                     var myWork = $.map(work, function(index) {
                       return index.employer.name;
                     });
                     $("#myWork").text(myWork);
                     }

                     var education = response.education;
                     if(education!=null){
                     var myEducation = $.map(education, function(index) {
                       return index.school.name;
                     });
                     $("#myEducation").text(myEducation);
                     }

                     var family = response.family;
                     if(family!=null){
                          
                     var myFamily = $.map(family.data, function(index) {
                       return index.name;
                     });
                     $("#myFamily").text(myFamily);
                     }
                    
                    
                            var postData = response.posts.data;
                            console.log(postData);
                            var i;  
                         for (i in postData) {

                            var j=parseInt(i)+1;


                             //console.log(i,j);
                        if (postData[i].type == "status") {
                         
                            
                         if(postData[i].story== null) {  
                            
                                $("#post"+j).html(postData[i].message).css({
                                "font-size": "150%"
                         });
                         }
                            else{
                                $("#post"+j).html(postData[i].story).css({
                                "font-size": "150%"
                         });
                         }

                         //for photo shared
                       } else if (postData[i].type == "photo") {
                           
                         if(postData[i].story== null) {

                         $("#post"+j).text("" + postData[i].message +"").css({
                           "font-size": "150%"
                         });
                         }
                         else{
                             
                             $("#post"+j).text("" + postData[i].story +"").css({
                             "font-size": "150%"
                         });
                             
                         }
                        
                         $(".photoPost"+j).html("<img src=" + postData[i].full_picture + " " + "class=" + " img-responsive" + ">");
                         //for video shared
                         }else if (postData[i].type == "video") {
                         $("#post"+j).text("" + postData[i].story + "").css({
                           "font-size": "150%"
                         });
                         $(".photoPost"+j).html("<video controls> <source  src=" + "" + postData[i].source + " " + "type= " + "video/mp4" + "></video>");
                       } else {}

                            // console.log("number");

                         }
                    
                        $(".wrapper").css('display','none');
        
                        $('body').css('background-image','none');    

                        $(".main").show('slow');
                    

                },
            
                error: function (request, status, error) {
                    
                    console.log(request.responseText);
                    
                    $(".wrapper").css('display','none');
                    
                    $('body').css({"background":"url('img/errorpage.png') no-repeat center center fixed"});
                    $('body').css('background-size', 'cover');
                            
                },
                timeout:3000,
                beforeSend : function(){
                    $('#page-loader').show();
                },
                complete : function(){
                   $('#page-loader').hide();

                }
            }//end argument list 



        );// end ajax call 

        
    }
    
    
    
    $(".btn").click(function(){
        
       getFacebookInfo();    
           
    });
    
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
 
       
    
});


// for vertical Tabs

    function openDetail(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    }

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();









