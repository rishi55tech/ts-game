
interface Params {
  walletAmount: number;
}
/**
 * User handler
 */
class User {
  userName: string;
  constructor() {
    this.userName = "";
  }
  /**
   * Get user name input from user
   */
  getUserName() {
    this.userName = prompt("Please enter your name !!") ?? "User 1";
    console.log("Hello :", this.userName);
  }
  /**
   * Print and return user name
   */
  get user() {
    console.log(this.userName);
    return this.userName;
  }
  set updateUserName(name: string) {
    this.userName = name;
  }
}
class Bet {
  betAmount: number;
  constructor() {
    this.betAmount = 0;
  }
  /**
   * Check if bet matches
   */
  checkBet(choosenNumber: number): boolean {
    // Generate a random number b/w 0 and 35
    const outcomeNumber = Math.floor(Math.random() * 36);
    console.log("OutcomeNumber is: ", outcomeNumber);
    return choosenNumber === outcomeNumber;
  }
  /**
   * Get input from user for bet amount
   */
  getBetAmount(): number {
    // Get input for bet amount from user
    const userInput = prompt("Enter bet amount");
    // Converts the input number into a valid integer
    const input = parseInt(userInput ?? "");
    this.betAmount = input;
    return input;
  }
  /**
   * check if the given number is valid bet or not
   */
  isValidBet(num: number): boolean {
    return num > 0 && num <= 35;
  }
  get userBetAmount() {
    console.log(this.betAmount);
    return this.betAmount;
  }
}
class Game extends Bet {
  walletAmount: number;
  betAmount: number;
  constructor(props: Params) {
    super();
    const { walletAmount } = props;
    // Get wallet amount from parameters and store it in class
    this.walletAmount = walletAmount;
    // Get bet amount from user and store it in class
    this.betAmount = this.getBetAmount();
  }
  /**
   * Checks if user can still play the game
   */
  canPlay() {
    return this.walletAmount > 0 && this.betAmount <= this.walletAmount;
  }
  /**
   * Play the game based on the selected number
   */
  playGame(selectedNum: number): boolean {
    if (!this.isValidBet(selectedNum)) {
      console.log("Number is not valid");
      return false;
    }
    // Check if user has won the game
    const hasWinGame = this.checkBet(selectedNum);
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
  }
  /**
   * Start the game
   */
  startGame(): boolean {
    if (this.canPlay()) {
      // Get input from user
      const userInput = prompt("Choose any number between-0-35");
      // Convert the give number into a valid integer
      const choosenNumber: number = parseInt(userInput ?? "0");
      console.log("Number selected ", choosenNumber);
      return this.playGame(choosenNumber);
    }
    console.log("Sorry you don't have sufficient walletAmount");
    return false;
  }
  /**
   * Print and Current bet amount
   */
  get currentBetAmount() {
    console.log(this.betAmount);
    return this.betAmount;
  }
  /**
   * Print and return current wallet amount
   */
  get currentWalletAmount() {
    console.log(this.walletAmount);
    return this.walletAmount;
  }
}
let rebet = true;
// rebet the game
const user = new User();
user.getUserName();
const game = new Game({ walletAmount: 100 });
user.updateUserName = "New Name"
do {
  const reBet = game.startGame();
  // check  if user can play and chooses to reBet the game
  if (reBet && game.canPlay()) {
    const choosenOption: any = prompt(
      "Choose 1 for rebet the game ! choose 0 for Quit the game"
    );
    rebet = choosenOption === "1";
  } else {
    //return user is not able to play the game
    rebet = false;
  }
} while (rebet);
console.log("Your current walletAmount is :", game.walletAmount);