import React, { Component } from "react";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Department from "./DepartmentComponent";
import StaffDetail from "./StaffItemComponent";
import StaffList from "./StaffListComponent";
import SalaryTable from "./SalaryComponent";
import StaffDept from "./StaffInDeptComponent";
import { connect } from "react-redux";
import {
  postStaff,
  fetchStaff,
  fetchDepartment,
  addDepartment,
  fetchStaffSalary,
  addSalary,
  updateStaff,
  deleteStaff,
} from "../redux/Action";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salary: state.salary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postStaff: (staff) => {
    dispatch(postStaff(staff));
  },
  fetchStaff: () => {
    dispatch(fetchStaff());
  },
  addDepartment: (department) => {
    dispatch(addDepartment(department));
  },
  fetchDepartment: () => {
    dispatch(fetchDepartment());
  },
  addSalary: (salary) => {
    dispatch(addSalary(salary));
  },
  fetchStaffSalary: () => {
    dispatch(fetchStaffSalary());
  },
  deleteStaff: (id) => {
    dispatch(deleteStaff(id));
  },
  updateStaff: (staff) => {
    dispatch(updateStaff(staff));
  },
});
class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStaff();
    this.props.fetchDepartment();
    this.props.fetchStaffSalary();
  }

  postStaff = (newStaff) => {
    this.setState({ staffs: [...this.props.staffs.staff, newStaff] });
  };

  // onStaffSelect(staffID) {
  //   this.setState({ selectedStaff: staffID });
  // }
  // onAddStaff = (staff) => {
  //   const id = Math.floor(Math.random() * 10000 + 1);
  //   const newStaff = { id, ...staff };
  //   this.setState({
  //     staffs: [...this.state.staffs, newStaff],
  //   });
  // };

  render() {
    const StaffsID = ({ match, history }) => {
      return (
        <StaffDetail
          staffs={
            this.props.staffs.filter(
              (staffs) => staffs.id === parseInt(match.params.id, 10)
            )[0]
          }
          department={this.props.department}
          updateStaff={this.props.updateStaff}
          history={history}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route
                exact
                path="/staff"
                component={() => (
                  <StaffList
                    staff={this.props.staffs}
                    onAddStaff={this.onAddStaff}
                    postStaff={this.props.postStaff}
                  />
                )}
              />
              <Route exact path="/staff/:id" component={StaffsID} />
              {/* <Route exact path="/department" component={Department} /> */}
              <Route
                exact
                path="/department"
                component={() => (
                  <Department department={this.props.department} />
                )}
              />
              <Route
                path="/department/:deptId"
                component={() => <StaffDept />}
              />
              {/* <Route exact path="/salary" component={Salary} /> */}
              <Route
                path="/salary"
                component={() => <SalaryTable staffList={this.props.staffs} />}
              />
              <Redirect to="/staff" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
