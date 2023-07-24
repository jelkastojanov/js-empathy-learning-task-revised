// All code needs to be wrapped in $(document).ready() function
$(document).ready(function(){

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // LION (IN APA - OUT APA) 

    // What needs to be changed in different versions of the task?

    // 1. CONDITION: Variable currentExperimentalCondition should be changed to reflect the experimental condition in the title.
    // 2. GROUP: Variable currentGroupMembership should be changed to reflect the group membership of the participant. Similarly, variable notCurrentGroupMembership should be changed to reflect the other group.
    // 3. GROUP: Change Gorilla link at the end.
    // 4. GROUP: Variable imageGroup should be changed to reflect the group membership of the participant (in the preloader function). [DONE AUTOMATICALLY]
    // 5. GROUP: Group membership prompt and the button text need to be changed to reflect the group membership of the participant (in the groupMembership function). [DONE AUTOMATICALLY]
    // 6. GROUP: Variables tigerPlayer1-4 and lionPlayer1-4 should be changed to reflect the group membership of the participant (in the preloader function). [DONE AUTOMATICALLY]
    // 7. GROUP: Text needs to be changed in the instructions to reflect the group membership of the participant. [DONE AUTOMATICALLY]
    // 8. GROUP: lionPlayer4ID needs to be changed to tigerPlayer4ID in arrays playerOrder and playerOrderTP. [DONE AUTOMATICALLY]

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // DEFINE VARIABLES THAT CRITICALLY CHANGE THE EXPERIMENT: currentExperimentalCondition & currentGroupMembership

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // Experimental condition [ATTENTION: CHANGE ACCORDINGLY]
    var currentExperimentalCondition = "inApa_outApa";

    // Participant's group membership [ATTENTION: CHANGE ACCORDINGLY]
    var currentGroupMembership = "Tiger";
    var notCurrentGroupMembership = "Lion";

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // IMAGES

    // DEFINE ALL IMAGES IN ADVANCE SO THEY CAN BE ACCURATELY PRELOADED!

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // INSTRUCTIONS

    // Loading gif - Instructions
    var gif = new Image();

    // Group image - Instructions
    var imageGroup = new Image();

    // Dinousaur image - Instructions
    var dinosaurImage = new Image();

    // Game image - Instructions
    var gameTrialInstructions = new Image();

    // Card selection image - Instructions
    var cardSelectionInstructions = new Image(); 

    // Emoji selection image - Instructions
    var emojiSelectionInstructions = new Image();

    // Emoji display image - Instructions
    var emojiDisplayInstructions = new Image();

    // PLAYERS - LEARNING PHASE

    // Divs
    var ingroupPlayersImages;
    var outgroupPlayersImages;

    // Lion players - Waiting room & game 
    var lionPlayer1 = new Image();
    var lionPlayer2 = new Image();
    var lionPlayer3 = new Image();
    var lionPlayer4 = new Image();

    // Tiger players - Waiting room & game 
    var tigerPlayer1 = new Image();
    var tigerPlayer2 = new Image();
    var tigerPlayer3 = new Image();
    var tigerPlayer4 = new Image();

    // PLAYERS - TEST PHASE

    // Lion players - Waiting room & game 
    var lionPlayer1TP = new Image();
    var lionPlayer2TP = new Image();
    var lionPlayer3TP = new Image();
    var lionPlayer4TP = new Image();

    // Tiger players - Waiting room & game 
    var tigerPlayer1TP = new Image();
    var tigerPlayer2TP = new Image();
    var tigerPlayer3TP = new Image();
    var tigerPlayer4TP = new Image();

    // GAME

    // Divs
    var cardImages;

    // Players on canvas
    var imagePlayerTiger = new Image();
    var imagePlayerLion = new Image();
    var imageComputer = new Image();

    // Participants' cards
    var pinkCard = new Image();
    var grayCard = new Image();
    var purpleCard = new Image();
    var orangeCard = new Image();

    // EMOJIS

    // Divs
    var emojiImages;

    // Individual emojis
    var emoji1 = new Image();
    var emoji2 = new Image();
    var emoji3 = new Image();

    // EMOJI REACTIONS
    var tigerReactionDisplays;
    var lionReactionDisplays;
    var tigerReactionDisplaysShuffled;
    var lionReactionDisplaysShuffled;

    // Check whether the last 11 elements are the same
    var last11TigerDisplays;
    var last11LionDisplays;

    // IMAGE SIZES

    // Loading gif - Image size
    var loadingGifSize;

    // Instructions - Image size
    var computerImageInstructionsSize;
    var gameImageInstructionsSize;
    var cardImageInstructionsSize;
    var emojiImageInstructionsSize;
    var emotionalReactionsImageInstructionsSize;

    // Group image in the instructions - Image size
    var groupImageSize;

    // Players - Image size
    var playerImagesSize;

    // Players on canvas - Image size 
    var imagePlayerSize;

    // Participants' cards - Image size
    var cardSize;

    // Emojis - Image size
    var emojiImagesSize;

    // Counterbalancing the position of players on the screen
    var randTeamPosition;

    // Counterbalancing the order of predictions in the task
    var randResponseOrderNum = Math.random(); // Generate a random number for counterbalancing purposes
    var randResponseOrder; // Save the outcome to this variable
    var randResponseOrderSave; // Save the array (i.e., dataELT column) to this variable

    // For whom do participants make predictions first?
    if (randResponseOrderNum < 0.50) {
        randResponseOrder = "Ingroup first"
        randResponseOrderSave = [].concat(... new Array(91).fill("Ingroup first"));
    } else if (randResponseOrderNum >= 0.50) {
        randResponseOrder = "Outgroup first"
        randResponseOrderSave = [].concat(... new Array(91).fill("Outgroup first"));
    }

    // PRELOAD IMAGES
    if (currentGroupMembership == "Lion") {
        preloaderLion();
    } else if (currentGroupMembership ==  "Tiger") {
        preloaderTiger();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // GLOBAL VARIABLES

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    ////////// PRE-EXISTING INFORMATION //////////

    // INSTRUCTIONS
    var nextInstructionsEverShown = false;
    var timerId = null;

    // DICTIONARIES

    // Dictionary mapping emoji image IDs to values
    const image_id_map = {
        "valence1": 1,
        "valence2": 2,
        "valence3": 3,
    };

    // Dictionary mapping emoji image src to values
    const image_src_map = {
        "assets/Valence1.png": 1,
        "assets/Valence2.png": 2,
        "assets/Valence3.png": 3,
    };

    ////////// NEW INFORMATION //////////

    // STARTING DETAILS ABOUT THE EXPERIMENT
    var entries;

    // Number of trials in the experiment
    const numTrials = 1; // Learning phase [ATTENTION: CHANGE ACCORDINGLY]
    const numTrialsTP = 1; // Test phase [ATTENTION: CHANGE ACCORDINGLY]

    // Timestamps when the empathy learning task started

    // Local time
    var localTime = new Date().getTime();
    var localDate = new Date(localTime).toString();

    // UTC time
    var utcDate = new Date().toUTCString();

    // Timezone information
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var offset = new Date().getTimezoneOffset();

    // Additional variables needed to calculate reaction times

    // Outcome "reaction time" - Time from the start of the game round until the outcome is known
    var startTimeChoice;
    var endTimeOutcome; 

    // Card choice reaction time - Time it takes for the participant to select a card 
    var startTimeCardChoice;
    var clickTimeCardChoice; 
 
    // Emotional reaction reaction time - Time it takes for the participant to select an emoji (Own response)
    var startTimeEmojiChoiceSelf;
    var clickTimeEmojiChoiceSelf; 

    // Emotional reaction reaction time - Time it takes for the participant to select an emoji (Prediction for the ingroup and the outgroup)
    var startTimeEmojiChoiceIngroup;
    var clickTimeEmojiChoiceIngroup; 
    var startTimeEmojiChoiceOutgroup;
    var clickTimeEmojiChoiceOutgroup; 

    // Outcome message needs to be saved as a global variable in order to use it across functions
    var outcomeMessage;

    // Timestamp needed to calculate duration
    var startTask = Date.now();
    var endTask; // Updated later

    var endLearningBlock; // Updated later

    var startTestBlock; // Updated later
    var endTestBlock; // Updated later

    // Participant IDs - Captured & typed
    var capturedProlificID = getUrlVars()['PROLIFIC_PID']; // [ATTENTION: ACTIVATE LATER]
    var typedProlificID;  // Updated later
    var capturedProlificIDMatch;  

    // What is the order of players in the game?

    // Learning phase [ATTENTION: CHANGE ACCORDINGLY!]
    var playerOrder;

    // Each player appears 
    var notRandomisedPlayerOrder;
    
    if (currentGroupMembership == "Lion") {
        notRandomisedPlayerOrder = ["lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", 
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", 
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer4ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID"];
    } else if (currentGroupMembership == "Tiger") {
        notRandomisedPlayerOrder = ["lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID", 
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID",
        "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer4ID"];       
    }

    playerOrder = shuffle(notRandomisedPlayerOrder);

    // Test phase [ATTENTION: CHANGE ACCORDINGLY!]
    var playerOrderTP;

    var notRandomisedPlayerOrderTP;

    if (currentGroupMembership == "Lion") {
        notRandomisedPlayerOrderTP = ["lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "lionPlayer4TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID", 
        "lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "lionPlayer4TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID",
        "lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "lionPlayer4TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID"];
    } else if (currentGroupMembership == "Tiger") {
        notRandomisedPlayerOrderTP = ["lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID", "tigerPlayer4TPID",
        "lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID", "tigerPlayer4TPID",
        "lionPlayer1TPID", "lionPlayer2TPID", "lionPlayer3TPID", "tigerPlayer1TPID", "tigerPlayer2TPID", "tigerPlayer3TPID", "tigerPlayer4TPID"];
    }

    playerOrderTP = shuffle(notRandomisedPlayerOrderTP);

    // Outcomes are predefined in the test phase
    var randNumberOutcomes = Math.random();
    var orderOutcomes;

    // Since there are 21 trials in the test phase, this random value will determine whether there are more losses or victories
    if (randNumberOutcomes < 0.5) {
        // One Loss more
        orderOutcomes = ["Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory"];
    } else if (randNumberOutcomes >= 0.5) {
        // One Victory more
        orderOutcomes = ["Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Loss", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory", "Victory"];
    }

    // Shuffle the order of outcomes
    var orderOutcomesShuffled = shuffle(orderOutcomes);

    // Shuffled arrays will determine the order of who will display reactions in which trial [ATTENTION: THIS NEEDS TO MATCH NUMBER OF TRIALS WHERE NON-PARTICIPANT PLAYERS ARE ACTIVE]
    // Additionally, this will make sure that last 11 elements which will be used for swapping if needed are diverse enough
    if (currentGroupMembership == 'Tiger') { 
        tigerReactionDisplays = ["tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID", "tigerPlayer1ID", "tigerPlayer3ID", "tigerPlayer4ID"];
        lionReactionDisplays = ["lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID", "lionPlayer1ID", "lionPlayer2ID", "lionPlayer3ID"];
        tigerReactionDisplaysShuffled = shuffle(tigerReactionDisplays);
        lionReactionDisplaysShuffled = shuffle(lionReactionDisplays);

        last11TigerDisplays = tigerReactionDisplaysShuffled.slice(-11);
        last11LionDisplays = lionReactionDisplaysShuffled.slice(-11);

    } else if (currentGroupMembership == 'Lion') { 
        tigerReactionDisplays = ["tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID", "tigerPlayer1ID", "tigerPlayer2ID", "tigerPlayer3ID"];
        lionReactionDisplays = ["lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID", "lionPlayer1ID", "lionPlayer3ID", "lionPlayer4ID"];
        tigerReactionDisplaysShuffled = shuffle(tigerReactionDisplays);
        lionReactionDisplaysShuffled = shuffle(lionReactionDisplays);

        last11TigerDisplays = tigerReactionDisplaysShuffled.slice(-11);
        last11LionDisplays = lionReactionDisplaysShuffled.slice(-11);
    }

    // As long as the last 11 elements are the same, shuffle tigerReactionDisplays
    while (last11TigerDisplays.every( (val, i, arr) => val === arr[0] )) {
        tigerReactionDisplaysShuffled = shuffle(tigerReactionDisplays);
        last11TigerDisplays = tigerReactionDisplaysShuffled.slice(-11);
    }

    // As long as the last 11 elements are the same, shuffle lionReactionDisplays
    while (last11LionDisplays.every( (val, i, arr) => val === arr[0] )) {
        lionReactionDisplaysShuffled = shuffle(lionReactionDisplays);
        last11LionDisplays = lionReactionDisplaysShuffled.slice(-11);
    }

    // GAME OUTCOMES

    // Possible card values
    const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // Array of values that will be modified in the functions
    var cardValuesForSplicing;

    // Card selector index
    var cardSelectorComp;

    // CANVAS, ADDITIONAL VARIABLES & DIVS

    // Canvas
    var newCanvas; 
    var ctx;

    // Cards participants can click on
    var clickableCards = [pinkCard, grayCard, purpleCard, orangeCard];

    // Waiting time for the emoji display to appear
    var waitTimeDisplay;

    // Divs 
    var veryTopDiv = document.getElementById("sectionVeryTop");
    var veryTopDivCoordinates = veryTopDiv.getBoundingClientRect();

    var topDiv = document.getElementById("sectionTop");
    var topDivCoordinates = topDiv.getBoundingClientRect();

    var midDiv = document.getElementById("sectionMiddle");
    var midDivCoordinates = midDiv.getBoundingClientRect();

    var bottomDiv = document.getElementById("sectionBottom");
    var bottomDivCoordinates = bottomDiv.getBoundingClientRect();

    var veryBottomDiv = document.getElementById("sectionVeryBottom");
    var veryBottomDivCoordinates = veryBottomDiv.getBoundingClientRect();

    ////////// DATA STORAGE //////////

    // ARRAYS STORING DATA FROM THE TASK 

    // Arrays storing trial and outcome information
    var trialNumbers = []; // Numbers indicating each trial
    var trialPlayers = []; // Who is playing on each trial?
    var trialOutcomes = []; // Victory or loss on each trial
    var trialOutcomesRT = []; // How long did it take for each outcome to be displayed?
    var playerNumbers = []; // What number did the active player get on each trial?
    var computerNumbers = []; // What number did the computer get on each trial?

    // Starting variables - trialNumbers and trialPlayers arrays will subsequently be populated using function parameter names.

    // Learning phase
    var startingTrialNumber = 1; // Signal first trial
    var startingTrialPlayer =  playerOrder[0]; // Signal active player on the first trial

    // Needed to switch players
    var nextTrialNum;

    // Test phase
    var startingTrialNumberTP = 1;
    var startingTrialPlayerTP = playerOrderTP[0];

    // Needed to switch players
    var nextTrialNumTP;

    // Specific variables that will be dynamically updated and used in functions
    var specificTrialOutcome; 
    var specificTrialOutcomeRT;
    var specificPlayerNumber; 
    var specificComputerNumber; 

    // Specific variables needed to move from one player to the other 
    var inactivePlayerIndex; // Created to identify inactive player
    var nextPlayerAfterInactive; // Created to move to a new player after inactive player
    var nextPlayer; // Created to move from one player to the next in the learning phase
    var nextPlayerTP; // Created to move from one player to the next in the test phase

    // Arrays storing participant's card selections and RT 
    // This will contain information only on the trials where the participant is the active player, on all other trials, it will say "Non-participant trial"
    var participantSelectedCards = []; // Which card was chosen?
    var participantSelectedCardsRT = []; // How long did it take the participant to choose the card?

    // Specific variables that will be dynamically updated and used in functions
    var specificParticipantSelectedCard;
    var specificParticipantSelectedCardRT;

    // Arrays storing participant's emotional reactions
    // This will contain information only on the trials where the participant is *not* the active player, on all other trials, it will say "Participant trial"
    var participantReactionsPublic = []; // Which emoji did the participant choose? (Own response)
    var participantReactionsPublicRT = []; // How long did it take the participant to choose this emoji? (Own response)
    var participantReactionsPublicIngroup = []; // Which emoji did the participant think ingroup members would choose? (Prediction for the ingroup)
    var participantReactionsPublicIngroupRT = []; // How long did it take the participant to make their prediction? (Prediction for the ingroup)
    var participantReactionsPublicOutgroup = []; // Which emoji did the participant think outgroup members would choose? (Prediction for the outgroup)
    var participantReactionsPublicOutgroupRT = []; // How long did it take the participant to make their prediction? (Prediction for the outgroup)

    // Specific variables that will be dynamically updated and used in functions
    var specificParticipantReaction;
    var specificParticipantReactionRT;
    var specificParticipantReactionIngroup;
    var specificParticipantReactionIngroupRT;
    var specificParticipantReactionOutgroup;
    var specificParticipantReactionOutgroupRT;

    // Arrays storing information about other players and their reactions
    var tigerPlayersDisplayed = []; // Which tiger player was displayed on each trial?
    var tigerPlayersReactions = []; // Which reaction did the displayed tiger player show on each trial?
    var lionPlayersDisplayed = []; //  Which lion player was displayed on each trial?
    var lionPlayersReactions = []; // Which reaction did the displayed lion player show on each trial?
    var displayDelay = []; // How much time did it take for the display to appear after the participant made their final response?

    // Specific variables that will be dynamically updated and used in functions
    var specificTigerPlayerDisplayed; 
    var specificTigerPlayerReaction; 
    var specificLionPlayerDisplayed;
    var specificLionPlayerReaction;

    // This variable signals whether each trial is a part of the learning or the test phase
    var taskBlock = [];

    // DATA STORAGE DICTIONARY
    var dataELT = {}; 

    // Add starting data to the dictionary [ATTENTION: THIS WILL NEED TO BE CHANGED TO REFLECT THE LENGTH OF THE TASK]

    // Time
    var localTimeStartExp = [].concat(... new Array(91).fill(localDate));
    dataELT.localTimeStartExp = localTimeStartExp;

    var utcTimeStartExp = [].concat(... new Array(91).fill(utcDate));
    dataELT.utcTimeStartExp = utcTimeStartExp;

    var timezoneOffset = [].concat(... new Array(91).fill(offset));
    dataELT.timezoneOffset = timezoneOffset;

    var timezoneName = [].concat(... new Array(91).fill(timezone));
    dataELT.timezoneName = timezoneName;

    // Participant info
    var prolificID = [].concat(... new Array(91).fill(capturedProlificID));
    dataELT.prolificID = prolificID; 

    var groupMembershipParticipant = [].concat(... new Array(91).fill(currentGroupMembership));
    dataELT.groupMembership = groupMembershipParticipant;

    // Experiment info
    var taskName = [].concat(... new Array(91).fill('ELT'));
    dataELT.taskName = taskName;

    var condition = [].concat(... new Array(91).fill(currentExperimentalCondition));
    dataELT.condition = condition;

    // Order of participant's predictions
    dataELT.randResponseOrder = randResponseOrderSave;

    ////////// INITIATE EXPERIMENT //////////
    prolificIDPage(); 


    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // INTRO

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // PROLIFIC ID PAGE
    // TO SAVE: TYPED PROLIFIC ID, WHETHER THE PROLIFIC ID THAT WAS TYPED MATCHES THE ONE CAPTURED
    function prolificIDPage() {

        CreateDiv('sectionTop', 'prolificIDPrompt');
        CreateDiv('sectionMiddle', 'textBoxProlificID');
        CreateDiv('sectionBottom', 'buttonSection');

        // Prolific ID prompt
        var prolificIDPrompt = '<p class = "textIntro" id = "prolificID"> Please enter your Prolific ID in the text box below. </p>';
        $('#prolificIDPrompt').html(prolificIDPrompt);

        // Text box
        var textBoxInput = document.createElement("input");
        textBoxInput.setAttribute("type", "text");
        textBoxInput.setAttribute("autocomplete", "off");
        textBoxInput.className = "textBoxes";
        textBoxInput.id = "prolificIDTextBox";
        $('#textBoxProlificID').html(textBoxInput);

        // Next button
        var nextButton = document.createElement("BUTTON");
        nextButton.innerHTML = "Next";
        nextButton.className = "nextButtons";
        nextButton.id = "toGroup";
        $('#buttonSection').html(nextButton);
       
        // Do not allow participants to continue until they have given a response and until their response has 24 characters
        $('#toGroup').click(function() {
            if(!event.detail || event.detail == 1){
                typedProlificID = document.getElementById("prolificIDTextBox").value;
                if (typedProlificID.length == 0) {
                    alert("You must provide a response to continue.")
                } else if (typedProlificID.length != 24) {
                    alert("Your response doesn't match the standard length of Prolific IDs. Please double-check what you have typed and delete any empty spaces at the end.")
                } else {       
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    if (typedProlificID == capturedProlificID) {
                        capturedProlificIDMatch = "Matched";
                    } else if (typedProlificID != capturedProlificID) {
                        capturedProlificIDMatch = "Not matched";
                    };

                    // [ATTENTION: THIS NEEDS TO MATCH THE LENGTH OF THE TASK] 
                    var prolificIDTyped = [].concat(... new Array(91).fill(typedProlificID));
                    dataELT.prolificIDTyped = prolificIDTyped; 

                    var prolificIDMatch = [].concat(... new Array(91).fill(capturedProlificIDMatch));
                    dataELT.prolificIDMatch = prolificIDMatch; 

                    groupMembership(); 
                };
            };
        });
    };  

    // GROUP MEMBERSHIP PAGE
    // TO SAVE: NOTHING 
    function groupMembership() {
        CreateDiv('sectionTop', 'groupMembershipPrompt');
        CreateDiv('sectionMiddle', 'imageGroupMembership');
        CreateDiv('sectionBottom', 'buttonSection');

        // Decide class based on group
        var groupClass = currentGroupMembership === "Tiger" ? "individualWordsOrange" : "individualWordsGold";

        // Group prompt
        var groupPrompt = '<p class = "textInstructions"> You were assigned to the <span class = "' + groupClass + '"> ' + currentGroupMembership + 's</span>. <br> Please acknowledge your group membership before proceeding.</p>'
        $('#groupMembershipPrompt').html(groupPrompt);

        // Recalculate the size of the group image so that it fits the space you have available
        groupImageSize = calculateAspectRatioFit(821, 821, midDiv.clientWidth, midDiv.clientHeight);
        imageGroup.width = groupImageSize.width;
        imageGroup.height = groupImageSize.height;

        $('#imageGroupMembership').html(imageGroup);

        // Acknowledgement button
        var nextButton = document.createElement("BUTTON");
        nextButton.innerHTML = "I acknowledge that I am a member of the " + currentGroupMembership + "s.";
        nextButton.className = "acknowledgementButtons";
        nextButton.id = "toInstructions1";
        $('#buttonSection').html(nextButton);

        // Once the button is clicked
        $('#toInstructions1').click(function() { 
            if(!event.detail || event.detail == 1){     
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                Instructions(0);
            };
        });
    };

    // INSTRUCTIONS PAGE
    // TO SAVE: NOTHING
    function Instructions(pageNum){

        var numPages = 9;

        CreateDiv('sectionVeryTop', 'title');
        CreateDiv('sectionTop', 'informationPart1');
        CreateDiv('sectionMiddle', 'informationPart2');
        CreateDiv('sectionBottom', 'buttonSection');

        // Specifying unique content of each page
        switch (pageNum) {
            case 0:
                var titleText; 
                var Info = '<p class = "textIntro"> Please complete this task in <span class = "individualWords">full screen</span>. </p>'; 
                var Info2 = '<p class = "textIntro">  If the task gets stuck at any point, please <span class = "individualWords">refrain from refreshing the page</span> as you might lose your progress. </p>';
                break;

            case 1:
                computerImageInstructionsSize = calculateAspectRatioFit(1457, 1457, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (1/7)<span></p>";
                var Info = '<p class = "textInstructions">You will play a <span class = "individualWords">card game </span> with other participants in <span class = "individualWords">real time</span>. Some participants will be members of <span class = "individualWords"> your (' + currentGroupMembership + 's) group </span> and some will be members of the <span class = "individualWords"> other (' + notCurrentGroupMembership + 's) group</span>. You will play the card game against this <span class = "individualWords">robot</span> our research team programmed. </p>';
                dinosaurImage.width =  computerImageInstructionsSize.width;
                dinosaurImage.height = computerImageInstructionsSize.height;
                var Info2 = dinosaurImage;
                break;

            case 2:
                gameImageInstructionsSize = calculateAspectRatioFit(3368, 559, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (2/7)<span></p>";;
                var Info = "<p class = 'textInstructions'>In each round, the active player will select one of the four cards, which can have a <span class = 'individualWords'>hidden value from 1 to 15</span>. Once the player has selected their card, the robot will select one of the remaining cards. If the player's card has a higher value than the robot's card, they <span class = 'individualWords'>win</span>. If the player's card has a lower value, they <span class = 'individualWords'>lose</span>. </p>";
                gameTrialInstructions.width = gameImageInstructionsSize.width;
                gameTrialInstructions.height = gameImageInstructionsSize.height;
                var Info2 = gameTrialInstructions;
                break;

            case 3:
                cardImageInstructionsSize = calculateAspectRatioFit(1152, 282, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (3/7)<span></p>";;
                var Info = "<p class = 'textInstructions'> These are the cards you will choose from when it is your turn to play. You won't know the cards' potential values in advance, but know that they aren't random. There is a rule that governs the cards' values and your task is to <span class = 'individualWords'>work it out and win as often as possible</span>. Your <span class = 'individualWords'>individual</span> game score will determine your <span class = 'individualWords'>bonus payment</span> at the end of the experiment.</p>";
                cardSelectionInstructions.width = cardImageInstructionsSize.width;
                cardSelectionInstructions.height = cardImageInstructionsSize.height;
                var Info2 = cardSelectionInstructions;
                break;

            case 4:
                emojiImageInstructionsSize = calculateAspectRatioFit(6169, 1145, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (4/7)<span></p>";
                var Info = "<p class = 'textInstructions'> After you find out about another player's outcome (loss or victory), you will be asked to <span class = 'individualWords'>predict how other members of the Lions and the Tigers feel</span> in response to this outcome. You will make your predictions by clicking on one of the emojis below. </p>";
                emojiSelectionInstructions.width = emojiImageInstructionsSize.width;
                emojiSelectionInstructions.height = emojiImageInstructionsSize.height;
                var Info2 = emojiSelectionInstructions;
                break;

            case 5:
                    emotionalReactionsImageInstructionsSize = calculateAspectRatioFit(3382, 2658, midDiv.clientWidth, midDiv.clientHeight);
                    var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (5/7)<span></p>";
                    var Info = "<p class = 'textInstructions'> After making predictions about others' feelings, you will be able to express <span class = 'individualWords'>how you feel about the same outcome</span> by clicking on one of the emojis below. These emojis will be the only communication you and the other players will have in the game. </p>";
                    emojiSelectionInstructions.width = emojiImageInstructionsSize.width;
                    emojiSelectionInstructions.height = emojiImageInstructionsSize.height;
                    var Info2 = emojiSelectionInstructions;
                    break;

            case 6:
                emotionalReactionsImageInstructionsSize = calculateAspectRatioFit(3382, 2658, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (6/7)<span></p>";
                var Info = "<p class = 'textInstructions'> At the end of each round, you will see the emojis selected by two other players - <span class = 'individualWords'>one member of the Lions and one member of the Tigers</span>. Same as you will see other players' reactions, <span class = 'individualWords'>at least one member of the Lions and one member of the Tigers will see your reaction</span> (but not your predictions of their reactions).</p>";
                emojiDisplayInstructions.width = emotionalReactionsImageInstructionsSize.width;
                emojiDisplayInstructions.height = emotionalReactionsImageInstructionsSize.height;
                var Info2 = emojiDisplayInstructions;
                break;

            case 7:
                emotionalReactionsImageInstructionsSize = calculateAspectRatioFit(3382, 2658, midDiv.clientWidth, midDiv.clientHeight);
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>Instructions (7/7)<span></p>";
                var Info = "<p class = 'textInstructions'>You will only be making predictions, selecting your own and seeing others' emoji reactions <span class = 'individualWords'>when you are not the active player</span>. When it's your turn to play and your outcome is known, your screen will dim and you will have to wait for other players to finish providing responses.</p>";
                emojiDisplayInstructions.width = emotionalReactionsImageInstructionsSize.width;
                emojiDisplayInstructions.height = emotionalReactionsImageInstructionsSize.height;
                var Info2 = emojiDisplayInstructions;
                break;    

            case 8:
                var titleText = "<p class = 'textIntro'><span class = 'individualWords'>If you don't understand this recap, please re-read the full instructions. The Next button is temporarily disabled to make sure you read the information.<span></p>";
                var Info = "<p class = 'textInstructions'> You will play a card game against a robot. The goal is identify the rule governing the cards' values and win as often as possible to <span class = 'individualWords'>boost your individual Prolific bonus</span>. Other participants will also play the game, but <span class = 'individualWords'>their outcomes will have no effect on your Prolific bonus</span>.</p>";
                var Info2 = "<p class = 'textInstructions'> After another player's outcome is known, you will be asked (a) to predict feelings of other members of the Lions and the Tigers about this outcome, and (b) to select an emoji reflecting how you feel about the same outcome. <span class = 'individualWords'>Your own emoji will be shown to one member of each group</span>. Similarly, <span class = 'individualWords'>you will see the emojis selected by two other players</span>.</p>";
                break;   

            case 9:
                var titleText;
                var Info = '<p class = "textIntro"> When you are ready, enter the game waiting room by clicking on the button <span class = "individualWords">Enter</span>.</p>';
                var Info2 = "<p class = 'textIntro'> In addition to paying attention to the cards, <span class = 'individualWords'>pay attention to other players' emoji reactions</span>.</p>";
                break;
        };

        // Title
        $('#title').html(titleText);

        // Instructions page - Part 1
        $('#informationPart1').html(Info);

        // Instructions page - Part 2
        $('#informationPart2').html(Info2);

        // Buttons
        var Buttons = '<div class = "divButtons"><input type="button" class="backButtons" id="backInstructions" value="Back">\n\
        <input type="button" class="nextButtons" id="nextInstructions" value="Next" >\n\
        <input type="button" class="nextButtons" id="nextWaitRoom" value="Enter" ></div>';

        $('#buttonSection').html(Buttons);

        // Hide irrelevant buttons
        if (pageNum === 0) {
            $('#backInstructions').hide();
        };

        if (pageNum === numPages) {
            $('#nextInstructions').hide();
        };

        if (pageNum == 8) {

            if (!nextInstructionsEverShown) {

                $('#nextInstructions').hide();
        
                timerId = setTimeout(function(){
                    nextInstructionsEverShown = true;
                    $('#nextInstructions').show();
                }, 12000); 
        
            } else {
                $('#nextInstructions').show();
            };
        };

        if (pageNum < numPages) {
            $('#nextWaitRoom').hide();
        };

        // What happens when each of the buttons is clicked?
        $('#backInstructions').click(function() {
            if(!event.detail || event.detail == 1){
                if (timerId !== null) {
                    clearTimeout(timerId);
                };
                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                Instructions(pageNum - 1);
            };
        });

        $('#nextInstructions').click(function() {
            if(!event.detail || event.detail == 1){
                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                Instructions(pageNum + 1);
            };
        });

        $('#nextWaitRoom').click(function() {
            if(!event.detail || event.detail == 1){
                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();

                CreateDiv('sectionTop', 'joiningMessage');
                CreateDiv('sectionMiddle', 'loadingGifWaitRoom');
        
                // Joining message
                var join = '<p class = "flashText"> Joining the waiting room... </p>';

                // Loading gif
                loadingGifSize = calculateAspectRatioFit(300, 300, midDiv.clientWidth, midDiv.clientHeight);
                gif.width = loadingGifSize.width;
                gif.height = loadingGifSize.height;

                // Adding both to divs
                $('#joiningMessage').html(join);
                $('#loadingGifWaitRoom').html(gif);

                // Go to the waiting room after a certain time
                var waitTimeEnterWR = randomIntFromInterval(1300, 1800); 
                setTimeout(function(){ $("#joiningMessage").fadeOut(500); }, waitTimeEnterWR); 
                setTimeout(function(){ $("#loadingGifWaitRoom").fadeOut(500); }, waitTimeEnterWR); 
                setTimeout(function() {waitRoom(currentGroupMembership)}, waitTimeEnterWR + 500);
            };
        });
    };

    // WAITING ROOM PAGE
    // TO SAVE: PLAYERS' POSITION ON THE SCREEN
    function waitRoom(groupMembership) {

        // Add new divs
        CreateDiv('sectionTop', 'message');
        CreateDiv('sectionMiddle', 'message2');

        // Player images - Size
        playerImagesSize = calculateAspectRatioFit(1457, 1457, veryTopDiv.clientWidth / 4, veryTopDiv.clientHeight);

        // Ingroup players
        if (groupMembership == "Tiger") {

            ingroupPlayersImages = document.createElement("div");
            ingroupPlayersImages.id = "ingroupPlayers";

            // Specify width, height & class
            tigerPlayer1.width = playerImagesSize.width;
            tigerPlayer1.height = playerImagesSize.height;
            tigerPlayer1.className = "ingroupPlayersClass";

            tigerPlayer2.width = playerImagesSize.width;
            tigerPlayer2.height = playerImagesSize.height;
            tigerPlayer2.className = "ingroupPlayersClass";

            tigerPlayer3.width = playerImagesSize.width;
            tigerPlayer3.height = playerImagesSize.height;
            tigerPlayer3.className = "ingroupPlayersClass";

            tigerPlayer4.width = playerImagesSize.width;
            tigerPlayer4.height = playerImagesSize.height;
            tigerPlayer4.className = "ingroupPlayersClass";

            ingroupPlayersImages.appendChild(tigerPlayer1);
            ingroupPlayersImages.appendChild(tigerPlayer2);
            ingroupPlayersImages.appendChild(tigerPlayer3);
            ingroupPlayersImages.appendChild(tigerPlayer4);

        } else if (groupMembership == "Lion"){

            ingroupPlayersImages = document.createElement("div");
            ingroupPlayersImages.id = "ingroupPlayers";

            // Specify width, height & class
            lionPlayer1.width = playerImagesSize.width;
            lionPlayer1.height = playerImagesSize.height;
            lionPlayer1.className = "ingroupPlayersClass";

            lionPlayer2.width = playerImagesSize.width;
            lionPlayer2.height = playerImagesSize.height;
            lionPlayer2.className = "ingroupPlayersClass";

            lionPlayer3.width = playerImagesSize.width;
            lionPlayer3.height = playerImagesSize.height;
            lionPlayer3.className = "ingroupPlayersClass";

            lionPlayer4.width = playerImagesSize.width;
            lionPlayer4.height = playerImagesSize.height;
            lionPlayer4.className = "ingroupPlayersClass";

            ingroupPlayersImages.appendChild(lionPlayer1);
            ingroupPlayersImages.appendChild(lionPlayer2);
            ingroupPlayersImages.appendChild(lionPlayer3);
            ingroupPlayersImages.appendChild(lionPlayer4);
              
        };

        // Outgroup players
        if (groupMembership == "Lion") {

            outgroupPlayersImages = document.createElement("div");
            outgroupPlayersImages.id = "outgroupPlayers";

            // Specify width, height & class
            tigerPlayer1.width = playerImagesSize.width;
            tigerPlayer1.height = playerImagesSize.height;
            tigerPlayer1.className = "outgroupPlayersClass";

            tigerPlayer2.width = playerImagesSize.width;
            tigerPlayer2.height = playerImagesSize.height;
            tigerPlayer2.className = "outgroupPlayersClass";

            tigerPlayer3.width = playerImagesSize.width;
            tigerPlayer3.height = playerImagesSize.height;
            tigerPlayer3.className = "outgroupPlayersClass";

            tigerPlayer4.width = playerImagesSize.width;
            tigerPlayer4.height = playerImagesSize.height;
            tigerPlayer4.className = "outgroupPlayersClass";

            outgroupPlayersImages.appendChild(tigerPlayer1);
            outgroupPlayersImages.appendChild(tigerPlayer2);
            outgroupPlayersImages.appendChild(tigerPlayer3);
            outgroupPlayersImages.appendChild(tigerPlayer4);
        
        } else if (groupMembership == "Tiger"){

            outgroupPlayersImages = document.createElement("div");
            outgroupPlayersImages.id = "outgroupPlayers";

            // Specify width, height & class
            lionPlayer1.width = playerImagesSize.width;
            lionPlayer1.height = playerImagesSize.height;
            lionPlayer1.className = "outgroupPlayersClass";

            lionPlayer2.width = playerImagesSize.width;
            lionPlayer2.height = playerImagesSize.height;
            lionPlayer2.className = "outgroupPlayersClass";

            lionPlayer3.width = playerImagesSize.width;
            lionPlayer3.height = playerImagesSize.height;
            lionPlayer3.className = "outgroupPlayersClass";

            lionPlayer4.width = playerImagesSize.width;
            lionPlayer4.height = playerImagesSize.height;
            lionPlayer4.className = "outgroupPlayersClass";

            outgroupPlayersImages.appendChild(lionPlayer1);
            outgroupPlayersImages.appendChild(lionPlayer2);
            outgroupPlayersImages.appendChild(lionPlayer3);
            outgroupPlayersImages.appendChild(lionPlayer4);

        };

        randTeamPosition = Math.random();

        if (randTeamPosition < 0.50) {
            $('#sectionVeryTop').html(ingroupPlayersImages);
            $('#sectionVeryBottom').html(outgroupPlayersImages);

            var playerScreenPosition = [].concat(... new Array(91).fill("Ingroup up, outgroup down"));
            dataELT.playerScreenPosition = playerScreenPosition;

        } else if (randTeamPosition >= 0.50) {
            $('#sectionVeryTop').html(outgroupPlayersImages);
            $('#sectionVeryBottom').html(ingroupPlayersImages);

            var playerScreenPosition = [].concat(... new Array(91).fill("Outgroup up, ingroup down"));
            dataELT.playerScreenPosition = playerScreenPosition;
        }

        // Messages
        var wait = '<p class = "flashTextNoMargin"> Waiting for other players to join... </p>';

        $('#message').html(wait);

        var countdownTime = new Date().getTime() + 24000; 

        // The function below will execute each second
        // At pre-specified points, different events will be happening on the screen (e.g., players appearing)
        var x = setInterval(function() {

            var nowTime = new Date().getTime();
            var timeDistance = countdownTime - nowTime;

            if (timeDistance < 23000) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("tigerPlayer1ID").src = "assets/activePlayerTiger1.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("lionPlayer1ID").src = "assets/activePlayerLion1.png";
                };
            };

            if (timeDistance < 20100) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("lionPlayer1ID").src = "assets/activePlayerLion1.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("tigerPlayer1ID").src = "assets/activePlayerTiger1.png";
                };
            };

            if (timeDistance < 14300) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("tigerPlayer4ID").src = "assets/activePlayerTiger4.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("lionPlayer4ID").src = "assets/activePlayerLion4.png";
                };
            };

            if (timeDistance < 11500) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("lionPlayer2ID").src = "assets/activePlayerLion2.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("tigerPlayer2ID").src = "assets/activePlayerTiger2.png";
                };
            };

            if (timeDistance < 5100) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("tigerPlayer3ID").src = "assets/activePlayerTiger3.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("lionPlayer3ID").src = "assets/activePlayerLion3.png";
                };
            };
        
            if (timeDistance < 200) {
                clearInterval(x);
                setTimeout(function() {
                    $('#message').html(startGame);
                    $('#message2').html(startButton);
                }, 500);
            };
        });      
        
        // Start message & button - Displayed after the timer
        var startGame = '<p class = "textIntroNoMargin"> Enough players have joined, you can start the game now! </p>';

        var startButton = document.createElement("BUTTON");
        startButton.innerHTML = "Start";
        startButton.className = "nextButtons";
        startButton.id = "toGame";

        // Once the button is clicked, move onto the first round of the game
        $(document).on('click','#toGame', function(){
            $('#sectionTop').empty();
            $('#sectionMiddle').empty();
            $('#sectionBottom').empty();
            gameStart();
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // GAME

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    
    // GAME START 
    // TO SAVE: NOTHING 
    function gameStart() {
        CreateDiv('sectionTop', 'startingGame');
        CreateDiv('sectionMiddle', 'timerStartingGame');

        // Starting message
        var starting = '<p class = "flashTextNoMargin"> Starting the game... </p>';
        $('#startingGame').html(starting);

        // Timer 
        var countdownTime2s = new Date().getTime() + 2000; 

        var x = setInterval(function() {

            var nowTime2s = new Date().getTime();
            var timeDistance2s = countdownTime2s - nowTime2s;
    
            var minutes0 = Math.floor((timeDistance2s % (1000 * 60 * 60)) / (1000 * 60));
            var seconds2 = Math.floor((timeDistance2s % (1000 * 60)) / 1000);

            var timer2s = '<p class = "textIntroNoMargin">' + minutes0 + 'm ' + seconds2 + 's </p>' 

            $('#timerStartingGame').html(timer2s);

            if (timeDistance2s < 300) {
                clearInterval(x);
                $('#startingGame').fadeOut(400);
                $('#timerStartingGame').fadeOut(400);

                setTimeout(function() {

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();

                    // Create playfield (canvas)
                    createPlayfield();
                    
                    checkToContinue(currentGroupMembership, startingTrialPlayer, startingTrialNumber);
                }, 500);
            };
        });            
    };

    // From here, different functions are looping.

    ////////// GENERAL CHECK FUNCTION //////////

    // This function checks if the game should continue or not based on the trial number.
    function checkToContinue(groupMembership, activePlayer, trialNum) {
        if (trialNum <= numTrials) {
            if (groupMembership == 'Tiger' && activePlayer != 'tigerPlayer2ID') {
                gameChoiceNotParticipant(activePlayer, trialNum);
            } else if (groupMembership == 'Tiger' && activePlayer == 'tigerPlayer2ID') {
                gameChoiceParticipant(activePlayer, trialNum);
            } else if (groupMembership == 'Lion' && activePlayer != 'lionPlayer2ID') {
                gameChoiceNotParticipant(activePlayer, trialNum);
            } else if (groupMembership == 'Lion' && activePlayer == 'lionPlayer2ID') {
                gameChoiceParticipant(activePlayer, trialNum);
            };
        } else if (trialNum > numTrials) {

            // Timestamps when the learning block ended
            
            // Local time
            var localTimeEndLearningBlock = new Date().getTime();
            var localDateEndLearningBlock = new Date(localTimeEndLearningBlock).toString();

            // UTC time
            var utcDateEndLearningBlock = new Date(localTimeEndLearningBlock).toUTCString();

            // Duration of the learning block
            endLearningBlock = Date.now();
            var timeLearningBlock = msToMinSec(endLearningBlock - startTask);

            // Store the last two variables
            var localTimeEndLearningBlockStore = [].concat(... new Array(91).fill(localDateEndLearningBlock));
            dataELT.localTimeEndLearningBlock = localTimeEndLearningBlockStore; 

            var utcTimeEndLearningBlock = [].concat(... new Array(91).fill(utcDateEndLearningBlock));
            dataELT.utcTimeEndLearningBlock = utcTimeEndLearningBlock; 

            var learningBlockDuration = [].concat(... new Array(91).fill(timeLearningBlock));
            dataELT.learningBlockDuration = learningBlockDuration; 

            // At the very end, players' images in VeryTop and VeryBottom sections need to be removed
            $('#ingroupPlayers').fadeOut(500);
            $('#outgroupPlayers').fadeOut(500);

            setTimeout(function() {

                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                $('#sectionVeryBottom').empty();

                introTestPhase();

            }, 600);
        };
    }; 

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // LEARNING PHASE

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    ////////// NOT PARTICIPANT //////////

    // GAME CHOICE 
    // TO SAVE: NOTHING 
    function gameChoiceNotParticipant(activePlayer, trialNum) {

        startTimeChoice = new Date().getTime();

        // Since you hide the canvas when you are displaying reactions of group members, return it here
        if (trialNum > 1) {
            displayCanvas();
        };

        // Adding the red rectangle to the player who is playing
        var player = document.getElementById(activePlayer);

        // Check if the current player is the inactive outgroup player. If so, this code is executed:
        // [ATTENTION: THIS CHUNK OF CODE IS NEVER EXECUTED!]
        if (player.classList.contains("outgroupPlayersClass") && activePlayer == "tigerPlayer4ID" || player.classList.contains("outgroupPlayersClass") && activePlayer == "lionPlayer4ID") {

            markActivePlayer(activePlayer); 

            // Leave a mark for 1000 ms
            setTimeout(function() {

                unmarkInactivePlayer(activePlayer);

                // Move onto the next player
                inactivePlayerIndex = playerOrder.indexOf(activePlayer);
                nextPlayerAfterInactive = playerOrder[inactivePlayerIndex + 1];

                removeCanvas();

                $('#sectionMiddle').empty();

                checkToContinue(currentGroupMembership, nextPlayerAfterInactive, trialNum); 

            }, 1000);

        // If the current player is not the inactive outgroup player, this code is executed:
        } else {

            markActivePlayer(activePlayer); 

            // Create div
            CreateDiv('sectionTop', 'cardChoiceIngroupReactions');

            // Update canvas size in case window size is changed
            newCanvas.width = midDiv.clientWidth / 2;
            newCanvas.height = midDiv.clientHeight;

            // Adjust image size to the canvas
            imagePlayerSize = calculateAspectRatioFit(1457, 1457, newCanvas.width / 5, newCanvas.clientHeight);

            // Adding the appropriate image on the canvas
            if (activePlayer.includes("tiger")) {
                var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Player T' + activePlayer.substr(activePlayer.length - 3, 1) + ' selecting the card...</p>' 
                ctx.drawImage(imagePlayerTiger, newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            } else if (activePlayer.includes("lion")) {
                var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Player L' + activePlayer.substr(activePlayer.length - 3, 1) + ' selecting the card...</p>'
                ctx.drawImage(imagePlayerLion, newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            };

            // Adding the computer image on the canvas
            ctx.drawImage(imageComputer, newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            // Adding a flashing message that the player is choosing a card
            $('#cardChoiceIngroupReactions').html(choosingCardsMessage);
            $('#cardChoiceIngroupReactions').show();

            // In the first seven trials, selection of cards will last between 2.5 and 4 seconds
            var waitTimeCardSelection;

            if (trialNum <= 7) {
                waitTimeCardSelection = randomIntFromInterval(2500, 4000);

            // From the eight trial onwards, selection of cards will last between 1.5 and 3.5 seconds
            } else if (trialNum > 7) {
                waitTimeCardSelection = randomIntFromInterval(1500, 3500);

            };

            setTimeout(function(){ 
                $('#cardChoiceIngroupReactions').fadeOut(400);
            }, waitTimeCardSelection);

            setTimeout(function(){
                $('#sectionTop').empty();
                gameOutcomeNotParticipant(activePlayer, trialNum); 
            }, waitTimeCardSelection + 500);
        };
    };

    // GAME OUTCOME (OTHER INGROUP AND OUTGROUP PARTICIPANTS)
    // TO SAVE: ACTIVE PLAYER, TRIAL NUMBER, TRIAL OUTCOME (LOSS/VICTORY), TRIAL OUTCOME RT, COMPUTER & PLAYER NUMBERS, BLOCK
    function gameOutcomeNotParticipant(activePlayer, trialNum) {

        // Random number from 0 to 1 will determine the outcome
        var randPosition = Math.random();

        // Randomly select a computer outcome
        cardSelectorComp = randomIntFromInterval(1, 13);
        specificComputerNumber = cardValues[cardSelectorComp]; 

        // Display outcome
        CreateDiv('sectionTop', 'gameOutcome'); 

        // Create a copy of cardValues array - You can't splice card values directly, it will delete elements!!!!
        cardValuesForSplicing = [...cardValues]; 

        // Computer wins with 50% probability
        if (randPosition < 0.50) { 
            var smallerCardValues = cardValuesForSplicing.splice(0, cardSelectorComp);
            var cardSelectorPlayerLose = randomIntFromInterval(0, smallerCardValues.length - 1);
            specificPlayerNumber = smallerCardValues[cardSelectorPlayerLose];

            if (activePlayer.includes("tiger")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">PLAYER T' + activePlayer.substr(activePlayer.length - 3, 1) + ' LOST</span></p>'; 
            } else if (activePlayer.includes("lion")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">PLAYER L' + activePlayer.substr(activePlayer.length - 3, 1) + ' LOST</span></p>'; 
            };

            
            specificTrialOutcome = 'Loss';

        // Player wins with 50% probability
        } else if (randPosition >= 0.50) { 
            var largerCardValues = cardValuesForSplicing.splice(cardSelectorComp + 1);
            var cardSelectorPlayerWin = randomIntFromInterval(0, largerCardValues.length - 1);
            specificPlayerNumber = largerCardValues[cardSelectorPlayerWin];

            if (activePlayer.includes("tiger")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">PLAYER T' + activePlayer.substr(activePlayer.length - 3, 1) + ' WON</span></p>'; 
            } else if (activePlayer.includes("lion")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">PLAYER L' + activePlayer.substr(activePlayer.length - 3, 1) + ' WON</span></p>'; 
            };

            specificTrialOutcome = 'Victory';
        }; 

        $('#gameOutcome').html(outcomeMessage);
        $('#gameOutcome').show();

        endTimeOutcome = new Date().getTime();
        specificTrialOutcomeRT = calculateRT(startTimeChoice, endTimeOutcome)

        // Update canvas size in case window size is changed
        newCanvas.width = midDiv.clientWidth / 2;
        newCanvas.height = midDiv.clientHeight;

        // Remove images and display numbers instead
        ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
        ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

        // Computer outcome
        var ratio = 0.263; // Ratio serves to scale the text size
        ctx.fillStyle = 'LimeGreen';
        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificComputerNumber, newCanvas.width * 0.8, newCanvas.height * 0.6, newCanvas.width * 0.05);

        // Player outcome
        if (activePlayer.includes("tiger")) {
            ctx.fillStyle = 'OrangeRed';
        } else if (activePlayer.includes("lion")) {
            ctx.fillStyle = 'Gold';
        };

        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificPlayerNumber, newCanvas.width * 0.17, newCanvas.height * 0.6, newCanvas.width * 0.05);

        setTimeout(function() {

            // Save information about the active player and the trial number
            trialNumbers.push(trialNum);
            trialPlayers.push(activePlayer);

            // Save information about the trial outcome as well as the specific computer/player number
            trialOutcomes.push(specificTrialOutcome);
            trialOutcomesRT.push(specificTrialOutcomeRT);
            playerNumbers.push(specificPlayerNumber);
            computerNumbers.push(specificComputerNumber);

            // To make it easier to merge data later, all trials where participant is not an active player will have the "Non-participant trial" message
            specificParticipantSelectedCard = "Non-participant trial";
            specificParticipantSelectedCardRT = "Non-participant trial";
            participantSelectedCards.push(specificParticipantSelectedCard);
            participantSelectedCardsRT.push(specificParticipantSelectedCardRT); 

            // Store that the block is learning
            taskBlock.push('Learning phase');

            // Clear numbers
            ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            // Move to the next stage
            if(randResponseOrder == "Ingroup first"){
                ingroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
            } else {
                outgroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
            };

        }, 2000);
    };

    // OUTCOME REACTION CHOICE (NOT PARTICIPANT)
    // TO SAVE: REACTION TIME, RESPONSE
    function outcomeReactionChoiceNotParticipant(activePlayer, trialNum){

        startTimeEmojiChoiceSelf = new Date().getTime();

        // First dim screen & hide canvas
        dimScreen();
        removeCanvas();

        // Create divs
        CreateDiv('sectionMiddle', 'emotionalReactionsPrompt');
        CreateDiv('sectionBottom', 'emotionalReactions');

        var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do <span class = 'individualWords'>you</span> feel because of this player's outcome?</p>";

        $('#emotionalReactionsPrompt').html(emojiReaction);
        $('#emotionalReactionsPrompt').show();
        
        // Display emojis (Defined in the beginning)
        // Note: .show() needs to be included so that you can display the emoji scale on multiple trials without it being deleted by .fadeOut()        
        emojiImagesSize = calculateAspectRatioFit(527, 508, midDiv.clientWidth / 3, midDiv.clientHeight);

        emojiImages = document.createElement("div");
        emojiImages.id = "emojiReactions";

        // Specify each individual emoji - Width & height
        emoji1.width = emojiImagesSize.width;
        emoji1.height = emojiImagesSize.height;

        emoji2.width = emojiImagesSize.width;
        emoji2.height = emojiImagesSize.height;

        emoji3.width = emojiImagesSize.width;
        emoji3.height = emojiImagesSize.height;
  
        // Determine which two emojis will be presented as options depending on the outcome
        if (specificTrialOutcome == "Victory") {
            emojiImages.appendChild(emoji2);
            emojiImages.appendChild(emoji3);
        } else if (specificTrialOutcome == "Loss") {
            emojiImages.appendChild(emoji1);
            emojiImages.appendChild(emoji2);
        };

        $('#emotionalReactions').html(emojiImages);
        $('#emotionalReactions').show();
        
        // What happens when each of the emojis is clicked?
        $('#valence1').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);
                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').empty();

                specificParticipantReaction = image_id_map["valence1"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                // In the first seven trials, waiting to see other players' emojis will last between 2.5 and 4 seconds
                if (trialNum <= 7) {
                    waitTimeDisplay = randomIntFromInterval(2500, 4000);

                // From the eight trial onwards, waiting to see other players' emojis will last between 1.8 and 3.5 seconds
                } else if (trialNum > 7) {
                    waitTimeDisplay = randomIntFromInterval(1800, 3500);

                };

                setTimeout(function() {
                    undimScreen();

                    displayDelay.push(waitTimeDisplay);

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    outcomeReactionDisplay(currentGroupMembership, activePlayer, specificTrialOutcome, trialNum);

                }, waitTimeDisplay);

            };
        }); 

        $('#valence2').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);
                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').empty();

                specificParticipantReaction = image_id_map["valence2"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                // In the first seven trials, waiting to see other players' emojis will last between 2.5 and 4 seconds
                if (trialNum <= 7) {
                    waitTimeDisplay = randomIntFromInterval(2500, 4000);

                // From the eight trial onwards, waiting to see other players' emojis will last between 1.8 and 3.5 seconds
                } else if (trialNum > 7) {
                    waitTimeDisplay = randomIntFromInterval(1800, 3500);

                };

                setTimeout(function() {
                    undimScreen();

                    displayDelay.push(waitTimeDisplay);

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    outcomeReactionDisplay(currentGroupMembership, activePlayer, specificTrialOutcome, trialNum);

                }, waitTimeDisplay);
            };
        }); 

        $('#valence3').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);
                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').empty();

                specificParticipantReaction = image_id_map["valence3"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                // In the first seven trials, waiting to see other players' emojis will last between 2.5 and 4 seconds
                if (trialNum <= 7) {
                    waitTimeDisplay = randomIntFromInterval(2500, 4000);

                // From the eight trial onwards, waiting to see other players' emojis will last between 1.8 and 3.5 seconds
                } else if (trialNum > 7) {
                    waitTimeDisplay = randomIntFromInterval(1800, 3500);

                };

                setTimeout(function() {
                    undimScreen();

                    displayDelay.push(waitTimeDisplay);

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    outcomeReactionDisplay(currentGroupMembership, activePlayer, specificTrialOutcome, trialNum);

                }, waitTimeDisplay);
            };
        }); 
    };

    // INGROUP REACTION PREDICTION (NOT PARTICIPANT)
    // TO SAVE: REACTION TIME, RESPONSE
    function ingroupReactionPredictionNotParticipant(groupMembership, activePlayer, trialNum){

        startTimeEmojiChoiceIngroup = new Date().getTime();

        // First dim screen & hide canvas
        dimScreen();
        removeCanvas();

        // Create divs
        CreateDiv('sectionMiddle', 'emotionalReactionsPrompt');
        CreateDiv('sectionBottom', 'emotionalReactions');

        // Change how the question is phrased on the basis of participant's group membership
        if (groupMembership == "Lion") {
            var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do you think other members of the <span class = 'individualWordsGold'> Lions </span> feel because of this player's outcome?</p>";
        } else if (groupMembership == "Tiger") {
            var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do you think other members of the <span class = 'individualWordsOrange'> Tigers </span> feel because of this player's outcome?</p>";
        };

        $('#emotionalReactionsPrompt').html(emojiReaction);
        $('#emotionalReactionsPrompt').show();
        
        // Display emojis (Defined in the beginning)
        // Note: .show() needs to be included so that you can display the emoji scale on multiple trials without it being deleted by .fadeOut()        
        emojiImagesSize = calculateAspectRatioFit(527, 508, midDiv.clientWidth / 3, midDiv.clientHeight);

        emojiImages = document.createElement("div");
        emojiImages.id = "emojiReactions";

        // Specify each individual emoji - Width & height
        emoji1.width = emojiImagesSize.width;
        emoji1.height = emojiImagesSize.height;

        emoji2.width = emojiImagesSize.width;
        emoji2.height = emojiImagesSize.height;

        emoji3.width = emojiImagesSize.width;
        emoji3.height = emojiImagesSize.height;
  
        // Determine which two emojis will be presented as options depending on the outcome
        if (specificTrialOutcome == "Victory") {
            emojiImages.appendChild(emoji2);
            emojiImages.appendChild(emoji3);
        } else if (specificTrialOutcome == "Loss") {
            emojiImages.appendChild(emoji1);
            emojiImages.appendChild(emoji2);
        };

        $('#emotionalReactions').html(emojiImages);
        $('#emotionalReactions').show();
        
        // What happens when each of the emojis is clicked?
        $('#valence1').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceIngroup = new Date().getTime();
                specificParticipantReactionIngroupRT = calculateRT(startTimeEmojiChoiceIngroup, clickTimeEmojiChoiceIngroup);
                specificParticipantReactionIngroup = image_id_map["valence1"];
                participantReactionsPublicIngroup.push(specificParticipantReactionIngroup);
                participantReactionsPublicIngroupRT.push(specificParticipantReactionIngroupRT);

                if(randResponseOrder == "Ingroup first"){
                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();
                    
                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outgroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
    
                    }, 500);

                } else {

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outcomeReactionChoiceNotParticipant(activePlayer, trialNum);

                    }, 500);
                };
            };
        }); 

        $('#valence2').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceIngroup = new Date().getTime();
                specificParticipantReactionIngroupRT = calculateRT(startTimeEmojiChoiceIngroup, clickTimeEmojiChoiceIngroup);
                specificParticipantReactionIngroup = image_id_map["valence2"];
                participantReactionsPublicIngroup.push(specificParticipantReactionIngroup);
                participantReactionsPublicIngroupRT.push(specificParticipantReactionIngroupRT);

                if(randResponseOrder == "Ingroup first"){
                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outgroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
    
                    }, 500);

                } else {

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outcomeReactionChoiceNotParticipant(activePlayer, trialNum);
    
                    }, 500);
                };
            };
        }); 

        $('#valence3').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceIngroup = new Date().getTime();
                specificParticipantReactionIngroupRT = calculateRT(startTimeEmojiChoiceIngroup, clickTimeEmojiChoiceIngroup);
                specificParticipantReactionIngroup = image_id_map["valence3"];
                participantReactionsPublicIngroup.push(specificParticipantReactionIngroup);
                participantReactionsPublicIngroupRT.push(specificParticipantReactionIngroupRT);

                if(randResponseOrder == "Ingroup first"){
                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();
    
                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outgroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
    
                    }, 500);
                } else {

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outcomeReactionChoiceNotParticipant(activePlayer, trialNum);
    
                    }, 500);
                };
            };
        }); 
    };

    // OUTGROUP REACTION PREDICTION (NOT PARTICIPANT)
    // TO SAVE: REACTION TIME, RESPONSE
    function outgroupReactionPredictionNotParticipant(groupMembership, activePlayer, trialNum){

        startTimeEmojiChoiceOutgroup = new Date().getTime();

        // First dim screen & hide canvas
        dimScreen();
        removeCanvas();

        // Create divs
        CreateDiv('sectionMiddle', 'emotionalReactionsPrompt');
        CreateDiv('sectionBottom', 'emotionalReactions');

        // Change how the question is phrased on the basis of participant's group membership
        if (groupMembership == "Lion") {
            var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do you think members of the <span class = 'individualWordsOrange'> Tigers </span> feel because of this player's outcome?</p>";
        } else if (groupMembership == "Tiger") {
            var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do you think members of the <span class = 'individualWordsGold'> Lions </span> feel because of this player's outcome?</p>";
        };

        $('#emotionalReactionsPrompt').html(emojiReaction);
        $('#emotionalReactionsPrompt').show();
        
        // Display emojis (Defined in the beginning)
        // Note: .show() needs to be included so that you can display the emoji scale on multiple trials without it being deleted by .fadeOut()        
        emojiImagesSize = calculateAspectRatioFit(527, 508, midDiv.clientWidth / 3, midDiv.clientHeight);

        emojiImages = document.createElement("div");
        emojiImages.id = "emojiReactions";

        // Specify each individual emoji - Width & height
        emoji1.width = emojiImagesSize.width;
        emoji1.height = emojiImagesSize.height;

        emoji2.width = emojiImagesSize.width;
        emoji2.height = emojiImagesSize.height;

        emoji3.width = emojiImagesSize.width;
        emoji3.height = emojiImagesSize.height;
  
        // Determine which two emojis will be presented as options depending on the outcome
        if (specificTrialOutcome == "Victory") {
            emojiImages.appendChild(emoji2);
            emojiImages.appendChild(emoji3);
        } else if (specificTrialOutcome == "Loss") {
            emojiImages.appendChild(emoji1);
            emojiImages.appendChild(emoji2);
        };

        $('#emotionalReactions').html(emojiImages);
        $('#emotionalReactions').show();
        
        // What happens when each of the emojis is clicked?
        $('#valence1').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceOutgroup = new Date().getTime();
                specificParticipantReactionOutgroupRT = calculateRT(startTimeEmojiChoiceOutgroup, clickTimeEmojiChoiceOutgroup);
                specificParticipantReactionOutgroup = image_id_map["valence1"];
                participantReactionsPublicOutgroup.push(specificParticipantReactionOutgroup);
                participantReactionsPublicOutgroupRT.push(specificParticipantReactionOutgroupRT);

                if(randResponseOrder == "Outgroup first"){

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        ingroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
    
                    }, 500);

                } else {

                     $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outcomeReactionChoiceNotParticipant(activePlayer, trialNum);
    
                    }, 500);
                };
            };
        }); 

        $('#valence2').click(function() {
            if(!event.detail || event.detail == 1){
                    clickTimeEmojiChoiceOutgroup = new Date().getTime();
                    specificParticipantReactionOutgroupRT = calculateRT(startTimeEmojiChoiceOutgroup, clickTimeEmojiChoiceOutgroup);
                    specificParticipantReactionOutgroup = image_id_map["valence2"];
                    participantReactionsPublicOutgroup.push(specificParticipantReactionOutgroup);
                    participantReactionsPublicOutgroupRT.push(specificParticipantReactionOutgroupRT);
    
                    if(randResponseOrder == "Outgroup first"){

                        $('#emotionalReactionsPrompt').empty();
                        $('#emotionalReactions').empty();

                        setTimeout(function() {
                            undimScreen();

                            $('#sectionMiddle').empty();
                            $('#sectionBottom').empty();
    
                            ingroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
        
                        }, 500);
                    } else {

                        $('#emotionalReactionsPrompt').empty();
                        $('#emotionalReactions').empty();
    
                        setTimeout(function() {
                            undimScreen();
    
                            $('#sectionMiddle').empty();
                            $('#sectionBottom').empty();
    
                            outcomeReactionChoiceNotParticipant(activePlayer, trialNum);
        
                        }, 500);
                    };
            };
        }); 

        $('#valence3').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceOutgroup = new Date().getTime();
                specificParticipantReactionOutgroupRT = calculateRT(startTimeEmojiChoiceOutgroup, clickTimeEmojiChoiceOutgroup);
                specificParticipantReactionOutgroup = image_id_map["valence3"];
                participantReactionsPublicOutgroup.push(specificParticipantReactionOutgroup);
                participantReactionsPublicOutgroupRT.push(specificParticipantReactionOutgroupRT);

                if(randResponseOrder == "Outgroup first"){

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        ingroupReactionPredictionNotParticipant(currentGroupMembership, activePlayer, trialNum);
    
                    }, 500);
                } else {

                    $('#emotionalReactionsPrompt').empty();
                    $('#emotionalReactions').empty();

                    setTimeout(function() {
                        undimScreen();

                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        outcomeReactionChoiceNotParticipant(activePlayer, trialNum);
    
                    }, 500);
                };
            };
        }); 
    };

    ////////// BOTH PARTICIPANT & NOT PARTICIPANT //////////

    // OUTCOME REACTION DISPLAY 
    // TO SAVE: WHOSE REACTIONS WERE DISPLAYED AND WHAT WERE THE REACTIONS
    function outcomeReactionDisplay(groupMembership, activePlayer, activePlayerOutcome, trialNum){

        // Create divs
        CreateDiv('sectionTop', 'oneGroupReactions');
        CreateDiv('sectionMiddle', 'gameOutcomeMoved');
        CreateDiv('sectionBottom', 'otherGroupReactions');

        // Populate middle div
        $('#gameOutcomeMoved').html(outcomeMessage);
        
        // Who is displaying the emotion?
        var testTigerPlayerDisplayed = tigerReactionDisplaysShuffled[trialNum - 1];
        var testLionPlayerDisplayed = lionReactionDisplaysShuffled[trialNum - 1];

        // Ensure that someone's reaction isn't displayed when they are the active player

        // Tiger players
        while (testTigerPlayerDisplayed == activePlayer) {

            // If there is a match between the active player and the displayer, change the current displayer accordingly
            // In trials 1-52, swapping method is used such that the current displayer (which matches the active player) is swapped with a displayer
            // later in the list until the displayer that doesn't match the active player is found
            // In trials 53-63, if there is a match between the active player and the displayer, a random displayer is drawn from a prespecified sequence
            if (trialNum < (numTrials - 10)) {
                var indexSwap = randomIntFromInterval(trialNum, tigerReactionDisplaysShuffled.length - 1);
                tigerReactionDisplaysShuffled.swap(trialNum - 1, indexSwap);
                testTigerPlayerDisplayed = tigerReactionDisplaysShuffled[trialNum - 1];
            } else if (trialNum >= (numTrials - 10) && groupMembership == 'Tiger') {
                testTigerPlayerDisplayed = jsPsych.randomization.sampleWithReplacement(['tigerPlayer1ID', 'tigerPlayer3ID', 'tigerPlayer4ID'], 1)[0];
            } else if (trialNum >= (numTrials - 10) && groupMembership == 'Lion') {
                testTigerPlayerDisplayed = jsPsych.randomization.sampleWithReplacement(['tigerPlayer1ID', 'tigerPlayer2ID', 'tigerPlayer3ID'], 1)[0];
            };

        }

        // Lion players
        while (testLionPlayerDisplayed == activePlayer){

            // If there is a match between the active player and the displayer, change the current displayer accordingly
            // In trials 1-52, swapping method is used such that the current displayer (which matches the active player) is swapped with a displayer
            // later in the list until the displayer that doesn't match the active player is found
            // In trials 53-63, if there is a match between the active player and the displayer, a random displayer is drawn from a prespecified sequence
            if (trialNum < (numTrials - 10)) {
                var indexSwap = randomIntFromInterval(trialNum, lionReactionDisplaysShuffled.length - 1);
                lionReactionDisplaysShuffled.swap(trialNum - 1, indexSwap);
                testLionPlayerDisplayed = lionReactionDisplaysShuffled[trialNum - 1];
            } else if (trialNum >= (numTrials - 10) && groupMembership == 'Tiger') {
                testLionPlayerDisplayed = jsPsych.randomization.sampleWithReplacement(['lionPlayer1ID', 'lionPlayer2ID', 'lionPlayer3ID'], 1)[0];
            } else if (trialNum >= (numTrials - 10) && groupMembership == 'Lion') {
                testLionPlayerDisplayed = jsPsych.randomization.sampleWithReplacement(['lionPlayer1ID', 'lionPlayer3ID', 'lionPlayer4ID'], 1)[0];
            };
            
        }

        // Specify the player whose reaction is being displayed
        specificTigerPlayerDisplayed = testTigerPlayerDisplayed;
        specificLionPlayerDisplayed = testLionPlayerDisplayed;

        // Save information about whose reactions are being displayed
        tigerPlayersDisplayed.push(specificTigerPlayerDisplayed);
        lionPlayersDisplayed.push(specificLionPlayerDisplayed);

        // Within-group emotional reactions [ALWAYS THE SAME!!!]
        
        // Between-group emotional reactions [DEPEND ON CONDITION!!!]

        // In Emp - Out Emp
        if (currentExperimentalCondition == 'inEmp_outEmp') {

            if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            };
        
        // In Apa - Out Apa

        } else if (currentExperimentalCondition == 'inApa_outApa') {

            if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            };
        
        // In Emp - Out Apa

        } else if (currentExperimentalCondition == 'inEmp_outApa') {

            if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            };

        // In Apa - Out Emp

        } else if (currentExperimentalCondition == 'inApa_outEmp') {

            if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Tiger' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.25, 0.75]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("tiger") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Loss') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([1, 2], [1], [0.75, 0.25]));
    
            } else if (groupMembership == 'Lion' && activePlayer.includes("lion") && activePlayerOutcome == 'Victory') {

                specificTigerPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

                specificLionPlayerReaction = parseInt(jsPsych.randomization.sampleWithReplacement([2, 3], [1], [0.25, 0.75]));

            };
        };

        // Save information about the reactions being displayed
        tigerPlayersReactions.push(specificTigerPlayerReaction);
        lionPlayersReactions.push(specificLionPlayerReaction);

        // Save coordinates of player images so that you can position emotional reactions accordingly
        var TP1_Coordinates = tigerPlayer1.getBoundingClientRect();

        var TP2_Coordinates = tigerPlayer2.getBoundingClientRect();

        var TP3_Coordinates = tigerPlayer3.getBoundingClientRect();

        var TP4_Coordinates = tigerPlayer4.getBoundingClientRect();

        var LP1_Coordinates = lionPlayer1.getBoundingClientRect();

        var LP2_Coordinates = lionPlayer2.getBoundingClientRect();

        var LP3_Coordinates = lionPlayer3.getBoundingClientRect();

        var LP4_Coordinates = lionPlayer4.getBoundingClientRect();

        // Display
        if (groupMembership == "Tiger") {

            var ingroupEmoji = document.createElement("img");
            ingroupEmoji.src = getKeyByValue(image_src_map, specificTigerPlayerReaction);

            if (specificTigerPlayerDisplayed == "tigerPlayer1ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + TP1_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";

            } else if (specificTigerPlayerDisplayed == "tigerPlayer3ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + TP3_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";

            } else if (specificTigerPlayerDisplayed == "tigerPlayer4ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + TP4_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";
            };

            var outgroupEmoji = document.createElement("img");
            outgroupEmoji.src = getKeyByValue(image_src_map, specificLionPlayerReaction);

            if (specificLionPlayerDisplayed == "lionPlayer1ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + LP1_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";

            } else if (specificLionPlayerDisplayed == "lionPlayer2ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + LP2_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";

            } else if (specificLionPlayerDisplayed == "lionPlayer3ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + LP3_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";
            };

         } else if (groupMembership == "Lion") {

            var ingroupEmoji = document.createElement("img");
            ingroupEmoji.src = getKeyByValue(image_src_map, specificLionPlayerReaction);

            if (specificLionPlayerDisplayed == "lionPlayer1ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + LP1_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";

            } else if (specificLionPlayerDisplayed == "lionPlayer3ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + LP3_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";

            } else if (specificLionPlayerDisplayed == "lionPlayer4ID") {
                ingroupEmoji.style.position = "absolute";
                ingroupEmoji.style.left = "" + LP4_Coordinates.left + "px";
                ingroupEmoji.style.top = "" + 0 + "px";
            };

            var outgroupEmoji = document.createElement("img");
            outgroupEmoji.src = getKeyByValue(image_src_map, specificTigerPlayerReaction);

            if (specificTigerPlayerDisplayed == "tigerPlayer1ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + TP1_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";

            } else if (specificTigerPlayerDisplayed == "tigerPlayer2ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + TP2_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";

            } else if (specificTigerPlayerDisplayed == "tigerPlayer3ID") {
                outgroupEmoji.style.position = "absolute";
                outgroupEmoji.style.left = "" + TP3_Coordinates.left + "px";
                outgroupEmoji.style.top = "" + 0 + "px";
            };

        };

        displayedEmojiImagesSize = calculateAspectRatioFit(527, 508, TP3_Coordinates.width, TP3_Coordinates.height);

        ingroupEmoji.width = displayedEmojiImagesSize.width;
        ingroupEmoji.height = displayedEmojiImagesSize.height;

        outgroupEmoji.width = displayedEmojiImagesSize.width;
        outgroupEmoji.height = displayedEmojiImagesSize.height;

        // Display single reactions
        if (randTeamPosition < 0.50) {
            $('#oneGroupReactions').html(ingroupEmoji);
            $('#otherGroupReactions').html(outgroupEmoji);

        } else if (randTeamPosition >= 0.50) {
            $('#oneGroupReactions').html(outgroupEmoji);
            $('#otherGroupReactions').html(ingroupEmoji);
        }

        $('#oneGroupReactions').show();
        $('#otherGroupReactions').show();

        dimMidScreen();

        setTimeout(function(){
            $('#oneGroupReactions').fadeOut(500);
            $('#gameOutcomeMoved').fadeOut(500);
            $('#otherGroupReactions').fadeOut(500);

            // Unmark player
            unmarkInactivePlayer(activePlayer);

            nextTrialNum = trialNum + 1;
            nextPlayer = playerOrder[nextTrialNum - 1];

            setTimeout(function(){

                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();

                undimMidScreen();

                checkToContinue(currentGroupMembership, nextPlayer, nextTrialNum);
            }, 600);
        }, 4000);
    };


    ////////// PARTICIPANT //////////

    // GAME CHOICE, BUT WHEN IT'S PARTICIPANT'S TURN
    // TO SAVE: WHICH CARD WAS CHOSEN AND AFTER HOW LONG?
    function gameChoiceParticipant(activePlayer, trialNum) {

        startTimeCardChoice = new Date().getTime();

        // Mark participant as active
        markActivePlayer(activePlayer); 

        // Remove canvas
        removeCanvas();

        // Create new divs
        CreateDiv('sectionTop', 'cardChoiceMessage');
        CreateDiv('sectionMiddle', 'cardSelection');

        // Adding the flashing message
        var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Select one of the four cards below...</p>' 
        $('#cardChoiceMessage').html(choosingCardsMessage);
        $('#cardChoiceMessage').show();

        // Adding clickable images

        // Adjust image size 
        cardSize = calculateAspectRatioFit(1452, 1457, midDiv.clientWidth / 5, midDiv.clientHeight);

        // Create div to store clickable cards
        cardImages = document.createElement("div");
        cardImages.id = "cardImageContainer";
    
        // Specify each individual card - Width & height
        pinkCard.width = cardSize.width;
        pinkCard.height = cardSize.height;

        grayCard.width = cardSize.width;
        grayCard.height = cardSize.height;

        purpleCard.width = cardSize.width;
        purpleCard.height = cardSize.height;

        orangeCard.width = cardSize.width;
        orangeCard.height = cardSize.height;

        var shuffledClickableCards = shuffle(clickableCards);

        cardImages.appendChild(shuffledClickableCards[0]);
        cardImages.appendChild(shuffledClickableCards[1]);
        cardImages.appendChild(shuffledClickableCards[2]);
        cardImages.appendChild(shuffledClickableCards[3]);

        $('#cardSelection').html(cardImages);
        $('#cardSelection').show();
        
        $('#pinkCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "pinkCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipant(activePlayer, trialNum);
                }, 600);
            };
        });

        $('#grayCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "grayCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipant(activePlayer, trialNum);
                }, 600);
            };
        });

        $('#orangeCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "orangeCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipant(activePlayer, trialNum);
                }, 600);
            };
        });

        $('#purpleCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "purpleCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipant(activePlayer, trialNum);
                }, 600);
            };
        });
    };

    // GAME OUTCOME, BUT WHEN IT'S PARTICIPANT'S TURN
    // TO SAVE: ACTIVE PLAYER, TRIAL NUMBER, TRIAL OUTCOME (LOSS/VICTORY), TRIAL OUTCOME RT, COMPUTER & PLAYER NUMBERS, BLOCK, DISPLAY DELAY, DISPLAYED PLAYERS & THEIR REACTIONS
    function gameOutcomeParticipant(activePlayer, trialNum) {

        displayCanvas();

        // Random number from 0 to 1 will determine the outcome
        var randPosition = Math.random(); 

        imagePlayerSize = calculateAspectRatioFit(1457, 1457, newCanvas.width / 5, newCanvas.clientHeight);

        // Randomly select a computer outcome
        cardSelectorComp = randomIntFromInterval(1, 13);
        specificComputerNumber = cardValues[cardSelectorComp]; 

        // Display outcome
        CreateDiv('sectionTop', 'gameOutcome'); 

        // Create a copy of cardValues array - You can't splice card values directly, it will delete elements!!!!
        cardValuesForSplicing = [...cardValues]; 

        // Computer wins with 50% probability
        if (randPosition < 0.50) { 
            var smallerCardValues = cardValuesForSplicing.splice(0, cardSelectorComp);
            var cardSelectorPlayerLose = randomIntFromInterval(0, smallerCardValues.length - 1);
            specificPlayerNumber = smallerCardValues[cardSelectorPlayerLose];
            outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">YOU LOST</span></p>';
            specificTrialOutcome = 'Loss';
        
        // Player wins with 50% probability
        } else if (randPosition >= 0.50) { 
            var largerCardValues = cardValuesForSplicing.splice(cardSelectorComp + 1);
            var cardSelectorPlayerWin = randomIntFromInterval(0, largerCardValues.length - 1);
            specificPlayerNumber = largerCardValues[cardSelectorPlayerWin];
            outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">YOU WON</span></p>';
            specificTrialOutcome = 'Victory';
        };

        $('#gameOutcome').html(outcomeMessage);
        $('#gameOutcome').show();

        endTimeOutcome = new Date().getTime();
        specificTrialOutcomeRT = calculateRT(startTimeCardChoice, endTimeOutcome);

        // Update canvas size in case window size is changed
        newCanvas.width = midDiv.clientWidth / 2;
        newCanvas.height = midDiv.clientHeight;

        // Computer outcome
        var ratio = 0.263; // Ratio serves to scale the text size
        ctx.fillStyle = 'LimeGreen';
        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificComputerNumber, newCanvas.width * 0.80, newCanvas.height * 0.6, newCanvas.width * 0.05);

        // Player outcome
        if (activePlayer.includes("tiger")) {
            ctx.fillStyle = 'orangeRed';
        } else if (activePlayer.includes("lion")) {
            ctx.fillStyle = 'Gold';
        };

        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificPlayerNumber, newCanvas.width * 0.17, newCanvas.height * 0.6, newCanvas.width * 0.05);

        setTimeout(function() {

            // Save information about the active player and the trial number
            trialNumbers.push(trialNum);
            trialPlayers.push(activePlayer);

            // Save information about the trial outcome as well as the specific computer/player number
            trialOutcomes.push(specificTrialOutcome);
            trialOutcomesRT.push(specificTrialOutcomeRT);
            playerNumbers.push(specificPlayerNumber);
            computerNumbers.push(specificComputerNumber);

            // To make it easier to clean the dataset later, add "Participant trial" to the outcome display arrays
            participantReactionsPublic.push("Participant trial")
            participantReactionsPublicRT.push("Participant trial")
            participantReactionsPublicIngroup.push("Participant trial")
            participantReactionsPublicIngroupRT.push("Participant trial")
            participantReactionsPublicOutgroup.push("Participant trial")
            participantReactionsPublicOutgroupRT.push("Participant trial")
            tigerPlayersDisplayed.push("Participant trial");
            lionPlayersDisplayed.push("Participant trial");
            tigerPlayersReactions.push("Participant trial");
            lionPlayersReactions.push("Participant trial");

            // Save which block is this trial a part of
            taskBlock.push('Learning phase');

            // Clear numbers
            ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            // Waiting period until the next trial

            // First dim screen & hide canvas
            dimScreen();
            dimTopScreen();
            removeCanvas();

            // In the first seven trials, waiting period will last between 4 and 5 seconds
            if (trialNum <= 7) {
                waitTimeDisplay = randomIntFromInterval(4000, 5000);

            // From the eight trial onwards, waiting period will last between 3 and 4 seconds
            } else if (trialNum > 7) {
                waitTimeDisplay = randomIntFromInterval(3000, 4000);

            };

            setTimeout(function() {

                $('#gameOutcome').fadeOut(500);

                setTimeout(function() {

                    undimScreen();
                    undimTopScreen();

                    displayDelay.push(waitTimeDisplay);

                    // Unmark player
                    unmarkInactivePlayer(activePlayer);

                    nextTrialNum = trialNum + 1;
                    nextPlayer = playerOrder[nextTrialNum - 1];

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    checkToContinue(currentGroupMembership, nextPlayer, nextTrialNum);

                }, 500);

            }, waitTimeDisplay - 500);

        }, 2000);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // TEST PHASE

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // INTRO TO TEST PHASE
    // TO SAVE: NOTHING
    function introTestPhase() {

        // Timestamp when the testing phase started

        // Needed to calculate the duration of the test phase
        startTestBlock = Date.now();
        
        // Local time
        var localTimeStartTestBlock = new Date().getTime();
        var localDateStartTestBlock = new Date(localTimeStartTestBlock).toString();

        // UTC  time
        var utcDateStartTestBlock = new Date().toUTCString();
        
        // Store the last two variables
        var localTimeStartTestBlockToStore = [].concat(... new Array(91).fill(localDateStartTestBlock));
        dataELT.localTimeStartTestBlock = localTimeStartTestBlockToStore; 

        var utcTimeStartTestBlock = [].concat(... new Array(91).fill(utcDateStartTestBlock));
        dataELT.utcTimeStartTestBlock = utcTimeStartTestBlock; 

        CreateDiv('sectionTop', 'break');
        CreateDiv('sectionMiddle', 'newPlayers');
        CreateDiv('sectionBottom', 'timerTestPhase');

        // Break message
        var breakMessage = '<p class = "textIntro"> You have completed the first part of the task! </p>';
        $('#break').html(breakMessage);

        // New players
        var newPlayersMessage = '<p class = "textIntro"> After this short break, you will play a few more rounds of the game with <span class = "individualWords">the same members of the Lions and the Tigers</span>. </p>';
        $('#newPlayers').html(newPlayersMessage);


        // Timer
        var countdownTime60s = new Date().getTime() + 10000; 

        var x = setInterval(function() {

            var nowTime60s = new Date().getTime();
            var timeDistance60s = countdownTime60s - nowTime60s;
    
            var minutes1 = Math.floor((timeDistance60s % (1000 * 60 * 60)) / (1000 * 60));
            var seconds60 = Math.floor((timeDistance60s % (1000 * 60)) / 1000);

            var timer60s = '<p class = "textIntroNoMargin">' + minutes1 + 'm ' + seconds60 + 's </p>' 

            $('#timerTestPhase').html(timer60s);

            if (timeDistance60s < 300) {
                clearInterval(x);

                $('#timerTestPhase').fadeOut(400);

                setTimeout(function() {

                    CreateDiv('sectionBottom', 'buttonTestPhase');

                    // Create button

                    var startTestPhaseButton = document.createElement("BUTTON");
                    startTestPhaseButton.innerHTML = "Next";
                    startTestPhaseButton.className = "nextButtons";
                    startTestPhaseButton.id = "toTestPhase";

                    $('#buttonTestPhase').html(startTestPhaseButton);
            
                    // Once the button is clicked
                    $(document).on('click','#toTestPhase', function(){

                        $('#break').remove();
                        $('#newPlayers').remove();
                        $('#buttonTestPhase').remove();

                        $('#sectionTop').empty();
                        $('#sectionMiddle').empty();
                        $('#sectionBottom').empty();

                        InstructionsTestPhase(0);
                    });
                }, 500);          
            };
        });
    };

    // INSTRUCTIONS PAGE
    // TO SAVE: NOTHING
    function InstructionsTestPhase(pageNum){

        var numPages = 5;

        CreateDiv('sectionVeryTop', 'titleTestPhase');
        CreateDiv('sectionTop', 'informationTestPhasePart1');
        CreateDiv('sectionMiddle', 'informationTestPhasePart2');
        CreateDiv('sectionBottom', 'buttonSectionTestPhase');

        // Specifying unique content of each page
        switch (pageNum) {
            case 0:
                var titleTP;
                var InfoTP = "<p class = 'textIntro'> Please complete the rest of the task in <span class = 'individualWords'>full screen</span>.</p>"; 
                var InfoTP2 = '<p class = "textIntro">  If the task gets stuck at any point, please <span class = "individualWords">refrain from refreshing the page</span> as you might lose your progress. </p>';
                break;
            case 1:
                var titleTP = "<p class = 'textIntro'><span class = 'individualWords'>The same card game...</span></p>"; 
                var InfoTP = '<p class = "textIntro">You will now play a few more rounds of the <span class = "individualWords">same card game with the same members of the Lions and the Tigers</span> you interacted with in the first part of the task.</p>';
                var InfoTP2;
                break;
            case 2:
                var titleTP = "<p class = 'textIntro'><span class = 'individualWords'>...but with two twists!</span></p>"; 
                var InfoTP = "<p class = 'textIntro'> First, you will still be able to select <span class = 'individualWords'>emoji reactions</span> to game outcomes as before, but <span class = 'individualWords'>we will not display your and other players' reactions</span> after each game round. In other words, your emoji reactions are completely <span class = 'individualWords'>private</span> and won't be seen by other players in the game.</p>";
                var InfoTP2;
                break;
            case 3:
                var titleTP = "<p class = 'textIntro'><span class = 'individualWords'>...but with two twists!</span></p>"; 
                var InfoTP = "<p class = 'textIntro'> Second, <span class = 'individualWords'>we will no longer ask you to predict how other members of Lions and Tigers will react to game outcomes</span>. In other words, in this part, we will only ask you to select <span class = 'individualWords'>your own emoji reactions</span> to game outcomes.</p>";
                var InfoTP2;
                break;
            case 4:
                var titleTP = "<p class = 'textIntro'><span class = 'individualWords'>Please confirm that you have understood the changes in this section of the task.</span></p>";
                var InfoTP = "<p class='textIntro'><input type = 'checkbox' id = 'checkbox1'> <label for = 'checkbox1'>I understand that my responses in this section of the task are <span class = 'individualWords'>private</span>.</label></p>";
                var InfoTP2 = "<p class='textIntro'><input type = 'checkbox' id = 'checkbox2'> <label for = 'checkbox2'>I understand that I will only be asked about <span class = 'individualWords'>my own reactions to game outcomes</span>, and not about my predictions of other players' reactions.</label></p>";
                break;
            case 5:
                var titleTP;
                var InfoTP = '<p class = "textIntro"> When you are ready, enter the game waiting room by clicking on the button <span class = "individualWords">Enter</span>.</p>';
                var InfoTP2 = '<p class = "textIntro">Since this game is played in <span class = "individualWords">real time</span>, you might need to wait for other players for a bit. </p>';
                break;
        };

        // Instructions page - Title
        $('#titleTestPhase').html(titleTP);
        $('#titleTestPhase').show();

        // Instructions page - Part 1
        $('#informationTestPhasePart1').html(InfoTP);
        $('#informationTestPhasePart1').show();

        // Instructions page - Part 2
        $('#informationTestPhasePart2').html(InfoTP2);
        $('#informationTestPhasePart2').show();

        // Buttons
        var ButtonsTP = '<div class = "divButtons"><input type="button" class="backButtons" id="backInstructionsTP" value="Back">\n\
        <input type="button" class="nextButtons" id="nextInstructionsTP" value="Next" >\n\
        <input type="button" class="nextButtons" id="nextWaitRoomTP" value="Enter" ></div>';

        $('#buttonSectionTestPhase').html(ButtonsTP);
        $('#buttonSectionTestPhase').show();

        // Hiding irrelevant buttons
        if (pageNum === 0) {
            $('#backInstructionsTP').hide();
        };

        if (pageNum === numPages) {
            $('#backInstructionsTP').hide();
            $('#nextInstructionsTP').hide();
        };

        if (pageNum < numPages) {
            $('#nextWaitRoomTP').hide();
        };

        if (pageNum === 4) {
            $('#nextInstructionsTP').hide(); // Initially hide the "Next" button
            $('input[type="checkbox"]').change(function() { // Event listener for checkbox changes
                if ($('#checkbox1').is(':checked') && $('#checkbox2').is(':checked')) { // If both checkboxes are checked
                    $('#nextInstructionsTP').show(); // Show the "Next" button
                } else {
                    $('#nextInstructionsTP').hide(); // Otherwise, keep it hidden
                }
            });
        };

        // What happens when each of the buttons is clicked?
        $('#backInstructionsTP').click(function() {
            if(!event.detail || event.detail == 1){
                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                $('#sectionVeryBottom').empty();
                InstructionsTestPhase(pageNum - 1);
            };
        });

        $('#nextInstructionsTP').click(function() {
            if(!event.detail || event.detail == 1){
                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                $('#sectionVeryBottom').empty();
                InstructionsTestPhase(pageNum + 1);
            };
        });

        $('#nextWaitRoomTP').click(function() {
            if(!event.detail || event.detail == 1){

                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                $('#sectionVeryBottom').empty();

                CreateDiv('sectionTop', 'joiningMessage');
                CreateDiv('sectionMiddle', 'loadingGifWaitRoom');
        
                // Joining messgae
                var join = '<p class = "flashText"> Joining the waiting room... </p>';

                // Loading gif
                var gif = document.createElement("img");
                gif.src = "assets/Loading.gif";

                loadingGifSize = calculateAspectRatioFit(300, 300, midDiv.clientWidth, midDiv.clientHeight);
                gif.width = loadingGifSize.width;
                gif.height = loadingGifSize.height;

                // Adding both to divs
                $('#joiningMessage').html(join);
                $('#loadingGifWaitRoom').html(gif);

                // Go to the waiting room after a certain time
                var waitTimeEnterWR = randomIntFromInterval(1300, 1800); 
                setTimeout(function(){ $("#joiningMessage").fadeOut(500); }, waitTimeEnterWR); 
                setTimeout(function(){ $("#loadingGifWaitRoom").fadeOut(500); }, waitTimeEnterWR); 
                setTimeout(function() {waitRoomTP(currentGroupMembership)}, waitTimeEnterWR + 500);
            };
        });
    };

    // WAITING ROOM PAGE
    // TO SAVE: NOTHING
    function waitRoomTP(groupMembership) {

        CreateDiv('sectionTop', 'message');
        CreateDiv('sectionMiddle', 'message2');

        playerImagesSizeTP = calculateAspectRatioFit(1457, 1457, veryTopDiv.clientWidth / 4, veryTopDiv.clientHeight);

        // Ingroup players
        if (groupMembership == "Tiger") {

            ingroupPlayersImages = document.createElement("div");
            ingroupPlayersImages.id = "ingroupPlayers";

            // Specify width, height & class
            tigerPlayer1TP.width = playerImagesSizeTP.width;
            tigerPlayer1TP.height = playerImagesSizeTP.height;
            tigerPlayer1TP.className = "ingroupPlayersClass";

            tigerPlayer2TP.width = playerImagesSizeTP.width;
            tigerPlayer2TP.height = playerImagesSizeTP.height;
            tigerPlayer2TP.className = "ingroupPlayersClass";

            tigerPlayer3TP.width = playerImagesSizeTP.width;
            tigerPlayer3TP.height = playerImagesSizeTP.height;
            tigerPlayer3TP.className = "ingroupPlayersClass";

            tigerPlayer4TP.width = playerImagesSizeTP.width;
            tigerPlayer4TP.height = playerImagesSizeTP.height;
            tigerPlayer4TP.className = "ingroupPlayersClass";

            ingroupPlayersImages.appendChild(tigerPlayer1TP);
            ingroupPlayersImages.appendChild(tigerPlayer2TP);
            ingroupPlayersImages.appendChild(tigerPlayer3TP);
            ingroupPlayersImages.appendChild(tigerPlayer4TP);

        } else if (groupMembership == "Lion"){

            ingroupPlayersImages = document.createElement("div");
            ingroupPlayersImages.id = "ingroupPlayers";

            // Specify width, height & class
            lionPlayer1TP.width = playerImagesSizeTP.width;
            lionPlayer1TP.height = playerImagesSizeTP.height;
            lionPlayer1TP.className = "ingroupPlayersClass";

            lionPlayer2TP.width = playerImagesSizeTP.width;
            lionPlayer2TP.height = playerImagesSizeTP.height;
            lionPlayer2TP.className = "ingroupPlayersClass";

            lionPlayer3TP.width = playerImagesSizeTP.width;
            lionPlayer3TP.height = playerImagesSizeTP.height;
            lionPlayer3TP.className = "ingroupPlayersClass";

            lionPlayer4TP.width = playerImagesSizeTP.width;
            lionPlayer4TP.height = playerImagesSizeTP.height;
            lionPlayer4TP.className = "ingroupPlayersClass";

            ingroupPlayersImages.appendChild(lionPlayer1TP);
            ingroupPlayersImages.appendChild(lionPlayer2TP);
            ingroupPlayersImages.appendChild(lionPlayer3TP);
            ingroupPlayersImages.appendChild(lionPlayer4TP);
              
        };

        // Outgroup players
        if (groupMembership == "Lion") {

            outgroupPlayersImages = document.createElement("div");
            outgroupPlayersImages.id = "outgroupPlayers";

            // Specify width, height & class
            tigerPlayer1TP.width = playerImagesSizeTP.width;
            tigerPlayer1TP.height = playerImagesSizeTP.height;
            tigerPlayer1TP.className = "outgroupPlayersClass";

            tigerPlayer2TP.width = playerImagesSizeTP.width;
            tigerPlayer2TP.height = playerImagesSizeTP.height;
            tigerPlayer2TP.className = "outgroupPlayersClass";

            tigerPlayer3TP.width = playerImagesSizeTP.width;
            tigerPlayer3TP.height = playerImagesSizeTP.height;
            tigerPlayer3TP.className = "outgroupPlayersClass";

            tigerPlayer4TP.width = playerImagesSizeTP.width;
            tigerPlayer4TP.height = playerImagesSizeTP.height;
            tigerPlayer4TP.className = "outgroupPlayersClass";

            outgroupPlayersImages.appendChild(tigerPlayer1TP);
            outgroupPlayersImages.appendChild(tigerPlayer2TP);
            outgroupPlayersImages.appendChild(tigerPlayer3TP);
            outgroupPlayersImages.appendChild(tigerPlayer4TP);
        
        } else if (groupMembership == "Tiger"){

            outgroupPlayersImages = document.createElement("div");
            outgroupPlayersImages.id = "outgroupPlayers";

            // Specify width, height & class
            lionPlayer1TP.width = playerImagesSizeTP.width;
            lionPlayer1TP.height = playerImagesSizeTP.height;
            lionPlayer1TP.className = "outgroupPlayersClass";

            lionPlayer2TP.width = playerImagesSizeTP.width;
            lionPlayer2TP.height = playerImagesSizeTP.height;
            lionPlayer2TP.className = "outgroupPlayersClass";

            lionPlayer3TP.width = playerImagesSizeTP.width;
            lionPlayer3TP.height = playerImagesSizeTP.height;
            lionPlayer3TP.className = "outgroupPlayersClass";

            lionPlayer4TP.width = playerImagesSizeTP.width;
            lionPlayer4TP.height = playerImagesSizeTP.height;
            lionPlayer4TP.className = "outgroupPlayersClass";

            outgroupPlayersImages.appendChild(lionPlayer1TP);
            outgroupPlayersImages.appendChild(lionPlayer2TP);
            outgroupPlayersImages.appendChild(lionPlayer3TP);
            outgroupPlayersImages.appendChild(lionPlayer4TP);
        };

        if (randTeamPosition < 0.50) {
            $('#sectionVeryTop').html(ingroupPlayersImages);
            $('#sectionVeryBottom').html(outgroupPlayersImages);

        } else if (randTeamPosition >= 0.50) {
            $('#sectionVeryTop').html(outgroupPlayersImages);
            $('#sectionVeryBottom').html(ingroupPlayersImages);

        };

        // Messages
        var wait = '<p class = "flashTextNoMargin"> Waiting for other players to finish the instructions... </p>';

        $('#message').html(wait);

        var countdownTime = new Date().getTime() + 10000; 

        // The function below will execute each second
        var x = setInterval(function() {

            var nowTime = new Date().getTime();
            var timeDistance = countdownTime - nowTime;

            if (timeDistance < 9800) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("lionPlayer3TPID").src = "assets/activePlayerLion3.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("tigerPlayer3TPID").src = "assets/activePlayerTiger3.png";
                };
            };

            if (timeDistance < 7300) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("tigerPlayer3TPID").src = "assets/activePlayerTiger3.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("lionPlayer3TPID").src = "assets/activePlayerLion3.png";
                };
            };

            if (timeDistance < 1900) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("tigerPlayer1TPID").src = "assets/activePlayerTiger1.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("lionPlayer1TPID").src = "assets/activePlayerLion1.png";
                };
            };

            if (timeDistance < 1700) { 
                if (groupMembership == "Tiger") {
                    document.getElementById("lionPlayer2TPID").src = "assets/activePlayerLion2.png";
                } else if (groupMembership == "Lion"){
                    document.getElementById("tigerPlayer2TPID").src = "assets/activePlayerTiger2.png";
                };
            };
        
            if (timeDistance < 200) {
                clearInterval(x);
                setTimeout(function() {
                    $('#message').html(startGame);
                    $('#message2').html(startButton);
                }, 500);
            };
        });      
        
        // Start message & button - Displayed after the timer
        var startGame = '<p class = "textIntroNoMargin"> You can start the game now! </p>';

        var startButton = document.createElement("BUTTON");
        startButton.innerHTML = "Start";
        startButton.className = "nextButtons";
        startButton.id = "toGameTP";

        // Once the button is clicked
        $(document).on('click','#toGameTP', function(){
            $('#sectionTop').empty();
            $('#sectionMiddle').empty();
            $('#sectionBottom').empty();
            gameStartTP();
        });
    };
    
    // GAME START 
    // TO SAVE: NOTHING
    function gameStartTP() {
        CreateDiv('sectionTop', 'startingGame');
        CreateDiv('sectionMiddle', 'timerStartingGame');

        // Starting message
        var starting = '<p class = "flashTextNoMargin"> Starting the game... </p>';
        $('#startingGame').html(starting);

        // Timer
        var countdownTime3s = new Date().getTime() + 2000; 

        var x = setInterval(function() {

            var nowTime3s = new Date().getTime();
            var timeDistance3s = countdownTime3s - nowTime3s;
    
            var minutes0 = Math.floor((timeDistance3s % (1000 * 60 * 60)) / (1000 * 60));
            var seconds3 = Math.floor((timeDistance3s % (1000 * 60)) / 1000);

            var timer3s = '<p class = "textIntroNoMargin">' + minutes0 + 'm ' + seconds3 + 's </p>' 

            $('#timerStartingGame').html(timer3s);

            if (timeDistance3s < 300) {
                clearInterval(x);
                $('#startingGame').fadeOut(400);
                $('#timerStartingGame').fadeOut(400);

                setTimeout(function() {

                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();

                    // Create playfield (canvas)
                    createPlayfield();
                    
                    checkToContinueTP(currentGroupMembership, startingTrialPlayerTP, startingTrialNumberTP);
                }, 500);
            };
        });            
    };

    // From here, different functions are looping.

    ////////// GENERAL CHECK FUNCTION //////////
    function checkToContinueTP(groupMembership, activePlayer, trialNumTP) {

        if (trialNumTP <= numTrialsTP) {

            if (groupMembership == 'Tiger' && activePlayer != 'tigerPlayer2TPID') {
                gameChoiceNotParticipantTP(activePlayer, trialNumTP);
            } else if (groupMembership == 'Tiger' && activePlayer == 'tigerPlayer2TPID') {
                gameChoiceParticipantTP(activePlayer, trialNumTP);
            } else if (groupMembership == 'Lion' && activePlayer != 'lionPlayer2TPID') {
                gameChoiceNotParticipantTP(activePlayer, trialNumTP);
            } else if (groupMembership == 'Lion' && activePlayer == 'lionPlayer2TPID') {
                gameChoiceParticipantTP(activePlayer, trialNumTP);
            };

        } else if (trialNumTP > numTrialsTP) {

            // Timestamp when the test phase ended
            
            // Local time
            var localTimeTestBlockEnd = new Date().getTime();
            var localDateTestBlockEnd = new Date(localTimeTestBlockEnd).toString();

            // UTC time
            var utcDateTestBlockEnd = new Date().toUTCString();

            // Duration of the test block
            endTestBlock = Date.now();
            var timeTestBlock = msToMinSec(endTestBlock - startTestBlock);

            // Store the last three variables
            var localTimeEndTestBlock = [].concat(... new Array(91).fill(localDateTestBlockEnd));
            dataELT.localTimeEndTestBlock = localTimeEndTestBlock; 

            var utcTimeEndTestBlock = [].concat(... new Array(91).fill(utcDateTestBlockEnd));
            dataELT.utcTimeEndTestBlock = utcTimeEndTestBlock; 

            var testBlockDuration = [].concat(... new Array(91).fill(timeTestBlock));
            dataELT.testBlockDuration = testBlockDuration; 

            // Trial info 
            dataELT.taskBlock = taskBlock;
            dataELT.trialNumbers = trialNumbers; 
            dataELT.trialPlayers = trialPlayers; 
            dataELT.trialOutcomes = trialOutcomes;
            dataELT.trialOutcomesRT = trialOutcomesRT;
            dataELT.playerNumbers = playerNumbers;
            dataELT.computerNumbers = computerNumbers;

            // Trial info when the active player is the participant
            dataELT.participantSelectedCards = participantSelectedCards;
            dataELT.participantSelectedCardsRT = participantSelectedCardsRT;

            // Participants' reactions
            dataELT.participantReactionsPublic = participantReactionsPublic;
            dataELT.participantReactionsPublicRT = participantReactionsPublicRT;

            // Participants' predictions
            dataELT.participantPredictionsIngroup = participantReactionsPublicIngroup;
            dataELT.participantPredictionsIngroupRT = participantReactionsPublicIngroupRT;
            dataELT.participantPredictionsOutgroup = participantReactionsPublicOutgroup;
            dataELT.participantPredictionsOutgroupRT = participantReactionsPublicOutgroupRT;

            // Display of outcome reactions
            dataELT.tigerPlayersDisplayed = tigerPlayersDisplayed;
            dataELT.tigerPlayersReactions = tigerPlayersReactions;
            dataELT.lionPlayersDisplayed = lionPlayersDisplayed;
            dataELT.lionPlayersReactions = lionPlayersReactions;
            dataELT.displayDelay = displayDelay;

            // At the very end, players' images in VeryTop and VeryBottom sections need to be removed
            $('#ingroupPlayers').fadeOut(500); 
            $('#outgroupPlayers').fadeOut(500);

            setTimeout(function() {

                $('#sectionVeryTop').empty();
                $('#sectionTop').empty();
                $('#sectionMiddle').empty();
                $('#sectionBottom').empty();
                $('#sectionVeryBottom').empty();

                exitingGamePage();

            }, 600);

        };
    }; 

    ////////// NOT PARTICIPANT //////////

    // GAME CHOICE 
    // TO SAVE: NOTHING  
    function gameChoiceNotParticipantTP(activePlayer, trialNumTP) {

        startTimeChoice = new Date().getTime();

        // Since you hide the canvas for participants to choose the emoji, return it here
        if (trialNumTP > 1) {
            displayCanvas();
        };

        // Adding the red rectangle to the player who is playing
        var player = document.getElementById(activePlayer);

        // Check if the current player is the inactive outgroup player. If so, this code is executed:
        // [ATTENTION: THIS CHUNK OF CODE IS NEVER EXECUTED!]
        if (player.classList.contains("outgroupPlayersClass") && activePlayer == "tigerPlayer4TPID" || player.classList.contains("outgroupPlayersClass") && activePlayer == "lionPlayer4TPID") {

            markActivePlayer(activePlayer); 

            // Leave a mark for 1000 ms
            setTimeout(function() {

                unmarkInactivePlayer(activePlayer);

                // Move onto the next player
                inactivePlayerIndex = playerOrderTP.indexOf(activePlayer);
                nextPlayerAfterInactive = playerOrderTP[inactivePlayerIndex + 1];

                removeCanvas();

                $('#sectionMiddle').empty();

                checkToContinueTP(currentGroupMembership, nextPlayerAfterInactive, trialNumTP); 

            }, 1000);

        // If the current player is not the inactive outgroup player, this code is executed:
        } else {

            markActivePlayer(activePlayer); 

            // Create div
            CreateDiv('sectionTop', 'cardChoiceIngroupReactions');

            // Update canvas size in case window size is changed
            newCanvas.width = midDiv.clientWidth / 2;
            newCanvas.height = midDiv.clientHeight;

            // Adjust image size to the canvas
            imagePlayerSize = calculateAspectRatioFit(1457, 1457, newCanvas.width / 5, newCanvas.clientHeight);

            // Adding the appropriate image on the canvas
            if (activePlayer.includes("tiger")) {
                var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Player T' + activePlayer.substr(activePlayer.length - 5, 1) + ' selecting the card...</p>' 
                ctx.drawImage(imagePlayerTiger, newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            } else if (activePlayer.includes("lion")) {
                var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Player L' + activePlayer.substr(activePlayer.length - 5, 1) + ' selecting the card...</p>'
                ctx.drawImage(imagePlayerLion, newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            };

            // Adding the computer image on the canvas
            ctx.drawImage(imageComputer, newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            // Adding a flashing message that the player is choosing a card
            $('#cardChoiceIngroupReactions').html(choosingCardsMessage);
            $('#cardChoiceIngroupReactions').show();

            // Selection of cards will last between 1.6 and 3 seconds
            var waitTimeCardSelection = randomIntFromInterval(1600,3000);

            setTimeout(function(){ 
                $('#cardChoiceIngroupReactions').fadeOut(400);
            }, waitTimeCardSelection);

            setTimeout(function(){
                $('#sectionTop').empty();
                gameOutcomeNotParticipantTP(activePlayer, trialNumTP); 
            }, waitTimeCardSelection + 500);
        };
    };

    // GAME OUTCOME (OTHER INGROUP AND OUTGROUP PARTICIPANTS)
    // TO SAVE: ACTIVE PLAYER, TRIAL NUMBER, TRIAL OUTCOME (LOSS/VICTORY), TRIAL OUTCOME RT, COMPUTER & PLAYER NUMBERS, BLOCK
    function gameOutcomeNotParticipantTP(activePlayer, trialNumTP) {

        // Randomly select a computer outcome
        cardSelectorComp = randomIntFromInterval(1, 13);
        specificComputerNumber = cardValues[cardSelectorComp]; 

        // Display outcome
        CreateDiv('sectionTop', 'gameOutcome'); 

        // Create a copy of cardValues array - You can't splice card values directly, it will delete elements!!!!
        cardValuesForSplicing = [...cardValues]; 

        // Computer wins on 50% of trials
        if (orderOutcomesShuffled[trialNumTP - 1] == "Loss") { 
            var smallerCardValues = cardValuesForSplicing.splice(0, cardSelectorComp);
            var cardSelectorPlayerLose = randomIntFromInterval(0, smallerCardValues.length - 1);
            specificPlayerNumber = smallerCardValues[cardSelectorPlayerLose];

            if (activePlayer.includes("tiger")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">PLAYER T' + activePlayer.substr(activePlayer.length - 5, 1) + ' LOST</span></p>'; 
            } else if (activePlayer.includes("lion")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">PLAYER L' + activePlayer.substr(activePlayer.length - 5, 1) + ' LOST</span></p>'; 
            };

            specificTrialOutcome = 'Loss';

        // Player wins on 50% of trials
        } else if (orderOutcomesShuffled[trialNumTP - 1] == "Victory") { 
            var largerCardValues = cardValuesForSplicing.splice(cardSelectorComp + 1);
            var cardSelectorPlayerWin = randomIntFromInterval(0, largerCardValues.length - 1);
            specificPlayerNumber = largerCardValues[cardSelectorPlayerWin];

            if (activePlayer.includes("tiger")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">PLAYER T' + activePlayer.substr(activePlayer.length - 5, 1) + ' WON</span></p>'; 
            } else if (activePlayer.includes("lion")) {
                outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">PLAYER L' + activePlayer.substr(activePlayer.length - 5, 1) + ' WON</span></p>'; 
            };

            specificTrialOutcome = 'Victory';
        }; 

        $('#gameOutcome').html(outcomeMessage);
        $('#gameOutcome').show();

        endTimeOutcome = new Date().getTime();
        specificTrialOutcomeRT = calculateRT(startTimeChoice, endTimeOutcome)

        // Update canvas size in case window size is changed
        newCanvas.width = midDiv.clientWidth / 2;
        newCanvas.height = midDiv.clientHeight;

        // Remove images and display numbers instead
        ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
        ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

        // Computer outcome
        var ratio = 0.263; // Ratio serves to scale the text size
        ctx.fillStyle = 'LimeGreen';
        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificComputerNumber, newCanvas.width * 0.8, newCanvas.height * 0.6, newCanvas.width * 0.05);

        // Player outcome
        if (activePlayer.includes("tiger")) {
            ctx.fillStyle = 'OrangeRed';
        } else if (activePlayer.includes("lion")) {
            ctx.fillStyle = 'Gold';
        };

        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificPlayerNumber, newCanvas.width * 0.17, newCanvas.height * 0.6, newCanvas.width * 0.05);

        setTimeout(function() {

            // Save information about the active player and the trial number
            trialNumbers.push(trialNumTP);
            trialPlayers.push(activePlayer);

            // Save information about the trial outcome as well as the specific computer/player number
            trialOutcomes.push(specificTrialOutcome);
            trialOutcomesRT.push(specificTrialOutcomeRT);
            playerNumbers.push(specificPlayerNumber);
            computerNumbers.push(specificComputerNumber);

            // To make it easier to merge data later, all trials where participant is not an active player will have the "Non-participant trial" message
            specificParticipantSelectedCard = "Non-participant trial";
            specificParticipantSelectedCardRT = "Non-participant trial";
            participantSelectedCards.push(specificParticipantSelectedCard);
            participantSelectedCardsRT.push(specificParticipantSelectedCardRT); 

            // Save that you are in the test block
            taskBlock.push('Test phase');

            // Clear numbers
            ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            removeCanvas();

            outcomeReactionChoiceNotParticipantPublicTP(activePlayer, trialNumTP);

        }, 2000);
    };

    // OUTCOME REACTION CHOICE (NOT PARTICIPANT)
    // TO SAVE: REACTION TIME, RESPONSE
    function outcomeReactionChoiceNotParticipantPublicTP(activePlayer, trialNumTP){

        startTimeEmojiChoiceSelf = new Date().getTime();
        
        // First dim screen & hide canvas
        dimScreen();
        removeCanvas();

        // Create divs
        CreateDiv('sectionMiddle', 'emotionalReactionsPrompt');
        CreateDiv('sectionBottom', 'emotionalReactions');

        var emojiReaction = "<p class = 'textInstructions' id = 'emojiPrompt'>How do <span class = 'individualWords'>you</span> feel because of this player's outcome?</p>";

        $('#emotionalReactionsPrompt').html(emojiReaction);
        $('#emotionalReactionsPrompt').show();
        
        // Display emojis (Defined in the beginning)
        // Note: .show() needs to be included so that you can display the emoji scale on multiple trials without it being deleted by .fadeOut()        
        emojiImagesSize = calculateAspectRatioFit(527, 508, midDiv.clientWidth / 3, midDiv.clientHeight);

        emojiImages = document.createElement("div");
        emojiImages.id = "emojiReactions";

        // Specify each individual emoji - Width & height 
        emoji1.width = emojiImagesSize.width;
        emoji1.height = emojiImagesSize.height;

        emoji2.width = emojiImagesSize.width;
        emoji2.height = emojiImagesSize.height;

        emoji3.width = emojiImagesSize.width;
        emoji3.height = emojiImagesSize.height;
  
        // Determine which two emojis will be presented as options depending on the outcome
        if (specificTrialOutcome == "Victory") {
            emojiImages.appendChild(emoji2);
            emojiImages.appendChild(emoji3);
        } else if (specificTrialOutcome == "Loss") {
            emojiImages.appendChild(emoji1);
            emojiImages.appendChild(emoji2);
        };

        $('#emotionalReactions').html(emojiImages);
        $('#emotionalReactions').show();

        var waitTimeToContinue = randomIntFromInterval(900, 2300);

        nextTrialNumTP = trialNumTP + 1;
        nextPlayerTP = playerOrderTP[nextTrialNumTP - 1];

        // What happens when each of the emojis is clicked?
        $('#valence1').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);

                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').fadeOut(500);

                specificParticipantReaction = image_id_map["valence1"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                displayDelay.push(waitTimeToContinue);

                //  Add content to other variables that do not have trial-by-trial values
                participantReactionsPublicIngroup.push('No prediction');
                participantReactionsPublicIngroupRT.push('No prediction'); 
                participantReactionsPublicOutgroup.push('No prediction');
                participantReactionsPublicOutgroupRT.push('No prediction');

                tigerPlayersDisplayed.push('No display');
                tigerPlayersReactions.push('No display');
                lionPlayersDisplayed.push('No display');
                lionPlayersReactions.push('No display');

                setTimeout(function() {

                    undimScreen();

                    // Clean screen
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    // Unmark player
                    unmarkInactivePlayer(activePlayer);
                    checkToContinueTP(currentGroupMembership, nextPlayerTP, trialNumTP + 1);

                }, waitTimeToContinue);
            };
        }); 

        $('#valence2').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);

                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').fadeOut(500);

                specificParticipantReaction = image_id_map["valence2"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                displayDelay.push(waitTimeToContinue);

                //  Add content to other variables that do not have trial-by-trial values
                participantReactionsPublicIngroup.push('No prediction');
                participantReactionsPublicIngroupRT.push('No prediction'); 
                participantReactionsPublicOutgroup.push('No prediction');
                participantReactionsPublicOutgroupRT.push('No prediction');

                tigerPlayersDisplayed.push('No display');
                tigerPlayersReactions.push('No display');
                lionPlayersDisplayed.push('No display');
                lionPlayersReactions.push('No display');

                setTimeout(function() {

                    undimScreen();

                    // Clean screen
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    // Unmark player
                    unmarkInactivePlayer(activePlayer);
                    checkToContinueTP(currentGroupMembership, nextPlayerTP, trialNumTP + 1);

                }, waitTimeToContinue);
            };
        }); 

        $('#valence3').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeEmojiChoiceSelf = new Date().getTime();
                specificParticipantReactionRT = calculateRT(startTimeEmojiChoiceSelf, clickTimeEmojiChoiceSelf);

                $('#emotionalReactionsPrompt').empty();
                $('#emotionalReactions').empty();
                $('#gameOutcome').fadeOut(500);

                specificParticipantReaction = image_id_map["valence3"];
                participantReactionsPublic.push(specificParticipantReaction);
                participantReactionsPublicRT.push(specificParticipantReactionRT);

                displayDelay.push(waitTimeToContinue);

                //  Add content to other variables that do not have trial-by-trial values
                participantReactionsPublicIngroup.push('No prediction');
                participantReactionsPublicIngroupRT.push('No prediction'); 
                participantReactionsPublicOutgroup.push('No prediction');
                participantReactionsPublicOutgroupRT.push('No prediction');

                tigerPlayersDisplayed.push('No display');
                tigerPlayersReactions.push('No display');
                lionPlayersDisplayed.push('No display');
                lionPlayersReactions.push('No display');

                setTimeout(function() {

                    undimScreen();

                    // Clean screen
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    // Unmark player
                    unmarkInactivePlayer(activePlayer);
                    checkToContinueTP(currentGroupMembership, nextPlayerTP, trialNumTP + 1);

                }, waitTimeToContinue);
            };
        }); 
    };

    ////////// PARTICIPANT //////////

    // GAME CHOICE, BUT WHEN IT'S PARTICIPANT'S TURN
    // TO SAVE: WHICH CARD WAS CHOSEN AND AFTER HOW LONG?
    function gameChoiceParticipantTP(activePlayer, trialNumTP) {

        startTimeCardChoice = new Date().getTime();

        // Mark participant as active
        markActivePlayer(activePlayer); 

        // Remove canvas
        removeCanvas();

        // Create new divs
        CreateDiv('sectionTop', 'cardChoiceMessage');
        CreateDiv('sectionMiddle', 'cardSelection');

        // Adding the flashing message
        var choosingCardsMessage = '<p class = "flashTextNoMargin" id = "cardChoice">Select one of the four cards below...</p>' 
        $('#cardChoiceMessage').html(choosingCardsMessage);
        $('#cardChoiceMessage').show();

        // Adding clickable images

        // Adjust image size 
        cardSize = calculateAspectRatioFit(1452, 1457, midDiv.clientWidth / 5, midDiv.clientHeight);

        // Create div to store clickable cards
        cardImages = document.createElement("div");
        cardImages.id = "cardImageContainer";
    
        // Specify each individual card - Width & height
        pinkCard.width = cardSize.width;
        pinkCard.height = cardSize.height;

        grayCard.width = cardSize.width;
        grayCard.height = cardSize.height;

        purpleCard.width = cardSize.width;
        purpleCard.height = cardSize.height;

        orangeCard.width = cardSize.width;
        orangeCard.height = cardSize.height;

        var shuffledClickableCards = shuffle(clickableCards);

        cardImages.appendChild(shuffledClickableCards[0]);
        cardImages.appendChild(shuffledClickableCards[1]);
        cardImages.appendChild(shuffledClickableCards[2]);
        cardImages.appendChild(shuffledClickableCards[3]);

        $('#cardSelection').html(cardImages);
        $('#cardSelection').show();
        
        $('#pinkCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "pinkCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipantTP(activePlayer, trialNumTP);
                }, 600);
            };
        });

        $('#grayCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "grayCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipantTP(activePlayer, trialNumTP);
                }, 600);
            };
        });

        $('#orangeCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "orangeCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipantTP(activePlayer, trialNumTP);
                }, 600);
            };
        });

        $('#purpleCardClickable').click(function() {
            if(!event.detail || event.detail == 1){
                clickTimeCardChoice = new Date().getTime();
                specificParticipantSelectedCardRT = calculateRT(startTimeCardChoice, clickTimeCardChoice);
                specificParticipantSelectedCard = "purpleCard";
                participantSelectedCards.push(specificParticipantSelectedCard);
                participantSelectedCardsRT.push(specificParticipantSelectedCardRT);
                $('#cardChoiceMessage').empty();
                $('#cardSelection').empty();
                setTimeout(function(){
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();
                    gameOutcomeParticipantTP(activePlayer, trialNumTP);
                }, 600);
            };
        });
    };

    // GAME OUTCOME, BUT WHEN IT'S PARTICIPANT'S TURN
    // TO SAVE: ACTIVE PLAYER, TRIAL NUMBER, TRIAL OUTCOME (LOSS/VICTORY), TRIAL OUTCOME RT, COMPUTER & PLAYER NUMBERS, BLOCK
    function gameOutcomeParticipantTP(activePlayer, trialNumTP) {

        displayCanvas();

        // Adjust image size to the canvas
        imagePlayerSize = calculateAspectRatioFit(1457, 1457, newCanvas.width / 5, newCanvas.clientHeight);

        // Randomly select a computer outcome
        cardSelectorComp = randomIntFromInterval(1, 13);
        specificComputerNumber = cardValues[cardSelectorComp]; 

        // Display outcome
        CreateDiv('sectionTop', 'gameOutcome'); 

        // Create a copy of cardValues array 
        cardValuesForSplicing = [...cardValues]; 

        // Computer wins on 50% of trials
        if (orderOutcomesShuffled[trialNumTP - 1] == "Loss") { 
            var smallerCardValues = cardValuesForSplicing.splice(0, cardSelectorComp);
            var cardSelectorPlayerLose = randomIntFromInterval(0, smallerCardValues.length - 1);
            specificPlayerNumber = smallerCardValues[cardSelectorPlayerLose];
            outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsRed">YOU LOST</span></p>';
            specificTrialOutcome = 'Loss';
        
        // Player wins on 50% of trials
        } else if (orderOutcomesShuffled[trialNumTP - 1] == "Victory") { 
            var largerCardValues = cardValuesForSplicing.splice(cardSelectorComp + 1);
            var cardSelectorPlayerWin = randomIntFromInterval(0, largerCardValues.length - 1);
            specificPlayerNumber = largerCardValues[cardSelectorPlayerWin];
            outcomeMessage = '<p class = "textIntroNoMargin" id = "cardChoice"><span class = "individualWordsGreen">YOU WON</span></p>';
            specificTrialOutcome = 'Victory';
        };

        $('#gameOutcome').html(outcomeMessage);
        $('#gameOutcome').show();

        endTimeOutcome = new Date().getTime();
        specificTrialOutcomeRT = calculateRT(startTimeCardChoice, endTimeOutcome);

        // Update canvas size in case window size is changed
        newCanvas.width = midDiv.clientWidth / 2;
        newCanvas.height = midDiv.clientHeight;

        // Computer outcome
        var ratio = 0.263; // Ratio serves to scale the text size
        ctx.fillStyle = 'LimeGreen';
        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificComputerNumber, newCanvas.width * 0.80, newCanvas.height * 0.6, newCanvas.width * 0.05);

        // Player outcome
        if (activePlayer.includes("tiger")) {
            ctx.fillStyle = 'orangeRed';
        } else if (activePlayer.includes("lion")) {
            ctx.fillStyle = 'Gold';
        };

        ctx.font = "bold " + (ratio * newCanvas.height) + "px Helvetica";
        ctx.textAlign = 'center';
        ctx.fillText(specificPlayerNumber, newCanvas.width * 0.17, newCanvas.height * 0.6, newCanvas.width * 0.05);

        setTimeout(function() {

            // Save information about the active player and the trial number
            trialNumbers.push(trialNumTP);
            trialPlayers.push(activePlayer);

            // Save information about the trial outcome as well as the specific computer/player number
            trialOutcomes.push(specificTrialOutcome);
            trialOutcomesRT.push(specificTrialOutcomeRT);
            playerNumbers.push(specificPlayerNumber);
            computerNumbers.push(specificComputerNumber);

            // Save that the block is test
            taskBlock.push('Test phase');

            //  Add content to other variables that do not have trial-by-trial values
            participantReactionsPublic.push('Participant trial');
            participantReactionsPublicRT.push('Participant trial');

            participantReactionsPublicIngroup.push('No prediction');
            participantReactionsPublicIngroupRT.push('No prediction'); 
            participantReactionsPublicOutgroup.push('No prediction');
            participantReactionsPublicOutgroupRT.push('No prediction');

            tigerPlayersDisplayed.push('No display');
            tigerPlayersReactions.push('No display');
            lionPlayersDisplayed.push('No display');
            lionPlayersReactions.push('No display');

            // Clear numbers
            ctx.clearRect(newCanvas.width * 0.1, 0, imagePlayerSize.width, imagePlayerSize.height);
            ctx.clearRect(newCanvas.width * 0.7, 0, imagePlayerSize.width, imagePlayerSize.height);

            // Waiting period until next trial

            // First dim screen & hide canvas
            dimScreen();
            dimTopScreen();
            removeCanvas();

            // How long will the participant wait until the next trial?
            var waitTimeToContinue = randomIntFromInterval(1800, 3200);

            setTimeout(function(){

                $('#gameOutcome').fadeOut(500);

                setTimeout(function(){

                    undimScreen();
                    undimTopScreen();

                    displayDelay.push(waitTimeToContinue);

                    // Unmark player
                    unmarkInactivePlayer(activePlayer);

                    // Select the next player
                    nextTrialNumTP = trialNumTP + 1;
                    nextPlayerTP = playerOrderTP[nextTrialNumTP - 1];

                    // Clean screen
                    $('#sectionTop').empty();
                    $('#sectionMiddle').empty();
                    $('#sectionBottom').empty();

                    // Switch to the next trial
                    checkToContinueTP(currentGroupMembership, nextPlayerTP, trialNumTP + 1);

                }, 500);

            }, waitTimeToContinue - 500);

        }, 2000);
    };

    // EXITING GAME PAGE    
    function exitingGamePage() {
        CreateDiv('sectionTop', 'goodbyeMessage');
        CreateDiv('sectionMiddle', 'exitingFlash');
        CreateDiv('sectionBottom', 'loadingGifEnd');

        var goodbye = '<p class = "textIntro"> You have reached the end of the first task! <br> The rest of the experiment should take you <span class = "individualWords">no longer than 10 minutes</span>.</p>';
        var exit = '<p class = "flashText"> Exiting the task... </p>';

        loadingGifSize = calculateAspectRatioFit(300, 300, midDiv.clientWidth, midDiv.clientHeight);
        gif.width = loadingGifSize.width;
        gif.height = loadingGifSize.height;

        $('#goodbyeMessage').html(goodbye);
        $('#exitingFlash').html(exit);
        $('#loadingGifEnd').html(gif);

        // Timestamp when the experiment ended
        
        // Local time
        var localTimeEnd = new Date().getTime();
        var localDateEnd = new Date(localTimeEnd).toString();

        // UTC time
        var utcDateEnd = new Date().toUTCString();

        // Duration of the task
        endTask = Date.now();
        var testTime = msToMinSec(endTask - startTask);

        // Store the last two variables
        var localTimeEndExp = [].concat(... new Array(91).fill(localDateEnd));
        dataELT.localTimeEndExp = localTimeEndExp; 

        var utcTimeEndExp = [].concat(... new Array(91).fill(utcDateEnd));
        dataELT.utcTimeEndExp = utcTimeEndExp; 

        var fullTaskDuration = [].concat(... new Array(91).fill(testTime));
        dataELT.fullTaskDuration = fullTaskDuration; 

        // Save data
        entries = Object.entries(dataELT);
        saveCSV(capturedProlificID);

        setTimeout(function(){ 

            $("#goodbyeMessage").fadeOut(300);
            $("#exitingFlash").fadeOut(300);
            $("#loadingGifEnd").fadeOut(300);


            setTimeout(function(){ 

                // Redirect participants to Gorilla and save Prolific ID as a URL parameter
                window.location.replace("https://research.sc/participant/login/dynamic/3633C662-96A8-4AF0-BC4E-CD876A568445?external_id=" + capturedProlificID + "&external_session_id=" + 3 + "");

            }, 500);
            
        }, 4000);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // UTILITY CODE

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    // Calculates minutes and seconds from milliseconds 
    function msToMinSec(ms) {
        var min = ms / 1000 / 60;
        var r = min % 1;
        var sec = Math.floor(r * 60);
        if (sec < 10) {
            sec = '0'+sec;
        }
        min = Math.floor(min);
        return (min + ':' + sec);
    }

    // Create new div on the screen
    function CreateDiv(ParentID, ChildID) {
        var d = $(document.createElement('div'))
        .attr("id", ChildID);
        var container = document.getElementById(ParentID);
        d.appendTo(container);
    };

    // Generate random values between min and max (min and max included)
    function randomIntFromInterval(min, max) {  
        return Math.floor(Math.random() * (max - min + 1) + min)
    };
    
    // Conserve aspect ratio of the original region. Useful when shrinking/enlarging images to fit into a certain area.
    //  * @param {Number} srcWidth width of source image
    //  * @param {Number} srcHeight height of source image
    //  * @param {Number} maxWidth maximum available width
    //  * @param {Number} maxHeight maximum available height
    //  * @return {Object} { width, height }
    function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth*ratio, height: srcHeight*ratio };
    };

    // Change the border of the active player
    function markActivePlayer(playerID) {
        markedPlayer = document.getElementById(playerID);
        //markedPlayer.style.outline = "8px solid Maroon";   
        markedPlayer.style.outline = "10px solid Red";   
    };

    // Remove the border once the player becomes inactive
    function unmarkInactivePlayer(playerID) {
        inactivePlayer = document.getElementById(playerID);
        inactivePlayer.style.outline = "none";   
    };

    // Create canvas playfield
    function createPlayfield() {

        // Create canvas
        newCanvas = document.createElement("canvas");
        newCanvas.id = "playfield";
        newCanvas.className = "gameSections";

        midDiv.appendChild(newCanvas);
        newCanvas.width = midDivCoordinates.width / 2;
        newCanvas.height = midDivCoordinates.height;

        ctx = newCanvas.getContext('2d');
    
    };

    // Hide canvas
    function removeCanvas() {
        $('#playfield').hide();
    };

    // Display canvas after having it hidden
    function displayCanvas(){

        // Create canvas
        newCanvas = document.createElement("canvas");
        newCanvas.id = "playfield";
        newCanvas.className = "gameSections";

        midDiv.appendChild(newCanvas);
        newCanvas.width = midDivCoordinates.width / 2;
        newCanvas.height = midDivCoordinates.height;

        ctx = newCanvas.getContext('2d');
    }

    // Dim sections on the screen
    function dimScreen() {
        veryTopDiv.style.opacity = "0.35";
        veryBottomDiv.style.opacity = "0.35";
    };

    // Undim sections on the screen
    function undimScreen() {
        veryTopDiv.style.opacity = "1";
        veryBottomDiv.style.opacity = "1";
    };

    // Dim middle section
    function dimTopScreen() {
        topDiv.style.opacity = "0.65";
    };

    // Undim sections on the screen
    function undimTopScreen() {
        topDiv.style.opacity = "1";
    };

    // Dim middle section
    function dimMidScreen() {
        midDiv.style.opacity = "0.65";
    };

    // Undim sections on the screen
    function undimMidScreen() {
        midDiv.style.opacity = "1";
    };

    // Convert to numbers
    const toNumbers = arr => arr.map(Number);

    // Shuffle the array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
    
        // While there remain elements to shuffle
        while (currentIndex != 0) {
    
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
    };

    // Swap the position of two elements in an array
    var swapArrayElements = function(arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
      };

    Array.prototype.swap = function(indexA, indexB) {
        swapArrayElements(this, indexA, indexB);
     };

    // Get URL components
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
        });
        return vars;
    }

    // Get key by value in a dictionary
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }

    function calculateRT(start, end) {
        start = parseFloat(start);
        end = parseFloat(end);
        var rt = end - start;
        return rt;
    }
    
    // Save data in a csv format
    function saveCSV(ID) {
        saveData("data_" + ID, entries)
    }

    function saveData(name, data) {
        data = toCsv(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'scripts/custom/write_data.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({filename: name, filedata: data}));
        console.log('finished saveData');
    }

    // Transfer data to a csv format and download csv
    function toCsv(input) {
        let newInput = input.map(row => {
            return [row[0], row[1].join('|')];
        });
        return newInput.map(row => row.join('|')).join('\n')
    };

    // Function to preload the images [Lion]
    function preloaderLion() {
        if (document.images) {

            // Instructions
            gif.src = "assets/Loading.gif";

            imageGroup.src = "assets/Lion.png";
            imageGroup.id = "imgGroupMembership";

            dinosaurImage.src = "assets/computerCard.png";
            dinosaurImage.id = "dinosaurRobotInstructions";
            
            gameTrialInstructions.src = "assets/gameInstructions.png";

            cardSelectionInstructions.src = "assets/fourCardsInstruction.png"; 

            emojiSelectionInstructions.src = "assets/valenceScale.png";

            emojiDisplayInstructions.src = "assets/emotionalReactions.png";

            // Ingroup players - Learning phase
            lionPlayer1.src = "assets/inactivePlayerLion.png";
            lionPlayer1.id = "lionPlayer1ID";

            lionPlayer2.src = "assets/participantLion2.png";
            lionPlayer2.id = "lionPlayer2ID";

            lionPlayer3.src = "assets/inactivePlayerLion.png";
            lionPlayer3.id = "lionPlayer3ID";

            lionPlayer4.src = "assets/inactivePlayerLion.png";
            lionPlayer4.id = "lionPlayer4ID";

            // Outgroup players - Learning phase
            tigerPlayer1.src = "assets/inactivePlayerTiger.png";
            tigerPlayer1.id = "tigerPlayer1ID";
            
            tigerPlayer2.src = "assets/inactivePlayerTiger.png";
            tigerPlayer2.id = "tigerPlayer2ID";

            tigerPlayer3.src = "assets/activePlayerTiger3.png";
            tigerPlayer3.id = "tigerPlayer3ID";

            tigerPlayer4.src = "assets/inactivePlayerTiger.png";
            tigerPlayer4.id = "tigerPlayer4ID";

            // Ingroup players - Test phase
            lionPlayer1TP.src = "assets/inactivePlayerLion.png";
            lionPlayer1TP.id = "lionPlayer1TPID";

            lionPlayer2TP.src = "assets/participantLion2.png";
            lionPlayer2TP.id = "lionPlayer2TPID";

            lionPlayer3TP.src = "assets/inactivePlayerLion.png";
            lionPlayer3TP.id = "lionPlayer3TPID";

            lionPlayer4TP.src = "assets/activePlayerLion4.png";
            lionPlayer4TP.id = "lionPlayer4TPID";

            // Outgroup players - Test phase
            tigerPlayer1TP.src = "assets/activePlayerTiger1.png";
            tigerPlayer1TP.id = "tigerPlayer1TPID";
            
            tigerPlayer2TP.src = "assets/inactivePlayerTiger.png";
            tigerPlayer2TP.id = "tigerPlayer2TPID";

            tigerPlayer3TP.src = "assets/inactivePlayerTiger.png";
            tigerPlayer3TP.id = "tigerPlayer3TPID";

            tigerPlayer4TP.src = "assets/inactivePlayerTiger.png";
            tigerPlayer4TP.id = "tigerPlayer4TPID";

            // Game
            imagePlayerTiger.src = "assets/tigerCard.png";
            imagePlayerTiger.id = "tigerCard";

            imagePlayerLion.src = "assets/lionCard.png";
            imagePlayerLion.id = "lionCard";

            imageComputer.src = "assets/computerCard.png";
            imageComputer.id = "computerCard";

            // Reactions
            emoji1.src = "assets/Valence1.png";
            emoji1.id = "valence1";
            emoji2.src = "assets/Valence2.png";
            emoji2.id = "valence2";
            emoji3.src = "assets/Valence3.png";
            emoji3.id = "valence3";

            // Participants' cards
            pinkCard.src = "assets/pinkCard.png";
            pinkCard.id = "pinkCardClickable";

            grayCard.src = "assets/grayCard.png";
            grayCard.id = "grayCardClickable";

            purpleCard.src = "assets/purpleCard.png";
            purpleCard.id = "purpleCardClickable";

            orangeCard.src = "assets/orangeCard.png";
            orangeCard.id = "orangeCardClickable";
        }
    }

    // Function to preload the images [Tiger]
    function preloaderTiger() {
        if (document.images) {

            // Instructions
            gif.src = "assets/Loading.gif";

            imageGroup.src = "assets/Tiger.png";
            imageGroup.id = "imgGroupMembership";

            dinosaurImage.src = "assets/computerCard.png";
            dinosaurImage.id = "dinosaurRobotInstructions";
            
            gameTrialInstructions.src = "assets/gameInstructions.png";

            cardSelectionInstructions.src = "assets/fourCardsInstruction.png"; 

            emojiSelectionInstructions.src = "assets/valenceScale.png";

            emojiDisplayInstructions.src = "assets/emotionalReactions.png";

            // Ingroup players - Learning phase
            tigerPlayer1.src = "assets/inactivePlayerTiger.png";
            tigerPlayer1.id = "tigerPlayer1ID";
            
            tigerPlayer2.src = "assets/participantTiger2.png";
            tigerPlayer2.id = "tigerPlayer2ID";

            tigerPlayer3.src = "assets/inactivePlayerTiger.png";
            tigerPlayer3.id = "tigerPlayer3ID";

            tigerPlayer4.src = "assets/inactivePlayerTiger.png";
            tigerPlayer4.id = "tigerPlayer4ID";

            // Outgroup players - Learning phase
            lionPlayer1.src = "assets/inactivePlayerLion.png";
            lionPlayer1.id = "lionPlayer1ID";

            lionPlayer2.src = "assets/inactivePlayerLion.png";
            lionPlayer2.id = "lionPlayer2ID";

            lionPlayer3.src = "assets/activePlayerLion3.png";
            lionPlayer3.id = "lionPlayer3ID";

            lionPlayer4.src = "assets/inactivePlayerLion.png";
            lionPlayer4.id = "lionPlayer4ID";

            // Ingroup players - Test phase
            tigerPlayer1TP.src = "assets/inactivePlayerTiger.png";
            tigerPlayer1TP.id = "tigerPlayer1TPID";
            
            tigerPlayer2TP.src = "assets/participantTiger2.png";
            tigerPlayer2TP.id = "tigerPlayer2TPID";

            tigerPlayer3TP.src = "assets/inactivePlayerTiger.png";
            tigerPlayer3TP.id = "tigerPlayer3TPID";

            tigerPlayer4TP.src = "assets/activePlayerTiger4.png";
            tigerPlayer4TP.id = "tigerPlayer4TPID";

            // Outgroup players - Test phase
            lionPlayer1TP.src = "assets/activePlayerLion1.png";
            lionPlayer1TP.id = "lionPlayer1TPID";

            lionPlayer2TP.src = "assets/inactivePlayerLion.png";
            lionPlayer2TP.id = "lionPlayer2TPID";

            lionPlayer3TP.src = "assets/inactivePlayerLion.png";
            lionPlayer3TP.id = "lionPlayer3TPID";

            lionPlayer4TP.src = "assets/inactivePlayerLion.png";
            lionPlayer4TP.id = "lionPlayer4TPID";

            // Game
            imagePlayerTiger.src = "assets/tigerCard.png";
            imagePlayerTiger.id = "tigerCard";

            imagePlayerLion.src = "assets/lionCard.png";
            imagePlayerLion.id = "lionCard";

            imageComputer.src = "assets/computerCard.png";
            imageComputer.id = "computerCard";

            // Reactions
            emoji1.src = "assets/Valence1.png";
            emoji1.id = "valence1";
            emoji2.src = "assets/Valence2.png";
            emoji2.id = "valence2";
            emoji3.src = "assets/Valence3.png";
            emoji3.id = "valence3";

            // Participants' cards
            pinkCard.src = "assets/pinkCard.png";
            pinkCard.id = "pinkCardClickable";

            grayCard.src = "assets/grayCard.png";
            grayCard.id = "grayCardClickable";

            purpleCard.src = "assets/purpleCard.png";
            purpleCard.id = "purpleCardClickable";

            orangeCard.src = "assets/orangeCard.png";
            orangeCard.id = "orangeCardClickable";
        }
    }
});