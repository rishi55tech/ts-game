"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * User handler
 */
var User = /** @class */ (function () {
    function User() {
        this.userName = "";
    }
    /**
     * Get user name input from user
     */
    User.prototype.getUserName = function () {
        var _a;
        this.userName = (_a = prompt("Please enter your name !!")) !== null && _a !== void 0 ? _a : "User 1";
        console.log("Hello :", this.userName);
    };
    Object.defineProperty(User.prototype, "user", {
        /**
         * Print and return user name
         */
        get: function () {
            console.log(this.userName);
            return this.userName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "updateUserName", {
        set: function (name) {
            this.userName = name;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var Bet = /** @class */ (function () {
    function Bet() {
        this.betAmount = 0;
    }
    /**
     * Check if bet matches
     */
    Bet.prototype.checkBet = function (choosenNumber) {
        // Generate a random number b/w 0 and 35
        var outcomeNumber = Math.floor(Math.random() * 36);
        console.log("OutcomeNumber is: ", outcomeNumber);
        return choosenNumber === outcomeNumber;
    };
    /**
     * Get input from user for bet amount
     */
    Bet.prototype.getBetAmount = function () {
        // Get input for bet amount from user
        var userInput = prompt("Enter bet amount");
        // Converts the input number into a valid integer
        var input = parseInt(userInput !== null && userInput !== void 0 ? userInput : "");
        this.betAmount = input;
        return input;
    };
    /**
     * check if the given number is valid bet or not
     */
    Bet.prototype.isValidBet = function (num) {
        return num > 0 && num <= 35;
    };
    Object.defineProperty(Bet.prototype, "userBetAmount", {
        get: function () {
            console.log(this.betAmount);
            return this.betAmount;
        },
        enumerable: false,
        configurable: true
    });
    return Bet;
}());
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this) || this;
        var walletAmount = props.walletAmount;
        // Get wallet amount from parameters and store it in class
        _this.walletAmount = walletAmount;
        // Get bet amount from user and store it in class
        _this.betAmount = _this.getBetAmount();
        return _this;
    }
    /**
     * Checks if user can still play the game
     */
    Game.prototype.canPlay = function () {
        return this.walletAmount > 0 && this.betAmount <= this.walletAmount;
    };
    /**
     * Play the game based on the selected number
     */
    Game.prototype.playGame = function (selectedNum) {
        if (!this.isValidBet(selectedNum)) {
            console.log("Number is not valid");
            return false;
        }
        // Check if user has won the game
        var hasWinGame = this.checkBet(selectedNum);
        // Reduce the bet amount from wallet amount
        this.walletAmount = this.walletAmount - this.betAmount;
        if (!hasWinGame) {
            console.log("Better luck next time");
            return true;
        }
        // Increase the wallet amount if user won the game
        this.walletAmount = this.walletAmount + 35 * this.betAmount;
        console.log("You won the game");
        return true;
    };
    /**
     * Start the game
     */
    Game.prototype.startGame = function () {
        if (this.canPlay()) {
            // Get input from user
            var userInput = prompt("Choose any number between-0-35");
            // Convert the give number into a valid integer
            var choosenNumber = parseInt(userInput !== null && userInput !== void 0 ? userInput : "0");
            console.log("Number selected ", choosenNumber);
            return this.playGame(choosenNumber);
        }
        console.log("Sorry you don't have sufficient walletAmount");
        return false;
    };
    Object.defineProperty(Game.prototype, "currentBetAmount", {
        /**
         * Print and Current bet amount
         */
        get: function () {
            console.log(this.betAmount);
            return this.betAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "currentWalletAmount", {
        /**
         * Print and return current wallet amount
         */
        get: function () {
            console.log(this.walletAmount);
            return this.walletAmount;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}(Bet));
var rebet = true;
// rebet the game
var user = new User();
user.getUserName();
var game = new Game({ walletAmount: 100 });
user.updateUserName = "New Name";
do {
    var reBet = game.startGame();
    // check  if user can play and chooses to reBet the game
    if (reBet && game.canPlay()) {
        var choosenOption = prompt("Choose 1 for rebet the game ! choose 0 for Quit the game");
        rebet = choosenOption === "1";
    }
    else {
        //return user is not able to play the game
        rebet = false;
    }
} while (rebet);
console.log("Your current walletAmount is :", game.walletAmount);
