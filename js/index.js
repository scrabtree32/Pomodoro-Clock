$(document).ready(function() {
var sessionLen = 25,
    breakLen = 5,
    state = 0,
    sessionName = 'session',
    timeLeft,
    myVar,
    timeString,
    audio = document.getElementById("audio");
  
//BUTTONS 
function plus (sessBreak) {
  state = 0;
  sessionName = 'session';
  sessBreak == 'session' ? sessionLen += 1 : breakLen +=1;
  timeString = translate(sessionLen*60);
  updateHtml();
}
  
function minus (sessBreak) {
  state = 0;
  sessionName = 'session';
  if (sessBreak == 'session') {
    sessionLen == 1 ? sessionLen == 1  : sessionLen -= 1;
  } else {
    breakLen == 1 ? breakLen == 1  : breakLen -= 1;
  }
  timeString = translate(sessionLen*60);
  updateHtml();
}
  
$('.minS').click(function() {
  minus ('session');
});
$('.plusS').click(function() {
  plus ('session');
});
$('.minB').click(function() {
  minus ('break');
});
$('.plusB').click(function() {
  plus ('break');
});
  
//TRANSLATE sec to hms
function translate(secs) {
  let h, m, s;
  secs = Number(secs);
  h = Math.floor(secs/3600);
  m = Math.floor((secs % 3600)/60);
  s = Math.floor(secs % 3600 % 60);
  return ((h > 0 ? h +":" : '') + (m < 10 ? '0': '') + m + ":" + (s < 10 ? '0' : '') + s)
}
  
//TIMER COUNTDOWN, TOGGLE TIMER
  function updateTimer() {
    if(timeLeft > 0) {
      timeLeft -= 1;
    } else if (timeLeft ==  0) {
      if (sessionName == 'session') {
        sessionName = 'break';
        timeLeft = breakLen * 60;  
      }
      else if (sessionName == 'break') {
        sessionName = 'session';
        timeLeft = sessionLen * 60;
      }
    }
    //updateHtml();
    timeString = translate(timeLeft);
  }
  
  function updateHtml() {
    if (state == 2) {
      $('.timer').removeClass('animate');
      $('.but').removeClass('disable');
    }
    else if (state == 1 ||  state == 3) {
      if (timeLeft < 6 && timeLeft >= 0) {
        $('.timer').addClass('animate'); 
        playAudio();
      }
      else if (timeLeft == sessionLen || breakLen) {
        $('.timer').removeClass('animate');
        pauseAudio();
      }
      $('.but').addClass('disable'); 
    }
    $('#time').html(timeString);
    $('.sessionName').html(sessionName); 
    $('.sessionLen').html(sessionLen);
    $('.breakLen').html(breakLen);
  }
  
  //TIMER MUSIC
  function playAudio() {
    audio.play();
  }
  
  function pauseAudio() { 
    audio.pause(); 
  } 
  
  /*START/STOP
  state: 0 = idle, 1 = start, 2 = paused, 3 = resumed*/
  function startStop() {
    if (state == 0) {
      timeLeft = sessionLen * 60;
      state = 1;
      myVar = setInterval(function() {
        updateTimer();
        updateHtml();
      }, 1000);
    } else if (state == 1 || state == 3) {
      state = 2;
      clearInterval(myVar); 
      updateHtml();
    } else if (state == 2) {
      state = 3;  
      myVar = setInterval(function() {
        updateTimer();
        updateHtml();
      }, 1000);
    }
  }

  $('.timer').click(function() {
    startStop();
  });
});