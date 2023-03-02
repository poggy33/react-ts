import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const translationsEn={
    "home":"HOME",
    "news":"NEWS",
    "profile":"PROFILE",
    "login":"Login",
    "logout":"Logout",
    "signIn":"Sign in",
    "username":"Username",
    "password":"Password",
    "showMore":"show more",
    "header":"The News",
    "titleHome":"The weather",
    "search":"search",
    "temp":"Temperature",
    "pressure":"Pressure",
    "speed":"Wind speed",
    "desc":"Description",
    "text1":"Hello. My name is Ihor Pohaidak and I am a beginner in web development. Although I don't have any commercial experience yet, I'm working hard to develop my skills and knowledge in this field. This project, created according to the conditions of your task, demonstrates my abilities and shows that I have learned.",
    "text2":"In this project, I used several popular technologies and frameworks, including React, React-Redux, @reduxjs/toolkit, react-i18next, TypeScript, react-router-dom, and designed using MUI (Material-UI). These tools allowed me to create a dynamic and interactive web application that demonstrates my ability to design and build user interfaces, manage state, handle routing, implement localization, and create visually appealing designs using MUI components.",
    "text3":"Despite being a beginner, I want to become a web developer, continue learning, and growing in this field. I believe that this project demonstrates my potential as a developer and shows that I have the necessary skills and knowledge to make my contribution to this industry and become part of your team. Thank you."
  }
  const translationsUa={
    "home":"ГОЛОВНА",
    "news":"НОВИНИ",
    "profile":"ПРОФІЛЬ",
    "login":"Увійти",
    "logout":"Вийти",
    "signIn":"Авторизуватися",
    "username":"Ім'я користувача",
    "password":"Пароль",
    "showMore":"показати більше",
    "header":"Новини",
    "titleHome":"Погода",
    "search":"пошук",
    "temp":"Температура",
    "pressure":"Тиск",
    "speed":"Швидкість вітру",
    "desc":"Погодні умови",
    "text1":"Привіт. Мене звати Ігор Погайдак, і я новачок у веб-розробці. Хоча у мене ще немає комерційного досвіду, я працюю наполегливо, щоб розвивати свої навички та знання в цій галузі. Цей проект, створений згідно умов вашого завдання, демонструє мої можливості та показує, що я вивчив.",
    "text2":"У цьому проекті я використовував декілька популярних технологій та фреймворків, включаючи React, React-Redux, @reduxjs/toolkit, react-i18next, TypeScript, react-router-dom, та створений дизайн за допомогою MUI (Material-UI). Ці інструменти дозволили мені створити динамічний та інтерактивний веб-додаток, який демонструє мою здатність проектувати та будувати інтерфейси користувачів, керувати станом, обробляти маршрутизацію, реалізувати локалізацію та створювати візуально привабливий дизайн, використовуючи компоненти MUI.",
    "text3":"Незважаючи на те, що я новачок, я прагну стати веб-розробником, продовжувати вчитися та розвиватися в цій галузі. Я вважаю, що цей проект демонструє мій потенціал як розробника та показує, що у мене є необхідні навички та знання, щоб зробити свій внесок у цю галузь та стати частиною Вашої команди. Дякую."
  }

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: translationsEn },
      ua: { translation: translationsUa },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

  export default i18n;