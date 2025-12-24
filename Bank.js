// 🏦 Bank and Account System
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    createAccount(name, initialDeposit) {
        const newAccount = new Account(name, initialDeposit);
        this.accounts.push(newAccount);
        console.log(`Account created for ${name} with initial deposit: $${initialDeposit}`);
        return newAccount;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount)
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    deposit(amount) {
        if (amount <= 0) {
            console.log('Error: Deposit amount must be positive');
            return false;
        }

        this.balance += amount;
        this.transactionHistory.push({ 
            transactionType: 'Deposit', 
            amount: amount 
        });

        console.log(`Deposited $${amount} to ${this.name}'s account. New balance: $${this.balance}`);
        return true;
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }
    withdraw(amount) {
        if (amount <= 0) {
            console.log('Error: Withdrawal amount must be positive');
            return false;
        }

        if (amount > this.balance) {
            console.log(`Error: Insufficient funds. Current balance: $${this.balance}`);
            return false;
        }

        this.balance -= amount;
        this.transactionHistory.push({ 
            transactionType: 'Withdrawal', 
            amount: amount 
        });

        console.log(`Withdrew $${amount} from ${this.name}'s account. New balance: $${this.balance}`);
        return true;
    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    transfer(amount, recipientAccount) {
        if (amount <= 0) {
            console.log('Error: Transfer amount must be positive');
            return false;
        }

        if (amount > this.balance) {
            console.log(`Error: Insufficient funds for transfer. Current balance: $${this.balance}`);
            return false;
        }

        // Deduct from sender
        this.balance -= amount;
        this.transactionHistory.push({ 
            transactionType: 'Transfer', 
            amount: amount, 
            to: recipientAccount.name 
        });

        // Add to recipient
        recipientAccount.balance += amount;
        recipientAccount.transactionHistory.push({ 
            transactionType: 'Received', 
            amount: amount, 
            from: this.name 
        });

        console.log(`Transferred $${amount} from ${this.name} to ${recipientAccount.name}`);
        return true;
    }

    // Example: checkBalance()
    checkBalance() {
        console.log(`${this.name}'s current balance: $${this.balance}`);
        return this.balance;
    }
}

//----------------------------------DO NOT WRITE BELOW THIS LINE------------------------------------>

// Function to test bank operations
function testBankOperations() {
    console.log('===== Banking System Test =====\n');

    // Create a new bank
    const bank = new Bank();

    // Create accounts
    console.log('--- Creating Accounts ---');
    const account1 = bank.createAccount('Alice Johnson', 1000);
    const account2 = bank.createAccount('Bob Smith', 500);
    const account3 = bank.createAccount('Charlie Brown', 0);
    console.log();

    // Check initial balances
    console.log('--- Initial Balances ---');
    account1.checkBalance();
    account2.checkBalance();
    account3.checkBalance();
    console.log();

    // Perform deposits
    console.log('--- Testing Deposits ---');
    account1.deposit(500);
    account3.deposit(250);
    console.log();

    // Perform withdrawals
    console.log('--- Testing Withdrawals ---');
    account2.withdraw(100);
    account1.withdraw(2000); // This should fail - insufficient funds
    console.log();

    // Perform transfers
    console.log('--- Testing Transfers ---');
    account1.transfer(300, account2);
    account2.transfer(150, account3);
    console.log();

    // Check final balances
    console.log('--- Final Balances ---');
    account1.checkBalance();
    account2.checkBalance();
    account3.checkBalance();
    console.log();

    console.log('===== Test Complete =====');
}

// Run the test
testBankOperations();