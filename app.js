const container = document.getElementById("container");
const forms = document.getElementById("forms");
const reload = document.getElementById("reload");
const result = document.getElementById("result");
let counter = 0;
let question = "";
const feqArr = [];
const getQuestion = async () => {
  const res = await fetch("./question.json");
  const data = await res.json();
  try {
    if (data) {
      let ran = Math.floor(Math.random() * 10);

      createQuestion(data[ran]);

      forms.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementsByName("quiz").forEach((e, i) => {
          if (e.checked == true)
            e.value == data[ran].correct_answers.answer_correct
              ? (feqArr[ran] = true)
              : (feqArr[ran] = false);
        });
        counter++;

        if (counter < 10) {
          ran = Math.floor(Math.random() * 10);
          while (feqArr[ran]) {
            ran = Math.floor(Math.random() * 10);
          }
          if (counter == 9) next.innerHTML = "<span>Submit</span>";
          createQuestion(data[ran]);
        } else {
          resultFunction();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createQuestion = (element) => {
  question = `
    
  <legend>${element.question}</legend>
  <div class="inputs">
  <div>  
  <label for="ChoiceA}">${element.answers.answer_a}</label>
    <input type="radio" id="ChoiceA" name="quiz" value="${element.answers.answer_a}" required/>
    </div>
     <div>
    <label for="ChoiceA">${element.answers.answer_b}</label>
    <input type="radio" id="ChoiceB" name="quiz" value="${element.answers.answer_b}" required/>
    </div>    <div>
    <label for="ChoiceC">${element.answers.answer_c}</label>
    
    <input type="radio" id="ChoiceC" name="quiz" value="${element.answers.answer_c}" required />
    </div>
   <div> <label for="ChoiceD">${element.answers.answer_d}</label>
    <input type="radio" id="ChoiceD" name="quiz" value="${element.answers.answer_d}" required />
    </div>
  </div>   

             `;
  container.innerHTML = question;
};

const resultFunction = () => {
  forms.style.display = "none";
  let finalResult = 0;
  feqArr.forEach((e) => (e == true ? ++finalResult : ""));
  res = `


<p>
you answered ${finalResult}/10 questions correctly
</p>
<button type="button" id="reload" onclick=location.reload() > Reload</button>
             `;

  result.innerHTML = res;
};

getQuestion();
