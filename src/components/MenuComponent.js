/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      selectedStaff: null,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      modalOpen: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleInput(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    // e.preventDefault();

    const newStaff = {
      id: this.props.staffList.length,
      name: e.name,
      doB: e.doB,
      departmentId: e.departmentId,
      salaryScale: e.salaryScale,
      startDate: e.startDate,
      annualLeave: e.annualLeave,
      overTime: e.overTime,
      image: "/assets/images/alberto.png",
    };
    this.props.postStaff(newStaff);
    console.log(newStaff);
  }

  render() {
    return (
      <div className="container">
        <div key={this.props.id} className="row">
          <div className="col-12 mt-2">
            <form className="form-group row">
              {/* <div className="col-3"></div> */}
              <div className="col-4">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-pencil fa-lg"></span>Th??m nh??n vi??n
                </Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>
                    Th??m nh??n vi??n
                  </ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                      <Row className="control-group">
                        <Label htmlFor="name" md={4}>
                          H??? t??n:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".name"
                            className="form-control"
                            id="name"
                            name="name"
                            onChange={this.handleInput}
                            validators={{
                              required,
                              minLength: minLength(3),
                              maxLength: maxLength(30),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin! ",
                              minLength: "T??n ph???i nhi???u h??n 2 k?? t???",
                              maxLength: "T??n ph???i ??t h??n 30 k?? t???",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="doB" md={4}>
                          Ng??y sinh:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".doB"
                            className="form-control"
                            id="doB"
                            onChange={this.handleInput}
                            name="doB"
                            validators={{
                              required,
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".doB"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                            }}
                          />
                        </Col>
                      </Row>
                      <Row className="control-group">
                        <Label htmlFor="startDate" md={4}>
                          Ng??y b???t ?????u l??m:
                        </Label>
                        <Col md={8}>
                          <Control.input
                            type="date"
                            model=".startDate"
                            onChange={this.handleInput}
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            validators={{
                              required,
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".startDate"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group">
                        <Label htmlFor="department" md={4}>
                          Ph??ng ban{" "}
                        </Label>
                        <Col md={8}>
                          <Control.select
                            model=".departmentId"
                            className="form-control"
                            // id="department"
                            name="departmentId"
                            defaultValue="Sale"
                            validators={{
                              required,
                            }}
                          >
                            <option value="Dept01">Sales</option>
                            <option value="Dept02">HR</option>
                            <option value="Dept03">Marketing</option>
                            <option value="Dept04">IT</option>
                            <option value="Dept05">Finance</option>
                          </Control.select>
                          <Errors
                            className="text-danger"
                            model=".department"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group mt-2">
                        <Label htmlFor="salaryScale" md={4}>
                          H??? s??? l????ng:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".salaryScale"
                            className="form-control"
                            id="salaryScale"
                            onChange={this.handleInput}
                            name="salaryScale"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".salaryScale"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                              isNumber: "H??? s??? l????ng l?? s???!",
                              minLength: "H??? s??? l????ng l???n h??n 0!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group mt-2">
                        <Label htmlFor="annualLeave" md={4}>
                          S??? ng??y ngh??? c??n l???i:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".annualLeave"
                            className="form-control"
                            id="annualLeave"
                            onChange={this.handleInput}
                            name="annualLeave"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".annualLeave"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                              isNumber: "S??? ng??y ngh??? c??n l???i l?? s???!",
                              minLength: "Ch??a ??i???n th??ng tin!",
                            }}
                          />
                        </Col>
                      </Row>

                      <Row className="control-group">
                        <Label htmlFor="overTime" md={4}>
                          S??? ng??y t??ng ca:
                        </Label>
                        <Col md={8}>
                          <Control.text
                            model=".overTime"
                            className="form-control"
                            id="overTime"
                            onChange={this.handleInput}
                            name="overTime"
                            validators={{
                              required,
                              isNumber,
                              minLength: minLength(1),
                            }}
                          />
                          <Errors
                            className="text-danger"
                            model=".overTime"
                            show="touched"
                            messages={{
                              required: "Ch??a ??i???n th??ng tin!",
                              isNumber: "S??? ng??y t??ng ca l?? s???!",
                              minLength: "Ch??a ??i???n th??ng tin!",
                            }}
                          />
                        </Col>
                      </Row>
                      <Button type="submit" color="primary">
                        Th??m
                      </Button>
                    </LocalForm>
                  </ModalBody>
                </Modal>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
