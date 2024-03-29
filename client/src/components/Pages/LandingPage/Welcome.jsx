import React from 'react';
import { Tab, Icon } from 'semantic-ui-react';

const Welcome = () =>
  (
    <Tab.Pane attached={false}>
      <h3 className="underline">What is Opoly?</h3>
      <p>
        Opoly is a free to play online property trading game,
        available on both your browser &amp; mobile device.
    </p>

      <h3 className="underline">How do I play?</h3>
      <p>
        If you'd like to play a game with friends, click the
        "Create Game" tab above. Enter in the relevant details,
        modify the house rules, the board display, and more,
        and then send your unique game link to your friends so
        that they can join. Opoly supports up to 12 players and
        also has an in-game text chat.
    </p>
      <p>
        If you'd like to join a game with random Opoly players,
        click the "Join an existing game" tab above. Enter a
        Player Name and a temporary Player Password and then
        search for available games.
    </p>

      <h3 className="underline">Who made this?</h3>
      <p>
        <a target="_blank" rel="noopener noreferrer" href="//github.com/reecebenson">Reece Benson</a>,
        and a few friends. Special thanks to:
    </p>
      <ul>
        <li>Elliott</li>
      </ul>
      <p style={{ textAlign: "center" }}>
        <a target="_blank" rel="noopener noreferrer" href="//twitter.com/@reecebenson"><Icon circular link color="black" inverted name="twitter" /></a>
        <a target="_blank" rel="noopener noreferrer" href="//instagram.com/reecethedev"><Icon circular link color="black" inverted name="instagram" /></a>
        <a target="_blank" rel="noopener noreferrer" href="//linkedin.com/in/reecebenson"><Icon circular link color="black" inverted name="linkedin" /></a>
        <a target="_blank" rel="noopener noreferrer" href="//github.com/reecebenson"><Icon circular link color="black" inverted name="github" /></a>
      </p>
    </Tab.Pane>
  );

export default Welcome;