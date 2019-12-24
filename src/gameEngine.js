


var getRandomName=function(){
    return names[Math.floor(Math.random() * names.length)]
  }
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  var gameEngine=function(){
    var self=this;
    var games={
    teams:{},
    players:[],
      events:[],
      minPlayersPerTeam:2,
      eventSchedule:{
      
      },
      teamSchedule: {
        
      }
  }
    
    addPlayer=function(name){
      games.players.push(name);
    };
    
    addEvent=function(args){
      games.events.push(args);
    };
    setPlayersPerTeam=function(args){
      games.minPlayersPerTeam=args;
    };
    
    
   
    start=function(){
        var players=shuffle(Array.from(games.players));
      
        var numberOfTeams=Math.floor(games.players.length/games.minPlayersPerTeam);
      
        while(players.length>0){
      if(!games.teams[players.length % numberOfTeams]){
        games.teams[players.length % numberOfTeams]=[];
      }
          games.teams[players.length % numberOfTeams].push(players.pop());
        } 
    };
    return {
      players: {
        add: self.addPlayer,
        setTeamSize: self.setPlayersPerTeam
      },
      events: {
        add: self.addEvent
      },
      start: self.start,
      gamesState: function(){
        console.log(this);
        return games;
      }
    };
  }();
  
  
  for(var i=0; i<Math.max(Math.floor(Math.random() * 20)+10,16); i++){
    gameEngine.players.add(getRandomName());
  }
  
  gameEngine.events.add('Cornhole');
  gameEngine.events.add('Water Pong');
  gameEngine.events.add('Mario Kart');
  gameEngine.events.add('Ping Pong');
  gameEngine.events.add('Jenga');
  gameEngine.events.add('Bowling');
  
  gameEngine.players.setTeamSize(5);
  
  gameEngine.start();
  
  document.getElementById('games').innerHTML=JSON.stringify(gameEngine.gamesState(), null, 2);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  