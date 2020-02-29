import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Images from '../images';
import './scss/Property.scss';

class Property extends Component {
  constructor(props) {
    super(props);

    // @todo link to GameManager
    this.state = {
      name: props.gameManager.getPropertyName(props.id),
      price: 0,
      category: props.type !== undefined ? props.type : "",
      colour: props.colour,
      cPos: props.cPos,
      weight: "",
      ownedBy: "",
      mortgagedState: false,
      visitingPlayers: [],
      rentBrackets: {
        1: 10,
        2: 30,
        3: 50,
        4: 100,
        5: 200
      },
      houses: 0
    }
  }

  renderColour = () => {
    const { colour, cPos } = this.state;

    if (!cPos) {
      throw "Unable to find Property position";
    }

    const propertyClasses = `colour ${cPos} ${colour}`;
    return <div className={propertyClasses}>&nbsp;</div>;
  }

  renderCard = () => {
    const { name, category } = this.state;

    switch (category) {
      case "station":
        return <div className={category}><span>{name}</span><img src={Images.Station} /></div>;

      case "chance":
        return <div className={category}><span>Chance</span><img src={Images.Chance} /></div>;

      case "community-chest":
        return <div className={category}><span>Community Chest</span><img src={Images.CommunityChest} /></div>;

      case "tax":
        return <div className={category}>Super Tax</div>;

      case "net-worth":
        return <div className={category}>Net Worth</div>;

      case "go-to-jail":
        return <div className={category}>Go To Jail</div>;

      default:
        return <div className="default">{name}</div>;
    };
  }

  render() {
    const { colour, cPos, category } = this.state;
    console.log("gameManager", this.props);

    return (
      <div className={`item property ${category} colour-${cPos}`}>
        {colour !== "invisible" && this.renderColour()}
        <div className="content">
          {this.renderCard()}
        </div>
      </div>
    );
  }
}

Property.propTypes = {
  id: PropTypes.number.isRequired,
  gameManager: PropTypes.any.isRequired,
  colour: PropTypes.string.isRequired,
  cPos: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Property;