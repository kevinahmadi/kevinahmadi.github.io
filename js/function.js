$(document).ready(function(){
  /* START BUTTON */
  $('.button-start').one('click',function(){
    $(this).prop('disabled', true);
    $('.settings-start').fadeOut(500,function(){
      $('.settings-goodluck').fadeIn(500,function(){
        $('.settings-box').fadeOut(500,function(){
          $('.countdown-box').fadeIn(500,function(){
            $('.countdown-3').fadeIn(500,function(){
              $('.countdown-3').fadeOut(500,function(){
                $('.countdown-2').fadeIn(500,function(){
                  $('.countdown-2').fadeOut(500,function(){
                    $('.countdown-1').fadeIn(500,function(){
                      $('.countdown-1').fadeOut(500,function(){
                        $('.countdown-box').fadeOut(500,function(){
                          $('.button-random').prop('disabled', true);
                          startRace('.p-container');
                        })
                      })
                    })
                  })
                })
              })
            })
          })

        })
      })
    })
  })





  /* RANDOMIZE PLAYERS */
  var pressed=1;
  $('.button-random').on('click',function(){
    $('.total-shuffles').text(pressed);
    var teamsArray=[];
    $('.input-team').each(function(){
      var container=$(this),
          team=container.val();
      teamsArray.push(team);
    })
    teamsArray = shuffle(teamsArray);
    $.each(teamsArray, function(index, value){
      $('.p-name'+index).text(value);
    })
    pressed++;
  })

  /* ACTIONS FOR TEAM NUMBERS */
  $('.select-number').on('click',function(){
    var box=$(this),
        value=box.text(),
        i=1,
        heightPercent=100/value;
    $('.select-number').removeClass('select-selected');
    box.addClass('select-selected');
    $('.teamsinput-container').html('');
    $('.p-hold').html('');
    while(i <= value){
      var input='<input class="input-team team'+i+'" placeholder="'+i+'" />',
          player= '<div class="p-container" style="height:'+heightPercent+'%;">' +
                    '<div class="p-bar-outside">' +
                      '<div class="p-bar p-'+i+'">' +
                        '<div class="p-name p-name'+(i-1)+'"></div>' +
                      '</div>' +
                    '</div>' +
                    '<div class="p-place-container">' +
                      '<div class="p-place"></div>' +
                    '</div>' +
                  '</div>';
      $('.teamsinput-container').append(input);
      $('.p-hold').append(player);
      i++;
    }
  })

  /* FADE SETTINGS IN ON START */
  $('.settings-box').fadeIn(1000, function(){
    $('.settings-numteams').fadeIn(500);
  });

  /* NAVIGATE BACK AND FORTH */
  var sp=1;
  var act=function(){
    $('.settings-next').on('click',function(){
      $('.settings-next').off('click');
      $('.settings-back').off('click');
      $('.settings-'+sp).fadeOut(500,function(){
        sp++;
        $('.settings-'+sp).fadeIn(500,function(){
          act();
        });

      })
    })
    $('.settings-back').on('click',function(){
      $('.settings-next').off('click');
      $('.settings-back').off('click');
      $('.settings-'+sp).fadeOut(500,function(){
        sp--;
        $('.settings-'+sp).fadeIn(500,function(){
          act();
        });

      })
    })
    /* REMOVE ALL NAMES ON BACK*/
    $('.settings-reverse-order').on('click',function(){
      $('.p-name').text('');
      $('.total-shuffles').text('0');
      pressed=1;
    })
    /* PLAYERS WITHOUT RANDOMIZING */
    $('.settings-order').on('click', function(){
      var teamsArray=[];
      $('.input-team').each(function(){
        var container=$(this),
            team=container.val();
        teamsArray.push(team);
        $.each(teamsArray, function(index, value){
          $('.p-name'+index).text(value);
        });
      });
    });
  }


  act();


})

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}



function ordinal(i) {
  var j = i % 10,
      k = i % 100;
  if (j == 1 && k != 11) {
      return i + "st";
  }
  if (j == 2 && k != 12) {
      return i + "nd";
  }
  if (j == 3 && k != 13) {
      return i + "rd";
  }
  return i + "th";
}

var place=1,
    totalWidth=115;
var startRace = function(element){
  $(element).each(function(){
    var current = $(this),
        finished = false,
        id = current.find('.p-bar').attr('class'),
        containerWidth = current.width(),
        barWidth = current.find('.p-bar').width(),
        currentPercent = (barWidth/containerWidth)*100,
        randomNum = Math.floor(Math.random() * 10) + 1,
        randomTime = Math.floor(Math.random() * 5000) + 2000,
        newPercent = currentPercent + randomNum;
    current.find('.p-bar').animate({
      'width':newPercent+'%'
    }, {
      duration:randomTime,
      easing:'swing',
      progress:function(){
        cW = current.width(),
        bW = current.find('.p-bar').width(),
        cP = (bW/cW)*100;
        if(cP>=(totalWidth)+0.5){
          finished = true;
          current.find('.p-bar').stop(false,true);
        }
      },
      complete:function(){
        if(finished){
          console.log(id+' WIN:'+newPercent+':'+totalWidth+':'+place);
          current.find('.p-place').text(ordinal(place));
          place++;
          current.find('.p-bar').css({
            'width':totalWidth+0.5+'%'
          });
        }
        else{
          startRace(current);
        }

      }
    })


  })
}
