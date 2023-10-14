import React from "react";
import styled from "styled-components";

const StyledFooter = styled("div")`
  background-color: #24262b;
  padding: 70px 0;
`;

const StyledContainer = styled("div")`
  max-width: 1170px;
  margin: auto;
`;
const StyledRow = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;
const StyledUl = styled("ul")`
  list-style: none;
`;
const StyledFooterCol = styled("div")`
  width: 25%;
  padding: 0 15px;

  @media screen and (max-width: 767px) {
    width: 50%;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 574px) {
    width: 100%;
  }
`;

const StyledH4 = styled("h4")`
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #e91e63;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
  }
`;

const StyledFooterLi = styled("li")`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const StyledSocialLink = styled("a")`
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
`;

const StyledLinks = styled("a")`
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    padding-left: 8px;
  }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <StyledContainer>
        <StyledRow>
          <StyledFooterCol>
            <StyledH4>company</StyledH4>
            <StyledUl>
              <li>
                <StyledLinks href="#">about us</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">our services</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">privacy policy</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">affiliate program</StyledLinks>
              </li>
            </StyledUl>
          </StyledFooterCol>
          <StyledFooterCol>
            <StyledH4>get help</StyledH4>
            <StyledUl>
              <li>
                <StyledLinks href="#">FAQ</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">shipping</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">returns</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">order status</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">payment options</StyledLinks>
              </li>
            </StyledUl>
          </StyledFooterCol>
          <StyledFooterCol>
            <StyledH4>online shop</StyledH4>
            <StyledUl>
              <li>
                <StyledLinks href="#">watch</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">bag</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">shoes</StyledLinks>
              </li>
              <li>
                <StyledLinks href="#">dress</StyledLinks>
              </li>
            </StyledUl>
          </StyledFooterCol>
          <StyledFooterCol>
            <StyledH4>follow us</StyledH4>
            <div class="social-links">
              <StyledSocialLink href="#">
                <i class="fab fa-facebook-f"></i>
              </StyledSocialLink>
              <StyledSocialLink href="#">
                <i class="fab fa-twitter"></i>
              </StyledSocialLink>
              <StyledSocialLink href="#">
                <i class="fab fa-instagram"></i>
              </StyledSocialLink>
              <StyledSocialLink href="#">
                <i class="fab fa-linkedin-in"></i>
              </StyledSocialLink>
            </div>
          </StyledFooterCol>
        </StyledRow>
      </StyledContainer>
    </StyledFooter>
  );
};

export default Footer;
