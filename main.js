
var prediction1="";
var prediction2="";


Webcam.set({
    width:350,
    height:350,
    image_format:'png',
    png_quality:95
});

var camera= document.getElementById("camera");

Webcam.attach('#camera');

function takepicture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="image1" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version-  ', ml5.version);
var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QOAadTQIA/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    var speak1="The first prediction is "+ prediction1;
    var speak2="The second prediction is "+ prediction2;
    var say_this= new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(say_this);
}

function change_emoji(){
    document.getElementById("span1").innerHTML="😂";
    document.getElementById("span2").innerHTML="😊";
    document.getElementById("span3").innerHTML="😒";
    document.getElementById("span4").innerHTML="😉";
    document.getElementById("span5").innerHTML="😑";
    document.getElementById("span6").innerHTML="😪";
}

function change_back(){
    document.getElementById("span1").innerHTML="&#128512;";
    document.getElementById("span2").innerHTML="&#128524;";
    document.getElementById("span3").innerHTML="&#128530;";
    document.getElementById("span4").innerHTML="&#128531;";
    document.getElementById("span5").innerHTML="&#128548;";
    document.getElementById("span6").innerHTML="&#128552;";
}

function analyze_picture(){
    var img=document.getElementById("image1");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        document.getElementById("pre1").innerHTML=prediction1+" Confidence:  "+Math.round(results[0].confidence*100)+"%";
        document.getElementById("pre2").innerHTML=prediction2+" Confidence:  "+Math.round(results[1].confidence*100)+"%";
        if(prediction1=="Anxious/Scared"){
            document.getElementById("emoji1").innerHTML="😰";
        }else if(prediction1=="Furious"){
            document.getElementById("emoji1").innerHTML="😠";
        }else if(prediction1=="Thoughtful"){
            document.getElementById("emoji1").innerHTML="🤔";
        }else if(prediction1=="Confused"){
            document.getElementById("emoji1").innerHTML="😕";
        }else if(prediction1=="Happy"){
            document.getElementById("emoji1").innerHTML="😄";
        }else if(prediction1=="Bored"){
            document.getElementById("emoji1").innerHTML="🥱";
        }else if(prediction1=="Sad"){
            document.getElementById("emoji1").innerHTML="😢";
        }

        if(prediction2=="Anxious/Scared"){
            document.getElementById("emoji2").innerHTML="😰";
        }else if(prediction2=="Furious"){
            document.getElementById("emoji2").innerHTML="😠";
        }else if(prediction2=="Thoughtful"){
            document.getElementById("emoji2").innerHTML="🤔";
        }else if(prediction2=="Confused"){
            document.getElementById("emoji2").innerHTML="😕";
        }else if(prediction2=="Happy"){
            document.getElementById("emoji2").innerHTML="😄";
        }else if(prediction2=="Bored"){
            document.getElementById("emoji2").innerHTML="🥱";
        }else if(prediction2=="Sad"){
            document.getElementById("emoji2").innerHTML="😢";
        }
    }
}