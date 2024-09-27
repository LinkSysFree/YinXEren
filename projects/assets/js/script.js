// Define identifier, checker, progressBtn, and tellerText variables outside the startTimer function
var identifier = null;
var checker = null;
var progressBtn = document.querySelector('.progress');
let tellerText = document.querySelector('.teller');

let likeButtonA = document.querySelector('.like_button');
let shareButtonA = document.querySelector('.share_button');
let subsButtonA = document.querySelector('.subscribe_button');
let watchButtonA = document.querySelector('.watch_button');

let timerInterval;
let isDocumentHidden = false;

//Time defined for Like, Share, Subscribe and watch video
let like_time_second = 3;
let share_time_second = 5;
let subscribe_time_second = 3;

let assigned_minutes = 8;
let watch_time_minutes = 60 * assigned_minutes;//secondsinminute * minutes

//-----------------------------------------------
let window_to_watch = "https://youtu.be/nAisYHt8k68?si=lovnfyJmxXRsvQKN";//link of the video

let main_Panel_Link = "https://linksysfree.github.io/Unlock_Link/";

let name_of_zip = "YinXEren.zip";
let filepath_zip = "projects/assets/download_zip/"+name_of_zip;
//-----------------
let seconds = 0;

let ms = 1000;

let startCounting = true;

//checks if the user is on the website=false and not_on_website=true
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      isDocumentHidden = false;
      if(startCounting){
        startTimer(); // Resume the timer
      }
    } else {
        isDocumentHidden = true;
        printLastTimeRecorded();
        stopTime(); // Pause the timer
    }
});


function startTimer(ms) {
    timerInterval = setInterval(() => {
      if (!isDocumentHidden) {
        if(startCounting){
          seconds++; // Increment the global variable
        }
          printLastTimeRecorded(); // Move this here to log updated values
      } else {
          printLastTimeRecorded();
          stopTime();
          if(!startCounting){
            startCounting = true;
          }
      }
        // Check identifier inside the setInterval callback
        // If executed then Like is done
        if (seconds >= like_time_second && (identifier === 'like')) {
            printLastTimeRecorded();

            likeButtonA.style.backgroundColor = 'green';
            likeButtonA.style.color = 'black';
        
            // Means NewTodo
            shareButtonA.style.backgroundColor = 'red';
            document.querySelector('.share_logo').style.filter = 'none';

            // Progress update
            progressBtn.style.backgroundImage = 'linear-gradient(to right, gray 25%, black 25%)';
            progressBtn.style.transition = 'background-image 0.3s ease'; // Adjust the duration and timing function as needed

            progressBtn.textContent = 'Unlock Progress 1/4'; 
            tellerText.innerHTML = '<div class="teller">Do: <div class="underlined" id="tellerTextID">Share the Video</div></div>';
            
            //must disabled
            likeButtonA.disabled = true;
            subsButtonA.disabled = true;
            watchButtonA.disabled = true;
            //enabling the next Task
            shareButtonA.disabled = false;
        }   
      
        // If executed then Share is done
        if (seconds >= share_time_second && (identifier === 'share')) {
            printLastTimeRecorded();
          
            shareButtonA.style.backgroundColor = 'green';
            shareButtonA.style.color = 'black';
        
            document.querySelector('.share_logo').style.filter = 'none';
        
            // Means NewTodo
            subsButtonA.style.backgroundColor = 'red';
            document.querySelector('.bell_logo').style.filter = 'none';
           
            // Progress update
            progressBtn.style.backgroundImage = 'linear-gradient(to right, gray 50%, black 50%)';        
            progressBtn.textContent = 'Unlock Progress 2/4';       
            tellerText.innerHTML = '<div class="teller">Do: <div class="underlined" id="tellerTextID">Subscribe my channel</div></div>';

            //must disabled
            likeButtonA.disabled = true;
            shareButtonA.disabled = true;
            watchButtonA.disabled = true;
            //enabling the next Task
            subsButtonA.disabled = false;
        }

        // If executed then Subscribe is done
        if (seconds >= subscribe_time_second && (identifier === 'subscribe')) {
            printLastTimeRecorded();
          
            subsButtonA.style.backgroundColor = 'green';
            subsButtonA.style.color = 'black';
        
            // Means NewTodo
            watchButtonA.style.backgroundColor = 'red';
            document.querySelector('.yt_logo').style.filter = 'none';
            
            // Progress update
            progressBtn.style.backgroundImage = 'linear-gradient(to right, gray 75%, black 25%)';
            progressBtn.style.transition = 'background-image 0.3s ease'; // Adjust the duration and timing function as needed

            progressBtn.textContent = 'Unlock Progress 3/4';      
            
            tellerText.innerHTML = '<div class="teller">Do: <div class="underlined" id="tellerTextID">Watch Time Needed: '+(assigned_minutes)+' : 00  Minutes<br>(Do Watch the Video Straight or it will restart)</div></div>'; 

            //enabling the next Task
            //must disabled
            likeButtonA.disabled = true;
            shareButtonA.disabled = true;
            subsButtonA.disabled = true;
            //enabling the next Task
            watchButtonA.disabled = false;
        }

        // If executed then Youtube Watch is done LASTLY
        // Depends on how much time the video is
        if (seconds >= watch_time_minutes && (identifier === 'watch')) {
            printLastTimeRecorded();
           
            watchButtonA.style.backgroundColor = 'green';
            watchButtonA.style.color = 'black';
            
            // Progress update
            progressBtn.style.backgroundImage = 'linear-gradient(to right, gray 100%, black 0%)';
            progressBtn.textContent = 'Completed Task 4/4';

            tellerText.innerHTML = '<div class="teller">Successfully Completed All Task: <div class="underlined" id="tellerTextID">You can now Download the Script Below</div></div>'; 

            
            document.querySelector('.download_button').style.backgroundColor = 'green';
            document.querySelector('.download_button').disabled = false; // Corrected disabled property
            document.querySelector('.download_button').cursor = 'pointer';
        }

        printLastTimeRecorded();
    }, ms);
}


function printLastTimeRecorded(){
  if(startCounting){
    if(isDocumentHidden){
      console.clear();
      console.log(seconds);
     } else {
      clearInterval(timerInterval);
     }
  }
}

function stopTime() {
  clearInterval(timerInterval);
  startCounting = false; // Stop counting when paused

  // Only run this if the identifier is 'watch'
  if (identifier === 'watch') {
      let watch_time_progress = document.getElementById('watchVideo_time');
      let watch_time_left = document.getElementById('watchVideo_time_left');

      watch_time_progress.style.display = 'block';
      watch_time_left.style.display = 'block';
      
      let watched_minutes = Math.floor(seconds / 60); // Convert seconds to whole minutes

      // Update watched time display
      if (watched_minutes > 0) {
          watch_time_progress.textContent = watched_minutes + " minutes watched";
      } else {
          watch_time_progress.textContent = seconds + " seconds watched";
      }

      // Calculate and update the remaining time
      let remaining_time = watch_time_minutes - seconds; // Remaining seconds
      if (remaining_time > 60) {
          watch_time_left.textContent = Math.floor(remaining_time / 60) + " minutes left";
      } else {
          watch_time_left.textContent = remaining_time + " seconds left";
      }

      if(remaining_time <= 0){
        watch_time_progress.style.display = 'none';
        watch_time_left.style.display = 'none';
      }
  }
}


function resetTime(){
  minutes = 0;
  seconds = 0;
}

function linkForLikeShareWatch(){
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(window_to_watch);//yt link
} else {
    window.open(window_to_watch, "_blank");//yt link   
}
}

// Like function
function redirectToYtToLike() {
    startCounting = true;

    resetTime();
    linkForLikeShareWatch();
    identifier = 'like';

    startTimer(ms);
    
    checker = 'doneLike';
}

// Share function
function redirectToYtToShare() {
  if(checker === 'doneLike'){
    startCounting = true;

    resetTime();
    linkForLikeShareWatch();

    identifier = 'share';

    checker = 'doneShare';
  }
}

// Subscribe function
function redirectToYtToSubscribe() {
  if(checker === 'doneShare'){
    startCounting = true;

    resetTime();
   window.open('https://www.youtube.com/@dream_mlbb');
    identifier = 'subscribe';

    checker = 'doneSubscribe';
  }
}

// Watch function
function redirectToYtToWatch() {
  if(checker === 'doneSubscribe'){
   startCounting = true;

    resetTime();
    linkForLikeShareWatch();

    identifier = 'watch';

  }
}

//-------------------------------------------------------------------
let selectionPanel = document.querySelector('.selection');

let backBtn = document.querySelector('.back');

function backToMainPanel(){
  window.location.href = main_Panel_Link;//main_Panel_Link
}

// Download Zip function
function downloadZip() {

  var link = document.createElement("a");

  link.href = filepath_zip;//location of zip
  link.download = name_of_zip;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}