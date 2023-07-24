import React from "react";
import styled from 'styled-components';

const StyledError = styled.div`
  background-color: rgba(255, 92, 121, 0.1);
  color: #ff5c79;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.01em;
  border-radius: 10px;
  margin: 24px 0;

  .error-p {
    margin: 10px 0;
  }

  .error-icon {
    margin-right: 8px;
  }
`;

const Error = ({ error = {} }) => {
  const { message } = error;
  if (!error || !message) return null;

  return (
    <StyledError>
      {(() => {
        if (Array.isArray(error.message)) {
          return (
            <>
              {error.message.map((message) => {
                return (
                  <p className="error-p">{message}</p>
                );
              })}
            </>
          );
        } else {
          return error.message;
        }
      })()}
    </StyledError>
  );
};

export default Error;
