const chemicalFormulaInput = document.querySelector("#chemicalFormula");
const molarityInput = document.querySelector("#molarity");
const molarMassInput = document.querySelector("#molarMass");
const volumeInput = document.querySelector("#volume");
const purityInput = document.querySelector("#purity");
const densityInput = document.querySelector("#density");
const resultDiv = document.querySelector("#result");
const inputs = document.querySelectorAll("input");

const jsonOfChemicalElements = '{"Ac":{"molarMass":227},"Al":{"molarMass":26.9815},"Am":{"molarMass":243},"Sb":{"molarMass":121.75},"Ar":{"molarMass":39.948},"As":{"molarMass":74.9216},"At":{"molarMass":210},"Ba":{"molarMass":137.34},"Bk":{"molarMass":247},"Be":{"molarMass":9.0122},"Bi":{"molarMass":209},"Bh":{"molarMass":262.1},"B":{"molarMass":10.811},"Br":{"molarMass":79.909},"Cd":{"molarMass":112.4},"Ca":{"molarMass":40.08},"Cf":{"molarMass":251},"C":{"molarMass":12.01115},"Ce":{"molarMass":140.12},"Cs":{"molarMass":132.905},"Pb":{"molarMass":207.19},"Cl":{"molarMass":35.453},"Co":{"molarMass":58.93},"Cu":{"molarMass":63.55},"Cn":{"molarMass":285},"Kr":{"molarMass":83.8},"Cr":{"molarMass":51.996},"Cm":{"molarMass":247},"Ds":{"molarMass":269},"Dy":{"molarMass":162.5},"Db":{"molarMass":262},"Es":{"molarMass":252},"S":{"molarMass":32.064},"Er":{"molarMass":167.26},"Sc":{"molarMass":44.956},"Sn":{"molarMass":118.69},"Sr":{"molarMass":87.62},"Eu":{"molarMass":151.96},"Fm":{"molarMass":257},"Fe":{"molarMass":55.847},"Fl":{"molarMass":289},"F":{"molarMass":18.9984},"P":{"molarMass":30.9738},"Fr":{"molarMass":223},"Gd":{"molarMass":157.25},"Ga":{"molarMass":69.72},"Ge":{"molarMass":72.59},"Hf":{"molarMass":178.49},"Hs":{"molarMass":265},"He":{"molarMass":4.0026},"H":{"molarMass":1.00797},"Ho":{"molarMass":164.93},"In":{"molarMass":114.82},"I":{"molarMass":126.9044},"Ir":{"molarMass":192.2},"Yb":{"molarMass":173.04},"Y":{"molarMass":88.905},"La":{"molarMass":138.91},"Lr":{"molarMass":260},"Li":{"molarMass":6.941},"Lv":{"molarMass":292},"Lu":{"molarMass":174.97},"Mg":{"molarMass":24.312},"Mt":{"molarMass":269},"Mn":{"molarMass":54.938},"Md":{"molarMass":258},"Hg":{"molarMass":200.59},"Mo":{"molarMass":95.94},"Mc":{"molarMass":288},"Nd":{"molarMass":144.24},"Ne":{"molarMass":20.183},"Np":{"molarMass":237},"Nh":{"molarMass":284},"Nb":{"molarMass":92.906},"Ni":{"molarMass":58.69},"N":{"molarMass":14.0067},"No":{"molarMass":259},"Og":{"molarMass":294},"Os":{"molarMass":190.2},"Au":{"molarMass":196.967},"O":{"molarMass":15.9994},"Pd":{"molarMass":106.4},"Pt":{"molarMass":195.09},"Pu":{"molarMass":244},"Po":{"molarMass":209},"K":{"molarMass":39.098},"Pr":{"molarMass":140.907},"Ag":{"molarMass":107.87},"Pm":{"molarMass":145},"Pa":{"molarMass":231},"Ra":{"molarMass":226},"Rn":{"molarMass":222},"Re":{"molarMass":186.2},"Rh":{"molarMass":102.905},"Rg":{"molarMass":272},"Rb":{"molarMass":85.47},"Ru":{"molarMass":101.07},"Rf":{"molarMass":261},"Sm":{"molarMass":150.35},"Sg":{"molarMass":263.1},"Se":{"molarMass":78.96},"Si":{"molarMass":28.086},"Na":{"molarMass":22.9898},"Tl":{"molarMass":204.37},"Ta":{"molarMass":180.948},"Tc":{"molarMass":98},"Te":{"molarMass":127.6},"Ts":{"molarMass":294},"Tb":{"molarMass":158.924},"Ti":{"molarMass":47.9},"Th":{"molarMass":232},"Tm":{"molarMass":168.934},"W":{"molarMass":183.85},"U":{"molarMass":238},"V":{"molarMass":50.942},"Xe":{"molarMass":131.38},"Zn":{"molarMass":65.38},"Zr":{"molarMass":91.22}}';
const chemicalElements = JSON.parse(jsonOfChemicalElements);

const calculations = {
    concentration: (molarity, molarMass, volume) => {
        return molarMass * volume * molarity;
    },
    purity: (purity, mass) => {
        return mass / (purity * 0.01);
    },
    density: (density, mass) => {
        return mass / density;
    },
    molarMass: (elements) => {
        let result = 0;
        let coefficient = 1;

        const getMolarMass = (element) => {
            const letter = element.replace(/[0-9]/, '');
            const number = Number(element.replace(/[a-zA-Z]/, ''));
            const molarMass = chemicalElements[letter] ? chemicalElements[letter].molarMass : false;
            if (molarMass) {
                return molarMass * (number ? number : 1);
            }
        }

        if (elements.length === 1) {
            const element = elements[0];
            result = getMolarMass(element);
        } else {
            if (!isNaN(elements[0])) {
                coefficient = Number(elements[0]);
                elements.shift();
            }

            elements.forEach((element) => {
                result += getMolarMass(element);
            });
        }

        return coefficient * result;
    }
}

function showOrHideElement(command) {
    const {
        element,
        about,
        changeWidth,
        elementWidth
    } = command;

    const showElement = (element) => {
        element.style.opacity = "1";
        if (changeWidth) {
            element.style.width = elementWidth;
        }
    }

    const hideElement = (element) => {
        element.style.opacity = "0";
        if (changeWidth) {
            element.style.width = "";
        }
    }

    if (about) {
        showElement(element);
    } else {
        hideElement(element);
    }
}

function calculate(command) {
    const {
        molarity,
        molarMass,
        volume,
        purity,
        density,
        isLiquid
    } = command;

    const resultOfTheConcentrationCalculation = calculations.concentration(molarity, molarMass, volume);
    const resultOfThePurityCalculation = calculations.purity(purity, resultOfTheConcentrationCalculation);
    const result = isLiquid ? calculations.density(density, resultOfThePurityCalculation) : resultOfThePurityCalculation;

    return result;
}

function write(text) {
    resultDiv.textContent = text;
}

function main() {
    const chemicalFormula = chemicalFormulaInput.value.split(/(?=[A-ZÀ-Ú])/);
    if (chemicalFormulaInput.value.length > 0) {
        molarMassInput.value = calculations.molarMass(chemicalFormula);
    }

    const molarity = molarityInput.value;
    const molarMass = molarMassInput.value;
    const volume = volumeInput.value;
    const purity = purityInput.value;
    const density = densityInput.value;
    const isLiquid = document.querySelector("#liquid").checked;

    showOrHideElement({
        element: densityInput,
        about: isLiquid,
        elementWidth: "80%",
        changeWidth: true,
    });

    const isEverythingFilled = molarity.length && molarMass.length && volume.length && purity.length && (!isLiquid || density.length);

    showOrHideElement({
        element: resultDiv,
        about: isEverythingFilled,
        changeWidth: false,
    });

    if (isEverythingFilled) {
        const result = calculate({
            molarity,
            molarMass,
            volume,
            purity,
            density,
            isLiquid
        });
        
        const unity = isLiquid ? "ml" : "g";
        
        write(`${result}(${unity})`);
    } else {
        write("");
    }
}

inputs.forEach((input) => {
    input.ondblclick = () => {
        input.value = "";
    }
});

function updateAnswer() {
    requestAnimationFrame(updateAnswer);
    main();
}

updateAnswer();
