<game>
  <h1>{ opts.title }</h1>
  <h2>This game is for 2 player. Please select first player:</h2>
  <div class="sides">
    <div class="nought" onclick={ setUser }>{ sides.noughts }</div>
    <div class="cross" onclick={ setUser }>{ sides.crosses }</div>
    <button onclick={ reset }>Reset</button>

  </div>
  <ul class="board" id="tst">
    
    <li each="{ key, value in opts.board }" data="{ key }" onclick={ parent.play } >{ value }</li>
  </ul>

  <script>
    this.sides = opts.sides;
    var count = 1,
    self = this,
    userSet = false,
    user = [];

    setUser(e) {
      var firstUser;

      e.target.classList.add('firstPlayer');
      if (!userSet) {
        firstUser = e.target.innerHTML;
        user.push(firstUser);

        if (firstUser == 'X') {
          user.push('O');
        } else {
          user.push('X');
        }
      }
      
      userSet = true; 
      console.log(user);
    }

    var playTurn = function (user, e) {

      e.target.className = 'addcolor';

      opts.board[e.item.key] = user
      count += 1;
    }


    play(e) {
      if (count >= 9) {
        console.log('game over');
      }
      if (user.length == 2) {
        if (count % 2 == 0) {
          playTurn(user[1], e);
          return;
        }
        playTurn(user[0], e);
      }

      this.on('update', function(){
        var tst = document.getElementById('tst');
        //tst.update();
      });
    }

    reset(e) {
      user = [];
      count = 1;
      userSet = false;
      var firstPlayer = document.getElementsByClassName('firstPlayer');
      firstPlayer[0].classList.remove('firstPlayer');

      var boardSections = document.querySelectorAll('.board .addcolor');
      for (var i = 0; i < boardSections.length; i++) {
        boardSections[i].classList.remove('addcolor');
        boardSections[i].innerHTML = '.';

      }
    }

  </script>

</game>  
