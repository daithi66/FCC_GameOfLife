/*
Build the Game of Life
User Story: When I first arrive at the game, it will randomly generate a board and start playing.
User Story: I can start and stop the board.
User Story: I can set up the board.
User Story: I can clear the board.
User Story: When I press start, the game will play out.
User Story: Each time the board changes, I can see how many generations have gone by.
*/

var LifeBoard = React.createClass({
    
    getInitialState: function() {
      var board = this.getNewBoard();
      var generation = 1;
      return {board: board, generation: generation}
    },
    
    getNewBoard: function() {
      var lastRow = 49;
      var lastCol = 49;
      var board = new Array(lastRow+1);
      for (var row = 0; row < lastRow+1; row++) {
        board[row] = new Array(lastCol+1);
      }
      var generation = 1;
      var status = "";
      for (var row = 0; row < lastRow+1; row++) { 
        for (var col = 0; col < lastCol+1; col++) {
          status = Math.floor(Math.random() * 3) % 3 ? "dead" : "alive";
          board[row][col] = status;
        }
      }
      return board;
    },
    
    componentDidMount: function() {
      var intervalId = setInterval(this.nextGen, 800);
      this.setState({intervalId: intervalId});
    },
  
    componentWillUnmount: function() {
      clearInterval(this.state.intervalId);
    },
    
    run: function() {
      this.nextGen();
      var intervalId = setInterval(this.nextGen, 800);
      this.setState({intervalId: intervalId});
    },
  
    pause: function() {
      clearInterval(this.state.intervalId);
    },
    
    clear: function() {
      this.pause();
      var lastRow = 49;
      var lastCol = 49;
      var board = new Array(lastRow+1);
      for (var row = 0; row < lastRow+1; row++) {
        board[row] = new Array(lastCol+1);
      }
      var generation = 1;
      var status = "";
      for (var row = 0; row < lastRow+1; row++) { 
        for (var col = 0; col < lastCol+1; col++) {
          board[row][col] = "dead";
        }
      }
      this.setState({board: board, generation: generation});
    },
    
    randomize: function() {
      this.pause();
      var generation = 1;
      var board = this.getNewBoard();
      this.setState({board: board, generation: generation});
    },
    
    piece: function (string, delimiter, from, to) {
      if (string.indexOf(delimiter) == -1) {
        string = string + delimiter;
      }
      if (to == undefined || to < from) {
        to = from;
      }
      var newString = "";
      var count = 0;
      var tmpArr1 = string.split(delimiter, to);
      var tmpArr2 = [];
      if (to > tmpArr1.length) {
        to = tmpArr1.length;
      }
      for (var i = from-1; i < to; i++) {
        tmpArr2[count] = tmpArr1[i];
        count++;
      }
      newString = tmpArr2.join(delimiter);
      return newString;
    },
    
    nextGen: function () {
      var origBoard = this.state.board;
      var newBoard = [];
      var elm;
      for(elm in origBoard){
        newBoard.push(origBoard[elm].slice());
      }
      var count = 0;
      var lastRow = 49;
      var lastCol = 49;
      // I HATE this code! Seems like I should be able to write this better
      for (var row = 0; row < lastRow+1; row++) {
        for (var col = 0; col < lastCol+1; col++) {
          count = 0;
          if (row == 0 && col == 0) {
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
          } else if (row == 0 && col == lastCol) {
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
          } else if (row == lastRow && col == 0) {
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
          } else if (row == lastRow && col == lastCol) {
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
          } else if (row == 0) {
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col+1],"/",1) == "alive") {
              count++;
            }
          } else if (row == lastRow) {
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col+1],"/",1) == "alive") {
              count++;
            }
          } else if (col == 0) {
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col+1],"/",1) == "alive") {
              count++;
            }
          } else if (col == lastCol) {
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col-1],"/",1) == "alive") {
              count++;
            }
          } else if (row != 0 && row != lastRow && col != 0 && col != lastCol) {
            if (this.piece(newBoard[row-1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row-1][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row][col+1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col-1],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col],"/",1) == "alive") {
              count++;
            }
            if (this.piece(newBoard[row+1][col+1],"/",1) == "alive") {
              count++;
            }
          }
          if (newBoard[row][col] == "alive" && (count < 2 || count > 3)) {
            newBoard[row][col] = "alive/dead";
          } else if (newBoard[row][col] == "alive") {
            newBoard[row][col] = "alive/alive";
          } else if (newBoard[row][col] == "dead" && count == 3) {
            newBoard[row][col] = "dead/alive";
          } else {
            newBoard[row][col] = "dead/dead";
          }
        }
      }
      for (var row = 0; row < lastRow+1; row++) {
        for (var col = 0; col < lastCol+1; col++) {
          //console.log("x: " + newBoard[row][col] + " y: " + this.piece(newBoard[row][col],"/",2));
          if (this.piece(newBoard[row][col],"/",2) == "alive") {
            newBoard[row][col] = "alive";
          } else {
            newBoard[row][col] = "dead";
          }
        }
      }
      var generation = this.state.generation + 1;
      this.setState({board: newBoard, generation: generation});
    },
    
    toggleCell: function(event) {
      var square = event.target.id;
      var origBoard = this.state.board;
      var newBoard = [];
      var elm;
      for(elm in origBoard){
        newBoard.push(origBoard[elm].slice());
      }
      var row = this.piece(this.piece(square,"r",2),"c",1);
      var col = this.piece(square,"c",2);
      console.log("r"+row+"c"+col+" was "+newBoard[row][col]);
      if (newBoard[row][col] == "alive") {
        newBoard[row][col] = "dead";
      } else {
        newBoard[row][col] = "alive";
      }
      console.log("r"+row+"c"+col+" now "+newBoard[row][col]);
      this.setState({board: newBoard});
    },
    
    drawBoard: function () {
      console.log("got here A: " + this.state.board[1][1]);
      var board = [];
      var key = "";
      var item = "";
      var classNames = "";
      var lastRow = 49;
      var lastCol = 49;
      for (var row = 0; row < lastRow+1; row++) {
        for (var col = 0; col < lastCol+1; col++) {
          classNames = "square";
          key = "r" + row + "c" + col;
          if (col == 0) {
            classNames += " clear";
          }
          if (this.state.board[row][col] == "alive") {
            classNames += " alive";
          } else {
            classNames += " dead";
          }
          item = <div key={key} id={key} onClick={this.toggleCell} className={classNames}></div>;
          board.push(item);
        }
      }
      return <div>{board.map((line) => { return line;})}</div>;
    },
    
    render() {
      return (
        <div>
          <div id="sig">By David Ivey</div>
          <h1>FCC Game of Life</h1>
          <div id="control">
            <button onClick={this.run}>Run</button>
            <button onClick={this.pause}>Pause</button>
            <button onClick={this.clear}>Clear</button>
            <button onClick={this.randomize}>Randomize</button>
            <div id="generation"><b>Generation:</b> {this.state.generation}</div>
          </div>
          <div id="board">{this.drawBoard()}</div>
        </div>
      );
    }
  });
  
  ReactDOM.render(
    <LifeBoard />,
    document.getElementById('root')
  );