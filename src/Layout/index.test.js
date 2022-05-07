import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TestRenderer from "react-test-renderer";
import React from "react";
import { HeaderConatiner } from "./index";

configure({ adapter: new Adapter() });

describe("HeaderConatiner component", () => {
  it("should render properly", () => {
    const tree = TestRenderer.create(<HeaderConatiner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it("should render a image class", () => {
  const wrapper = shallow(<HeaderConatiner />);
  expect(wrapper.find(".showImg").exists()).toBe(true);
});

it("should contain a div class", () => {
  const wrapper = shallow(<HeaderConatiner />);
  expect(wrapper.find(".header").exists()).toBe(true);
});

it("should contain a div class", () => {
  const wrapper = shallow(<img src="/assets/img1.png" />);
  expect(wrapper.html()).toEqual('<img src="/assets/img1.png"/>');
});
