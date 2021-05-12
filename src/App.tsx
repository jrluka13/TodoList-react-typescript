import React, { useState, useCallback } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TodosPage } from "./pages/TodosPage";
import { AboutPage } from "./pages/AboutPage";
import { IntlProvider } from "react-intl";
import locales from "./locales/locales";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import { useEffect } from "react";
import {SwitchContext} from './context/SwitchContext'

const messages = {
  [locales.RU]: ru,
  [locales.EN]: en,
};

const App: React.FC = () => {
  const [currentLocale, setCurrentLocale] = useState(
    localStorage.getItem("locale") || locales.EN
  );

  const [checked,setCheked] = useState(false)
  const updateLocale = useCallback(
    (value: boolean) => {
      if (value) {
        setCheked(value)
        setCurrentLocale(locales.RU);
        localStorage.setItem("locale", locales.RU);
      } else {
        setCheked(value)
        setCurrentLocale(locales.EN);
        localStorage.setItem("locale", locales.EN);
      }
    },
    [setCurrentLocale]
  );



  return (
    <>
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        <SwitchContext.Provider value={{checked}}>
        <BrowserRouter>
          <Navbar onChange={updateLocale} />
          <div className="container">
            <Switch>
              <Route component={TodosPage} path="/" exact />
              <Route component={AboutPage} path="/about" />
            </Switch>
          </div>
        </BrowserRouter>
        </SwitchContext.Provider>
      </IntlProvider>
    </>
  );
};

export default App;
