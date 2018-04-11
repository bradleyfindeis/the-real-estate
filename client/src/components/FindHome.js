import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';

class FindHome extends React.Component {
  state = {
    agents: [],
    agent: null,
    buyers: [],
    buyer: null,
  }

  componentDidMount() {
    axios.get('/api/agents')
      .then( res => this.setState({ agents: res.data }) )
  }

  agentList = () => {
    const { agents } = this.state;
    return agents.map( agent => {
      return { 
        key: agent.id,
        text: `${agent.first_name} ${agent.last_name}`,
        value: agent.id
      }
    });
  }

  buyerList = () => {
    const { buyers } = this.state;
    return buyers.map( buyer => {
      return {
        key: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`,
        value: buyer.id
      }
    })
  }

  getBuyers = (e, { value }) => {
    this.setState({ agent: value }, () => {
      axios.get(`/api/agents/${this.state.agent}`)
        .then( res => this.setState({ buyers: res.data }) )
    });
  }

  render() {
    return (
      <div>
        <Form.Select 
          label="Agent:"
          options={this.agentList()} 
          onChange={this.getBuyers}
        />
        { this.state.agent &&
          <Form.Select 
            label="Buyer"
            options={this.buyerList()}
          />
        }
      </div>
    )
  }
}

export default FindHome