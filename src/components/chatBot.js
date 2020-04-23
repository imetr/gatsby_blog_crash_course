import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica",
  headerBgColor: "#6d3dff",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#6d3dff",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      age: "",
      mail: ""
    };

    console.log(this.state);
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age, mail } = steps;

    this.setState({ name, gender, age, mail });
  }

  render() {
    const { name, gender, age, mail } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h4>Summary</h4>
        <table style={{fontSize:'100%'}}>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>
                Age
              </td>
              <td>{age.value}</td>
            </tr>
            <tr>
              <td>E-Mail</td>
              <td>{mail.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object
};

Review.defaultProps = {
  steps: undefined
};

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class SimpleForm extends Component {
  componentDidMount() {
    this.handleEnd = this.handleEnd.bind(this);
  }

  handleEnd({ steps, values }) {
    console.log("STEPS",steps);
    console.log("VALUES",values);
    // alert(`Chat handleEnd callback! Number: ${values[(0, 1, 2, 3)]}`);
  }

  render() {
    return (
        <div>
        <ThemeProvider theme={theme}>
          <ChatBot
            s
            handleEnd={this.handleEnd}
            bubbleStyle={{maxWidth:'100%'}}
            steps={[
              {
                id: "1",
                message: "Please share with me your name!",
                trigger: "name"
              },
              {
                id: "name",
                user: true,
                trigger: "3"
              },
              {
                id: "3",
                message: "Hello {previousValue}, are you...",
                trigger: "gender"
              },
              {
                id: "gender",
                options: [
                  { value: "male", label: "Male", trigger: "5" },
                  { value: "female", label: "Female", trigger: "5" }
                ]
              },
              {
                id: "5",
                message: "How old are you?",
                trigger: "age"
              },
              {
                id: "age",
                user: true,
                trigger: "7",
                validator: value => {
                  if (isNaN(value)) {
                    return "Please enter a number.";
                  } else if (value < 0) {
                    return "You should give a positive number";
                  } else if (value > 120) {
                    return `${value}? Very funny...`;
                  }

                  return true;
                }
              },
              {
                id: "7",
                message: "What is your email address?",
                trigger: "mail"
              },
              {
                id: "mail",
                user: true,
                trigger: "9",
                validator: value => {
                  if (emailRegex.test(value) === false) {
                    return "Please enter a valid e-mail address.";
                  }
                  return true;
                }
              },
              {
                id: "9",
                message: "Excellent! Here is your summary",
                trigger: "review"
              },
              {
                id: "review",
                component: <Review />,
                asMessage: true,
                trigger: "update"
              },
              {
                id: "update",
                message: "Do you want to change something?",
                trigger: "update-question"
              },
              {
                id: "update-question",
                options: [
                  { value: "yes", label: "Yes", trigger: "update-yes" },
                  { value: "no", label: "No", trigger: "end-message" }
                ]
              },
              {
                id: "update-yes",
                message: "Which fields you want to update?",
                trigger: "update-fields"
              },
              {
                id: "update-fields",
                options: [
                  { value: "name", label: "Name", trigger: "update-name" },
                  {
                    value: "gender",
                    label: "Gender",
                    trigger: "update-gender"
                  },
                  { value: "age", label: "Age", trigger: "update-age" },
                  { value: "email", label: "E-Mail", trigger: "update-email" }
                ]
              },
              {
                id: "update-name",
                update: "name",
                trigger: "9"
              },
              {
                id: "update-gender",
                update: "gender",
                trigger: "9"
              },
              {
                id: "update-age",
                update: "age",
                trigger: "9"
              },
              {
                id: "update-email",
                update: "email",
                trigger: "9"
              },
              {
                id: "end-message",
                message: "Thanks! You have successfully sent your information",
                end: true
              }
            ]}
          />
        </ThemeProvider>
        {console.log(JSON.stringify(this.state, null, 2))}
        <p>{JSON.stringify(this.states, null, 2)}</p>
        </div>
    );
  }
}

export default SimpleForm;