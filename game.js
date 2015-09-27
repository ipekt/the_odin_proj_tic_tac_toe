riot.tag('game', '<h1>{ opts.title }</h1> <h2>This game is for 2 player. Please select first player</h2> <button class="btn" onclick="{ reset }">Reset</button> <div class="sides" onclick="{ setUser }"> <div class="nought">{ sides.noughts }</div> <div class="cross">{ sides.crosses }</div> </div> <ul class="board"> <div class="gameover hide">Game Over</div> <li each="{ board }" onclick="{ parent.play }" >{ content }</li> </ul>', function(opts) {
    this.sides = opts.sides
    this.board = opts.board
    var count = 0,
    self = this,
    userSet = false,
    gameOver = false,
    user = [],
    message = document.getElementsByClassName('gameover');

    
    this.setUser = function(e) {
      var firstUser;

      if (!userSet) {
          e.target.classList.add('firstPlayer');
          firstUser = e.target.innerHTML;
          user.push(firstUser);
          if (firstUser == 'X') {
              user.push('O');
          } else {
              user.push('X');
          }
      }
      userSet = true;
    }.bind(this);

    var selectedArr = function(el, target) {
        var myarr = (opts.board).filter(function(obj) {
          return (obj[target] == el)
        })
        var x = myarr.filter(function(sel) {
          return (sel.content == 'X')
        })
        var o =  myarr.filter(function(sel) {
          return (sel.content == 'O')
        })
          
        if (x.length == 3) {
          return endGame('x')
        } else if (o.length == 3) {
          return endGame('o')
        }

      }

    var findCrossWin = function() {
      
      var selected = (opts.board).filter(function(obj) {
        return obj.selected
      })
      var r1c1 = selected.filter(function(obj) {
        return obj.row == 1 && obj.column == 1
      })
      var r2c2 = selected.filter(function(obj) {
        return obj.row == 2 && obj.column == 2
      })
      var r3c3 = selected.filter(function(obj) {
        return obj.row == 3 && obj.column == 3
      })

      var r1c3 = selected.filter(function(obj) {
        return obj.row == 1 && obj.column == 3
      })

      var r3c1 = selected.filter(function(obj) {
        return obj.row == 3 && obj.column == 1
      })

      
      if (r1c1.length > 0 && r2c2.length > 0 & r3c3.length > 0) {
        if (r1c1[0].content == r2c2[0].content && r1c1[0].content == r3c3[0].content) {
          return endGame(r1c1[0].content)
        }
      }

      if (r3c1.length > 0 && r2c2.length > 0 & r1c3.length > 0) {
        if (r3c1[0].content == r2c2[0].content && r3c1[0].content == r1c3[0].content) {
          return endGame(r3c1[0].content)
        }
      }

      if (selected.length == 9) {
        return endGame('noone')
      }
    }

    var endGame = function(win) {
      gameOver = true;
      message[0].innerHTML = 'Game over ' + win + ' wins!'
      message[0].classList.remove('hide');
    }


    var playTurn = function (user, e) {
      var item = e.item
     
      if (!item.selected && !gameOver) {
        item.selected = true;
        item.content = user
        e.target.className = 'addcolor'
        count += 1
        console.log(count)
        
        selectedArr(1, 'row')
        selectedArr(2, 'row')
        selectedArr(3, 'row')
        selectedArr(1, 'column')
        selectedArr(2, 'column')
        selectedArr(3, 'column')
        findCrossWin()
      }
    }

    this.play = function(e) {

      if (user.length == 2) {
        if (count % 2 == 0) {
          playTurn(user[0], e)
          return
        }
        playTurn(user[1], e)
      }
    }.bind(this);

    this.reset = function(e) {
      if (userSet) {
        user = []
        count = 0
        gameOver = false
        userSet = false
        message[0].classList.add('hide')
        var firstPlayer = document.getElementsByClassName('firstPlayer');
        firstPlayer[0].classList.remove('firstPlayer');

        var boardSections = document.querySelectorAll('.board .addcolor');
        for (var i = 0; i < boardSections.length; i++) {
          boardSections[i].classList.remove('addcolor')
        }

        opts.board.map(function (el) {
          el.content = '.'
          el.selected = false
        })
      }
    }.bind(this);

  
});  
