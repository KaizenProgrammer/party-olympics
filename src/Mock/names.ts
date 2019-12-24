export const names: () => string[] = () => {
    let nameStrings = `Carri Harding  
    Lorelei Brier  
    Myrna Cartledge  
    Tomi Poulsen  
    Valentina Byrom  
    Kacy Pennell  
    Erma Nuckolls  
    Charita Alba  
    Daisey Karas  
    Elva Lamacchia  
    Sharita Zarrella  
    Jonas Bramhall  
    Loria Nephew  
    Gustavo Giampaolo  
    Scotty Mcglinchey  
    Archie Rutland  
    Gudrun Keffer  
    Carlita Silber  
    Kareen Stroh  
    Celeste Body  
    Dante Seibert  
    Evangelina Timmons  
    Tynisha Glaze  
    Junior Segawa  
    Micaela Partee  
    Margrett Dalby  
    Paulita Hokanson  
    India Mulhall  
    Jaunita Christmas  
    Cheryle Burse  
    Joye Uhl  
    Vern Sok  
    Miranda Mcvicker  
    Ciera Telles  
    Aide Schur  
    Ozie Kaspar  
    Valerie Dooley  
    Blanca Gallien  
    Enoch Grillo  
    Nidia Menz  
    Xiomara Cashwell  
    Arie Jerrell  
    Mahalia Toomey  
    Salome Pellegrini  
    Tobie Bohrer  
    Tyisha Stapler  
    Shanika Cottrill  
    Marisha Micek  
    Parthenia Mau  
    Holly Mchenry`;
    return nameStrings.split('\n').map(a=>a.trim());
}

export const adjectiveList: () => string[] = ()=>{
    let adjectivesString=`affable
    affectionate
    agreeable
    ambitious
    amiable
    amicable
    amusing
    brave
    bright
    broad-minded
    calm
    careful
    charming
    communicative
    compassionate
    conscientious
    considerate
    convivial
    courageous
    courteous
    creative
    decisive
    determined
    diligent
    diplomatic
    discreet
    dynamic
    easygoing
    emotional
    energetic
    enthusiastic
    exuberant
    fair-minded
    faithful
    fearless
    forceful
    frank
    friendly
    funny
    generous
    gentle
    good
    gregarious
    hard-working
    helpful
    honest
    humorous
    imaginative
    impartial
    independent
    intellectual
    intelligent
    intuitive
    inventive
    kind
    loving
    loyal
    modest
    neat
    nice
    optimistic
    passionate
    patient
    persistent
    pioneering
    philosophical
    placid
    plucky
    polite
    powerful
    practical
    pro-active
    quick-witted
    quiet
    rational
    reliable
    reserved
    resourceful
    romantic
    self-confident
    self-disciplined
    sensible
    sensitive
    shy
    sincere
    sociable
    straightforward
    sympathetic
    thoughtful
    tidy
    tough
    unassuming
    understanding
    versatile
    warmhearted
    willing
    witty`;
    return adjectivesString.split('\n').map(a=>capitalizeFirstLetter(a.trim()));
   // return adjectives[Math.floor(Math.random()*adjectives.length)];
}


export const nounList: () => string[] = ()=>{
    let nounsString=`Eagles
    Tigers
    Bulldogs
    Panthers
    Wildcats
    Warriors
    Lions
    Indians
    Cougars
    Knights
    Mustangs
    Falcons
    Trojans
    Cardinals
    Vikings
    Pirates
    Raiders
    Rams
    Spartans
    Bears
    Hornets
    Patriots
    Hawks
    Crusaders
    Rebels
    Bobcats
    Saints
    Braves
    Blue Devils
    Titans
    Wolverines
    Jaguars
    Wolves
    Dragons
    Pioneers
    Chargers
    Rockets
    Huskies
    Red Devils
    Yellowjackets
    Chiefs
    Stars
    Comets
    Colts
    Lancers
    Rangers
    Broncos
    Giants
    Senators
    Bearcats
    Thunder
    Royals
    Storm
    Cowboys
    Cubs
    Cavaliers
    Golden Eagles
    Generals
    Owls
    Buccaneers
    Hurricanes
    Bruins
    Grizzlies
    Gators
    Bombers
    Red Raiders
    Flyers
    Lakers
    Miners
    Redskins
    Coyotes
    Longhorns
    Greyhounds
    Beavers
    Yellow Jackets
    Outlaws
    Reds
    Highlanders
    Sharks
    Oilers
    Jets
    Dodgers
    Mountaineers
    Red Sox
    Thunderbirds
    Blazers
    Clippers
    Aces
    Buffaloes
    Lightning
    Bluejays
    Gladiators
    Mavericks
    Monarchs
    Tornadoes
    Blues
    Cobras
    Bulls
    Express
    Stallions`;
    return nounsString.split('\n').map(a=>a.trim());
}

function capitalizeFirstLetter(word:string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}