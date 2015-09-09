
<game>
 <h1>{ opts.title }</h1>
  <h2>hi</h2>
  <div class="nought">{ opts.sides.noughts }</div>
  <div class="cross">{ opts.sides.crosses }</div>

  <div class="board">{ why }</div>
</game>

<script>
  this.sides = opts.sides
  render() {
    var column = ''
    var row = ''
    for (var i = 1; i < 3; i++) {
      column += 'what'
    }

    for (var j = 1; j < 3; j++) {
      row += 'why' + column + 'whyyy'
    }
    return row;
  }

  why() {
    return 'why'
  }

</script>