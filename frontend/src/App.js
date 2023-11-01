import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import AnalisisVertical from "./components/analisis/AnalisisVertical";
import AnalisisHorizontal from "./components/analisis/AnalisisHorizontal";
import {InformeRatios} from "./components/ratios/InformeRatios";
import Typography from "@material-ui/core/Typography";
import Empresa from "./components/Empresa/Empresa"
import Graficar from "./components/Graficos/Graficar";
import Sector from "./components/sector/Sector";

export default function App() {
  return (
    <main /* className={classes.content} */>
      <Router>
        <Navbar />
        <div className="pt-4"></div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/empresa" component={Empresa} />
          <Route path="/analisisVertical" component={AnalisisVertical} />
          <Route path="/analisisHorizontal" component={AnalisisHorizontal} />
          <Route path="/informeRatios" component={InformeRatios} />
          <Route path="/graficar" component={Graficar} />
          <Route path="/sector" component={Sector} />
        </Switch>
      </Router>
      <footer className="fixed-bottom">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          Financieros
          {" " + new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
    </main>
  );
}
