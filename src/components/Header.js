import React from "react";
import styled from 'styled-components';

const SANLO_MAIN = "https://storage.googleapis.com/auth0-artifacts/sanlo-white-1.png";
const SANLO_PARTNER = "https://storage.googleapis.com/auth0-artifacts/sanlo_logo_white.svg";

const StyledHeader = styled.div`
  position: relative;
  height: 5rem;

  .main-sanlo-logo {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    z-index: 501;
  }

  .partner-site-link {
    z-index: 501;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #C5C5C5;
    position: absolute;
    top: 32px;
    left: 64px;
    text-decoration: none;
  }

  .branding-container {
    position: absolute;
    top: 0;
    z-index: 500;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    visibility: hidden;
  }

  .partner-branding-img {
    height: 2.25rem;
  }

  .branding-divider {
    color: white;
    font-size: 36px;
    font-weight: 100;
    margin: 0 1rem;
  }

  .sanlo-branding-img {
    height: 1.5rem;
  }
`;

const Header = ({ config = {} }) => {
  console.log(config);

  const {
    queryParams = {},
  } = config;
  const {
    partnerName,
    partnerLogo,
    partnerSite,
  } = queryParams;

  const hasPartnerLogo = Boolean(partnerLogo);
  const hasPartnerRedirect = Boolean(partnerName) && Boolean(partnerSite);

  return (
    <StyledHeader>
      {hasPartnerRedirect && (
        <a className="partner-site-link" href={partnerSite}>
          {`<- Back to ${partnerName}`}
        </a>
      )}

      {!hasPartnerRedirect && (
        <a className="main-sanlo-logo" href="https://sanlo.io">
          <img className="sanlo-logo" src={SANLO_MAIN} alt="sanlo-logo" />
        </a>
      )}

      {hasPartnerLogo && (
        <div className="branding-container">
          <img className="partner-branding-img" src={partnerLogo} alt="partner-logo" />
          <div className="branding-divider">+</div>
          <img className="sanlo-branding-img" src={SANLO_PARTNER} alt="sanlo-logo" />
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
