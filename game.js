// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

var CardGame = function(targetId)
{
  // private variables
  var cards = []
  var card_value = ["1C","2C","3C","4C","5C","6C","7C","8C","1H","2H","3H","4H","5H","6H","7H","8H"];

  var started = false;
  var matches_found = 0;
  var card1 = false, card2 = false;

  var hideCard = function(id) // turn card face down
  {
    cards[id].firstChild.src = "//fcu-d0449763.github.io/sitcon_camp/images/back.png";
    with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.0) rotate(0deg)";
    }
  };

  var moveToPack = function(id) // move card to pack
  {
    hideCard(id);
    cards[id].matched = true;
    with(cards[id].style) {
      zIndex = "1000";
      top = "100px";
      left = "-140px";
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(0deg)";
      zIndex = "0";
    }
  };

  var moveToPlace = function(id) // deal card
  {
    cards[id].matched = false;
    with(cards[id].style) {
      zIndex = "1000";
      top = cards[id].fromtop + "px";
      left = cards[id].fromleft + "px";
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(0deg)";
      zIndex = "0";
    }
  };

  var showCard = function(id) // turn card face up, check for match
  {
    if(id === card1) return;
    if(cards[id].matched) return;

    cards[id].firstChild.src = "//fcu-d0449763.github.io/sitcon_camp/images/" + card_value[id] + ".png";
    //點擊後放大並旋轉-5度
	with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.2) rotate(-5deg)";
    }

    if(card1 !== false) {
      card2 = id;
      if(parseInt(card_value[card1]) == parseInt(card_value[card2])) { // match found
        (function(card1, card2) {
          setTimeout(function() { moveToPack(card1); moveToPack(card2); }, 1000);
        })(card1, card2);
        if(++matches_found == 8) { // game over, reset
          matches_found = 0;
          started = false;
        }
      } else { // no match
        (function(card1, card2) {
          setTimeout(function() { hideCard(card1); hideCard(card2); }, 800);
        })(card1, card2);
      }
      card1 = card2 = false;
    } else { // first card turned over
      card1 = id;
    }
  };

  var cardClick = function(id)
  {
    if(started) {
      showCard(id);
    } else {
      // shuffle and deal cards
      card_value.sort(function() { return Math.round(Math.random()) - 0.5; });
      for(i=0; i < 16; i++) {
        (function(idx) {
          setTimeout(function() { moveToPlace(idx); }, idx * 100);
        })(i);
      }
      started = true;
    }
  };

  // initialise 初始化

  var stage = document.getElementById(targetId);
  var felt = document.createElement("div");
  felt.id = "felt";
  stage.appendChild(felt);

  // template for card
  var card = document.createElement("div");
  card.innerHTML = "<img src=\"//fcu-d0449763.github.io/sitcon_camp/images/back.png\">";

  for(var i=0; i < 16; i++) {
    var newCard = card.cloneNode(true);

    newCard.fromtop = 15 + 120 * Math.floor(i/4);
    newCard.fromleft = 70 + 100 * (i%4);
    (function(idx) {
      newCard.addEventListener("click", function() { cardClick(idx); }, false);
    })(i);

    felt.appendChild(newCard);
    cards.push(newCard);
  }

}
particlesJS("particles-js", {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#e37575"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#e37575"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 1,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#e37575",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});