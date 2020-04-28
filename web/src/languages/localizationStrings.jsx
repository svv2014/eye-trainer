import LocalizedStrings from 'react-localization';
import { Cookies } from 'react-cookie';

export const languages = [{ name: "En", locale: "en"},
                         { name: "Ru", locale: "ru"}];



const translations = new LocalizedStrings({
    en: {
        leftRight: "Left <-> Right",
        beginIn: "Begin in",
        getReady: "Get ready",
        upAndDown: "Up <-> Down",
        appName: "Eye Fitness",
        disclaimer: "Disclaimer: {0}",
        disclaimerTextPart1: "Please check with your Eye Doctor fist before starting exercises.\n" +
            " Contact lenses cannot be worn before, during, after doing exercises.\n" +
            " By continuing you agree to use this website at your own risk.",
        startExercise: "Start exercising by choosing difficulty ",
        startExerciseDescription: "Beginners should start with Easy level once a day during one week. After then moderate as you feel.\n" +
            " You can pause any time by clicking on pause button or pressing 'space'.",
        easy: "Easy",
        medium: "Medium",
        tough: "Tough",
        rest: "Rest",
        blink: "Blink",
        next: "Next",
        finishedForToday: "You finished for today",
        circleRight: "Circle Right",
        circleLeft: "Circle Left",
        upLeft: "Up Left",
        upRight: "Up Right",
        downLeft: "Down Left",
        downRight: "Down Right",
        selfTestTitle: "Self Assessment",
        eyeTestRow_1: "E",
        eyeTestRow_2: "F P",
        eyeTestRow_3: "T O Z",
        eyeTestRow_4: "P D C",
        eyeTestRow_5: "L P E D",
        eyeTestRow_6: "P E C F D",
        eyeTestRow_7: "E D F C Z P",
        eyeTestRow_8: "F E L O P Z D",
        eyeTestRow_9: "D E F P O T E C",
        eyeTestRow_10: "L E F O D P C T",
        eyeTestRow_11: "F D P L T C E O",
    },
    ru: {
        leftRight: "Лево <-> Право",
        beginIn: "Начало через",
        getReady: "Приготовтесь",
        upAndDown: "Верх <-> Низ",
        appName: "Фитнес для глаз",
        disclaimer: "Заявления об отказе от ответственности: {0}",
        disclaimerTextPart1: "Пожалуйста проконсультируйтесь со своим доктором прежде чем начать упражнения." +
            " Нельза одевать конткатные линзы перед, во времмя и после упражнения." +
            " Начиная урпажнения вы соглашаетесь использовать данный веб ресурс на свой собственный риск.",
        startExercise: "Начните упражнение выбрав сложность",
        startExerciseDescription: "Для начинающих рекомендуется начать с Легкой степери сложности раз в день в течении недели." +
            " После этого смотритье по собственному самочувствию. Вы можте нажать на паузу в любое время исопльзуюя для этого кнопку на экране или \"пробел\".",
        easy: "Легко",
        medium: "Средне",
        tough: "Сложно",
        rest: "Отдых",
        blink: "Поморгать",
        next: "Следующее",
        finishedForToday: "Вы закончили упражнения на сегодня",
        circleRight: "Круг в право",
        circleLeft: "Круг в лево",
        upLeft: "Верх лево",
        upRight: "Верх право",
        downLeft: "Низ лево",
        downRight: "Низ право",
        selfTestTitle: "Самостоятельная проверка",
    }
});


let lang = new Cookies().get("lang");
if (lang !== undefined) {
    for(let ll of languages) {
        if (ll.locale === lang) {
            console.log("set lang: ", lang);
            translations.setLanguage(lang);
        }
    }
}

export const strings = translations;