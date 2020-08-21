(this["webpackJsonptic-tac-toe-montecarlo"]=this["webpackJsonptic-tac-toe-montecarlo"]||[]).push([[0],{13:function(e,t,a){e.exports=a(21)},18:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var r=a(9),n=a(2),s=a(3),i=a(10),u=a(6),o=a(0),l=a.n(o),c=a(12),h=a.n(c),m=(a(18),a(19),a(20),a(7)),v=a(8),f=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Object(n.a)(this,e),this.dim=t,this.board=null!==a?a:Array(Math.pow(this.dim,2)).fill(null)}return Object(s.a)(e,[{key:"toString",value:function(){for(var e="",t=0,a=0;a<Math.pow(this.dim,2);a++)e+=this.board[a]?this.board[a]:" ",2===t?(t=0,e+="\n",a!==Math.pow(this.dim,2)-1&&(e+="---------"),e+="\n"):(e+=" | ",t++);return e}},{key:"getDim",value:function(){return this.dim}},{key:"getBoard",value:function(){return Object(v.a)(this.board)}},{key:"square",value:function(e){return this.board[e]}},{key:"getEmptySquares",value:function(){for(var e=[],t=0;t<Math.pow(this.dim,2);t++)null===this.board[t]&&e.push(t);return e}},{key:"move",value:function(e,t){null===this.board[e]&&(this.board[e]=t)}},{key:"checkWin",value:function(){for(var e=this.board,t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],a=0;a<t.length;a++){var r=Object(m.a)(t[a],3),n=r[0],s=r[1],i=r[2];if(e[n]&&e[n]===e[s]&&e[n]===e[i])return e[n]}return 0===this.getEmptySquares().length?"Draw":null}},{key:"clone",value:function(){return new e(this.dim,Object(v.a)(this.board))}}]),e}(),d=function(e){return"X"===e?"O":"X"},b=a(5),p=function(e,t){for(var a=e.getEmptySquares(),r=function(){var r=a[Math.floor(Math.random()*a.length)];a=a.filter((function(e){return e!==r})),e.move(r,t),t=d(t)};null===e.checkWin();)r()},y=function(e,t,a){var r=t.checkWin();if("Draw"===r)for(var n=0;n<Math.pow(t.getDim(),2);n++)e[n]+=0;else for(var s=0;s<Math.pow(t.getDim(),2);s++)t.square(s)===a&&r===a?e[s]+=2:t.square(s)!==a&&null!==t.square(s)&&r===a?e[s]-=1:t.square(s)===a&&r!==a?e[s]-=2:t.square(s)!==a&&null!==t.square(s)&&r!==a?e[s]+=1:null===t.square(s)&&(e[s]+=0)},k=function(e,t,a){for(var r=Array(9).fill(0),n=0;n<a;n++){var s=e.clone();p(s,t),y(r,s,t)}return function(e,t){var a,r=e.getEmptySquares(),n=-1e3,s=[],i=Object(b.a)(r);try{for(i.s();!(a=i.n()).done;){var u=a.value;t[u]>n&&(n=t[u])}}catch(h){i.e(h)}finally{i.f()}var o,l=Object(b.a)(r);try{for(l.s();!(o=l.n()).done;){var c=o.value;t[c]===n&&s.push(c)}}catch(h){l.e(h)}finally{l.f()}return s[Math.floor(Math.random()*s.length)]}(e,r)},g=function(e){return l.a.createElement("button",{className:"square",onClick:e.onClick},e.value)},q=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"renderSquare",value:function(e){var t=this;return l.a.createElement(g,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),l.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),l.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),a}(l.a.Component),N=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).initialState={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0,xIsUser:!0},r.state=r.initialState,r}return Object(s.a)(a,[{key:"updateHistory",value:function(e,t,a){this.setState({history:e.concat([{squares:t}]),stepNumber:e.length,xIsNext:a})}},{key:"getMachineMove",value:function(e){if(!S(e)){var t=this.state.xIsUser?"O":"X",a=new f(3,e);e[k(a,t,100)]=t}}},{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),a=t[t.length-1].squares.slice();S(a)||a[e]||(a[e]=this.state.xIsUser?"X":"O",this.getMachineMove(a),this.updateHistory(t,a,!!this.state.xIsNext))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"changeUser",value:function(e){var t="X"===e.target.value;this.setState({xIsUser:t}),"X"===t?this.setState({xIsNext:!0}):this.setState({xIsNext:!1})}},{key:"newGame",value:function(e){var t=this;if(e.preventDefault(),this.setState((function(e){return Object(r.a)(Object(r.a)({},t.initialState),{},{xIsNext:e.xIsNext,xIsUser:e.xIsUser})})),!this.state.xIsUser){var a=this.initialState.history.slice(0,this.state.stepNumber+1),n=a[a.length-1].squares.slice();this.getMachineMove(n),this.updateHistory(a,n,!1)}}},{key:"render",value:function(){var e=this,t=this.state.history,a=t[this.state.stepNumber],r=S(a.squares),n="Click 'New Game' to play";r&&(n="Draw"===r?"Game Status: "+r:"Game Status: "+r+" wins!");var s=t.map((function(t,a){var r=a?"Go to move #"+a:"Go to game start";return l.a.createElement("li",{key:a,className:"history-item"},l.a.createElement("button",{className:"history-button button-primary",onClick:function(){return e.jumpTo(a)}},r))}));return l.a.createElement("div",{className:"game"},l.a.createElement("div",{className:"player-select"},l.a.createElement("form",{onSubmit:function(t){return e.newGame(t)}},l.a.createElement("label",{style:{fontWeight:"400"}},"Go as 'X' or 'O'?",l.a.createElement("select",{className:"player-selector",value:this.state.user,onChange:function(t){return e.changeUser(t)}},l.a.createElement("option",{value:"X"},"X"),l.a.createElement("option",{value:"O"},"O"))),l.a.createElement("input",{className:"game-button button-primary",type:"submit",value:"New Game"}))),l.a.createElement("div",{className:"game-board"},l.a.createElement(q,{squares:a.squares,onClick:function(t){return e.handleClick(t)}})),l.a.createElement("div",{className:"game-info"},l.a.createElement("div",null,n),l.a.createElement("ol",null,s)))}}]),a}(l.a.Component);function S(e){return new f(3,e).checkWin()}h.a.render(l.a.createElement(N,null),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.8a84a1a5.chunk.js.map