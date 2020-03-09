import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {
  Container,
  Form,
  Radio,
  Button,
  Input,
  Dropdown,
  Checkbox,
  Table,
  Header
} from "semantic-ui-react";

class AppView extends Component {
  state = {
    records: [],
    searchResult: null,
    search: "",
    filter: false
  };
  handleFormSubmit = data => {
    this.setState({
      records: [...this.state.records, data]
    });
  };
  handleSearch = e => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      this.setState(
        {
          search: value
        },
        () => {
          this.setState({
            searchResult: [
              ...this.state.records.filter(
                record =>
                  record.firstName.includes(value) ||
                  record.lastName.includes(value)
              )
            ]
          });
        }
      );
    } else {
      this.setState({
        searchResult: null
      });
    }
  };

  handleFilter = checked => {
    this.setState(
      {
        filter: checked
      },
      () => {
        if (checked) {
          this.setState({
            searchResult: [
              ...this.state.records.filter(record => record.age < 18)
            ]
          });
        } else {
          this.setState({
            searchResult: null
          });
        }
      }
    );
  };
  render() {
    const { handleSubmit } = this.props;
    const { records, searchResult } = this.state;
    return (
      <Container>
        <br />
        <Header as="h1">Patient Records </Header>
        <br />
        <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Form.Group>
            <Field
              name="firstName"
              type="text"
              component={({ input, ...rest }) => {
                return (
                  <Form.Field>
                    <label>First Name</label>
                    <Input {...input} {...rest} />
                  </Form.Field>
                );
              }}
            />
            <Field
              name="lastName"
              type="text"
              component={({ input, ...rest }) => {
                return (
                  <Form.Field>
                    <label>Last Name</label>
                    <Input {...input} {...rest} />
                  </Form.Field>
                );
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field>Gender</Form.Field>
            <Field
              name="gender"
              component={({ input, ...rest }) => {
                return (
                  <Form.Field>
                    <Radio
                      {...input}
                      {...rest}
                      onChange={(e, { checked }) =>
                        checked ? input.onChange("Male") : input.onChange(null)
                      }
                      label="Male"
                    />
                  </Form.Field>
                );
              }}
            />
            <Field
              name="gender"
              component={({ input }) => {
                return (
                  <Form.Field>
                    <Radio
                      {...input}
                      onChange={(e, { checked }) =>
                        checked
                          ? input.onChange("Female")
                          : input.onChange(null)
                      }
                      label="Female"
                    />
                  </Form.Field>
                );
              }}
            />
          </Form.Group>
          <Field
            name="age"
            type="number"
            min={0}
            component={({ input, ...rest }) => {
              return (
                <Form.Field>
                  <label>Age</label>
                  <Input {...input} {...rest} />
                </Form.Field>
              );
            }}
          />
          <Form.Group>
            <Field
              name="city"
              options={[
                { key: "kg", text: "Kigali", value: "Kigali" },
                { key: "kp", text: "Kampala", value: "Kampala" }
              ]}
              component={({ input, options, ...rest }) => {
                return (
                  <Form.Field>
                    <label>City</label>
                    <Dropdown
                      selection
                      options={options}
                      {...input}
                      {...rest}
                      onChange={(param, data) => {
                        input.onChange(data.value);
                      }}
                    />
                  </Form.Field>
                );
              }}
            />
            <Field
              name="country"
              options={[
                { key: "rw", text: "Rwanda", value: "Rwanda" },
                { key: "ug", text: "Uganda", value: "Uganda" }
              ]}
              component={({ input, options, ...rest }) => {
                return (
                  <Form.Field>
                    <label>Country</label>
                    <Dropdown
                      selection
                      {...input}
                      options={options}
                      {...rest}
                      onChange={(param, data) => {
                        input.onChange(data.value);
                      }}
                    />
                  </Form.Field>
                );
              }}
            />
          </Form.Group>
          <Form.Group>
            <Header as="h4">Living with Diabetes ?</Header>
            <Field
              name="diabetes"
              component={({ input }) => {
                return (
                  <Form.Field>
                    <Radio
                      {...input}
                      onChange={(e, { checked }) => input.onChange(checked)}
                      label="Yes"
                    />
                  </Form.Field>
                );
              }}
            />
            <Field
              name="diabetes"
              component={({ input }) => {
                return (
                  <Form.Field>
                    <Radio
                      {...input}
                      onChange={(e, { checked }) => input.onChange(!checked)}
                      label="No"
                    />
                  </Form.Field>
                );
              }}
            />
            <Field
              name="diabetes"
              component={({ input }) => {
                return (
                  <Form.Field>
                    <Radio
                      {...input}
                      onChange={(e, { checked }) => input.onChange("unknown")}
                      label="unknown"
                    />
                  </Form.Field>
                );
              }}
            />
          </Form.Group>
          <Button>Submit</Button>
        </Form>
        <br />
        <br />
        <br />
        <br />
        <Container>
          <br />
          <Form>
            <Form.Field>
              <Input
                name="search"
                onChange={this.handleSearch}
                value={this.state.searchTerm}
                placeholder="Search..."
              />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <Checkbox
                  name="filter"
                  onChange={(e, { checked }) => this.handleFilter(checked)}
                  label="Patient under 18 ?"
                />
              </Form.Field>
            </Form.Group>
          </Form>
          <br />
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Living with Diabetes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {(searchResult || records).map((record, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{record.firstName}</Table.Cell>
                    <Table.Cell>{record.lastName}</Table.Cell>
                    <Table.Cell>{record.gender}</Table.Cell>
                    <Table.Cell>{record.age}</Table.Cell>
                    <Table.Cell>{record.diabetes}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    );
  }
}

export default reduxForm({
  form: "addRecord"
})(AppView);
