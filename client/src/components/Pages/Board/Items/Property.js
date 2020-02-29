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
      colour: props.gameManager.getPropertyColour(props.id),
      pos: props.pos,
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
    const { colour, pos } = this.state;

    if (!pos) {
      throw "Unable to find Property position";
    }

    const propertyClasses = `colour ${pos} ${colour}`;
    return <div className={propertyClasses}>&nbsp;</div>;
  }

  renderCard = () => {
    const { name, category } = this.state;

    switch (category) {
      case "station":
        return <div className={category}><span>{name}</span><br /><img src={Images.Station} /></div>;

      case "chance":
        return <div className={category}><span>Chance</span><br /><img src={Images.Chance} /></div>;

      case "community-chest":
        return <div className={category}><span>Community Chest</span><br /><img src={Images.CommunityChest} /></div>;

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
    const { colour, pos, category } = this.state;

    return (
      <td
        className={`item property ${category} colour-${pos}`}
        onMouseOver={() => this.props.handleMouseOver(this.props.id)}
        onMouseLeave={() => this.props.resetMouseOver(this.props.id)}
      >
        {colour !== "invisible" && this.renderColour()}
        <div className="content">
          {this.renderCard()}
        </div>
      </td>
    );
  }
}

Property.propTypes = {
  id: PropTypes.string.isRequired,
  gameManager: PropTypes.any.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  resetMouseOver: PropTypes.func.isRequired,
  colour: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Property;