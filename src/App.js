import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Study from "./Layout/Study";
import CreateDeck from "./Layout/CreateDeck";
import AddCard from "./Layout/AddCard";
import EditCard from "./Layout/EditCard";
import Deck from "./Layout/Deck";
import DeleteCard from "./Layout/DeleteCard"
import NotFound from "./Layout/NotFound";
import EditDeck from "./Layout/EditDeck";
/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
         <EditCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/delete">
         <DeleteCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
         <AddCard />
        </Route>
        <Route path="/decks/:deckId/study">
        <Study />
        </Route>
        <Route path="/decks/:deckId/edit">
        <EditDeck />
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId">
         <Deck />
        </Route>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route path="*"> {/* Catch-all route for unmatched URLs */}
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;