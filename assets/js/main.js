const main = document.getElementById("main");
const qna = document.getElementById("qna");
const result = document.getElementById("result");
const q = document.querySelector(".questionContainer");
const a = document.querySelector(".anwerContainer");
const status = document.querySelector(".statusBar");
const resultName = result.querySelector(".result-name");
const img = result.querySelector("img");
const resultDesc = result.querySelector(".result-desc ul");
const splash = document.getElementById("splash");

let endPoint = 5;
let select = 0;

const goResult = () => {
    qna.classList.add("hide");
    result.classList.remove("hide");
    let num = select.toString();
    if (select > 2000) {
        //소형
        if (select > 2200) {
            // 무늬
            if (select < 2260) {
                //음지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[0].img;
                    resultName.innerHTML = resultList[0].name;
                    resultDesc.innerHTML = resultList[0].desc;
                    //console.log("소형 무늬 음지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[1].img;
                    resultName.innerHTML = resultList[1].name;
                    resultDesc.innerHTML = resultList[1].desc;
                    //console.log("소형 무늬 음지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[2].img;
                    resultName.innerHTML = resultList[2].name;
                    resultDesc.innerHTML = resultList[2].desc;
                    //console.log("소형 무늬 음지 1주");
                }
            } else if (select >= 2260) {
                // 양지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[3].img;
                    resultName.innerHTML = resultList[3].name;
                    resultDesc.innerHTML = resultList[3].desc;
                    //console.log("소형 무늬 양지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[4].img;
                    resultName.innerHTML = resultList[4].name;
                    resultDesc.innerHTML = resultList[4].desc;
                    //console.log("소형 무늬 양지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[5].img;
                    resultName.innerHTML = resultList[5].name;
                    resultDesc.innerHTML = resultList[5].desc;
                    //console.log("소형 무늬 양지 일주");
                }
            }
        } else if (select < 2200) {
            //무난
            if (select < 2160) {
                //음지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[6].img;
                    resultName.innerHTML = resultList[6].name;
                    resultDesc.innerHTML = resultList[6].desc;
                    //console.log("소형 무난 음지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[7].img;
                    resultName.innerHTML = resultList[7].name;
                    resultDesc.innerHTML = resultList[7].desc;
                    //console.log("소형 무난 음지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[8].img;
                    resultName.innerHTML = resultList[8].name;
                    resultDesc.innerHTML = resultList[8].desc;
                    //console.log("소형 무난 음지 1주");
                }
            } else if (select >= 2160) {
                // 양지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[9].img;
                    resultName.innerHTML = resultList[9].name;
                    resultDesc.innerHTML = resultList[9].desc;
                    //console.log("소형 무난 양지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[10].img;
                    resultName.innerHTML = resultList[10].name;
                    resultDesc.innerHTML = resultList[10].desc;
                    //console.log("소형 무난 양지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[11].img;
                    resultName.innerHTML = resultList[11].name;
                    resultDesc.innerHTML = resultList[11].desc;
                    //console.log("소형 무난 양지 1주");
                }
            }
        }
    } else {
        //대형
        if (select > 1200) {
            // 무늬
            if (select < 1260) {
                //음지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[12].img;
                    resultName.innerHTML = resultList[12].name;
                    resultDesc.innerHTML = resultList[12].desc;
                    //console.log("대형 무늬 음지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[13].img;
                    resultName.innerHTML = resultList[13].name;
                    resultDesc.innerHTML = resultList[13].desc;
                    //console.log("대형 무늬 음지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[14].img;
                    resultName.innerHTML = resultList[14].name;
                    resultDesc.innerHTML = resultList[14].desc;
                    //console.log("대형 무늬 음지 1주");
                }
            } else if (select >= 1260) {
                // 양지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[15].img;
                    resultName.innerHTML = resultList[15].name;
                    resultDesc.innerHTML = resultList[15].desc;
                    //console.log("대형 무늬 양지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[16].img;
                    resultName.innerHTML = resultList[16].name;
                    resultDesc.innerHTML = resultList[16].desc;
                    //console.log("대형 무늬 양지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[17].img;
                    resultName.innerHTML = resultList[17].name;
                    resultDesc.innerHTML = resultList[17].desc;
                    //console.log("대형 무늬 양지 일주");
                }
            }
        } else if (select < 1200) {
            //무난
            if (select < 1160) {
                //음지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[18].img;
                    resultName.innerHTML = resultList[18].name;
                    resultDesc.innerHTML = resultList[18].desc;
                    //console.log("대형 무난 음지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[19].img;
                    resultName.innerHTML = resultList[19].name;
                    resultDesc.innerHTML = resultList[19].desc;
                    //console.log("대형 무난 음지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[20].img;
                    resultName.innerHTML = resultList[20].name;
                    resultDesc.innerHTML = resultList[20].desc;
                    //console.log("대형 무난 음지 1주");
                }
            } else if (select >= 1160) {
                // 양지
                if (num.indexOf("7") === 3) {
                    //한달
                    img.src = resultList[21].img;
                    resultName.innerHTML = resultList[21].name;
                    resultDesc.innerHTML = resultList[21].desc;
                    //console.log("대형 무난 양지 한달");
                } else if (num.indexOf("8") === 3) {
                    //2week
                    img.src = resultList[22].img;
                    resultName.innerHTML = resultList[22].name;
                    resultDesc.innerHTML = resultList[22].desc;
                    //console.log("대형 무난 양지 2주");
                } else if (num.indexOf("9") === 3) {
                    //1week
                    img.src = resultList[23].img;
                    resultName.innerHTML = resultList[23].name;
                    resultDesc.innerHTML = resultList[23].desc;
                    ////console.log("대형 무난 양지 1주");
                }
            }
        }
    }
};

const addAnswer = (answerText, count, idx) => {
    const answer = document.createElement("button");
    answer.classList.add("answerList");
    a.appendChild(answer);
    answer.innerText = answerText;
    answer.addEventListener(
        "click",
        () => {
            const answerBtns = document.querySelectorAll(".answerList");
            let value = qnaList[count].a[idx].value;

            for (let i = 0; i < answerBtns.length; i++) {
                answerBtns[i].style.display = "none";
            }
            select += value;
            goNext(++count);
        },
        false
    );
};

const goNext = (count) => {
    if (count === endPoint) {
        splash.classList.remove("hide");
        setTimeout(() => {
            splash.classList.add("hide");
            goResult();
        }, 2500);
        return;
    }

    q.innerHTML = qnaList[count].q;
    for (let i in qnaList[count].a) {
        addAnswer(qnaList[count].a[i].answer, count, i);
    }
    status.style.width = (100 / endPoint) * count + 1 + "%";
};

const goToMain = () => {
    result.classList.add("hide");
    main.classList.remove("hide");
    let count = 0;
    select = 0;
};

const start = () => {
    main.classList.add("hide");
    qna.classList.remove("hide");
    let count = 0;
    goNext(count);
};
