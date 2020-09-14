const word = document.querySelector('.word'),
      input = document.querySelector('input'),
      enter = document.querySelector('.enter'),
      select = document.querySelector('select'),
      btnSelect = document.querySelector('.btn__mod'),
      wrongChars = document.querySelector('.wrong__chars'),
      tries = document.querySelector('.tries span'),
      string = document.querySelector('form span');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 200;     

const gameInfo = {
   wordsArr: ['hello', 'apple', 'orange'],
   score: 10,
   randomWord: '',
   emptyWord: [],
   allChar: document.querySelectorAll('.word span'),

   fillEmptyWord: function () {
      for (let i = 0; this.randomWord.length > i; i++) {
         this.emptyWord.push('_');
         let char = document.createElement('span');
         char.textContent = '_';
         word.append(char);
      }
   },

   createRandomWord: function () {
      this.randomWord = 
      this.wordsArr[Math.floor(Math.random() * this.wordsArr.length)].split('');
   },

   clickButton: function () {
      enter.addEventListener('click', (e) => {
         let guess = input.value;

         if (!isNaN(guess) || guess === '' || 
            guess === null) {
               this.score++;
               alert('wrong');
         }

         if (this.randomWord.includes(guess)) {
            this.randomWord.map((item, index) => {
               if (item === guess) {
                  this.allChar = document.querySelectorAll('.word span');
                  this.allChar[index].textContent = guess;
                  this.allChar[index].style.color = 'green'; 
                  this.emptyWord[index] = item;
                  this.stringTrue();
                  this.winModal(this.emptyWord);
               } 
            });
         } else {
            let wrongChar = document.createElement('span');
            wrongChar.textContent = guess;
            wrongChar.style.color = 'red';
            wrongChars.append(wrongChar);
            console.log(this.score);
            this.score--;
            this.clearPartBody(this.score);
            this.stringFalse();
            this.checkScore();
            this.showTries(this.score);
         }
      });
   },

   checkScore: function() {
      if(this.score === 0) {
         document.querySelector('.mod__lose').style.display = 'block';
      }
   },

   choseMod: function() {
      btnSelect.addEventListener('click', () => {
         document.querySelector('.mod').style.display = 'none';
         this.score = +select[select.selectedIndex].value;
         this.showTries(this.score);
      });
   },

   showTries: function(score) {
      tries.textContent = score;
   }, 

   winModal: function (arr) {
      if(!arr.includes('_')) {
         document.querySelector('.mod__win').style.display = 'block';
      }
   },

   stringTrue: function() {
      string.textContent = 'Верно!';
      string.style.color = 'green';
      setTimeout(() => {
         string.textContent = '';
      }, 2000);
   },

   stringFalse: function () {
      string.textContent = 'Не угадали(';
      string.style.color = 'red';

      setTimeout(() => {
         string.textContent = '';
      }, 2000);
   },

   clearPartBody: function(score) {
      switch (score) {
         case 8:
            ctx.clearRect(65, 12, 70, 70);
            break;
      
         default:
            break;
      }
   }

};


const body = {
   drawHead: function () {
      ctx.beginPath();
      ctx.arc(100, 50, 30, 0, Math.PI * 2, true);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(90, 45, 5, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(110, 45, 5, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(100, 60, 10, 0, Math.PI, false);
      ctx.stroke();
   },

   drawBody: function() {
      ctx.beginPath();
      ctx.moveTo(100, 80);
      ctx.lineTo(100, 130);
      ctx.stroke();
   }
};


body.drawHead();
body.drawBody();


gameInfo.choseMod();
gameInfo.createRandomWord();
gameInfo.fillEmptyWord();
gameInfo.clickButton();


console.log(gameInfo.randomWord);
console.log(gameInfo.emptyWord);










